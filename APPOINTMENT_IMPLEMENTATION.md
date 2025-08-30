# Hospital Booking Appointment System Implementation

## Overview
This document describes the implementation of a complete hospital booking appointment system that stores appointments in MongoDB and provides API endpoints to manage them.

## What Was Implemented

### 1. Database Model (`server/Models/appointment.js`)
- **Appointment Schema**: Complete MongoDB schema for storing hospital appointments
- **Fields Include**:
  - User ID (linked to authenticated user)
  - Hospital details (ID, name, address)
  - Department and doctor information
  - Patient details (name, age, phone, symptoms)
  - Appointment details (date, time, consultation fee)
  - Payment information (transaction ID, payment status)
  - Status tracking (confirmed, pending, completed, cancelled)
  - Timestamps (created, updated)

### 2. API Controller (`server/controller/AppointmentController.js`)
- **CRUD Operations**:
  - `createAppointment`: Create new appointment
  - `getUserAppointments`: Get all appointments for authenticated user
  - `getAppointmentById`: Get specific appointment
  - `updateAppointmentStatus`: Update appointment status
  - `cancelAppointment`: Cancel appointment
  - `getAppointmentsByStatus`: Filter appointments by status

### 3. API Routes (`server/Routes/AppointmentRouter.js`)
- **Protected Endpoints**: All routes require authentication
- **Available Routes**:
  - `POST /appointments/create` - Create new appointment
  - `GET /appointments/user` - Get user's appointments
  - `GET /appointments/:id` - Get specific appointment
  - `PATCH /appointments/:id/status` - Update status
  - `PATCH /appointments/:id/cancel` - Cancel appointment
  - `GET /appointments/status/:status` - Filter by status

### 4. Server Integration (`server/index.js`)
- **Route Registration**: Appointment routes added to main server
- **API Documentation**: Endpoints listed in root response
- **Logging**: Server startup logs include appointment endpoints

### 5. Client-Side Integration

#### Confirmation Page Updates (`client/app/HospitalBooking/Hospitals/deparment/[departmentId]/doctors/[doctorId]/confirmation/page.tsx`)
- **Database Storage**: Appointments now saved to MongoDB instead of just localStorage
- **Authentication**: Uses JWT token from localStorage for API calls
- **Data Persistence**: Appointment data persists across sessions

#### Appointments Page (`client/app/routes/appointments-page.tsx`)
- **Real Data**: Fetches appointments from database API
- **Dynamic Filtering**: Shows real counts for upcoming, past, and cancelled appointments
- **Interactive Actions**: 
  - Mark appointments as complete
  - Cancel appointments
  - View appointment details
- **Status Management**: Real-time status updates
- **Error Handling**: Proper loading states and error messages

## How It Works

### 1. Appointment Creation Flow
1. User completes hospital booking and payment
2. Confirmation page saves appointment to database via API
3. Appointment stored with user authentication
4. Data persists in MongoDB

### 2. Appointment Management Flow
1. User navigates to appointments page
2. Page fetches appointments from database API
3. Appointments filtered by status and date
4. User can perform actions (complete, cancel, etc.)
5. Changes immediately reflected in database

### 3. Authentication Flow
1. All appointment endpoints require valid JWT token
2. Token extracted from localStorage
3. User ID extracted from token for data isolation
4. Unauthorized requests return 401 status

## API Endpoints

### Base URL: `http://localhost:3001/appointments`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/create` | Create new appointment | Yes |
| GET | `/user` | Get user's appointments | Yes |
| GET | `/status/:status` | Get appointments by status | Yes |
| GET | `/:id` | Get specific appointment | Yes |
| PATCH | `/:id/status` | Update appointment status | Yes |
| PATCH | `/:id/cancel` | Cancel appointment | Yes |

## Database Schema

```javascript
{
  userId: ObjectId,           // Reference to User
  hospitalId: String,         // Hospital identifier
  hospitalName: String,       // Hospital name
  hospitalAddress: String,    // Hospital address
  departmentId: String,       // Department identifier
  doctorId: String,          // Doctor identifier
  doctorName: String,        // Doctor's name
  doctorSpecialization: String, // Doctor's specialization
  patientName: String,       // Patient's name
  patientAge: String,        // Patient's age
  patientPhone: String,      // Patient's phone
  symptoms: String,          // Patient's symptoms
  selectedDate: String,      // Appointment date
  selectedTime: String,      // Appointment time
  consultationFee: Number,   // Consultation fee
  status: String,            // confirmed/pending/completed/cancelled
  transactionId: String,     // Payment transaction ID
  paymentStatus: String,     // paid/pending/failed
  paidAt: Date,             // Payment timestamp
  createdAt: Date,          // Creation timestamp
  updatedAt: Date           // Last update timestamp
}
```

## Testing

### Test Script: `test-appointment-api.js`
- Tests API endpoint availability
- Verifies authentication requirements
- Checks proper error responses

### Manual Testing
1. Start server: `cd server && npm start`
2. Start client: `cd client && npm run dev`
3. Complete hospital booking flow
4. Check appointments page for real data
5. Test appointment actions (complete, cancel)

## Security Features

- **Authentication Required**: All endpoints protected
- **User Isolation**: Users can only access their own appointments
- **Input Validation**: Server-side validation of appointment data
- **CORS Protection**: Proper CORS configuration
- **JWT Tokens**: Secure authentication mechanism

## Future Enhancements

1. **Email Notifications**: Send confirmation emails for appointments
2. **SMS Reminders**: Text message reminders before appointments
3. **Rescheduling**: Allow users to reschedule appointments
4. **Doctor Availability**: Real-time doctor availability checking
5. **Payment Integration**: Direct payment processing
6. **Analytics**: Appointment statistics and reporting

## Troubleshooting

### Common Issues

1. **"Authentication Required" Errors**
   - Ensure user is logged in
   - Check if JWT token exists in localStorage
   - Verify token hasn't expired

2. **"Failed to Fetch Appointments"**
   - Check if server is running on port 3001
   - Verify MongoDB connection
   - Check server logs for errors

3. **Appointments Not Showing**
   - Verify user has created appointments
   - Check appointment status filters
   - Ensure proper date formatting

### Debug Steps

1. Check browser console for errors
2. Verify API endpoints in Network tab
3. Check server logs for backend errors
4. Test API endpoints with Postman/curl
5. Verify MongoDB connection and data

## Conclusion

The hospital booking appointment system is now fully integrated with:
- ✅ Database storage in MongoDB
- ✅ Secure API endpoints with authentication
- ✅ Real-time appointment management
- ✅ Client-side integration
- ✅ Error handling and loading states
- ✅ Status tracking and filtering

Users can now book hospital appointments that are permanently stored and managed through a comprehensive appointment management interface.
