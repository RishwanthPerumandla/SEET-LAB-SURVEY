const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server");

require("dotenv").config();

let token; // Variable to hold the token

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  // Create and log in a user with admin privileges if necessary
  await request(app)
    .post('/api/auth/register')
    .send({
      email: "admin@example.com",
      password: "123456",
      name: "Admin User",
      role: "admin"  // Ensure this role has the necessary permissions
    });

  const loginRes = await request(app)
    .post('/api/auth/login')
    .send({
      email: "admin@example.com",
      password: "123456"
    });

  token = loginRes.body.token; // Store token for later use
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("User API", () => {
  // Test to retrieve all users
  it("should retrieve all users", async () => {
    const response = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0); // Check if there is at least one user
  });

  // Test to retrieve a single user by ID
  it("should retrieve a user by ID", async () => {
    const userId = '66356077625cf01c135e11e8'; // Ensure this ID exists in your test DB
    const response = await request(app)
      .get(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('_id', userId);
  });
});
