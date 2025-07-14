This is the backend for the full-stack Authentication Module.  
It provides RESTful APIs to handle user signup, validations, file uploads, and authentication logic.
Project structure:
auyh-modul/
├── controllers/ # logic (e.g., signup)
├── models/ # Mongoose schemas (e.g., user.js)
├── routes/ # API route definitions
├── middleware/ # Multer, validation, auth
├── uploads/ # Image storage (profile & cover)
├── .env # Environment variables
├── server.js # Entry point

Versions:
{
  "version": "1.0.0",
  },
  "dependencies": {
    "bcrypt": "^6.0.0",
    "bcryptjs": "^3.0.2",
    "cors": "^2.8.5",
    "dotenv": "^17.2.0",
    "express": "^5.1.0",
    "moment": "^2.30.1",
    "mongoose": "^8.16.3",
    "multer": "^2.0.1"
  }

Features:

- ✅ Auto-generated `username` using Mongoose pre-save hook  
- ✅ Password hashed with bcrypt  
- ✅ Email is immutable once created  
- ✅ Only users 15+ years old can register  
- ✅ Phone must match Pakistani format `+92xxxxxxxxxx`  
- ✅ Unique validation for phone and gender  
- ✅ Uploads profile and cover images via multer  
Commands to run:
cd Backend
cd auth-module
npx nodemon server.js