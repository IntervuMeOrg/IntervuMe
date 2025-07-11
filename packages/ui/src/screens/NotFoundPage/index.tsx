import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#1d1d20] relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />
      
      {/* Additional gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0667D0]/10 via-transparent to-[#033464]/10 pointer-events-none" />
      
      <div className="relative min-h-screen flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto"
        >
          {/* 404 Number */}
          <motion.h1 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-['Nunito'] font-extrabold text-white text-8xl md:text-9xl lg:text-[12rem] mb-6 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] tracking-wider"
          >
            404
          </motion.h1>
          
          {/* Page Not Found */}
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-['Nunito'] font-semibold text-white text-2xl md:text-3xl lg:text-4xl mb-4 tracking-wide"
          >
            Page Not Found
          </motion.h2>
          
          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="font-['Nunito'] text-white/70 text-base md:text-lg lg:text-xl mb-10 leading-relaxed tracking-wide"
          >
            The page you're looking for doesn't exist or has been moved.
            <br />
            Let's get you back on track.
          </motion.p>
          
          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/"
              className="group px-6 lg:px-8 py-3 lg:py-4 rounded-md bg-gradient-to-r from-[#0667D0] via-[#054E9D] to-[#033464]
                         hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span className="font-['Nunito'] font-semibold text-white text-sm lg:text-base tracking-wide whitespace-nowrap">
                Back to Home
              </span>
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="group px-6 lg:px-8 py-3 lg:py-4 rounded-md bg-white/10 border border-white/20 backdrop-blur-sm
                         hover:bg-white/20 hover:border-white/30 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span className="font-['Nunito'] font-semibold text-white text-sm lg:text-base tracking-wide whitespace-nowrap">
                Go Back
              </span>
            </button>
          </motion.div>
          
          {/* Decorative Brand Name */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16"
          >
            <h3 className="font-['Nunito'] font-extrabold text-white/30 text-lg md:text-xl lg:text-2xl tracking-widest">
              INTERVU ME
            </h3>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};