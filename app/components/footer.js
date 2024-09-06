import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-zinc-600 flex justify-between items-center text-white p-4 mt-auto">
      <div className="container mx-auto flex justify-between items-center">
        {/* Copyright */}
        <div className="text-sm">
          &copy; {new Date().getFullYear()} FDICPLAN. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
