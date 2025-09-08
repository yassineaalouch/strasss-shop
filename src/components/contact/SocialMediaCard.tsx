import React from "react";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

const SocialMediaCard: React.FC = () => {
  return (
       <div className="fixed top-1/3 left-4 z-50 flex flex-col items-center space-y-4 bg-white p-3 rounded-2xl shadow-lg">
      {/* Facebook */}
      <Link
        href="https://facebook.com"
        target="_blank"
        className="text-blue-600 hover:text-blue-800 transition text-2xl"
      >
        <Facebook />
      </Link>

      {/* Twitter / X */}
      <Link
        href="https://twitter.com"
        target="_blank"
        className="text-black hover:text-gray-700 transition text-2xl"
      >
        <Twitter />
      </Link>

      {/* Instagram */}
      <Link
        href="https://instagram.com"
        target="_blank"
        className="text-pink-500 hover:text-pink-700 transition text-2xl"
      >
        <Instagram />
      </Link>

      {/* YouTube */}
      <Link
        href="https://youtube.com"
        target="_blank"
        className="text-red-600 hover:text-red-800 transition text-2xl"
      >
        <Youtube />
      </Link>

      {/* Whatsapp */}

    </div>
  );
};

export default SocialMediaCard;
