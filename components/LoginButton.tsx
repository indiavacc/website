"use client";
import { signOut, useSession } from "next-auth/react";
import NavDropdown from "./navbar/NavDropdown";
import Link from "next/link";

export default function LoginButton() {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <>
          <NavDropdown
            title={session.user?.name || "User"}
            items={[
              // TODO
              { label: "Profile", href: "/" },
              {
                label: "Logout",
                href: "#",
                onClick: () => signOut({ callbackUrl: "/" }),
              },
            ]}
          />
        </>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </>
  );
}
