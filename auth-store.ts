import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, AuthState } from "@/types/auth";

// Em uma aplicação real, você utilizaria uma API real e armazenaria os usuários em um banco de dados
// Este é apenas um exemplo para simulação

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // Simulando verificação de credenciais
        // Em uma aplicação real, você faria uma chamada para API
        const storedUsers = localStorage.getItem("diario-users");
        const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

        const user = users.find(u => u.email === email);

        if (user) {
          // Em um cenário real, você verificaria a senha com hash
          // Para simulação, vamos fingir que a senha está correta
          set({ user, isAuthenticated: true });
          return user;
        }

        return null;
      },

      register: async (name: string, email: string, password: string) => {
        // Simulando registro de usuário
        // Em uma aplicação real, você faria uma chamada para API
        const storedUsers = localStorage.getItem("diario-users");
        const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

        // Verificar se o e-mail já está em uso
        if (users.some(u => u.email === email)) {
          return null;
        }

        const newUser: User = {
          id: Math.random().toString(36).substring(2, 9),
          name,
          email,
          role: "professor", // Por padrão, todos são professores
        };

        // Salvar o novo usuário
        const updatedUsers = [...users, newUser];
        localStorage.setItem("diario-users", JSON.stringify(updatedUsers));

        // Atualizar o estado
        set({ user: newUser, isAuthenticated: true });

        return newUser;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
