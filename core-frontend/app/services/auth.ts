const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function signIn(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/auth/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Authentication failed");
  }

  return res.json();
}

export async function signUp(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/auth/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Registration failed");
  }

  return res.json();
}
