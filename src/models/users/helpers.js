import { createModelError } from '../errors.js';

// Estados permitidos para las cuentas de usuario.
export const VALID_USER_STATUSES = ['activo', 'inactivo', 'suspendido', 'eliminado'];

// Valida el formato basico del correo.
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
};

// Limpia los datos del usuario antes de validarlos o guardarlos.
export const normalizeUserPayload = (userData) => {
    const normalizedData = {};

    if (userData.firstName !== undefined) {
        normalizedData.firstName = userData.firstName?.trim();
    }

    if (userData.lastName !== undefined) {
        normalizedData.lastName = userData.lastName?.trim();
    }

    if (userData.email !== undefined) {
        normalizedData.email = userData.email?.trim().toLowerCase();
    }

    if (userData.status !== undefined) {
        normalizedData.status = userData.status?.trim().toLowerCase();
    }

    return normalizedData;
};

// Reglas compartidas para crear o actualizar usuarios.
export const validateUserPayload = (userData, { partial = false } = {}) => {
    const normalizedData = normalizeUserPayload(userData);

    if (!partial) {
        if (!normalizedData.firstName || !normalizedData.lastName || !normalizedData.email) {
            throw createModelError('Faltan campos requeridos: firstName, lastName, email');
        }
    }

    if (normalizedData.firstName !== undefined && !normalizedData.firstName) {
        throw createModelError('El nombre es requerido');
    }

    if (normalizedData.lastName !== undefined && !normalizedData.lastName) {
        throw createModelError('El apellido es requerido');
    }

    if (normalizedData.email !== undefined) {
        if (!normalizedData.email) {
            throw createModelError('El email es requerido');
        }

        if (!validateEmail(normalizedData.email)) {
            throw createModelError('Formato de email inválido');
        }
    }

    if (normalizedData.status !== undefined && !VALID_USER_STATUSES.includes(normalizedData.status)) {
        throw createModelError('Estado inválido. Debe ser: activo, inactivo, suspendido o eliminado');
    }

    return normalizedData;
};
