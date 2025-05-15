import React from 'react';
import { Contact } from '../components/Contact';

interface ContactPageProps {
  language: 'en' | 'ru';
}

export const ContactPage: React.FC<ContactPageProps> = ({ language }) => {
  return (
    <div className="pt-20">
      <Contact 
        language={language} 
        onContactClick={() => {}}
      />
    </div>
  );
};