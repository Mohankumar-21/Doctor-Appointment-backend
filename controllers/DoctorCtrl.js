const doctorModel = require('../models/doctorModel');
const appointmentModel = require('../models/AppointmentModel');
const userModel = require('../models/userModels');


const getDoctorInfoController = async(req , res) =>
{
   try{
        const doctor = await doctorModel.findOne({userId: req.body.userId});
        res.status(200).send(
            {
                success: true,
                message:'doctor data fetch success',
                data : doctor,
            }
        );
   }
   catch(error)
   {
    console.log(error);
    res.status(500).send(
        {
            success : false,
            message : 'Error Fetching in Doctor Details',
            error,
        }
    )
   }
};

// update profile controller

const updateProfileControlller= async (req, res) =>
{
  try
  {
     const doctor = await doctorModel.findOneAndUpdate({userId:req.body.userId}, req.body);
     res.status(201).send(
        {
            success:true,
            message :'Doctor Profile Updated',
            data : doctor,
        }
     )
  }
  catch (error)
  {
     console.log(error);
     res.status(500).send(
        {
            success:false,
            message : 'Doctor profile update issue',
            error,
        }
     )
  }
};


// Get doctor booking application 

const getDoctorByIdController = async (req, res) =>
{
    try
    {
       const doctor = await doctorModel.findOne({_id:req.body.doctorId});
        res.status(200).send(
            {
                success:true,
                message: 'Single doctor information fetched',
                data:doctor,
            }
        )
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send(
            {
                success:false,
                message : 'error in doctor information',
                error,
            }
        )
    }

    
};


// Get Docto rAppointments Controller

const getDoctorAppointmentsController = async(req,res) =>
{
     try
     {
        const doctor = await doctorModel.findOne({userId:req.body.userId});
        const appointments = await appointmentModel.find({doctorId:doctor._id});

        res.status(200).send(
            {
              success:true,
              message : ' Doctors appointments fetch Successfully',
              data:appointments,
            } 
        )
     }
     catch(error)
     {
        console.log(error);
        res.status(500).send(
            {
                success:false,
                message : 'error in doctor appointments',
                error,
            }
        )
     }
};

// update Status Controller

const updateStatusController = async (req, res) =>
{
   try
   {
        const {appointmentsId, status} = req.body;
        const appointments = await appointmentModel.findByIdAndUpdate(appointmentsId, {status});
        const user = await userModel.findOne({_id:appointments.userId});
        const notification = user.notification;
        notification.push(
            {
                type : 'status-updated',
                message : ` Your appointment has been updated ${status} `,
                onClickPath: '/doctor-appointments'
            }
        )
         await user.save();
         res.status(200).send(
            {
                success:true,
                message:"Appointment status updated",
            }
         );
   }      
   catch(error)
   {
    console.log(error);
    res.status(500).send(
        {
            success:false,
            message : 'error in update status',
            error,
        }
    )
   }
};

module.exports = { getDoctorInfoController, 
                   updateProfileControlller, 
                   getDoctorByIdController,
                   getDoctorAppointmentsController,
                   updateStatusController
                };