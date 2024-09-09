"use client";
import { useState } from "react";

export default function LeadList() {
  const [leads] = useState([
    { id: 1, name: "Carlos Silva", email: "carlos.silva@example.com", phone: "(11)91234-5678", contact: "Phone", lastHistory: "Contacted via phone", status: "New" },
    { id: 2, name: "Maria Souza", email: "maria.souza@example.com", phone: "(21)98765-4321", contact: "Email", lastHistory: "Sent welcome email", status: "In Progress" }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [contactFilter, setContactFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 10;

  // Função para filtrar leads
  const filteredLeads = leads
    .filter((lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((lead) =>
      statusFilter ? lead.status === statusFilter : true
    )
    .filter((lead) =>
      contactFilter ? lead.contact === contactFilter : true
    );

  // Paginação
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);

  // Função para mudar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-black">Lead List</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded w-full py-2 px-3 text-black"
        />
      </div>
      <div className="flex space-x-4 mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded px-4 py-2 text-black"
        >
          <option value="">All Status</option>
          <option value="New">New</option>
          <option value="In Progress">In Progress</option>
        </select>
        <select
          value={contactFilter}
          onChange={(e) => setContactFilter(e.target.value)}
          className="border rounded px-4 py-2 text-black"
        >
          <option value="">All Contact Methods</option>
          <option value="Phone">Phone</option>
          <option value="Email">Email</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="text-black">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Contact</th>
              <th className="px-4 py-2">Last History</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentLeads.map((lead) => (
              <tr key={lead.id} className="bg-gray-100">
                <td className="border px-4 py-2 text-black">{lead.name}</td>
                <td className="border px-4 py-2 text-black">{lead.email}</td>
                <td className="border px-4 py-2 text-black">{lead.phone}</td>
                <td className="border px-4 py-2 text-black">{lead.contact}</td>
                <td className="border px-4 py-2 text-black">{lead.lastHistory}</td>
                <td className="border px-4 py-2 text-black">{lead.status}</td>
                <td className="border px-4 py-2 text-black">
                  <button className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                  <button className="text-red-500 hover:text-red-700">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {currentLeads.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No leads found.</p>
        )}
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(filteredLeads.length / leadsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 border rounded ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}