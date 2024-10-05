import bcrypt from "bcryptjs"

export const comparePasswords= (passwordFormLogin , passwordFromDB)=>{
    // Compare the plain text password with the hashed password from the database
    return bcrypt.compareSync(passwordFormLogin , passwordFromDB)
}