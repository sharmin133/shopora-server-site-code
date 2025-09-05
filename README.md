Shopora Server
Setup

Clone the repository:

git clone <your-repo-url>
cd shopora-server


Install dependencies:

npm install


Create a .env file with:

MONGO_URI=<your-mongodb-uri>
DB_NAME=shopora
JWT_SECRET=<your-jwt-secret>
PORT=5000


Run locally:

node index.js


API Endpoints:

GET / → Welcome message

POST /api/auth/... → Auth routes

GET /products → Product list