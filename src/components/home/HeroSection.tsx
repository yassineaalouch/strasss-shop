"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const HeroSection: React.FC = () => {
  // Configuration du slider
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  // Liste d'images d'accessoires de couture (tu peux remplacer par des URLs réelles)
  const images = [
    "https://static.mapetitemercerie.com/56855-large_default/mannequin-de-couture-prymadonna-multi-taille-s.jpg",
    "https://static.mapetitemercerie.com/200778-large_default/fil-macaroni-coton-recycle-cachou-100m.jpg",
    "https://static.mapetitemercerie.com/191023-large_default/aiguille-circulaire-bois-d-erable-80-cm-n15.jpg",
    "https://static.mapetitemercerie.com/242692-large_default/boutons-pressions-15-mm-outillage-couture-loisirs.jpg",
  ];

  return (
    <section className="bg-gray-50 text-firstColor py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="flex-1 max-w-2xl mb-12 lg:mb-0">
            <h1 className="text-5xl font-bold mb-6">
              Découvrez nos accessoires de couture de qualité
            </h1>
            <p className="text-xl mb-8 text-firstColor/80">
              Fils, aiguilles, ciseaux et tout le nécessaire pour vos projets de couture. Livraison rapide et fiable.
            </p>
            <div className="flex space-x-4">
              <button className="bg-firstColor text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:border-firstColor hover:text-firstColor border-2 flex items-center">
                Voir nos produits
                <ArrowRight className="ml-2" size={20} />
              </button>
              <button className="border-2 border-firstColor text-firstColor px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-firstColor">
                Demander un devis
              </button>
            </div>
          </div>

          <div className="flex-1 lg:ml-12 w-full max-w-lg">
            <Slider {...sliderSettings}>
              {images.map((img, index) => (
                <div key={index} className="p">
                  <div className="bg-white rounded-lg ">
                    <Image
                      src={img}
                      alt={`Accessoire couture ${index + 1}`}
                      className="rounded-lg  w-full h-80"
                      width={500}
                      height={500}
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
