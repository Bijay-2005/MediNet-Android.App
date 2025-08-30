const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middlewares/authMiddleware');
const {
  createAppointment,
  getUserAppointments,
  getAppointmentById,
  updateAppointmentStatus,
  cancelAppointment,
  getAppointmentsByStatus
} = require('../controller/AppointmentController');

// All routes require authentication
router.use(authMiddleware);

// Create new appointment
router.post('/create', createAppointment);

// Get all appointments for the authenticated user
router.get('/user', getUserAppointments);

// Get appointment by ID
router.get('/:appointmentId', getAppointmentById);

// Update appointment status
router.patch('/:appointmentId/status', updateAppointmentStatus);

// Cancel appointment
router.patch('/:appointmentId/cancel', cancelAppointment);

// Get appointments by status
router.get('/status/:status', getAppointmentsByStatus);

module.exports = router;
