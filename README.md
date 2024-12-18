# Model Outfit Platform

The **Model Outfit Platform** allows users to create, browse, and share outfits. The project features a React-based frontend and multiple backend services built using Node.js, Express, and Python.

## Table of Contents
- [Project Structure](#project-structure)
- [Services](#services)
  - [Frontend](#frontend)
  - [Auth Service](#auth-service)
  - [Profile Service](#profile-service)
  - [Model Service](#model-service)
  - [Sharing Service](#sharing-service)
  - [Currency Converter Service](#currency-converter-service)
- [Environment Setup](#environment-setup)
  - [MongoDB Configuration](#mongodb-configuration)
  - [Email Configuration](#email-configuration)
  - [Currency Converter Setup](#currency-converter-setup)
- [Dependencies](#dependencies)
- [Running the Project](#running-the-project)
- [License](#license)

---

## Project Structure
This is a simplified and realistic structure you can create manually:

```plaintext
model-outfit-platform/          # Root project folder
|
|-- auth-service/               # User authentication
|   |-- models/                 # MongoDB models
|   |   |-- User.js
|   |-- routes/                 # Auth routes
|   |   |-- auth.js
|   |-- .env                    # MongoDB connection details
|   |-- server.js               # Server entry point
|
|-- profile-service/            # Profile management
|   |-- models/                 # MongoDB profile schema
|   |   |-- Profile.js
|   |-- routes/                 # Profile routes
|   |   |-- profileRoutes.js
|   |-- uploads/                # Upload directory for images
|   |-- .env                    # MongoDB connection details
|   |-- server.js
|
|-- model-service/              # Outfit model retrieval
|   |-- .env                    # MongoDB connection details
|   |-- server.js
|
|-- sharing-service/            # Email sharing functionality
|   |-- .env                    # Email credentials (EMAIL_USER, EMAIL_PASS)
|   |-- server.js
|
|-- currency-converter/         # Currency conversion service
|   |-- .env                    # Flask environment setup
|   |-- currency_converter.py   # Python currency script
|   |-- requirements.txt        # Python dependencies
|
|-- frontend/                   # React frontend
|   |-- src/
|   |   |-- components/         # React components
|   |   |   |-- Browse.js       # Browse outfits
|   |   |   |-- Home.js         # Home page
|   |   |   |-- Login.js        # Login page
|   |   |   |-- Register.js     # Register page
|   |-- public/                 # Static files
|   |   |-- index.html
|   |-- package.json            # Frontend dependencies
|   |-- README.md
|
|-- scripts/                    # Helper scripts
|   |-- start_all.bat           # Windows startup
|   |-- start_all.sh            # Linux startup
|
|-- README.md                   # Project documentation
```

---

## Services

### Frontend
The frontend is built with React and located in the `frontend` folder.

**Key Components:**
- **Login**: Handles user login.
- **Register**: Facilitates new user registration.
- **Home**: Main page for creating outfits.
- **Browse**: Allows users to browse outfits.

### Auth Service
Manages user authentication and is located in `auth-service`.

**Routes:**
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Log in a user.

### Profile Service
Handles user profiles and is located in `profile-service`.

**Routes:**
- `GET /api/profile`: Fetch user profile.
- `PUT /api/profile`: Update profile.
- `POST /api/upload`: Upload profile picture.

### Model Service
Provides outfit model data and is located in `model-service`.

**Routes:**
- `GET /outfit`: Retrieve all outfits.

### Sharing Service
Manages sharing outfits via email and is located in `sharing-service`.

**Routes:**
- `POST /send-outfit`: Share an outfit via email.

### Currency Converter Service
Python-based service located in `currency-converter`.

**Endpoints:**
- `POST /convert`: Convert prices between currencies.

---

## Environment Setup

### MongoDB Configuration
Create a `.env` file in the following services:
1. **auth-service**
2. **profile-service**
3. **model-service**

Add the MongoDB connection string:
```env
MONGO_URI=your_mongodb_connection_string
```

### Email Configuration
For the **sharing-service**, create a `.env` file:
```env
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
```
Use a valid email and password for sending emails.

### Currency Converter Setup
For the **currency-converter** service:
1. Create a `.env` file in `currency-converter` with required Flask configurations.
2. Install dependencies:
```bash
pip install -r requirements.txt
```
3. Run the service:
```bash
python currency_converter.py
```

---

## Dependencies
### Core Technologies
- **Node.js**: Server-side runtime.
- **Express**: Lightweight web framework.
- **React**: Frontend UI library.
- **MongoDB**: NoSQL database.
- **Python/Flask**: Currency conversion service.

### Additional Libraries
- **Mongoose**: MongoDB ODM.
- **Nodemailer**: Email functionality.
- **Multer**: File uploads.
- **Axios**: HTTP requests.

---

## Running the Project

To run the entire project:

### Windows
Run the `start_all.bat` script:
```bash
scripts\start_all.bat
```

### Linux/Mac
Run the `start_all.sh` script:
```bash
bash scripts/start_all.sh
```

### Manual Execution
Start each service individually:
```bash
# Backend services
cd auth-service && npm start
cd profile-service && npm start
cd model-service && npm start
cd sharing-service && npm start
cd currency-converter && python currency_converter.py

# Frontend
cd frontend && npm start
```