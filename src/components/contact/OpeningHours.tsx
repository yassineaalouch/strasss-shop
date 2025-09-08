import React from 'react';
import { Clock } from 'lucide-react';
import { OpeningHour } from '@/types/type';



const OpeningHours: React.FC = () => {
  // Déterminer le jour actuel côté serveur n'est pas optimal pour l'hydratation
  // Il vaut mieux soit l'omettre, soit le gérer côté client
  const openingHours: OpeningHour[] = [
    { day: 'Lundi', hours: '08:00 - 18:00' },
    { day: 'Mardi', hours: '08:00 - 18:00' },
    { day: 'Mercredi', hours: '08:00 - 18:00' },
    { day: 'Jeudi', hours: '08:00 - 18:00' },
    { day: 'Vendredi', hours: '08:00 - 18:00' },
    { day: 'Samedi', hours: '09:00 - 16:00' },
    { day: 'Dimanche', hours: 'Fermé' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex items-center justify-center mb-6">
        <div className="w-20 h-20 bg-blue-500 text-white rounded-full flex items-center justify-center">
          <Clock size={40} />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">Horaires d&apos;Ouverture</h3>
      <div className="space-y-3">
        {openingHours.map((schedule, index) => (
          <div 
            key={index} 
            className="flex justify-between items-center py-2 px-3 rounded"
          >
            <span className="font-medium text-gray-700">
              {schedule.day}
            </span>
            <span className={`${
              schedule.hours === 'Fermé' 
                ? 'text-red-500 font-medium' 
                : 'text-gray-600'
            }`}>
              {schedule.hours}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <p className="text-sm text-green-700 text-center">
          <strong>Note :</strong> Nous sommes également disponibles sur rendez-vous en dehors de ces horaires.
        </p>
      </div>
    </div>
  );
};

export default OpeningHours;