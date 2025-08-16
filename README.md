# 🏥 HealthCare+ - Comprehensive Healthcare Management Platform

A scalable, secure, and real-time enabled full-stack healthcare management system built for modern medical institutions and healthcare providers. Designed with complete patient management, appointment scheduling, and role-based access, the platform empowers patients, healthcare providers, and administrators with a seamless healthcare experience. It supports everything from patient registration and appointment booking to pharmacy management, lab tests, blood bank services, and live consultations, all deployable via a Dockerized, cloud-native setup.

💡 Key Capabilities:

## 🧑‍⚕️ Healthcare Provider Portal: 
Medical professionals can manage patient appointments, create treatment plans, and access patient records. They can also:

- Create and manage patient profiles
- Schedule and reschedule appointments
- Access patient medical history
- Prescribe medications and lab tests
- Review patient progress and analytics
- Communicate with patients via real-time chat
- Manage multiple medical departments

## 🧑‍⚕️ Patient Dashboard: 
Patients can register, book appointments, access medical services, and track their health records. Features include:

- Resume from last consultation
- Real-time messaging with healthcare providers
- Appointment and treatment progress analytics
- Access to pharmacy, lab tests, and blood bank services

## 🛠 Admin Console: 
Administrators can:

- Manage all users and roles (patients, doctors, staff)
- Monitor platform analytics and usage
- Approve or remove medical content
- Configure service pricing and insurance plans
- Manage multiple departments and facilities

## 📦 Healthcare Services System:

- Multi-department medical services (12+ specialties)
- Appointment scheduling and management
- Pharmacy services with online ordering
- Laboratory test booking and result management
- Blood bank donation and request system
- Medical equipment rental services
- Insurance plan management

## �� Security & Privacy:

- HIPAA-compliant data protection
- JWT-based authentication with role-based access
- Encrypted patient data transmission
- Secure payment processing
- Privacy-focused user data handling

## �� Real-Time Features:

- Live chat between patients and healthcare providers
- Real-time appointment notifications
- Emergency SOS system with location sharing
- Instant status updates for services

## 💳 Payment Integration:

- Stripe-powered payment processing
- Insurance claim integration
- Secure billing and email confirmation
- Multiple payment methods support

## �� Health Analytics & Progress:

- Patient health tracking and analytics
- Treatment progress monitoring
- Department-wise performance metrics
- Admin overview dashboard with insights

## �� Emergency & Safety Features:

- Emergency SOS with location sharing
- Quick access to emergency contacts
- Real-time emergency service coordination
- Health crisis management tools

## 🧱 Full Technology Stack

| Layer | Technology | Description |
|-------|------------|-------------|
| **Frontend** | Next.js (TypeScript) + Tailwind CSS | Lightning-fast, SEO-friendly UI framework |
| **Backend** | Express.js + Mongoose + MongoDB | RESTful API with MongoDB integration |
| **Authentication** | JWT + bcrypt | Secure authentication with password hashing |
| **Database** | MongoDB (Local or Atlas) | Stores user, patient, and medical data |
| **Real-Time** | Socket.IO | Real-time chat and notifications |
| **Payments** | Stripe | Handles payments and insurance claims |
| **Email** | Nodemailer + Gmail SMTP | Patient communications and notifications |
| **Maps** | Leaflet/Mapbox | Location services and facility finder |
| **AI** | Custom AI Health Assistant | Intelligent health consultation chatbot |
| **Deployment** | Docker + Docker Compose + AWS | Production-ready infrastructure |
| **Reverse Proxy & SSL** | Nginx + Certbot | HTTPS and load balancing |

## 🧑‍⚕️ User Roles and Features

### **Patient**
- Sign up/Login with email authentication
- Browse medical departments and services
- Book appointments with healthcare providers
- Access pharmacy, lab tests, and blood bank services
- Track health records and treatment progress
- Chat with healthcare providers
- Emergency SOS functionality

### **Healthcare Provider**
- Create/update patient records
- Manage appointments and schedules
- Prescribe medications and treatments
- Review patient submissions and progress
- Message patients and colleagues
- Access department-specific tools

### **Admin**
- Manage all users & medical content
- Monitor platform activity and analytics
- Approve/reject flagged content
- Configure services and pricing
- Access comprehensive analytics

## 🌐 ENV Configuration

### �� client/.env
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
NEXT_PUBLIC_SOCKET_SERVER_URI=http://localhost:3001

# OAuth Configuration (if implementing)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...

SECRET=super_secret_key
```

### �� server/.env
```env
PORT=3001
ORIGIN=http://localhost:3000

# Database
MONGODB_URI=mongodb://localhost:27017/healthcare
NODE_ENV=development

# Authentication
JWT_SECRET=your_jwt_secret_key
ACCESS_TOKEN_EXPIRE=24h
REFRESH_TOKEN_EXPIRE=7d

# Email Configuration
EMAIL_USER=your@gmail.com
EMAIL_PASS=app_password

# Payment Integration
STRIPE_SECRET_KEY=...
STRIPE_PUBLISHABLE_KEY=...

