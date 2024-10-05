
import bcrypt from "bcryptjs"

// Function to hash a password using bcrypt
export const hashPassword = async (password)=>{
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  
}   