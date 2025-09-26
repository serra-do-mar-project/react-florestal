import { create } from 'zustand'

export type UseStore = {
  id: number | null;
  nome: string | null;
  token: string | null;
  tipo: string | null;
  isLogged: boolean;
  login: (id: number, nome: string, tipo: string, token: string) => void;
  logout: () => void;
}

export const useUserStore = create<UseStore>((set) => ({
  id: null,
  nome: null,
  token: null,
  tipo: null,
  isLogged: false,
  login: (id: number, nome: string, tipo: string, token: string) => set(() => ({ id, nome, tipo, token, isLogged: true })),
  logout: () => set(() => ({ id: null, nome: null, tipo: null, token: null, isLogged: false })),
}))