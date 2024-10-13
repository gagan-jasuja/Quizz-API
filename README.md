
# Quiz API

This project is a RESTful API for managing and taking online multiple-choice quizzes. It includes user authentication, quiz creation, quiz retrieval, and quiz-taking functionality. The project uses Node.js, Express.js, MongoDB Atlas, and JWT-based authentication.

## Features

- **User Authentication**: Users can register and log in, with JWT used for authentication.
- **Quiz Management**: Admins or authorized users can create quizzes with multiple-choice questions.
- **Quiz Retrieval**: Users can view all available quizzes and fetch detailed quiz information.
- **Quiz Participation**: Users can take quizzes, submit answers, and get their scores.

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Web framework for building APIs.
- **MongoDB Atlas**: Cloud-based NoSQL database for storing quiz data.
- **Mongoose**: ODM library to interact with MongoDB.
- **JWT (JSON Web Tokens)**: Used for user authentication and route protection.
- **Postman**: API testing tool.

---

## Getting Started

Follow the instructions below to set up and run this project locally.

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- [Postman](https://www.postman.com/) for API testing

### Installation

1. Clone this repository:

```bash
git clone <repository-url>
```

2. Navigate into the project directory:

```bash
cd Quiz-API
```

3. Install the required dependencies:

```bash
npm install
```

4. Set up environment variables by creating a `.env` file in the root of your project with the following keys:

```
PORT=5000
MONGO_URI=mongodb+srv://<your_username>:<your_password>@<your_cluster>.mongodb.net/<your_database>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
```

Replace `<your_username>`, `<your_password>`, `<your_cluster>`, and `<your_database>` with your MongoDB Atlas credentials and database name.

### Running the Server

1. Start the server:

```bash
npm start
```

The server will start on `http://localhost:5000` (or the port specified in your `.env` file).

---

## API Endpoints

### User Authentication

#### 1. Register a new user
- **Method**: `POST`
- **URL**: `/api/auth/register`
- **Body** (JSON):
  ```json
  {
    "username": "exampleuser",
    "password": "examplepassword"
  }
  ```

#### 2. Login
- **Method**: `POST`
- **URL**: `/api/auth/login`
- **Body** (JSON):
  ```json
  {
    "username": "exampleuser",
    "password": "examplepassword"
  }
  ```

The login response will return a JWT token, which needs to be passed in the Authorization header for protected routes.

---

### Quiz Management

#### 1. Create a new quiz (Protected Route)
- **Method**: `POST`
- **URL**: `/api/quizzes/create`
- **Headers**: `Authorization: Bearer <your_jwt_token>`
- **Body** (JSON):
  ```json
  {
    "title": "JavaScript Quiz",
    "description": "Test your knowledge of JavaScript",
    "questions": [
      {
        "questionText": "What is a closure?",
        "options": ["A function inside another function", "A variable", "A loop", "None of the above"],
        "correctOptionIndex": 0
      },
      {
        "questionText": "Which of the following is a JavaScript framework?",
        "options": ["React", "Laravel", "Django", "Flask"],
        "correctOptionIndex": 0
      }
    ]
  }
  ```

#### 2. Get all quizzes
- **Method**: `GET`
- **URL**: `/api/quizzes`

#### 3. Get quiz details by ID
- **Method**: `GET`
- **URL**: `/api/quizzes/:id`

#### 4. Take a quiz (Protected Route)
- **Method**: `POST`
- **URL**: `/api/quizzes/:id/take`
- **Headers**: `Authorization: Bearer <your_jwt_token>`
- **Body** (JSON):
  ```json
  {
    "answers": [0, 1]
  }
  ```

---

## Testing

You can use [Postman](https://www.postman.com/) to test the API. Here are the steps to test the API:

1. Start the server by running `npm start`.
2. In Postman, create requests for the endpoints provided above.
3. For protected routes, use the JWT token from the login endpoint and set it in the Authorization header:  
   `Authorization: Bearer <your_jwt_token>`

---

## MongoDB Atlas Setup

To use MongoDB Atlas, follow these steps:

1. Sign up for an account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new cluster and a new database.
3. Create a new user with access to the database.
4. Add your IP address to the whitelist under the **Network Access** section.
5. Get the connection string (URI) from the **Connect** button in your MongoDB Atlas dashboard.
6. Update your `.env` file with this URI.

---

## Error Handling

If you encounter errors like:

- **Bad authentication**: Ensure that your MongoDB Atlas username and password are correct.
- **IP not whitelisted**: Go to **Network Access** in MongoDB Atlas and whitelist your current IP address.
- **Invalid JWT**: Ensure you are passing the correct token in the Authorization header for protected routes.

---

## Future Improvements

- Add user roles (admin, user) for more fine-grained control over who can create quizzes.
- Add pagination for the quiz listing.
- Improve the quiz results to show detailed feedback on each question.

