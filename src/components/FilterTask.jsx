"use client";

import { useState } from "react";


const FilterTask = ({ onFilterChange }) => {
  const [filter, setFilter] = useState("all");

  const filteredTasks = (e) => {
    const value = e.target.value;
    setFilter(value);
    onFilterChange(value); 
  };

  return (
    <select
      name="filter"
      id="filter"
      onChange={filteredTasks}
      className="w-fit mb-5 bg-slate-900 rounded-md p-2 sm:p-3 hover:cursor-pointer"
    >
      <option value="all" id="all" className="hover:bg-slate-900">
        Todas
      </option>
      <option value="pending" id="pending" className="hover:bg-slate-900">
        Pendientes
      </option>
      <option value="completed" id="completed" className="hover:bg-slate-900">
        Completadas
      </option>
    </select>
  );
};

export default FilterTask;
