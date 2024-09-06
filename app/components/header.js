// app/components/header.js
"use client";
import Image from "next/image";
import Link from "next/link";
import MainNav from "./mainNav"; // Importa o MainNav

export default function Header() {
  return (
    <header className="bg-zinc-600 p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center ml-4">
        <Link href="/">
          <Image
            src="/images/image.png"
            alt="FDICPLAN Logo"
            width={130}
            height={100}
            className="cursor-pointer"
          />
        </Link>
      </div>

      {/* Navegação principal */}
      <MainNav />

      {/* Links adicionais */}
      <div className="flex space-x-6 mr-4">
        <Link href="#">
          <span className="text-white hover:text-orange-200">Add User</span>
        </Link>
        <Link href="#">
          <span className="text-white hover:text-orange-200">Login</span>
        </Link>
      </div>
    </header>
  );
}
