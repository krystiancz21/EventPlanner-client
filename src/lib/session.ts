import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
}

export async function deleteSession() {
  cookies().delete("session");
}

type SessionPayload = {
  userId: string;
  expiresAt: Date;
  // roles?: string[];
  jwtToken: string;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}
//------


// Zmieniamy createSession, aby przyjmowała token JWT
export async function createSession(jwtToken: string) {
  // Możesz zdekodować JWT tutaj, aby wyciągnąć userId i expiresAt
  // lub przekazać to do funkcji encrypt.
  // Ważne: Jeśli Twoje JWT ma expiresIn, użyj tego do expiresAt w cookies.
  // Na potrzeby prostoty, użyjemy stałego czasu wygaśnięcia ciasteczka.

  let decodedPayload: any = {};
  try {
    const { payload } = await jwtVerify(jwtToken, encodedKey, { // Użyj klucza, jeśli weryfikujesz token
      algorithms: ["HS256"], // Dopasuj do algorytmu z Twojego backendu ASP.NET
    });
    decodedPayload = payload;
  } catch (error) {
    console.error("Failed to decode JWT from ASP.NET:", error);
    // Obsłuż błąd, np. rzuć wyjątek
    throw new Error("Invalid JWT token from backend.");
  }

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Możesz użyć expiresAt z tokenu JWT
  const sessionData: SessionPayload = {
    userId: decodedPayload.sub || decodedPayload.userId, // Zakładamy 'sub' lub 'userId' w payloadzie JWT
    expiresAt: expiresAt,
    roles: decodedPayload.roles, // Jeśli token zawiera role
    jwtToken: jwtToken, // Przechowujemy cały token JWT
  };

  const session = await encrypt(sessionData);

  cookies().set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Upewnij się, że jest secure na produkcji
    expires: expiresAt,
    sameSite: "Lax", // Ważne dla bezpieczeństwa
  });
}


export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" }) // Tutaj algorytm szyfrowania SESJI Next.js
    .setIssuedAt()
    .setExpirationTime("7d") // Czas wygaśnięcia sesji Next.js
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as SessionPayload; // Rzutowanie na SessionPayload
  } catch (error) {
    console.log("Failed to verify session (Next.js cookie):", error);
    return null; // Zwróć null w przypadku błędu weryfikacji
  }
}