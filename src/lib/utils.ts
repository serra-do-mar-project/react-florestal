import { type ClassValue, clsx } from "clsx";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { AutosDeInfracaoTable, ExemploDeCaso } from "../db/schema";
import { useUserStore } from "../store/userStore";
import db from "../db/connection";
import { inArray } from "drizzle-orm";

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
          senha: senha
        }),
      }
    );

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error);
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

export const EnviarRelatorio = async (token: string, formData: any, autos: any): Promise<{ success: boolean }> => {
  try {
    const response = await fetch(
      "https://nest-florestal-fork.onrender.com/autoInfracao/relatorio",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      console.log("Erro ao enviar relatório");
    }

    const responseData = await response.json();
    
    if (responseData.status === "success") {
      await db.delete(AutosDeInfracaoTable).where(inArray(AutosDeInfracaoTable.id, autos.map((item: any) => item.id)));
      return { success: true };
    }

    return { success: false };
  } catch (error: any) {
    console.log(error)
    throw new Error(error.message);
  }
}

export const CreateUser = async (
  token: string,
  userData: { nome: string; cpf: string; tipo: string; senha: string }
): Promise<{message: string, status: string}> => {
  try {
    const response = await fetch(
      "https://nest-florestal-fork.onrender.com/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      }
    );
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const GetUsers = async (
  token: string,
): Promise<{id: number; nome: string; tipo: string}[]> => {
  try {
    const response = await fetch(
      "https://nest-florestal-fork.onrender.com/users/",
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

export const ChangeOtherUserPassword = async (
  token: string,
  adminPassword: string,
  newPassword: string,
  userId: number
): Promise<{message: string, status: string}> => {
  try {
    const response = await fetch(
      "https://nest-florestal-fork.onrender.com/auth/resetAny",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: userId,
          senhaAdm: adminPassword,
          novaSenha: newPassword
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const DeleteUser = async (
  token: string,
  userId: number
): Promise<{message: string, status: string}> => {
  try {
    const response = await fetch(
      "https://nest-florestal-fork.onrender.com/auth/delete",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: userId }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const ChangeOwnPassword = async (
  token: string,
  oldPassword: string,
  newPassword: string,
  userId: number
): Promise<{message: string, status: string}> => {
  try {
    const response = await fetch(
      "https://nest-florestal-fork.onrender.com/auth/updatePassword",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: userId,
          senhaAntiga: oldPassword,
          novaSenha: newPassword,
          confirmaSenha: newPassword
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};