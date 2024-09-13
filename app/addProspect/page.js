"use client"; 

import { useState } from "react";
import { useRouter } from "next/navigation"; 

export default function AddProspect() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    // Adicione a lógica de submissão, como enviar dados para uma API
    console.log("Prospect added:", { name, email });
    // Redirecionar para a lista de prospects
    router.push("/prospects");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Add Prospect</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold text-black mb-2">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Add
        </button>
      </form>
    </div>
  );
}

