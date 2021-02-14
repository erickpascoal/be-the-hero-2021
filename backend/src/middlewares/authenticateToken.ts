import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth'
import AppError from "../shared/errors/AppError";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function authenticateToken(request: Request, response: Response, next: NextFunction): void {

  const token = request.headers.authorization;

  if (!token) {
    throw new AppError('Token não encontrado.', 401);
  }

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as ITokenPayload;

    request.ongId = +sub

    return next();
  } catch {
    throw new AppError('Token inválido', 401);
  }
}