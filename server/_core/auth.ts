import { Request, Response } from "express";
import * as bcrypt from "bcryptjs";
import { jwtVerify, jwtSign } from "jose";
import * as db from "../db";
import type { User } from "../../drizzle/schema";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key-change-in-production");
const COOKIE_NAME = "auth_token";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createJWT(userId: number): Promise<string> {
  const token = await jwtSign(
    { userId, iat: Math.floor(Date.now() / 1000) },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
  return token;
}

export async function verifyJWT(token: string): Promise<{ userId: number } | null> {
  try {
    const verified = await jwtVerify(token, JWT_SECRET);
    return { userId: verified.payload.userId as number };
  } catch (error) {
    return null;
  }
}

export async function authenticateRequest(req: Request): Promise<User | null> {
  try {
    const token = req.cookies[COOKIE_NAME];
    if (!token) return null;

    const verified = await verifyJWT(token);
    if (!verified) return null;

    const user = await db.getUserById(verified.userId);
    return user || null;
  } catch (error) {
    return null;
  }
}

export async function loginUser(username: string, password: string, res: Response): Promise<User | null> {
  const user = await db.getUserByUsername(username);
  if (!user) return null;

  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) return null;

  const token = await createJWT(user.id);
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return user;
}

export function logoutUser(res: Response): void {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}

export async function registerUser(username: string, email: string, password: string): Promise<User | null> {
  // Check if user already exists
  const existing = await db.getUserByUsername(username);
  if (existing) return null;

  const passwordHash = await hashPassword(password);
  const result = await db.createUser({
    username,
    email,
    passwordHash,
    role: "user",
  });

  if (!result) return null;

  // Fetch and return the created user
  return db.getUserByUsername(username);
}
