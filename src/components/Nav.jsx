"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import FilterTask from "@/components/FilterTask";

const links = [
  {
    name: "Todo App",
    href: "/",
  },

  {
    name: "Crear",
    href: "/new",
  }
];

const Nav = () => {
  const pathname = usePathname();

  return (
    <div className="flex justify-between items-center mb-8 sm:mb-8 border-b border-b-slate-800 py-5 font-Onest sticky top-0 z-10 bg-gray-950">
      {links.map((link) => (
        <>
          <Link
            href={link.href}
            key={link.name}

            className={`text-sm sm:text-lg ${
              pathname === link.href
                ? "text-white font-bold"
                : "text-gray-300 hover:text-white"
            }`}
          >
            {link.name}
          </Link>
        </>
      ))}
    </div>
  );
};

export default Nav;
