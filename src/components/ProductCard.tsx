import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ProductCard = ({ id, name, price, image }:{ id:number ;name:string; price:number; image:string }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <Link href={`/product/${id}`}>
        <Image
          width={50}
          height={50}
          src={image} 
          alt={name}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link href={`/product/${id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-yellow-500">{name}</h3>
        </Link>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-yellow-600">{price.toFixed(2)} DH</span>
          <button className="bg-black text-white py-1 px-3 rounded hover:bg-gray-800 transition">
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;