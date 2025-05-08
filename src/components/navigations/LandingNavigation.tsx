"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { LoginLink, LogoutLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const LandingNavigation = () => {
  const { user, isLoading } = useKindeBrowserClient();
  return (
    <div className="shadow-md">
      <nav className="flex items-center justify-between p-4">
        <h2 className="text-xl font-bold">Habitura</h2>
        <div className="flex items-center gap-4">
          {isLoading ? (
            <>
              <Button disabled className="opacity-0">
                Loading
              </Button>
              <Button disabled className="opacity-0" variant="outline">
                Loading
              </Button>
            </>
          ) : user ? (
            <>
              <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button asChild variant="outline">
                <LogoutLink>Logout</LogoutLink>
              </Button>
            </>
          ) : (
            <>
              <Button asChild>
                <LoginLink>Login</LoginLink>
              </Button>
              <Button asChild variant="outline">
                <RegisterLink>Register</RegisterLink>
              </Button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};
