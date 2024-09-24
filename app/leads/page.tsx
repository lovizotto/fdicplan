'use client';
import React, { useState, useEffect } from 'react';
import { SearchInput } from '../components/form/SearchInput';
import AddLeadForm from './addLeadForm';

interface Lead {
  id?: number;  // Alterado para opcional
  name: string;
  email: string;
  phone: string;
  contact: string;
  lastHistory: string;
  status: string;
}

interface LeadsPageProps {
  params: Record<string, string>;
  searchParams: {
    name?: string;
    status?: string;
    contact?: string;
  };
}

export default function LeadsPage({ params, searchParams }: LeadsPageProps) {
  const name = searchParams.name || '';
  const status = searchParams.status || '';
  const contact = searchParams.contact || '';

  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(name);
  const [statusFilter, setStatusFilter] = useState<string>(status);
  const [contactFilter, setContactFilter] = useState<string>(contact);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const leadsPerPage = 10;
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [leadToEdit, setLeadToEdit] = useState<Lead | undefined>(undefined); // Alterado para undefined

  useEffect(() => {
    const fetchLeads = async () => {
      const response = await fetch('http://localhost:3000/api/routes/leads');
      const data = await response.json();
      setLeads(data);
    };

    fetchLeads();
  }, []);

  const filteredLeads = leads
    .filter(
      (lead) =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((lead) => (statusFilter ? lead.status === statusFilter : true))
    .filter((lead) => (contactFilter ? lead.contact === contactFilter : true));

  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Adicionar ou editar leads
  const handleAddLead = (newLead: Lead) => {
    if (leadToEdit) {
      setLeads(
        leads.map((lead) =>
          lead.id === leadToEdit?.id ? { ...leadToEdit, ...newLead } : lead // Use a verificação do opcional
        )
      );
    } else {
      setLeads([...leads, { ...newLead, id: leads.length + 1 }]);
    }
    setShowAddForm(false);
    setLeadToEdit(undefined); // Alterado para undefined
  };

  const handleEdit = (lead: Lead) => {
    setLeadToEdit(lead);
    setShowAddForm(true);
  };

  const handleDelete = (id: number) => {
    setLeads(leads.filter((lead) => lead.id !== id));
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setLeadToEdit(undefined); // Alterado para undefined
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-white">Lead List</h1>

      <div className="mb-4 flex items-center">
        <SearchInput
          defaultValue={name}
          searchTerm={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {showAddForm && (
        <AddLeadForm
          onAdd={handleAddLead}
          onCancel={handleCancel}
          leadToEdit={leadToEdit} // Agora leadToEdit é Lead | undefined
          onEditComplete={handleCancel}
        />
      )}

      <div className="flex space-x-4 mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border-gray-300 bg-white text-black rounded-md shadow-sm px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        >
          <option value="">All Status</option>
          <option value="New">New</option>
          <option value="In Progress">In Progress</option>
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
        <div className="flex-grow" />

        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600"
        >
          Add Lead
        </button>
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
            {currentLeads.map((lead) => (
              <tr key={lead.id} className="bg-gray-100">
                <td className="border px-4 py-2 text-black whitespace-nowrap">{lead.name}</td>
                <td className="border px-4 py-2 text-black">{lead.email}</td>
                <td className="border px-4 py-2 text-black">{lead.phone}</td>
                <td className="border px-4 py-2 text-black">{lead.contact}</td>
                <td className="border px-4 py-2 text-black">{lead.lastHistory}</td>
                <td className="border px-4 py-2 text-black">{lead.status}</td>
                <td className="border px-4 py-2 text-black">
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    onClick={() => handleEdit(lead)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(lead.id!)} // Usando '!' para indicar que id é definido
                  >
                    Delete
                  </button>
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
              currentPage === index + 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-black'
            }`}
          >
            {index + 1}
          </button>
        ))}   
      </div>
    </div>
  );
}
