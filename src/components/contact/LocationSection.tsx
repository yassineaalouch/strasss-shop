'use client';

import React from 'react';
import { Navigation, MapPin } from 'lucide-react';

const LocationSection: React.FC = () => {
  const handleOpenMap = () => {
    // Ouvrir Google Maps avec les coordonnées de Casablanca
    const address = "Zone Industrielle Sidi Bernoussi, Rue des Entrepreneurs, Lot 45, 20150 Casablanca, Maroc";
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-8">
        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 bg-red-500 text-white rounded-full flex items-center justify-center">
            <Navigation size={40} />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">Notre Localisation</h3>
        <div className="text-center space-y-3">
          <p className="text-gray-600">
            <strong>Strass Shop</strong>
          </p>
          <p className="text-gray-600">
            Zone Industrielle Sidi Bernoussi<br />
            Rue des Entrepreneurs, Lot 45<br />
            20150 Casablanca, Maroc
          </p>
          <div className="pt-4">
            <button 
              onClick={handleOpenMap}
              className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center mx-auto"
            >
              <Navigation size={20} className="mr-2" />
              Voir sur Google Maps
            </button>
          </div>
        </div>
      </div>
      
      {/* Carte fictive */}
      <div className="h-64 bg-gray-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 opacity-80"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <MapPin className="text-red-500 mx-auto mb-2" size={32} />
            <p className="text-sm font-semibold text-gray-800">Strass Shop</p>
            <p className="text-xs text-gray-600">Casablanca</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSection;