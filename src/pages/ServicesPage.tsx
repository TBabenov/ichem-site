import React from 'react';
import { Services } from '../components/Services';

interface ServicesPageProps {
  language: 'en' | 'ru';
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ language }) => {
  return (
    <div className="pt-20">
      <Services language={language} />
    </div>
  );
};