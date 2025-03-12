# Library Challenge (FastAPI + Next.js)

This is a full-stack application with a **FastAPI backend** and a **Next.js frontend**. The application allows users to manage a collection of books, including creating, editing, and viewing book details. The backend is built with **FastAPI** and uses **PostgreSQL** as the database, while the frontend is built with **Next.js** and uses **React** for the user interface.

---

## **Table of Contents**
1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Setup and Installation](#setup-and-installation)
   - [Clone the Repository](#clone-the-repository)
   - [Backend Setup](#backend-setup)
   - [Frontend Setup](#frontend-setup)
   - [Run with Docker](#run-with-docker)
4. [Running the Application](#running-the-application)
   - [Backend](#backend)
   - [Frontend](#frontend)

---

## **Features**
- **Backend (FastAPI)**:
  - RESTful API for managing books.
  - PostgreSQL database for data storage.
  - Automatic API documentation with Swagger UI.
- **Frontend (Next.js)**:
  - Responsive and interactive user interface.
  - Pages for viewing, creating, and editing books.
  - Integration with the FastAPI backend.

---

## **Prerequisites**
Before setting up the application, ensure you have the following installed on your machine:

- **Docker** and **Docker Compose** (for running the application in containers).
- **Node.js** (v16 or higher) and **npm** (for the frontend).
- **Python** (v3.9 or higher) and **pip** (for the backend).

---

## **Setup and Installation**

### **Clone the Repository**
1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/einasmadi/library-challenge.git
   cd library-challenge
   ```

---

### **Backend Setup**
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate
   ```
3. Install the required Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up environment variables:
   - Create a `.env` file in the `backend` directory:
     ```bash
     DATABASE_URL=postgresql://admin:admin@postgres:5432/library
     ```
   - Replace the values with your PostgreSQL credentials.

---

### **Frontend Setup**
1. Navigate to the `frontend` directory:
   ```bash
   cd ../frontend
   ```
2. Install the required Node.js dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env.local` file in the `frontend` directory:
     ```bash
     NEXT_PUBLIC_API_URL=http://localhost:8000
     ```

---

### **Run with Docker**
1. Ensure Docker and Docker Compose are installed and running.
2. From the root directory of the project, run:
   ```bash
   docker-compose up --build
   ```
   This will start the following services:
   - **PostgreSQL database** (accessible at `localhost:5432`).
   - **FastAPI backend** (accessible at `localhost:8000`).
   - **Next.js frontend** (accessible at `localhost:3000`).

---

## **Running the Application**

### **Backend**
- The FastAPI backend will start automatically with Docker Compose.
- Access the API documentation at:
  - **Swagger UI**: `http://localhost:8000/docs`
  - **ReDoc**: `http://localhost:8000/redoc`

---

### **Frontend**
- The Next.js frontend will start automatically with Docker Compose.
- Access the application in your browser at:
  - `http://localhost:3000`

---

## **API Documentation**
The FastAPI backend provides automatic API documentation:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`
