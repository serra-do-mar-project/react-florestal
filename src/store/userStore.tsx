import { create } from 'zustand'

export type UseStore = {
  nome: string | null;
  token: string | null;
  type: number | null;
  isLogged: boolean;
  login: (name: string, type: number, token: string) => void;
  logout: () => void;
}

export const useUserStore = create<UseStore>((set) => ({
  nome: null,
  token: null,
  type: null,
  isLogged: false,
  login: (name: string, type: number, token: string) => set(() => ({ name, type, token, isLogged: true })),
  logout: () => set(() => ({ name: null, type: null, token: null, isLogged: false })),
}))