# Maps & Location
MAPBOX_ACCESS_TOKEN=...

# Redis (for real-time features)
REDIS_URL=redis://localhost:6379
```

## �� Feature Highlights

✅ **Multi-Department Healthcare**: 12+ medical departments with specialized services
✅ **Real-Time Messaging**: Socket.IO for patient-provider communication
✅ **Appointment Management**: Complete scheduling and tracking system
✅ **Pharmacy Services**: Online medicine ordering and management
✅ **Lab Test Booking**: Comprehensive laboratory service integration
✅ **Blood Bank System**: Donation and request management
✅ **Payment Gateway**: Stripe integration for secure payments
✅ **JWT Authentication**: Secure token-based authentication
✅ **Emergency SOS**: Real-time emergency response system
✅ **AI Health Assistant**: Intelligent health consultation chatbot
✅ **Location Services**: Map integration for finding healthcare facilities
✅ **Insurance Integration**: Health insurance plan management
✅ **Email Notifications**: Automated patient communications
✅ **Modular Design**: Easily extensible architecture

## 🐳 Docker + AWS Deployment

### Local Setup:
```bash
git clone https://github.com/your-username/healthcare-platform.git
cd healthcare-platform
docker-compose up --build
```

### Services Included:
- **client**: Next.js healthcare app
- **server**: Express API with MongoDB
- **mongodb**: Database (can switch to Atlas)
- **redis**: Real-time messaging (optional)
- **nginx**: (Optional) reverse proxy

## ☁️ AWS Production Tips

- Use EC2 for deployment (Ubuntu 20.04 LTS)
- Use MongoDB Atlas (Free tier works for POC)
- Secure MongoDB and Redis with private subnets
- Set up Nginx + Certbot for HTTPS
- Use PM2 or docker-compose with restart: always
- Implement proper backup strategies for patient data

## ��️ Map Integration

### Mapbox Setup:
1. Sign up at Mapbox
2. Get your access token
3. Use in frontend for location services:

```javascript
import { MapContainer, TileLayer, Marker } from 'react-leaflet'

<MapContainer
  center={[latitude, longitude]}
  zoom={13}
  style={{ height: "400px", width: "100%" }}
>
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  />
  <Marker position={[latitude, longitude]} />
</MapContainer>
```

## 🤖 AI Health Assistant Integration

### Features:
- Symptom analysis and preliminary health assessment
- Health tips and wellness advice
- Emergency guidance and first aid information
- Integration with appointment booking system

### Implementation:
```javascript
// AI Chat Component
<AIChatModal 
  isOpen={showAIChat}
  onClose={() => setShowAIChat(false)}
  userContext={user}
/>
```

## �� Email Setup

### Gmail SMTP Configuration:
1. Enable 2FA in Gmail
2. Go to "Security > App Passwords"
3. Create new app password for "Mail"
4. Use it in .env as EMAIL_PASS

### Email Templates:
- Welcome emails for new patients
- Appointment confirmations and reminders
- Password reset and account verification
- Health tips and wellness newsletters

## 💸 Stripe Payments

### Setup:
1. Sign up at Stripe
2. Use test keys for development
3. Integrate for:
   - Appointment booking payments
   - Pharmacy orders
   - Lab test payments
   - Insurance premium payments

### Implementation:
```javascript
// Payment processing
const handlePayment = async (amount, service) => {
  const response = await fetch('/api/payment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, service })
  });
  // Handle payment response
};
```

## 🔐 Security Features

### HIPAA Compliance:
- Encrypted data transmission (HTTPS)
- Secure user authentication
- Role-based access control
- Audit logging for patient data access
- Data backup and recovery procedures

### Authentication Security:
- JWT tokens with expiration
- Password hashing with bcrypt
- Input validation and sanitization
- CORS protection
- Rate limiting for API endpoints

## 📊 Analytics & Reporting

### Patient Analytics:
- Appointment booking trends
- Department-wise patient distribution
- Treatment outcome tracking
- Patient satisfaction metrics

### Provider Analytics:
- Appointment completion rates
- Patient load distribution
- Revenue and billing analytics
- Performance metrics

### Admin Analytics:
- Platform usage statistics
- Revenue and growth metrics
- Service utilization reports
- User engagement analytics

## 🚀 Quick Start

### Prerequisites:
- Node.js (v18+)
- MongoDB (local or Atlas)
- Redis (optional, for real-time features)
- Docker (for containerized deployment)

### Installation:

1. **Clone and Setup:**
```bash
git clone <repository-url>
cd healthcare-platform

# Install dependencies
cd server && npm install
cd ../client && npm install
```

2. **Environment Configuration:**
```bash
# Server environment
cp server/.env.example server/.env
# Edit server/.env with your configuration

# Client environment
cp client/.env.example client/.env.local
# Edit client/.env.local with your configuration
```

3. **Start Development:**
```bash
# Start both services
node start-both.js

# Or start separately
# Terminal 1: cd server && npm start
# Terminal 2: cd client && npm run dev
```

### Access Points:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/ping
