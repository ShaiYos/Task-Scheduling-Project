import bcrypt from "bcryptjs"

export const comparePasswords= (passwordFormLogin , passwordFromDB)=>{
return bcrypt.compareSync(passwordFormLogin , passwordFromDB)
}