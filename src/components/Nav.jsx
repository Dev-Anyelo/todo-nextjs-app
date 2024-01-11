import Link from "next/link";

const Nav = () => {
  return (
    <div className="flex justify-between items-center mb-8 sm:mb-8 border-b border-b-slate-800 py-5 font-Onest sticky top-0 z-10 bg-gray-950">
      <Link href="/">
        <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-center text-gray-100">
          Todo App
        </h1>
      </Link>
      <Link href="/new">
        <button className="rounded sm:p-3 text-green-500 sm:text-white sm:hover:text-white hover:text-green-400 text-sm sm:bg-green-700 sm:hover:bg-green-800">
          Crear
        </button>
      </Link>
    </div>
  );
};

export default Nav;
