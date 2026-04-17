"use client";

import Link from "next/link";

const NavbarActions = () => {
  return (
    <Link href="/login" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-hover">
      Login
    </Link>
  );
};

export default NavbarActions;
