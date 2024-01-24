import { compareSync, genSaltSync, hashSync } from 'bcrypt'

/**
 * Hashes a password using bcrypt.
 * @param password - The password to be hashed.
 * @returns The hashed password.
 */
export const hashField = (password: string): string => {
  const salt = genSaltSync(10)
  return hashSync(password, salt)
}

/**
 * Verifies if a given field matches a hashed value.
 * @param field - The field to be verified.
 * @param hash - The hashed value to compare against.
 * @returns True if the field matches the hash, false otherwise.
 */
export const verifyHashedField = (field: string, hash: string): boolean => {
  return compareSync(field, hash)
}
