# Members Only Project

## Overview
This project is a simple message board application where users can sign up, log in, and post messages. It implements different levels of access based on user roles (regular user, member, admin).

## Technologies Used
- Node.js
- Express.js
- MongoDB with Mongoose
- Passport.js for authentication
- bcrypt for password hashing
- EJS for view templating
- Bootstrap for styling

## Features
- User authentication (sign up, log in, log out)
- Different user roles (regular user, member, admin)
- Message creation and display
- Role-based content visibility
- Admin functionality to delete messages

## What I Learned
1. **Database Modeling**
   - Designed and implemented MongoDB models for users and messages
   - Learned about relationships between models (e.g., associating messages with users)

2. **Authentication**
   - Implemented user authentication using Passport.js
   - Learned about local strategy for username/password authentication
   - Implemented password hashing using bcrypt for security

3. **Authorization**
   - Implemented role-based access control (regular user, member, admin)
   - Learned to conditionally render content based on user roles

4. **Form Handling**
   - Implemented form validation and sanitization
   - Created custom validators (e.g., for password confirmation)

5. **Session Management**
   - Used express-session for managing user sessions

6. **Middleware**
   - Created and used custom middleware for checking user authentication and roles

7. **CRUD Operations**
   - Implemented Create and Read operations for messages
   - Implemented Delete operation for admin users

8. **Front-end Development**
   - Used EJS for server-side rendering
   - Styled the application using Bootstrap for a responsive design

9. **Deployment**
   - Learned about different Platform as a Service (PaaS) options
   - Deployed the application to a chosen PaaS provider

10. **Project Structure**
    - Organized the project using the MVC (Model-View-Controller) pattern

## Challenges and Solutions
- Implementing role-based access was challenging but was solved by adding a membership status field to the user model.
- Ensuring secure authentication required learning about and implementing proper password hashing and session management.


