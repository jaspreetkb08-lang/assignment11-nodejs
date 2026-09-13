# Assignment 11: Teacher and Student Registration

Express.js and MongoDB registration API using Mongoose. Teacher and student data are stored in separate collections, and passwords are hashed with `bcryptjs` before saving.

## Setup

```bash
npm install
cp .env.example .env
npm start
```

Make sure MongoDB is running locally, or replace `MONGODB_URI` in `.env` with a MongoDB Atlas connection string.

## Endpoints

### Teacher registration

`POST http://localhost:3000/teacher/register`

```json
{
  "name": "Asha Singh",
  "email": "asha@example.com",
  "password": "teacher123",
  "subject": "Mathematics"
}
```

### Student registration

`POST http://localhost:3000/student/register`

```json
{
  "name": "Ravi Kumar",
  "email": "ravi@example.com",
  "password": "student123",
  "course": "Computer Science",
  "age": 20
}
```

Both endpoints return `201` on success and `400` for invalid data. Duplicate email addresses return `409`. Passwords are excluded from API responses but are stored as bcrypt hashes in MongoDB.
