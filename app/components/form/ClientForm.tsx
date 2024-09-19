// src/components/ClientForm.tsx
import React, { useState } from 'react';

interface Client {
  name: string;
  email: string;
  phone: string;
  contact: string;
  lastHistory: string;
  status: string;
}

interface ClientFormProps {
  onSubmit: (client: Client) => void;
}

export default function ClientForm({ onSubmit }: ClientFormProps) {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [lastHistory, setLastHistory] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, phone, contact, lastHistory, status });
    setName('');
    setEmail('');
    setPhone('');
    setContact('');
    setLastHistory('');
    setStatus('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded bg-white">
      <h2 className="text-xl font-bold mb-4">Add New Client</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-gray-300 border rounded-md px-3 py-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-gray-300 border rounded-md px-3 py-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Phone:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border-gray-300 border rounded-md px-3 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Contact:</label>
        <select
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="border-gray-300 border rounded-md px-3 py-2 w-full"
          required
        >
          <option value="">Select Contact Method</option>
          <option value="Phone">Phone</option>
          <option value="Email">Email</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Last History:</label>
        <input
          type="text"
          value={lastHistory}
          onChange={(e) => setLastHistory(e.target.value)}
          className="border-gray-300 border rounded-md px-3 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border-gray-300 border rounded-md px-3 py-2 w-full"
          required
        >
          <option value="">Select Status</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Client
      </button>
    </form>
  );
}
