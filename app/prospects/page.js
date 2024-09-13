"use client";
import { useState } from "react";

export default function ProspectList() {
  const [prospects] = useState([
    { id: 1, name: "Gustavo Tesin", email: "glovizotto@example.com", phone: "(18)98164-0961", contact: "Phone", lastHistory: "REUNIAO DE TARDE", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", phone: "987-654-3210", contact: "Email", lastHistory: "Sent Proposal", status: "Pending" }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [contactFilter, setContactFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const prospectsPerPage = 10;

  const filteredProspects = prospects
    .filter((prospect) =>
      prospect.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prospect.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((prospect) =>
      statusFilter ? prospect.status === statusFilter : true
    )
    .filter((prospect) =>
      contactFilter ? prospect.contact === contactFilter : true
    );

  const indexOfLastProspect = currentPage * prospectsPerPage;
  const indexOfFirstProspect = indexOfLastProspect - prospectsPerPage;
  const currentProspects = filteredProspects.slice(indexOfFirstProspect, indexOfLastProspect);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-white">Prospect List</h1>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, email, or status"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border-gray-300 bg-white text-black rounded-md shadow-sm py-2 px-3 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>
      
      <div className="flex space-x-4 mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border-gray-300 bg-white text-black rounded-md shadow-sm px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
        </select>
        
        <select
          value={contactFilter}
          onChange={(e) => setContactFilter(e.target.value)}
          className="border-gray-300 bg-white text-black rounded-md shadow-sm px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        >
          <option value="">All Contact Methods</option>
          <option value="Phone">Phone</option>
          <option value="Email">Email</option>
        </select>
      </div>
      
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="text-white bg-gray-700">
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
            {currentProspects.map((prospect) => (
              <tr key={prospect.id} className="bg-gray-100">
                <td className="border px-4 py-2 text-black whitespace-nowrap">{prospect.name}</td>
                <td className="border px-4 py-2 text-black">{prospect.email}</td>
                <td className="border px-4 py-2 text-black">{prospect.phone}</td>
                <td className="border px-4 py-2 text-black">{prospect.contact}</td>
                <td className="border px-4 py-2 text-black">{prospect.lastHistory}</td>
                <td className="border px-4 py-2 text-black">{prospect.status}</td>
                <td className="border px-4 py-2 text-black">
                  <button className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                  <button className="text-red-500 hover:text-red-700">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {currentProspects.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No prospects found.</p>
        )}
      </div>

      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(filteredProspects.length / prospectsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 border rounded ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
