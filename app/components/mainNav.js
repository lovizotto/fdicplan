// app/components/mainNav.js
"use client";
import Link from "next/link";

export default function MainNav() {
  return (
    <nav className="flex space-x-6 ml-6">
      <Link href="/prospects">
        <span className="text-white hover:text-orange-200">Prospects</span>
      </Link>
      <Link href="/leads">
        <span className="text-white hover:text-orange-200">Leads</span>
      </Link>
      <Link href="/contact">
        <span className="text-white hover:text-orange-200">Contact</span>
      </Link>
    </nav>
  );
}
