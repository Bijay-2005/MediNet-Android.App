const AppointmentModel = require('../Models/appointment');
const UserModel = require('../Models/user');

// Create new appointment
const createAppointment = async (req, res) => {
  try {
    const {
      hospitalId,
      hospitalName,
      hospitalAddress,
      departmentId,
      doctorId,
      doctorName,
      doctorSpecialization,
      patientName,
      patientAge,
      patientPhone,
      symptoms,
      selectedDate,
      selectedTime,
      consultationFee,
      transactionId
    } = req.body;

    // Get userId from auth middleware
    const userId = req.user.id;

    const appointment = new AppointmentModel({
      userId,
      hospitalId,
      hospitalName,
      hospitalAddress,
      departmentId,
      doctorId,
      doctorName,
      doctorSpecialization,
      patientName,
      patientAge,
      patientPhone,
      symptoms,
      selectedDate,
      selectedTime,
      consultationFee,
      transactionId
    });

    const savedAppointment = await appointment.save();
    
    res.status(201).json({
      success: true,
      message: 'Appointment created successfully',
      data: savedAppointment
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create appointment',
      error: error.message
    });
  }
};

// Get all appointments for a user
const getUserAppointments = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const appointments = await AppointmentModel.find({ userId })
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      message: 'Appointments retrieved successfully',
      data: appointments
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch appointments',
      error: error.message
    });
  }
};

// Get appointment by ID
const getAppointmentById = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const userId = req.user.id;
    
    const appointment = await AppointmentModel.findOne({
      _id: appointmentId,
      userId
    });
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Appointment retrieved successfully',
      data: appointment
    });
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch appointment',
      error: error.message
    });
  }
};

// Update appointment status
const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body;
    const userId = req.user.id;
    
    const appointment = await AppointmentModel.findOneAndUpdate(
      {
        _id: appointmentId,
        userId
      },
      { status },
      { new: true }
    );
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Appointment status updated successfully',
      data: appointment
    });
  } catch (error) {
    console.error('Error updating appointment status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update appointment status',
      error: error.message
    });
  }
};

// Cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const userId = req.user.id;
    
    const appointment = await AppointmentModel.findOneAndUpdate(
      {
        _id: appointmentId,
        userId
      },
      { status: 'cancelled' },
      { new: true }
    );
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Appointment cancelled successfully',
      data: appointment
    });
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel appointment',
      error: error.message
    });
  }
};

// Get appointments by status
const getAppointmentsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const userId = req.user.id;
    
    const appointments = await AppointmentModel.find({
      userId,
      status
    }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      message: `${status} appointments retrieved successfully`,
      data: appointments
    });
  } catch (error) {
    console.error('Error fetching appointments by status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch appointments by status',
      error: error.message
    });
  }
};

module.exports = {
  createAppointment,
  getUserAppointments,
  getAppointmentById,
  updateAppointmentStatus,
  cancelAppointment,
  getAppointmentsByStatus
};
