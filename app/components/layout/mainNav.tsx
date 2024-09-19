'use client';
import Link from 'next/link';
import React from 'react';

export default function MainNav() {
  return (
    <nav className="flex space-x-6 ml-6 py-4 px-6">
      <Link href="/prospects">
        <span className="text-white hover:text-orange-200 transition duration-300">
          Prospects
        </span>
      </Link>
      <Link href="/leads">
        <span className="text-white hover:text-orange-200 transition duration-300">
          Leads
        </span>
      </Link>
      <Link href="/contact">
        <span className="text-white hover:text-orange-200 transition duration-300">
          Contact
        </span>
      </Link>
    </nav>
  );
}
