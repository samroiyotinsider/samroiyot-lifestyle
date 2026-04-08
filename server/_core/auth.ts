import * as bcrypt from "bcryptjs";
import { jwtVerify, SignJWT } from "jose";
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
  const token = await new SignJWT({ userId, iat: Math.floor(Date.now() / 1000) })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
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

export async function loginUser(username: string, password: string, res: any): Promise<User | null> {
  const user = await db.getUserByUsername(username);
  if (!user) return null;

  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) return null;

  const token = await createJWT(user.id);
  res.setHeader("Set-Cookie", `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=604800`);
  
  return user;
}

export async function registerUser(username: string, email: string, password: string): Promise<User | null> {
  const existing = await db.getUserByUsername(username);
  if (existing) return null;

  const passwordHash = await hashPassword(password);
  const result = await db.createUser({
    username,
    email,
    passwordHash,
    role: "user",
  });

  return db.getUserByUsername(username);
}

export function logoutUser(res: any): void {
  res.setHeader("Set-Cookie", `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`);
}
