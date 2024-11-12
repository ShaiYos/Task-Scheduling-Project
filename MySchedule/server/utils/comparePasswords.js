import bcrypt from "bcryptjs";

export const comparePasswords = async (passwordFormLogin, passwordFromDB) => {
    // Compare the plain text password with the hashed password from the database asynchronously
    return bcrypt.compare(passwordFormLogin, passwordFromDB);
};
