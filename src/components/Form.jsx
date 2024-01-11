import Link from "next/link";

const Form = ({ onSubmit, title, setTitle, description, setDescription }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 items-center justify-center h-fit w-full sm:w-96 font-Onest"
    >
      <input
        required
        value={title}
        id="title"
        type="text"
        className="rounded outline-none p-2 w-full bg-slate-800 border border-slate-700"
        placeholder="Título"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        required
        rows="10"
        value={description}
        id="description"
        className="rounded outline-none p-2 w-full bg-slate-800 border border-slate-700"
        placeholder="Descripción"
        onChange={(e) => setDescription(e.target.value)}
      />

      <button className="bg-blue-800 hover:bg-blue-900 text-white p-2 sm:p-3 rounded w-full text-base sm:text-lg">
        Crear
      </button>

      <Link href="/">
        <button className="text-gray-500 text-sm hover:text-gray-400">
          Regresar
        </button>
      </Link>
    </form>
  );
};

export default Form;
