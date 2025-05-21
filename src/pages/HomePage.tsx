import React from 'react';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Experience } from '../components/Experience';
import { Partners } from '../components/Partners';
import { Contact } from '../components/Contact';

interface HomePageProps {
  language: 'en' | 'ru';
}

export const HomePage: React.FC<HomePageProps> = ({ language }) => {
  return (
    <>
      <Hero language={language} />
      <About language={language} />
      <Experience language={language} />
      <Partners language={language} />
      <Contact language={language} onContactClick={() => {}} />
    </>
  );
};