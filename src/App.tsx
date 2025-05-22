import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ContactForm } from './components/ContactForm';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ServicesPage } from './pages/ServicesPage';
import { RDPage } from './pages/RDPage';
import { ContactPage } from './pages/ContactPage';

function App() {
  const [language, setLanguage] = useState<'en' | 'ru'>('en');
  const [showContactForm, setShowContactForm] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header 
        language={language} 
        setLanguage={setLanguage} 
        onContactClick={() => setShowContactForm(true)}
      />
      <main className="pt-[64px]">
        <Routes>
          <Route path="/" element={<HomePage language={language} />} />
          <Route path="/products" element={<ProductsPage language={language} />} />
          <Route path="/services" element={<ServicesPage language={language} />} />
          <Route path="/rd" element={<RDPage language={language} />} />
          <Route path="/contact" element={<ContactPage language={language} />} />
        </Routes>
      </main>
      <Footer language={language} />
      
      {showContactForm && (
        <ContactForm 
          language={language} 
          onClose={() => setShowContactForm(false)} 
        />
      )}
    </div>
  );
}

export default App;