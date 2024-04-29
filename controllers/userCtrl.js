const userModel = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const doctorModel = require('../models/doctorModel');
const appointmentModel = require('../models/AppointmentModel');
const moment = require('moment');


//Login

const loginController = async (req,res) =>{
try 
{
    const user = await userModel.findOne({email:req.body.email})
    
    if(!user)
    {
       return res.status(200).send({message: `user not found`, success:false});
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if(!isMatch)
    {
        return res.status(200).send({message: `invalid email or password`, success:false});
    }

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET, {expiresIn :'1d'});
    res.status(200).send({ message:"Login success", success:true, token});
}
catch(error)
{
    console.log(error);
    res.status(500).send({message:`Error in Login CTRL : ${error.message}`});
}

};



// Register
const registerController = async (req,res) =>{
    try {
           const existingUser = await userModel.findOne({email:req.body.email});

           if(existingUser)
           {
                return res.status(200).send({message : `user already exists`, success:false });
           }
           const password = req.body.password;
           const salt = await bcrypt.genSalt(10);
           const hashedPassword = await bcrypt.hash(password,salt);
           req.body.password = hashedPassword;
           const newUser = new userModel(req.body);
           await newUser.save();
           res.status(201).send({message: "Register Successfully", success:true});
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({success:false, message: `Register Controller ${error.message}`})
    }
};


//Auth 
const authController = async (req,res) => 
{
     try{
          const user = await userModel.findById({_id:req.body.userId});
          user.password = undefined;
          if(!user)
          {
            return res.status(200).send({
                message : 'user not found',
                success :false
            })
          }
          else{
            res.status(200).send({
                success:true,
                data : user,
            })
          }
     }
     catch (error)
     {
        console.log(error);
        res.status(500).send({
            message:'auth error',
            success :false,
            error
        })
     }
};

// Apply Doctor

const applyDoctorController = async (req, res) =>
{
    
    try {
       
        const newDoctor = await doctorModel({...req.body, status:'pending'})
        await newDoctor.save();
        const adminUser = await userModel.findOne({isAdmin:true});
        const  notification =adminUser.notification;
        notification.push({
            type:'apply-doctor-request',
            message : `${newDoctor.firstname} ${newDoctor.lastname} Has Applied For A Doctor Account`,
            data : {
                doctorId : newDoctor._id,
                name: newDoctor.firstname + " " + newDoctor.lastname,
                onClickPath : '/admin/doctors'
                
            }
        })

        await userModel.findByIdAndUpdate(adminUser._id, {notification})
        res.status(201).send(
            {
                success:true,
                message : 'Doctor Accounr Applied Successfully'
            }
        )

    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error While Applying Doctor'
        })
    }
};

// Notification controller
const getAllNotificationController = async (req, res)=>
{
    try{
       
        const user = await userModel.findOne({_id: req.body.userId});
        const seennotification = user.seennotification;
        const notification = user.notification;
        seennotification.push(...notification);
        user.notification = [];
        user.seennotification = notification;
        const updatedUser = await user.save();
        res.status(200).send(
            {
                success:true,
                message : 'all notification marked as read',
                data : updatedUser,
            }
        )

    }
    catch(error)
    {
        console.log(error)
        res.status(500).send({
            message:'Error in notification',
            success : false,
            error,
        })
    }
};

//Delete Notification 
const DeleteAllNotificationController = async (req,res) =>
{
    try
    {
        const user = await userModel.findOne({_id:req.body.userId});
        user.notification=[];
        user.seennotification =[];
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(200).send(
            {
                success:true,
                message : 'Notifications Deleted successfully',
                data : updatedUser,
            }
        )

    }
    catch(error)
    {
        console.log(error);
        res.status(500).send(
            {
                success: false,
                message : 'Unable to delete all notification',
                error,
            }
        )
    }
};

// All doctor controller

const getAllDoctorController = async (req,res) =>
{
   try
   {
      const doctors = await doctorModel.find({status:'approved'});
      res.status(200).send(
        {
            success:true,
            message:'Doctor Lists Fetched Successfully',
            data:doctors,
        }
      )
   }
   catch(error)
   {
      console.log(error),
      res.send(500).send(
        {
            success:false,
            message:'Error while fetching doctor',
            error,
        }
      )
   }
};


// Booking appointment Controller 

const bookAppointmentController = async (req, res) =>
{
   try
   {
        req.body.date = moment(req.body.date, 'DD-MM-YYYY').toISOString();
        req.body.time = moment(req.body.time, 'HH:mm').toISOString();
        req.body.status = 'pending';
        const newAppointment = new appointmentModel(req.body);
        await newAppointment.save();
        const user = await userModel.findById(req.body.doctorInfo.userId);
        user.notification.push(
            {
                type : 'New-appointment-request',
                message : ` A New Appointment Request from ${req.body.userInfo.name} `,
                onClickPath: '/user/appointments'
            }
        )
         await user.save();
        res.status(200).send(
            {
                 success:true,
                 message : 'Appointment Book Successfully'
            }
        )
   }
   catch(error)
   {
    console.log(error);
    res.status(500).send(
        {
            success:false,
            message:'Error while booking appointment',
            error,

        }
    )
   }
};

// Booking Availability Controller

const bookingAvailabilityController = async (req, res) => {
    try {
        const { date, time, doctorId } = req.body;
 
        if (!date || !time || !doctorId) {
            return res.status(400).send({
                success: false,
                message: 'Incomplete request. Please provide date, time, and doctorId.',
            });
        }
 
        const isoDate = moment(date, 'DD-MM-YYYY').toISOString();
        const fromTime = moment(time, 'HH:mm').subtract(1, 'hours').toISOString();
        const toTime = moment(time, 'HH:mm').add(1, 'hours').toISOString();
 
        const appointments = await appointmentModel.find({
            doctorId,
            date: isoDate,
            time: {
                $gte: fromTime,
                $lte: toTime,
            },
        });
 
        if (appointments.length > 0) {
            return res.status(200).send({
                success: true,
                available: false,
                message: 'Appointment not available at this time.',
            });
        } else {
            return res.status(200).send({
                success: true,
                available: true,
                message: 'Appointments available.',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in booking availability check.',
            error,
        });
    }
 };
 

// user Appointment List Controller

const userAppointmentListController = async(req, res) =>
{
    try
    {
       const appointments = await appointmentModel.find({userId:req.body.userId});
       res.status(200).send(
        {
           success: true,
            message : 'Users Appointmnets fetched successfully',
            data : appointments,
        }
       )
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send(
            {
                success:false,
                message:'Error In User Appointments',
                error,
    
            }
        )
    }
};

// Profile Controller

const ProfileController = async (req, res) => {
    try {
      const user = await userModel.findOne({ userId: req.query.userId });
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'User data fetch success',
        data: user,
      });
    } catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching user details',
        error: error.message,
      });
    }
  };

module.exports = {
    registerController,
    loginController, authController, 
    applyDoctorController, 
    getAllNotificationController, 
    DeleteAllNotificationController,
    getAllDoctorController,
    bookAppointmentController,
    bookingAvailabilityController,
    userAppointmentListController,
    ProfileController
};