// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      "welcome": "Welcome to AgriClimate Analytics",
      "empowering": "Empowering Agriculture Through Climate Intelligence",
      "startAnalysis": "Start Analysis",
      "aboutUs": "Pioneering climate-smart agricultural solutions through advanced analytics and AI-driven insights.",
      "contact": "Contact",
      "email": "Email: contact@agriclimatenexus.com",
      "phone": "Phone: +91 1122334455",
      "followUs": "Follow Us",
      "footerText": "© 2025 AgriClimate Analytics. All rights reserved. | Image by Tomasz Filipek"
    }
  },
//   es: {
//     translation: {
//       "welcome": "Bienvenido a AgriClimate Analytics",
//       "empowering": "Potenciando la agricultura a través de la inteligencia climática",
//       "startAnalysis": "Comenzar Análisis",
//       "aboutUs": "Pioneros en soluciones agrícolas inteligentes climáticas mediante análisis avanzados e información impulsada por IA.",
//       "contact": "Contacto",
//       "email": "Correo: contact@agriclimatenexus.com",
//       "phone": "Teléfono: +91 1122334455",
//       "followUs": "Síguenos",
//       "footerText": "© 2025 AgriClimate Analytics. Todos los derechos reservados. | Imagen de Tomasz Filipek"
//     }
//   },
  mr: {
    translation: {
      "welcome": "AgriClimate Analytics मध्ये आपले स्वागत आहे",
      "empowering": "हवामान बुद्धिमत्ता द्वारे कृषीला सामर्थ्य देणे",
      "startAnalysis": "विश्लेषण सुरू करा",
      "aboutUs": "उच्च विश्लेषण आणि कृत्रिम बुद्धिमत्तेच्या माध्यमातून जलवायु-समर्थ कृषी उपाय प्रदान करणे.",
      "contact": "संपर्क",
      "email": "ईमेल: contact@agriclimatenexus.com",
      "phone": "फोन: +91 1122334455",
      "followUs": "आम्हाला अनुसरण करा",
      "footerText": "© 2025 AgriClimate Analytics. सर्व हक्क राखीव. | इमेज: Tomasz Filipek"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
