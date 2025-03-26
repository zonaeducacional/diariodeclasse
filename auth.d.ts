export interface User {
  id: string;
  name: string;
  email: string;
  role: "professor" | "admin";
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  register: (name: string, email: string, password: string) => Promise<User | null>;
  logout: () => void;
}
