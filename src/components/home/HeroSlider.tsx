"use client"

import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Image from "next/image"

interface HeroSliderProps {
  images: string[]
}

export default function HeroSlider({ images }: HeroSliderProps) {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false
  }

  return (
    <Slider {...sliderSettings}>
      {images.map((img, index) => (
        <div key={index}>
          <Image
            src={img}
            alt={`Accessoire couture ${index + 1}`}
            className="rounded-lg w-full h-auto"
            width={500}
            height={500}
          />
        </div>
      ))}
    </Slider>
  )
}
