import { type ClassValue, clsx } from "clsx";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type LoginOkResponse = {
  status: string;
  user?: {
    id: number;
    nome: string;
    tipo: string;
  } | null;
  token?: string | null;
  message?: string | null;
};

export const login = async (
  cpf: string,
  senha: string
): Promise<LoginOkResponse> => {
  try {
    console.log("Attempting login...");
    const response = await fetch(
      "https://nest-florestal-fork.onrender.com/auth/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cpf: cpf,
          senha: senha,
        }),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Login error:", error);
    return { status: "error", message: "Login failed" };
  }
};
