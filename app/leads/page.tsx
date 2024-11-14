'use client';
import React, { useState, useEffect, useRef } from 'react';
import { SearchInput } from '../components/form/SearchInput';
import AddLeadForm from './addLeadForm';
import './custom.css'; // Importa o arquivo custom.css

interface Lead {
  id?: number;  
  cityName: string;
  companyName: string;
  phone: string;
  eventName?: string;
  contactPerson?: string;
  email?: string;
  nextDate?: Date | string;
  observations?: string;
  createdAt?: Date | string;
}

interface LeadsPageProps {
  params: Record<string, string>;
  searchParams: {
    cityName?: string;
    companyName?: string;
    nextDate?: string;
  };
}

export default function LeadsPage({ params, searchParams }: LeadsPageProps) {
  const cityName = searchParams.cityName || '';
  const companyName = searchParams.companyName || '';
  const nextDate = searchParams.nextDate || '';

  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadToEdit, setLeadToEdit] = useState<Lead | undefined>(undefined);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filter, setFilter] = useState({
    cityName: '',
    companyName: '',
    contactOrEmail: '',
    createdAt: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 10;
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/routes/leads');
        if (!response.ok) throw new Error('Falha ao buscar leads');
        
        const data: Lead[] = await response.json();
        setLeads(data);
      } catch (error) {
        console.error('Error fetching leads:', error);
        setLeads([]);
      }
    };

    fetchLeads();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const handleSubmit = (newLead: Lead) => {
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

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este lead?');
    if (!confirmDelete) return;
  
    try {
      const response = await fetch('http://localhost:3000/api/routes/leads', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
  
      if (!response.ok) {
        throw new Error('Falha ao excluir o lead');
      }
  
      setLeads(leads.filter((lead) => lead.id !== id));
      alert('Lead excluído com sucesso!'); 
    } catch (error) {
      console.error('Error deleting lead:', error);
      alert('Ocorreu um erro ao excluir o lead.');
    }
  };
  
  const handleCancel = () => {
    setShowAddForm(false);
    setLeadToEdit(undefined); 
  };

  const filteredLeads = leads.filter((lead) => {
    return (
      (filter.cityName === '' || lead.cityName.toLowerCase().includes(filter.cityName.toLowerCase())) &&
      (filter.companyName === '' || lead.companyName.toLowerCase().includes(filter.companyName.toLowerCase())) &&
      (filter.contactOrEmail === '' || 
        (lead.contactPerson?.toLowerCase().includes(filter.contactOrEmail.toLowerCase()) || 
         lead.email?.toLowerCase().includes(filter.contactOrEmail.toLowerCase()))) &&
      (filter.createdAt === '' || (lead.createdAt && new Date(lead.createdAt).toISOString().split('T')[0] === filter.createdAt))
    );
  });

  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const initResizableColumns = () => {
    const table = tableRef.current;
    if (!table) return;

    const cols = table.querySelectorAll('th');
    cols.forEach((col) => {
      const resizer = document.createElement('div');
      resizer.className = 'resizer';
      col.appendChild(resizer);
      resizer.addEventListener('mousedown', initResize);
    });

    function initResize(e: MouseEvent) {
      const col = (e.target as HTMLElement).parentElement;
      if (!col) return;

      const startX = e.pageX;
      const startWidth = col.offsetWidth;

      function doResize(e: MouseEvent) {
        if (col) {
          col.style.width = `${startWidth + e.pageX - startX}px`;
        }
      }

      function stopResize() {
        document.removeEventListener('mousemove', doResize);
        document.removeEventListener('mouseup', stopResize);
      }

      document.addEventListener('mousemove', doResize);
      document.addEventListener('mouseup', stopResize);
    }
  };

  useEffect(() => {
    initResizableColumns();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-white">Lista de Leads</h1>

      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <SearchInput
          name="cityName"
          placeholder="Filtrar por Cidade"
          value={filter.cityName}
          onChange={handleFilterChange}
        />
        <SearchInput
          name="companyName"
          placeholder="Filtrar por Empresa"
          value={filter.companyName}
          onChange={handleFilterChange}
        />
        <SearchInput
          name="contactOrEmail"
          placeholder="Filtrar por Contato ou Email"
          value={filter.contactOrEmail}
          onChange={handleFilterChange}
        />
        <input
          type="date"
          name="createdAt"
          placeholder="Filtrar por Data de Criação"
          value={filter.createdAt}
          onChange={handleFilterChange}
          className="bg-white text-black px-4 py-2 rounded-md border border-gray-300"
        />
      </div>

      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600"
        >
          Adicionar Lead
        </button>
      </div>

      <div className="overflow-x-auto">
        <table ref={tableRef} className="table-resizable w-full">
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
                  {lead.nextDate ? new Date(new Date(lead.nextDate).getTime() + 24*60*60*1000).toLocaleDateString() : ''}
                </td>
                <td className="border px-4 py-2 text-black space-x-2">
                  <button
                    onClick={() => handleEdit(lead)}
                    className="bg-blue-500 text-white px-2 py-1 rounded-md shadow-sm hover:bg-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(lead.id!)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md shadow-sm hover:bg-red-600"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center">
        {Array.from({ length: Math.ceil(filteredLeads.length / leadsPerPage) }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {showAddForm && (
        <AddLeadForm
          onAdd={handleSubmit}  
          onCancel={handleCancel}
          leadToEdit={leadToEdit}
          onEditComplete={handleCancel}
        />
      )}
    </div>
  );
}