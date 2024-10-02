import React, { useState, useEffect } from 'react';

interface Prospect {
  id?: number; 
  name: string;
  email: string;
  phone: string;
  contact: string;
  lastHistory: string;
  status: string;
}

const AddProspectForm: React.FC<{
  onAdd: (prospect: Prospect) => void;
  onCancel: () => void;
  prospectToEdit?: Prospect;
  onEditComplete: () => void;
}> = ({ onAdd, onCancel, prospectToEdit, onEditComplete }) => {
  const [formData, setFormData] = useState<Prospect>({
    name: '',
    email: '',
    phone: '',
    contact: '',
    lastHistory: '',
    status: '',
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (prospectToEdit) {
      setFormData(prospectToEdit); 
    }
  }, [prospectToEdit]);

  
  const formatPhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, ''); 
    if (cleaned.length === 10) {
      
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    } else if (cleaned.length === 11) {
    
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    }
    return phone; 
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const formattedPhone = formatPhone(value);
      setFormData({ ...formData, [name]: formattedPhone });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone: string) => /^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(phone);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!validatePhone(formData.phone)) {
      setErrorMessage('Please enter a valid phone number in the format (00)00000-0000.');
      return;
    }

    setErrorMessage(null);

    const url = 'http://localhost:3000/api/routes/prospects';
    const method = prospectToEdit ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...formData, id: prospectToEdit?.id }),
    });

    if (response.ok) {
      const newProspect = await response.json();
      alert(`Prospect ${prospectToEdit ? 'updated' : 'added'} successfully!`);
      onAdd(newProspect);
      setFormData({ name: '', email: '', phone: '', contact: '', lastHistory: '', status: '' });
      if (prospectToEdit) {
        onEditComplete();
      }
    } else {
      setErrorMessage('Failed to add/update prospect. Please try again later.');
    }
  };

  const handleDelete = async () => {
    if (!prospectToEdit) return;

    const response = await fetch('http://localhost:3000/api/routes/prospects', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: prospectToEdit.id }),
    });

    if (response.ok) {
      alert('Prospect deleted successfully!');
      onEditComplete();
      onCancel();
    } else {
      setErrorMessage('Failed to delete prospect. Please try again later.');
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-75 bg-zinc-600 flex justify-center items-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-lg w-3/4 max-w-4xl">
        <h2 className="text-2xl font-bold mb-4 text-black">
          {prospectToEdit ? 'Edit Prospect' : 'Add New Prospect'}
        </h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
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
            type="text"
            name="phone"
            placeholder="Phone (00)00000-0000"
            value={formData.phone}
            onChange={handleChange}
            required
            className="bg-white text-black px-4 py-2 rounded-md border border-gray-300"
          />
          <select
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
            className="bg-white text-black px-4 py-2 rounded-md border border-gray-300"
          >
            <option value="">Select Contact Method</option>
            <option value="Phone">Phone</option>
            <option value="Email">Email</option>
          </select>
          <input
            type="text"
            name="lastHistory"
            placeholder="Last History"
            value={formData.lastHistory}
            onChange={handleChange}
            required
            className="bg-white text-black px-4 py-2 rounded-md border border-gray-300"
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="bg-white text-black px-4 py-2 rounded-md border border-gray-300"
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
          </select>
          <div className="flex justify-between">
            <input
              type="submit"
              value={prospectToEdit ? 'Update Prospect' : 'Add Prospect'}
              className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm cursor-pointer hover:bg-blue-600"
            />
            <button
              type="button"
              onClick={onCancel}
              className="bg-red-500 text-white py-2 px-4 rounded-md shadow-sm cursor-pointer hover:bg-red-600"
            >
              Cancel
            </button>
            {prospectToEdit && (
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-600 text-white py-2 px-4 rounded-md shadow-sm cursor-pointer hover:bg-red-700"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProspectForm;
