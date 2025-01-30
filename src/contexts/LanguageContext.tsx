import React, { createContext, useContext, useState } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  pt: {
    // Navigation
    'nav.home': 'Início',
    'nav.menu': 'Menu',
    'nav.gallery': 'Galeria',
    'nav.reservations': 'Reservas',
    'nav.contact': 'Contato',

    // Hero Section
    'hero.subtitle': 'Restaurante Italiano em Lisboa',
    'hero.description': 'Massas e pizzas caseiras frescas e vinhos italianos no coração de Lisboa',
    'hero.cta': 'Reservar uma mesa',

    // Menu Section
    'menu.title': 'Nosso Menu',
    'menu.description': 'Nossa cozinha celebra a essência da gastronomia italiana: ingredientes frescos e de qualidade, receitas tradicionais transmitidas de geração em geração e uma paixão incomparável pela arte culinária.',
    'menu.discover': 'Descobrir nosso menu',

    // Gallery Section
    'gallery.title': 'Galeria',

    // Our Room Section
    'room.title': 'Nossa Sala',
    'room.description': 'Nossa sala de restaurante, localizada no coração do histórico Bairro Alto, oferece um ambiente elegante e acolhedor. As paredes de pedra à vista, os arcos tradicionais e nosso mobiliário cuidadosamente selecionado criam uma atmosfera que combina perfeitamente o charme português com a elegância italiana.',
    'room.rating': 'no Google',
    'room.review': 'Um ambiente excepcional, um serviço atencioso',

    // Reservations Section
    'reservations.title': 'Reservas',
    'reservations.hours.title': 'Horário de Funcionamento',
    'reservations.hours.weekdays': 'Segunda - Sexta: 12h - 23h',
    'reservations.hours.weekend': 'Sábado - Domingo: 12h - 00h',

    // Contact Section
    'contact.title': 'Contato',
    'contact.how.to.reach': 'Como Chegar',
    'contact.talk.to.us': 'Fale Conosco',

    // Footer
    'footer.experience': 'Uma experiência culinária italiana autêntica no coração de Lisboa.',
    'footer.quickLinks': 'Links Rápidos',
    'footer.contact': 'Contato',
    'footer.followUs': 'Siga-nos',
    'footer.rights': 'Todos os direitos reservados.',

    // Forms
    'form.fullName': 'Nome completo',
    'form.date': 'Data',
    'form.time': 'Hora',
    'form.guests': 'Número de pessoas',
    'form.person': 'pessoa',
    'form.people': 'pessoas',
    'form.reserve': 'Reservar uma mesa',
    'form.subject': 'Assunto',
    'form.message': 'Mensagem',
    'form.send': 'Enviar mensagem',
    'form.reason': 'Motivo do contato',
    'form.select.reason': 'Selecione um motivo',
    'form.reason.general': 'Informações gerais',
    'form.reason.group': 'Reserva para grupo',
    'form.reason.private': 'Evento privado',
    'form.reason.feedback': 'Feedback',
    'form.reason.partnership': 'Parceria',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.menu': 'Menu',
    'nav.gallery': 'Gallery',
    'nav.reservations': 'Reservations',
    'nav.contact': 'Contact',

    // Hero Section
    'hero.subtitle': 'Italian Restaurant in Lisbon',
    'hero.description': 'Fresh homemade pasta and pizza and Italian wines in the heart of Lisbon',
    'hero.cta': 'Book a table',

    // Menu Section
    'menu.title': 'Our Menu',
    'menu.description': 'Our cuisine celebrates the essence of Italian gastronomy: fresh, quality ingredients, traditional recipes passed down through generations, and an unparalleled passion for culinary art.',
    'menu.discover': 'Discover our menu',

    // Gallery Section
    'gallery.title': 'Gallery',

    // Our Room Section
    'room.title': 'Our Room',
    'room.description': 'Our restaurant room, located in the heart of historic Bairro Alto, offers an elegant and welcoming environment. The exposed stone walls, traditional arches, and our carefully selected furniture create an atmosphere that perfectly combines Portuguese charm with Italian elegance.',
    'room.rating': 'on Google',
    'room.review': 'An exceptional atmosphere, attentive service',

    // Reservations Section
    'reservations.title': 'Reservations',
    'reservations.hours.title': 'Opening Hours',
    'reservations.hours.weekdays': 'Monday - Friday: 12pm - 11pm',
    'reservations.hours.weekend': 'Saturday - Sunday: 12pm - 12am',

    // Contact Section
    'contact.title': 'Contact',
    'contact.how.to.reach': 'How to Reach Us',
    'contact.talk.to.us': 'Talk to Us',

    // Footer
    'footer.experience': 'An authentic Italian culinary experience in the heart of Lisbon.',
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.followUs': 'Follow Us',
    'footer.rights': 'All rights reserved.',

    // Forms
    'form.fullName': 'Full Name',
    'form.date': 'Date',
    'form.time': 'Time',
    'form.guests': 'Number of guests',
    'form.person': 'person',
    'form.people': 'people',
    'form.reserve': 'Book a table',
    'form.subject': 'Subject',
    'form.message': 'Message',
    'form.send': 'Send message',
    'form.reason': 'Reason for contact',
    'form.select.reason': 'Select a reason',
    'form.reason.general': 'General information',
    'form.reason.group': 'Group booking',
    'form.reason.private': 'Private event',
    'form.reason.feedback': 'Feedback',
    'form.reason.partnership': 'Partnership',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}