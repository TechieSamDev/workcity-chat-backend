import bcrypt from "bcryptjs";

export const comparePassword = (
  passwordToCompare: string,
  passwordHash: string
) => {
  return bcrypt.compare(passwordToCompare, passwordHash);
};
