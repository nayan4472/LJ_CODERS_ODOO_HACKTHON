# 🔐 FleetFlow Login & Auth Testing Guide

This guide walks you through the process of testing the Authentication flow in FleetFlow.

---

## 🚦 Step 0: Start the Services
Ensure you have the following running in separate terminals:
1.  **MongoDB**: `Local instance`
2.  **API Gateway**: `cd api-gateway && npm start` (Port 5000)
3.  **Auth Service**: `cd backend-services/auth-service && npm start` (Port 5001)
4.  **Frontend**: `cd frontend && npm run dev` (Port 5173)

---

## 📝 Step 1: Register a Test User
Since the UI currently focuses on Login, you must register a test user first using **Postman** or **cURL**.

### Use this cURL command (via Gateway):
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
-H "Content-Type: application/json" \
-d '{
  "name": "Test Admin",
  "email": "test@example.com",
  "password": "password123",
  "role": "Manager",
  "companyId": "FLEET_001"
}'
```


---

## 🔑 Step 2: Login via Browser
1.  Open your browser to: `http://localhost:5173/login`
2.  Enter the email: `test@example.com`
3.  Enter the password: `password123`
4.  Click **Sign In**.
5.  **Success**: You should be redirected to the `/dashboard`.

---

## 🔄 Step 3: Test Forgot Password (OTP Flow)
1.  Go back to the Login page.
2.  Click **"Forgot your password?"**.
3.  Enter `test@example.com` and click **Send OTP**.
4.  **Check Terminal**: Since we are in development, the OTP is printed in the **Auth Service Terminal**.
    > Look for: `Mock Email Sent to test@example.com with OTP: XXXXXX`
5.  Enter that **6-digit code** in the browser.
6.  Set a **new password** (e.g., `newpass123`) and save.
7.  Try logging in with the **new password**.

---

## 🛠️ Debugging Tips
- **User Not Found**: Ensure you ran the `cURL` registration command successfully.
- **Connection Refused**: Double-check that both the API Gateway and Auth Service are running.
- **MongoDB Error**: Ensure `mongod` is running on your machine.

---

**Happy Testing! 🚀**
