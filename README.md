# 🐾 StraySafe – AI-Enhanced Stray Animal Rescue Platform

StraySafe is an AI-assisted web application designed to empower communities to report, track, and assist injured, hungry, or missing stray animals. It connects users and volunteers, backed by real-time maps, notifications, AI-aided triage, and powerful admin features.

---

## 🚀 Live Demo

- **Frontend Live Link:** _Coming in 2 days_
- **Backend Live Link:** _Coming in 2 days_

- **🧾 Figma Design:** [Click here to view](https://www.figma.com/design/qhtQxZgrWr4HkFMLZJitop/Untitled?node-id=0-1&t=8nERqX4fNRUEWDGX-1)
- **📽 Demo Video:** [Watch Here](https://drive.google.com/drive/folders/1iBFHSRj4YSukEDXiKTNQg3JMvoUhYweT?usp=sharing)
---

## 📋 Overview

StraySafe empowers citizens, NGOs, and volunteers to collaboratively help stray animals:
- 📍 Real-time animal sightings on an interactive map.
- ✍️ Image-rich incident reports with GPS & urgency levels.
- 👥 Matching volunteers to incidents by location.
- ⚙️ Admin dashboard for NGO staff.

---

## ✨ Key Features

### 📍 Interactive Location Mapping
- Real-time display of incidents.
- Filters by type: **Injured**, **Hungry**, **Missing**.

### 📝 Smart Assistance Request System
- Submit requests with:
  - Descriptions
  - GPS location
  - Photos
- (Optional) AI urgency detection for faster triage.

### 🧑‍🤝‍🧑 Volunteer Portal
- Role-based login for **User**, **Volunteer**, or **NGO**.
- View, accept, and complete rescue requests.
- Track your rescue history.

### 🔔 Real-Time Alerts
- Email + In-App alerts
- Status timeline of every reported incident

### 🛠️ Admin Dashboard
- Approve, assign, and track requests
- Performance analytics for volunteers
- Download reports (.csv etc.)

---

## 🏗️ Tech Stack

| Layer               | Technologies Used                                 |
|--------------------|----------------------------------------------------|
| **Frontend**        | React + Vite, Tailwind CSS, Axios, React Router    |
| **Backend**         | Node.js, Express.js, MongoDB, Mongoose             |
| **Authentication**  | JWT, bcrypt                                        |
| **Notifications**   | Nodemailer (Email), In-app Alerts                  |
| **Media Uploads**   | Multer + Cloudinary                                |

---

## 🧭 Website Flow

1. 🏠 User lands on Dashboard: Choose Login or Signup
   
<img width="1919" height="904" alt="dashboard" src="https://github.com/user-attachments/assets/2f7a264c-426f-4fd5-bf3c-8596f2308255" />


---

2. 🙋 Existing Users Login  

<img width="1423" height="683" alt="login" src="https://github.com/user-attachments/assets/a8e80b20-b39d-4b78-8e3d-c95ed60dd9fe" />

3. 👤 New Account Registration — Select Volunteer or NGO  

<img width="1369" height="810" alt="both" src="https://github.com/user-attachments/assets/65f365d3-269f-415d-9978-83088cdbc846" />

<img width="1367" height="851" alt="volenter2" src="https://github.com/user-attachments/assets/4e05dcff-c9e4-43da-b7cb-5397f58a6916" />
<img width="1405" height="895" src="https://github.com/user-attachments/assets/057089d8-d5de-4e59-9f90-c48a949903b9" alt="ngo" />


---

4. 🚑 Volunteer Reporting & Tracking  

<img width="1908" height="910" src="https://github.com/user-attachments/assets/4eefcb9a-9c5f-4109-a567-976e2f5d08d5" alt="report" />
<img width="1906" height="903" src="https://github.com/user-attachments/assets/1f3437b1-6873-4b62-8fb0-3f5b8386b752" alt="myreports" />


---

## 🛠 Installation Guide

### 🔍 Prerequisites

Make sure these are installed:
- Node.js v16+
- MongoDB v4.4+
- SMTP Email credentials
- A Cloudinary account for image uploads

---

### 💻 Backend Setup

```
# Clone this project
git clone https://github.com/shivamshrma09/StraySafe.git

# Navigate to backend directory
cd StraySafe/backend

# Install dependencies
npm install

# Create a .env file and provide credentials:
PORT=
DB_CONNECTION_STRING=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
EMAIL_SERVICE=
EMAIL_USER=
EMAIL_PASS=
CLIENT_URL=

# To start server
npm run dev
```

---

### 🖼 Frontend Setup

```
# Navigate to frontend
cd StraySafe/Frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

---

## 📡 API Endpoints

### 👥 User & Volunteer

- `POST /register` – Register as volunteer/NGO/user  
- `POST /login` – Login with JWT token  
- `GET /profile` – Get profile info  
- `POST /logout` – Log out  

### 🤲 Assistance Request

- `POST /requests` – Create an animal report request  
- `GET /requests` – View all requests  
- `GET /requests/:id` – View single request  
- `PATCH /requests/:id/assign` – Assign request to volunteer  
- `PATCH /requests/:id/status` – Volunteer updates request status  

### 📷 Media & 🛎 Notifications

- `POST /requests/:id/photos` – Upload images for request  
- `POST /notifications` – Trigger email/in-app notifications  

---

## 🧑‍🏫 Usage Guide

### 👤 For Users
1. Report animal incident with description & location.
2. View status of your reports.
3. Get notified via email & dashboard updates.

### 🦸 For Volunteers
1. Browse unassigned requests nearby.
2. Accept request & mark as “In Progress”.
3. Complete rescue & upload outcome photo.

---

## 🔐 Security Features

- Protected routes using **JWT**
- Passwords hashed using **bcrypt**
- Upload validation through **Multer + Cloudinary**
- Role-based access control (User, Volunteer, Admin)

---

## 📷 Project Assets

Save all screenshots in a project directory:
```
/StraySafe/Frontend/src/assets
```
Use relative paths or GitHub-hosted URLs in your documentation.

---

## 🤝 Contributing

We welcome contributions from animal lovers & developers:

1. Fork this repository  
2. Create a new branch:  
   `git checkout -b feature/YourFeature`  
3. Commit your changes:  
   `git commit -m "Add YourFeature"`  
4. Push your changes and open a Pull Request  
5. Ensure everything passes: 
   ```
   npm run lint
   npm run test
   ```

---

## 👨‍💻 Author

Created with 💙 by @shivamshrma09  
> All lives matter — even the ones without a voice.

```

Let me know if you’d like help with auto-generating a pre-filled `.env` file template or `/backend` directory boilerplate!
