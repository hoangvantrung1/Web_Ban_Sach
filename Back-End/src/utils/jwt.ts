import jwt from "jsonwebtoken";

// Define a secret key (store securely in environment variables)
const SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key";

// Define the token verification function
export const verifyToken = (token: string): any => {
  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded; // Return decoded data (e.g., userId)
  } catch (error) {
    throw new Error("Token is invalid or expired");
  }
};
