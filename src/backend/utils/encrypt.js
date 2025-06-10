import { hash, compare } from 'bcrypt'

/**
 * Función para encriptar un texto
 * 
 * @param {string} text - texto a encriptar 
 * @returns hashedstring
 */
export default function encrypt(text) {
    return hash(text, 10)
}

/**
 * Función para comparar un texto con una contraseña encriptada
 * 
 * @param {string} text - texto a comparar
 * @param {string} hashedstring - texto encriptado
 * @returns boolean
 */
export default function compareEncrypt(text, hashedstring) {
    return compare(text, hashedstring)
}