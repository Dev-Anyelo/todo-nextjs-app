import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex h-[calc(100vh-7rem)] justify-center items-center flex-col gap-4">
      <h1 className="text-2xl sm:text-4xl font-bold">Not Found</h1>
      <Link href="/">
        <p className="text-gray-100 hover:text-gray-300 text-xl text-center transition hover:underline">
          Regresar
        </p>
      </Link>
    </div>
  );
};

export default NotFound;
