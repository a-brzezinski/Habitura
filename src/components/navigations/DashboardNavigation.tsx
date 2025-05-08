import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { House, ListTodo, LogOut, Notebook, Repeat } from "lucide-react";
import Link from "next/link";

import { CustomTooltip } from "@/components/shared/CustomTooltip";

export const DashboardNavigation = () => {
  return (
    <nav className="sticky top-0 z-50 flex w-full items-center justify-between bg-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between gap-4">
      <CustomTooltip content="Dashboard">
        <Link href="/dashboard" className="text-xl font-bold">
        <House />
        </Link>
      </CustomTooltip>
      <CustomTooltip content="Notes">
        <Link href="/dashboard/notes">
        <Notebook />
        </Link>
      </CustomTooltip>
      <CustomTooltip content="Todos">
        <Link href="/dashboard/todos">
        <ListTodo />
        </Link>
      </CustomTooltip>
      <CustomTooltip content="Habits">
        <Link href="/dashboard/habits">
        <Repeat />
        </Link>
      </CustomTooltip>
      <CustomTooltip content="Logout">
        <LogoutLink>
        <LogOut className="text-red-400" />
        </LogoutLink>
      </CustomTooltip>
      </div>
    </nav>
  );
};
