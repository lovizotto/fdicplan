import React, { useState } from 'react';

const AddProspectForm: React.FC<{ onAdd: (prospect: any) => void; onCancel: () => void }> = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    contact: '',
    lastHistory: '',
    status: '',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

    // Reset error message before API call
    setErrorMessage(null);

    const response = await fetch('/api/addProspect.ts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Prospect added successfully!');
      onAdd(formData); // Call the callback to update the prospect list
      setFormData({
        name: '',
        email: '',
        phone: '',
        contact: '',
        lastHistory: '',
        status: '',
      });
    } else {
      setErrorMessage('Failed to add prospect. Please try again later.');
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-75 bg-zinc-600 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md shadow-lg w-3/4 max-w-4xl"
      >
        <h2 className="text-2xl font-bold mb-4 text-black">Add New Prospect</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <div className="space-y-4">
          <div className="form-group">
            <label htmlFor="name" className="block text-black">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Write your name"
              className="w-full border-gray-300 text-black bg-white rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="block text-black">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Write your email"
              className="w-full border-gray-300 text-black bg-white rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone" className="block text-black">Phone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Write your phone (e.g., (18)98164-0961)"
              className="w-full border-gray-300 text-black bg-white rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact" className="block text-black">Contact:</label>
            <select
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              className="w-full border-gray-300 text-black bg-white rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            >
              <option value="">Select contact method</option>
              <option value="Phone">Phone</option>
              <option value="Email">Email</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="lastHistory" className="block text-black">Last History:</label>
            <input
              type="text"
              id="lastHistory"
              name="lastHistory"
              value={formData.lastHistory}
              onChange={handleChange}
              required
              placeholder="Write last history"
              className="w-full border-gray-300 text-black bg-white rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          <div className="form-group">
            <label htmlFor="status" className="block text-black">Status:</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full border-gray-300 text-black bg-white rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            >
              <option value="">Select status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <div className="flex justify-between">
            <input
              type="submit"
              value="Add Prospect"
              className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm cursor-pointer hover:bg-blue-600"
            />
            <button
              type="button"
              onClick={onCancel}
              className="bg-red-500 text-white py-2 px-4 rounded-md shadow-sm cursor-pointer hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProspectForm;
