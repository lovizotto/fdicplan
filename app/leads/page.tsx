'use client';
import React, { useState, useEffect } from 'react';
import { SearchInput } from '../components/form/SearchInput';
import AddLeadForm from './addLeadForm';

interface Lead {
  id?: number;  
  cityName: string;
  companyName: string;
  phone: string;
  eventName?: string;
  contactPerson?: string;
  email?: string;
  nextDate?: Date | string;  // Change to allow string format for date
  observations?: string;
  createdAt?: Date | string; // Change to allow string format for date
}

interface LeadsPageProps {
  params: Record<string, string>;
  searchParams: {
    cityName?: string;
    companyName?: string;
    nextDate?: string; // Formato de data em string
  };
}

export default function LeadsPage({ params, searchParams }: LeadsPageProps) {
  const cityName = searchParams.cityName || '';
  const companyName = searchParams.companyName || '';
  const nextDate = searchParams.nextDate || '';

  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [cityFilter, setCityFilter] = useState<string>(cityName);
  const [companyFilter, setCompanyFilter] = useState<string>(companyName);
  const [nextDateFilter, setNextDateFilter] = useState<string>(nextDate);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const leadsPerPage = 10;
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [leadToEdit, setLeadToEdit] = useState<Lead | undefined>(undefined); 

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/routes/leads');
        if (!response.ok) throw new Error('Falha ao buscar leads');
        
        const data: Lead[] = await response.json();
        console.log('Leads:', data);
        setLeads(data);
      } catch (error) {
        console.error('Error fetching leads:', error);
        setLeads([]);
      }
    };

    fetchLeads();
  }, []);

  const filteredLeads = leads
    .filter((lead) => 
      lead.cityName.toLowerCase().includes(cityFilter.toLowerCase()) ||
      lead.companyName.toLowerCase().includes(companyFilter.toLowerCase())
    )
    .filter((lead) => 
      nextDateFilter ? new Date(lead.nextDate!).toLocaleDateString() === new Date(nextDateFilter).toLocaleDateString() : true
    );

  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleAddLead = (newLead: Lead) => {
    if (!newLead.companyName) {
      alert('Company Name is required');
      return;
    }

    if (leadToEdit) {
      setLeads(leads.map((lead) =>
        lead.id === leadToEdit?.id ? { ...leadToEdit, ...newLead } : lead 
      ));
    } else {
      setLeads([...leads, { ...newLead, id: leads.length + 1 }]);
    }
    
    setShowAddForm(false);
    setLeadToEdit(undefined); 
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
    setLeadToEdit(undefined); 
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-white">Lead List</h1>

      <div className="mb-4 flex items-center">
        <SearchInput
          searchTerm={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {showAddForm && (
        <AddLeadForm
          onAdd={handleAddLead}
          onCancel={handleCancel}
          leadToEdit={leadToEdit} 
          onEditComplete={handleCancel}
        />
      )}

      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="City Name"
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="border-gray-300 bg-white text-black rounded-md shadow-sm px-4 py-2"
        />
        <input
          type="text"
          placeholder="Company Name"
          value={companyFilter}
          onChange={(e) => setCompanyFilter(e.target.value)}
          className="border-gray-300 bg-white text-black rounded-md shadow-sm px-4 py-2"
        />
        <input
          type="date"
          value={nextDateFilter}
          onChange={(e) => setNextDateFilter(e.target.value)}
          className="border-gray-300 bg-white text-black rounded-md shadow-sm px-4 py-2"
        />
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
    <thead className="sticky top-0 bg-gray-700 shadow">
      <tr className="text-white">
        <th className="px-4 py-2">Data de Criação</th>
        <th className="px-4 py-2">Cidade</th>
        <th className="px-4 py-2">Empresa</th>
        <th className="px-4 py-2">Telefone</th>
        <th className="px-4 py-2">Pessoa de Contato</th>
        <th className="px-4 py-2">Email</th>
        <th className="px-4 py-2">Observações</th>
        <th className="px-4 py-2">Próxima data</th>
        <th className="px-4 py-2">Ações</th>
      </tr>
    </thead>
    <tbody>
      {currentLeads.map((lead) => (
        <tr key={lead.id} className="bg-gray-100">
          <td className="border px-4 py-2 text-black">
  {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : ''}
</td>
<td className="border px-4 py-2 text-black whitespace-nowrap">{lead.cityName}</td>
<td className="border px-4 py-2 text-black">{lead.companyName}</td>
<td className="border px-4 py-2 text-black">{lead.phone}</td>
<td className="border px-4 py-2 text-black">{lead.contactPerson}</td>
<td className="border px-4 py-2 text-black">{lead.email}</td>
<td className="border px-4 py-2 text-black">{lead.observations}</td>
<td className="border px-4 py-2 text-black">
  {lead.nextDate 
    ? new Date(new Date(lead.nextDate).getTime() + (new Date().getTimezoneOffset() * 60000)).toLocaleDateString() 
    : ''}
</td>


          <td className="border px-4 py-2 text-black">
            <button
              className="text-blue-500 hover:text-blue-700 mr-2"
              onClick={() => handleEdit(lead)}
            >
              Editar
            </button>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleDelete(lead.id!)}
            >
              Excluir
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  {currentLeads.length === 0 && (
    <p className="text-center text-gray-500 mt-4">Nenhum lead encontrado.</p>
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
