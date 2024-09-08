"use client";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-zinc-600 p-4 flex justify-between items-center">
      <div className="flex items-center ml-4">
        <Image
          src="/images/image.png" 
          alt="FDICPLAN Logo"
          width={130} 
          height={100}

        />
      </div>


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
