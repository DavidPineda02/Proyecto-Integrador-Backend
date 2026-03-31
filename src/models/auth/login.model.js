import { createHmac, timingSafeEqual } from 'node:crypto';
import { findUserByEmailInDb, findUserByIdInDb } from '../database.js';
import { createModelError } from '../errors.js';

const AUTH_SECRET = 'task-manager-secret';
const TOKEN_DURATION_HOURS = 12;

const toBase64Url = (value) => Buffer.from(value).toString('base64url');

const signTokenValue = (value) => createHmac('sha256', AUTH_SECRET)
    .update(value)
    .digest('base64url');

const createTokenPayload = (user) => {
    const nowInSeconds = Math.floor(Date.now() / 1000);

    return {
        sub: user.id,
        role: user.role,
        exp: nowInSeconds + (TOKEN_DURATION_HOURS * 60 * 60)
    };
};

const createAuthToken = (user) => {
    const header = toBase64Url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = toBase64Url(JSON.stringify(createTokenPayload(user)));
    const signature = signTokenValue(`${header}.${payload}`);

    return `${header}.${payload}.${signature}`;
};

export const loginModel = async ({ email, password }) => {
    const normalizedEmail = email?.trim().toLowerCase();
    const normalizedPassword = password?.trim();

    if (!normalizedEmail || !normalizedPassword) {
        throw createModelError('Email y password son requeridos');
    }

    const user = await findUserByEmailInDb(normalizedEmail);

    if (!user || user.password !== normalizedPassword) {
        throw createModelError('Credenciales inválidas', 401);
    }

    if (user.status !== 'activo') {
        throw createModelError('El usuario no está activo', 403);
    }

    return {
        token: createAuthToken(user),
        user
    };
};

export const verifyTokenModel = async (token) => {
    if (!token) {
        throw createModelError('Token requerido', 401);
    }

    const [header, payload, signature] = token.split('.');

    if (!header || !payload || !signature) {
        throw createModelError('Token inválido', 401);
    }

    const expectedSignature = signTokenValue(`${header}.${payload}`);
    const signatureBuffer = Buffer.from(signature);
    const expectedSignatureBuffer = Buffer.from(expectedSignature);

    if (signatureBuffer.length !== expectedSignatureBuffer.length) {
        throw createModelError('Token inválido', 401);
    }

    if (!timingSafeEqual(
        signatureBuffer,
        expectedSignatureBuffer
    )) {
        throw createModelError('Token inválido', 401);
    }

    let parsedPayload;

    try {
        parsedPayload = JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8'));
    } catch (error) {
        throw createModelError('Token inválido', 401);
    }

    const currentTime = Math.floor(Date.now() / 1000);

    if (!parsedPayload.sub || !parsedPayload.exp || parsedPayload.exp < currentTime) {
        throw createModelError('Token expirado o inválido', 401);
    }

    const user = await findUserByIdInDb(parsedPayload.sub);

    if (!user) {
        throw createModelError('Usuario no encontrado para el token', 401);
    }

    if (user.status !== 'activo') {
        throw createModelError('El usuario no está activo', 403);
    }

    return user;
};
