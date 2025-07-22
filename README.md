# StraySafe – AI-Enhanced Stray Animal Rescue Platform
![Dashboard Overview](assets/dashboard.png)  

**StraySafe** is an AI-assisted web application that empowers users to report and assist injured or hungry stray animals, and enables volunteers to respond in real time. Inspired by NeoRecruiter’s polished structure, this README is copy-paste ready—with placeholders for screenshots, live links, and image attachments.

## 🚀 Live Demo
- **Frontend:** https://your-frontend-url.com  
- **Backend:** https://your-backend-url.com  

## 📋 Overview
StraySafe leverages modern web technologies and optional AI triage to map stray animal incidents, collect assistance requests, and match volunteers based on proximity. Real-time updates, notifications, and admin management ensure efficient rescue operations.

## ✨ Key Features

**📍 Location Mapping**  
- Interactive map showing reported incidents  
- Filter by status: Injured, Hungry, Missing  

**📝 Assistance Requests**  
- Submit requests with details, photos & GPS coords  
- *Optional:* AI categorization of urgency  

**👥 Volunteer Portal**  
- Register & manage profile  
- Proximity-based request assignment  
- Real-time acceptance & completion tracking  

**🔔 Notifications & Updates**  
- Email & in-app alerts for new, assigned, and completed requests  
- Status timeline for each request  

**🛠️ Admin Dashboard**  
- Moderate and assign requests manually  
- Volunteer performance analytics  
- Data export for reports  

## 🏗️ Technology Stack

**Backend**  
- Node.js + Express.js (REST API)  
- MongoDB + Mongoose  
- JWT authentication & bcrypt for password hashing  
- Nodemailer for email notifications  
- Multer for file/photo uploads  

**Frontend**  
- React + Vite  
- Tailwind CSS  
- React Router & Context API  
- Axios for HTTP requests

StraySafe/Frontend/src/assets
/dashboard.png

## my website flow
1. ![Dashboard Overview](StraySafe/Frontend/src/assets/dashboard.png)  
 user come to dashbord and login/singup

2.if they alredy have account they will login 
 ![Login Overview](assets/login.png)  

3.if they dont have any Account and he is volnetear then they will login as a volenter and if he is NGO then they will singup as NGO
  ![singup as NGO Overview](assets/both.png)     ![singup as Voleter Overview](assets/volenter2.png)    ![singup as NGO Overview](assets/ngo.png)  

4.and then volunteer report animal and can see there pass reports he can track it also 
 ![report Overview](assets/report.png)    ![report Overview](assets/myreports.png)  

## 🚀 Installation & Setup

### Prerequisites
- Node.js v16+  
- MongoDB v4.4+  
- Email (SMTP) credentials  

### Backend Setup
# creat a .env file
PORT=
DB_CONNECTION_STRING=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_URL=
EMAIL_SERVICE=
EMAIL_USER=
EMAIL_PASS=
VITE_BASE_URL=
CLIENT_URL=

npm run dev

### Frontend Setup
cd StraySafe/Frontend
npm install
npm run dev

## 📡 API Endpoints

### User & Volunteer
- `POST /register` – Sign up (user or volunteer)  
- `POST /login` – Authenticate & receive JWT  
- `GET /profile` – Fetch user profile  
- `POST /logout` – Invalidate session  

### Assistance Requests
- `POST /requests` – Create a new rescue request  
- `GET /requests` – List all requests (with filters)  
- `GET /requests/:id` – Get request details  
- `PATCH /requests/:id/assign` – Assign volunteer (admin only)  
- `PATCH /requests/:id/status` – Update status (volunteer)  

### Media & Notifications
- `POST /requests/:id/photos` – Upload photos for a request  
- `POST /notifications` – Send email/in-app notifications  

## 🎯 Usage Guide

### For Users
1. **Report an Incident:** Fill location, description, and optional photos.  
2. **Track Request:** View status timeline on your dashboard.  
3. **Receive Updates:** Get notified when a volunteer is assigned and completes rescue.

### For Volunteers
1. **Browse Requests:** See nearby open requests on the map.  
2. **Accept Request:** Claim a request and mark it “In Progress.”  
3. **Complete Rescue:** Update status to “Completed” and upload outcome photos.

## 🔒 Security Features
- JWT-based authentication with token expiry  
- Input validation & sanitization  
- Role-based access control (user, volunteer, admin)  
- Secure file upload handling  

## 🖼️ Screenshots & Image Attachment

Place your website screenshots in an `assets/` folder and reference them below:

## 🤝 Contributing

1. Fork the repo  
2. Create feature branch: `git checkout -b feature/YourFeature`  
3. Commit changes: `git commit -m "Add YourFeature"`  
4. Push & open PR  
5. Ensure lint, tests, and type checks pass via `npm run prepush`
