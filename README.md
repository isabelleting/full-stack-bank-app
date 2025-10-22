# Full-Stack-Bank-App

## Description 

Welcome to Belle Bank. A full MERN stack bank application with MIT xPro. Built with Vite + React and Bootstrap, Node.js and Express, and MongoDB Atlas across all three tiers.\ Deployed to Heroku through Github Actions Continuous Deployment.\
Live Demo @: https://lei-ting-fullstackbankapp-35b807e11808.herokuapp.com

User's can create accounts, sign in, sign in with Google, deposit and withdraw from their accounts, as well as check their balance securely. 

Developed features including user authentication, password hashing, data persistence throughout sign in’s, oAuth sign in with Google and Firebase, data abstraction layer for database specific code, success and error alerts, form validation, conditional rendering, Swagger documentation, and responsive design (mobile & desktop). 

## Local Installation Guidelines

- First `git clone` this repo, `cd full-stack-bank-app`, and run `npm install` to install our backened dependencies. 
- Then `cd public`, run `npm install`, then `npm run build` to build our front end into a static files with Vite.js.
- Return to **full-stack-bank-app** directory with `cd ..`, and run `npm start` to start the Express server and navigate to **localhost:3000** to use this bank app. 

## Screenshots

<img width="700" alt="Screenshot 2024-06-21 at 10 34 58 PM" src="https://github.com/isabelleting/full-stack-bank-app/assets/144510802/06dc0659-cd5e-47e5-b4c8-f42e19a0cfbe">
<img width="700" alt="Screenshot 2024-07-12 at 10 46 17 PM" src="https://github.com/user-attachments/assets/f0bed94f-76ab-443e-8ce0-5ebeef8952b8">

## Video Walkthrough

- Front End Architecture: https://youtu.be/BE823tLv4cA 
- Database & API: https://youtu.be/-zoD9uAgXrg 
- Deployemnt & Demonstration: https://youtu.be/bKce8JFDJsM 

## Technology used: 

- React.js
- Node.js
- Express
- MongoDB Atlas
- Vite.js
- Bootstrap
- Firebase Authentication
- Bcrypt
- Heroku
- Github Actions
- Swagger
- Dotenv
- Docker Desktop (development)

## Additional Features

- Only create account or sign in is available to the user until they're signed in. Users then can deposit, withdraw, or check their account balance. 
- User's passwords must be at least 8 characters and are hashed with bCrpyt npm package then stored in MongoDB Atlas.
- Users can only deposit positive numbers and cannot withdraw more than they have or there's an error alert and the button is disabled. 

## Future Improvements

- Future feature where users can transfer money between accounts or to other accounts. 
- Transaction history users can view along with their balance. 

## License

MIT License

Copyright (c) 2020 Abel Sanchez

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
