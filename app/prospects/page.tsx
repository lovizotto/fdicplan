'use client';
import React, { useState, useEffect } from 'react';
import { SearchInput } from '../components/form/SearchInput';
import AddProspectForm from './addProspectForm';

interface Prospect {
  id?: number; // Torne o id opcional
  name: string;
  email: string;
  phone: string;
  contact: string;
  lastHistory: string;
  status: string;
}

interface ProspectsPageProps {
  params: Record<string, string>;
  searchParams: {
    name?: string;
    status?: string;
    contact?: string;
  };
}

export default function ProspectsPage({ params, searchParams }: ProspectsPageProps) {
  const name = searchParams.name || '';
  const status = searchParams.status || '';
  const contact = searchParams.contact || '';

  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(name);
  const [statusFilter, setStatusFilter] = useState<string>(status);
  const [contactFilter, setContactFilter] = useState<string>(contact);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const prospectsPerPage = 10;
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [prospectToEdit, setProspectToEdit] = useState<Prospect | undefined>(undefined); 

  useEffect(() => {
    const fetchProspects = async () => {
      const response = await fetch('http://localhost:3000/api/routes/prospects');
      const data = await response.json();
      setProspects(data);
    };

    fetchProspects();
  }, []);

  const filteredProspects = prospects
    .filter(
      (prospect) =>
        prospect.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prospect.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((prospect) => (statusFilter ? prospect.status === statusFilter : true))
    .filter((prospect) => (contactFilter ? prospect.contact === contactFilter : true));

  const indexOfLastProspect = currentPage * prospectsPerPage;
  const indexOfFirstProspect = indexOfLastProspect - prospectsPerPage;
  const currentProspects = filteredProspects.slice(indexOfFirstProspect, indexOfLastProspect);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleAddProspect = (newProspect: Prospect) => {
    if (prospectToEdit) {
      setProspects(prospects.map(prospect => (prospect.id === prospectToEdit?.id ? { ...prospectToEdit, ...newProspect } : prospect)));
    } else {
      setProspects([...prospects, { ...newProspect, id: prospects.length + 1 }]); // O id é opcional
    }
    setShowAddForm(false);
    setProspectToEdit(undefined); 
  };

  const handleEdit = (prospect: Prospect) => {
    setProspectToEdit(prospect);
    setShowAddForm(true);
  };

  const handleDelete = (id: number) => {
    setProspects(prospects.filter(prospect => prospect.id !== id));
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setProspectToEdit(undefined); 
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-white">Prospect List</h1>

      <div className="mb-4 flex items-center">
        <SearchInput
          defaultValue={name}
          searchTerm={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {showAddForm && (
        <AddProspectForm
          onAdd={handleAddProspect}
          onCancel={handleCancel}
          prospectToEdit={prospectToEdit}
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
        <div className="flex-grow" />

        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600"
        >
          Add Prospect
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
            {currentProspects.map((prospect) => (
              <tr key={prospect.id} className="bg-gray-100">
                <td className="border px-4 py-2 text-black whitespace-nowrap">{prospect.name}</td>
                <td className="border px-4 py-2 text-black">{prospect.email}</td>
                <td className="border px-4 py-2 text-black">{prospect.phone}</td>
                <td className="border px-4 py-2 text-black">{prospect.contact}</td>
                <td className="border px-4 py-2 text-black">{prospect.lastHistory}</td>
                <td className="border px-4 py-2 text-black">{prospect.status}</td>
                <td className="border px-4 py-2 text-black">
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    onClick={() => handleEdit(prospect)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(prospect.id!)}
                  >
                    Delete
                  </button>
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
