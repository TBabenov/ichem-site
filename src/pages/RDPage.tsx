import React from 'react';
import { Research } from '../components/Research';

interface RDPageProps {
  language: 'en' | 'ru';
}

export const RDPage: React.FC<RDPageProps> = ({ language }) => {
  return (
    <div className="pt-20">
      <Research language={language} />
    </div>
  );
};