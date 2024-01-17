"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import FilterTask from "@/components/FilterTask";

const links = [
  {
    name: "Todo App",
    href: "/",
  },
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
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {link.name}
          </Link>
          <Link 
            href="/new"
            className="text-sm sm:text-lg text-white hover:text-white p-2 rounded-md bg-slate-800 "
            >Crear</Link>
        </>
      ))}
    </div>
  );
};

export default Nav;
