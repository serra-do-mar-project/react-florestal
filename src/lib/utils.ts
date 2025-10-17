import { type ClassValue, clsx } from "clsx";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { ExemploDeCaso } from "../db/schema";
import { useUserStore } from "../store/userStore";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type LoginOkResponse = {
  status: string;
  user: {
    id: number;
    nome: string;
    tipo: string;
  };
  token: string;
};

export const login = async (
  cpf: string,
  senha: string
): Promise<LoginOkResponse> => {
  try {
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
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const loadExemploDeCaso = async (
  token: string
): Promise<ExemploDeCaso[]> => {
  try {
    const response = await fetch(
      "https://nest-florestal-fork.onrender.com/autoInfracao/exemploCaso",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
