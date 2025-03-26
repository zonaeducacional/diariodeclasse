"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import useAuthStore from "@/lib/auth-store";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  // Se não estiver em páginas de autenticação, não mostrar o header
  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center">
            <span className="hidden font-bold sm:inline-block">Diário de Classe Digital</span>
            <span className="inline-block font-bold sm:hidden">Diário</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between">
          <nav className="flex items-center space-x-2">
            {isAuthenticated && (
              <>
                <Link href="/dashboard">
                  <Button variant={pathname === "/dashboard" ? "default" : "ghost"}>
                    Dashboard
                  </Button>
                </Link>
                <Link href="/diary">
                  <Button variant={pathname.startsWith("/diary") ? "default" : "ghost"}>
                    Diário de Classe
                  </Button>
                </Link>
              </>
            )}
          </nav>
          <div className="flex items-center space-x-2">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 rounded-full">
                    <Avatar>
                      <AvatarFallback>
                        {user?.name?.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="font-medium">{user?.name}</DropdownMenuItem>
                  <DropdownMenuItem className="text-muted-foreground">{user?.email}</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>Sair</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Entrar</Button>
                </Link>
                <Link href="/register">
                  <Button>Cadastrar</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
