Versions:
ode.js v22.15.1
complete tasks:
 Auto-generated `username` using Mongoose pre-save hook  
 Password hashed with bcrypt  
 Email is immutable once created  
 Only users 15+ years old can register  
 Phone must match Pakistani format `+92xxxxxxxxxx`  
 Unique validation for phone and gender  
 Uploads profile and cover images via multer  
 incomplete Tasks:
 forgot password.
 reset password.
 bugs:
 validation bugs:
 DOB validations not working properly.
 Password not matching.
 ChatGpt %:
 "I used AI tools like ChatGPT for around 70–75% of the guidance, especially for understanding complex logic, writing validation code, debugging errors, and structuring backend/frontend logic. However, I implemented, tested, and integrated the code myself, and I made sure to understand what I was doing instead of just copy-pasting."
Commands to run:
cd Backend
cd auth-module
npx nodemon server.js
