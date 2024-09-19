'use client';
import React, { useState, useRef, FormEvent } from 'react';
import InputMask from 'react-input-mask';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm('socorrojesus', 'template_yswdxst', form.current, {
          publicKey: 'UJBIN2eSwzSLdrb8S',
        })
        .then(
          () => {
            alert('Formulário enviado com sucesso!');
            form.current?.reset();
          },
          (error) => {
            console.error('Falha ao enviar o formulário:', error.text);
            alert('Falha ao enviar o formulário. Tente novamente mais tarde.');
          },
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <head>
        <title>Talk to us</title>
      </head>
      <div className="max-w-md w-full shadow-md bg-gray-50 shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">
          To talk to us:
        </h1>
      </div>
      <div className="bg-gray-50 p-8 shadow-md w-full max-w-md">
        <form ref={form} onSubmit={sendEmail} className="space-y-4">
          <div className="form-group">
            <label htmlFor="name" className="block text-black">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Write your name"
              className="w-full border-gray-300 bg-white text-black rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="block text-black">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full border-gray-300 bg-white text-black rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="block text-black">
              Phone:
            </label>
            <InputMask mask="(99) 99999-9999" name="phone" required>
              {() => (
                <input
                  type="text"
                  id="phone"
                  placeholder="Enter your phone"
                  className="w-full border-gray-300 bg-white text-black rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              )}
            </InputMask>
          </div>

          <div className="form-group">
            <label htmlFor="subject" className="block text-black">
              Subject:
            </label>
            <select
              id="subject"
              name="subject"
              required
              className="w-full border-gray-300 bg-white text-black rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            >
              <option value="">- Select -</option>
              <option value="suporte">Support</option>
              <option value="sugestoes">Suggestions</option>
              <option value="outros">Others</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message" className="block text-black">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              required
              placeholder="Write your message"
              className="w-full border-gray-300 bg-white text-black rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>

          <input
            type="submit"
            value="Send"
            className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm cursor-pointer hover:bg-blue-600"
          />
        </form>
      </div>
    </div>
  );
}
