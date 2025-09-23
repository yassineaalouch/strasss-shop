"use client"
import React, { useState } from "react"
import { Facebook, Instagram, Twitter, Youtube, Heart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

const SocialMediaCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  // Liste des réseaux sociaux avec leurs propriétés
  const socialMediaLinks = [
    {
      url: "https://facebook.com",
      icon: Facebook,
      className: "text-blue-600 hover:text-blue-800",
      name: "Facebook"
    },
    {
      url: "https://twitter.com",
      icon: Twitter,
      className: "text-black hover:text-gray-700",
      name: "Twitter"
    },
    {
      url: "https://instagram.com",
      icon: Instagram,
      className: "text-pink-500 hover:text-pink-700",
      name: "Instagram"
    },
    {
      url: "https://youtube.com",
      icon: Youtube,
      className: "text-red-600 hover:text-red-800",
      name: "YouTube"
    }
  ]

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="fixed top-1/3 left-4 z-50">
      {/* Alternative Design 3: Bouton avec cœur pulsant (décommentez pour utiliser) */}

      <motion.button
        onClick={toggleMenu}
        className="relative flex items-center justify-center w-8 md:w-13 md:h-13 h-8 bg-red-500 rounded-full shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: isOpen
            ? "0 0 0 0 rgba(239, 68, 68, 0.7), 0 0 0 10px rgba(239, 68, 68, 0)"
            : "0 0 0 0 rgba(239, 68, 68, 0.7)"
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          animate={{
            scale: isOpen ? [1, 1.2, 1] : 1
          }}
          transition={{ duration: 0.7, repeat: isOpen ? Infinity : 0 }}
        >
          <Heart className="text-white" size={20} fill="white" />
        </motion.div>
      </motion.button>

      {/* Menu déroulant avec animation améliorée */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.8, rotateX: -90 }}
            transition={{
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="absolute top-16 left-0 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-3 min-w-[180px] overflow-hidden"
          >
            {/* Fond gradient subtil */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 rounded-2xl"></div>

            <div className="relative z-10">
              {socialMediaLinks.map((social, index) => {
                const IconComponent = social.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30, rotateY: -90 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.4,
                      ease: "easeOut"
                    }}
                  >
                    <Link
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/60 transition-all duration-300 group backdrop-blur-sm"
                    >
                      <motion.div
                        whileHover={{
                          scale: 1.2,
                          rotate: 5,
                          filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))"
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <IconComponent
                          size={20}
                          className={`${social.className} transition-all duration-300`}
                        />
                      </motion.div>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                        {social.name}
                      </span>

                      {/* Effet de lueur au hover */}
                      <motion.div
                        className="absolute right-2 w-2 h-2 bg-current rounded-full opacity-0 group-hover:opacity-60"
                        animate={{
                          scale: [0, 1, 0]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay pour fermer le menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 -z-10"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default SocialMediaCard
