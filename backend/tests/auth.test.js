import request from "supertest"
import app from "../src/index.js";
// const request = require("supertest");
import { jest } from "@jest/globals";

jest.unstable_mockModule("nodemailer", () => ({
  default: {
    createTransport: () => ({
      verify: (cb) => cb(null, true),
      sendMail: () => Promise.resolve(true),
    }),
  },
}));

describe("Auth API", () => {

  //  Register Success
  test("Register user successfully", async () => {
    const res = await request(app)
      .post("/auth/user-registerrequest")

      .send({
        name: "sufiya",
        email: "sufiyashaik181@gmail.com",
        phonenum: "8985986211"
       
      });
console.log(res.body);
    expect(res.statusCode).toBe(201);
  });
})
  //  Register Validation Failure
//   test("Register without email should fail", async () => {
//     const res = await request(app)
//       .post("/auth/register")
//       .send({
//         name: "Test User",
//         password: "123456"
//       });

//     expect(res.statusCode).toBe(400);
//   });

//   //  Login Success
//   test("Login user", async () => {
//     const res = await request(app)
//       .post("/auth/login")
//       .send({
//         email: "testuser@example.com",
//         password: "123456"
//       });

//     expect(res.statusCode).toBe(200);
//   });

// });