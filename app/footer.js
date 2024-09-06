import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-zinc-600 flex justify-between items-center text-white p-4 mt-auto">
      <div className="container mx-auto flex justify-between items-center">
        {/* Copyright */}
        <div className="text-sm">
          &copy; {new Date().getFullYear()} FDICPLAN. All rights reserved.
        </div>

        <nav className="space-x-4 ">
          <Link href="./prospects">
            <div className="text-white hover:text-orange-200">Prospects</div>
          </Link>
          <Link href="./leads">
            <div className="text-white hover:text-orange-200">Leads</div>
          </Link>
          <Link href="./contact">
            <div className="text-white hover:text-orange-200">Contact</div>
          </Link>
        </nav>
      </div>
    </footer>
  );
}
