import React, { useState, useEffect } from 'react';

interface Lead {
  id?: number;
  name: string;
  email: string;
  phone: string;
  contactPerson?: string;
  lastHistory: string;
  status: string;
  type?: string;
  eventDate?: string;
  cityName?: string;
  companyName?: string;
  eventName?: string;
  nextDate?: string;
  observations?: string;
}

const LeadForm: React.FC<{
  onAdd: (lead: Lead) => void;
  onCancel: () => void; // Função para fechar o formulário
  leadToEdit?: Lead;
  onEditComplete: () => void;
}> = ({ onAdd, onCancel, leadToEdit, onEditComplete }) => {
  const [formData, setFormData] = useState<Lead>({
    name: '',
    email: '',
    phone: '',
    contactPerson: '',
    lastHistory: '',
    status: '',
    type: 'lead',
    eventDate: '',
    cityName: '',
    companyName: '',
    eventName: '',
    nextDate: '',
    observations: '',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (leadToEdit) {
      setFormData({ ...leadToEdit, type: 'lead' });
    }
  }, [leadToEdit]);

  const formatPhoneNumber = (phone: string) => {
    let cleaned = phone.replace(/\D/g, '');
    if (cleaned.length <= 10) {
      return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1)$2-$3');
    } else {
      return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setFormData({ ...formData, [name]: formatPhoneNumber(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone: string) => /^\(\d{2}\)\d{4,5}-\d{4}$/.test(phone);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!validatePhone(formData.phone)) {
      setErrorMessage('Please enter a valid phone number (00)00000-0000).');
      return;
    }

    setErrorMessage(null);

    const url = 'http://localhost:3000/api/routes/leads';
    const method = leadToEdit ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, id: leadToEdit?.id }),
      });

      if (!response.ok) {
        const errorText = await response.text(); // Obtém texto de erro
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const newLead = await response.json();
      alert(`Lead ${leadToEdit ? 'updated' : 'added'} successfully!`);
      onAdd(newLead);
      setFormData({
        name: '',
        email: '',
        phone: '',
        contactPerson: '',
        lastHistory: '',
        status: '',
        type: 'lead',
        eventDate: '',
        cityName: '',
        companyName: '',
        eventName: '',
        nextDate: '',
        observations: '',
      });
      if (leadToEdit) {
        onEditComplete();
      }
      onCancel(); // Fechar o formulário após adicionar/atualizar
    } catch (error) {
      console.error('Error while creating/updating lead:', error);
      setErrorMessage('Failed to add/update lead. Please try again later.');
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-75 bg-zinc-600 flex justify-center items-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-lg w-3/4 max-w-4xl">
        <h2 className="text-2xl font-bold mb-4 text-black">
          {leadToEdit ? 'Edit Lead' : 'Adicionar Novo Lead'}
        </h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Campos do formulário */}
          <input
            type="date"
            name="eventDate"
            placeholder="Data Evento"
            value={formData.eventDate}
            onChange={handleChange}
            className="bg-white text-black px-4 py-2 rounded-md border border-gray-300"
          />
          <input
            type="text"
            name="cityName"
            placeholder="Nome da Cidade"
            value={formData.cityName}
            onChange={handleChange}
            className="bg-white text-black px-4 py-2 rounded-md border border-gray-300"
          />
          <input
            type="text"
            name="companyName"
            placeholder="Nome da Empresa"
            value={formData.companyName}
            onChange={handleChange}
            className="bg-white text-black px-4 py-2 rounded-md border border-gray-300"
          />
          <input
            type="text"
            name="eventName"
            placeholder="Evento"
            value={formData.eventName}
            onChange={handleChange}
            className="bg-white text-black px-4 py-2 rounded-md border border-gray-300"
          />
          <input
            type="text"
            name="contactPerson"
            placeholder="Pessoa de Contato"
            value={formData.contactPerson}
            onChange={handleChange}
            className="bg-white text-black px-4 py-2 rounded-md border border-gray-300"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone (00)00000-0000"
            value={formData.phone}
            onChange={handleChange}
            required
            className="bg-white text-black px-4 py-2 rounded-md border border-gray-300"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-white text-black px-4 py-2 rounded-md border border-gray-300"
          />
          <input
            type="date"
            name="nextDate"
            placeholder="Próxima Data"
            value={formData.nextDate}
            onChange={handleChange}
            className="bg-white text-black px-4 py-2 rounded-md border border-gray-300"
          />
          <textarea
            name="observations"
            placeholder="Observações"
            value={formData.observations}
            onChange={handleChange}
            className="bg-white text-black px-4 py-2 rounded-md border border-gray-300 md:col-span-2"
            rows={4}
          />
        </div>
        <div className="flex justify-between mt-4">
          <input
            type="submit"
            value={leadToEdit ? 'Update Lead' : 'Criar Lead'}
            className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm cursor-pointer hover:bg-blue-600"
          />
          <button
            type="button"
            onClick={onCancel} // Chama onCancel para fechar o formulário
            className="bg-red-500 text-white py-2 px-4 rounded-md shadow-sm cursor-pointer hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeadForm;
