import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { translations } from '../data/translations';

interface HeroProps {
  language: 'en' | 'ru';
}

export const Hero: React.FC<HeroProps> = ({ language }) => {
  const t = translations[language].hero;
  const logoRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    const animateLogo = () => {
      if (logoRef.current) {
        logoRef.current.classList.add('animate-fadeIn');
      }
    };
    
    setTimeout(animateLogo, 300);

    // Ensure video plays automatically
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay failed, handle gracefully
        console.log('Autoplay failed, user interaction required');
      });
    }
    
    return () => {
      if (logoRef.current) {
        logoRef.current.classList.remove('animate-fadeIn');
      }
    };
  }, []);
  
  return (
    <section className="relative h-[80vh] md:h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 z-10"
        ></div>
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/background_main.jpg"
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
          {/* Fallback image if video fails to load */}
          <img 
            src="/images/background_main.jpg" 
            alt="Chemical industry background" 
            className="absolute inset-0 h-full w-full object-cover"
          />
        </video>
      </div>
      
      <div className="container mx-auto px-4 z-20 text-center">
        <div 
          ref={logoRef}
          className="mb-8 opacity-0 transition-opacity duration-1000"
        >
          <div className="inline-block mb-4">
            <img 
              src="/images/icons/logol.png" 
              alt="Innovative Chemicals Logo" 
              className="h-32 w-auto md:h-40"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            {t.companyName}
          </h1>
          <h2 className="text-2xl md:text-3xl text-white mb-4">
            Oilfield Chemical Supply and Chemical Treatment Services
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-4">
            {t.tagline}
          </p>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Innovative solutions to lower costs and boost your business efficiency.
          </p>
        </div>

        {/* Statistics Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform transition-transform duration-300 hover:scale-105">
            <div className="text-2xl font-bold text-white mb-1">4500</div>
            <div className="text-sm text-gray-200">Production Capacity (tons/year)</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform transition-transform duration-300 hover:scale-105">
            <div className="text-2xl font-bold text-white mb-1">100%</div>
            <div className="text-sm text-gray-200">National Personnel with International Experience</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform transition-transform duration-300 hover:scale-105">
            <div className="text-2xl font-bold text-white mb-1">50+</div>
            <div className="text-sm text-gray-200">Projects in Kazakhstan</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform transition-transform duration-300 hover:scale-105">
            <div className="text-2xl font-bold text-white mb-1">№1</div>
            <div className="text-sm text-gray-200">Chemical manufacture with pumping service</div>
          </div>
        </div>
        
        <a 
          href="#about"
          className="inline-flex items-center text-white border border-white/30 rounded-full p-3 mt-8 animate-bounce"
          aria-label="Scroll to about section"
        >
          <ChevronDown size={24} />
        </a>
      </div>
    </section>
  );
};