import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

export function createSession(userId: string) {
  return {
    userId,
    createdAt: Date.now()
  };
}

export function setSessionCookie(session: any) {
  cookies().set("session", JSON.stringify(session), {
    httpOnly: true,
    secure: true,
    path: "/"
  });
}

export function clearSessionCookie() {
  cookies().delete("session");
}

export async function deleteSession() {
  clearSessionCookie();
}

export async function getCurrentUser() {
  const session = cookies().get("session");
  if (!session) return null;
  return JSON.parse(session.value);
}