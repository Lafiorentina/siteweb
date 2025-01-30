import React, { useEffect, useState } from "react";
import { Instagram, Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import client from "../Lib/sanityClient.js";
const Footer = () => {
  const { t } = useLanguage();

  const [contactInfo, setContactInfo] = useState({
    phone: "",
    email: "",
    hours: [],
  });

  useEffect(() => {
    const fetchContactInfo = async () => {
      const query = `*[_type == "openingHours"][0]{
            phone,
            email,
            hours[] {
              en,
              pt
            }
          }`;

      try {
        const data = await client.fetch(query);
        setContactInfo({
          phone: data.phone,
          email: data.email,
          hours: data.hours,
        });
      } catch (error) {
        console.error("Error fetching contact info:", error);
      }
    };

    fetchContactInfo();
  }, []);

  const getTranslatedHours = (hours: any[]) => {
    if (!hours || hours.length === 0) return null;

    return hours.map((hour) => {
      if (language === "pt") {
        return hour.pt; // Afficher en portugais si la langue est 'pt'
      }
      return hour.en; // Afficher en anglais par défaut
    });
  };

  return (
    <footer className="bg-[#1a472a] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-serif italic mb-4">La Fiorentina</h3>
            <p className="text-sm">{t("footer.experience")}</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#inicio" className="hover:text-[#bd1e23]">
                  {t("nav.home")}
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#bd1e23]">
                  {t("nav.menu")}
                </a>
              </li>
              <li>
                <a href="#reservas" className="hover:text-[#bd1e23]">
                  {t("nav.reservations")}
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-[#bd1e23]">
                  {t("nav.contact")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">
              {t("footer.contact")}
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                R. de São Pedro de Alcântara 65, Bairro Alto
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="hover:text-[#bd1e23]"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="hover:text-[#bd1e23]"
                >
                  {contactInfo.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">
              {t("footer.followUs")}
            </h4>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/lafiorentina_pt/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#bd1e23]"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/20">
          <div className="flex flex-col items-center gap-2">
            <p className="text-center text-sm">
              © {new Date().getFullYear()} La Fiorentina. {t("footer.rights")}
            </p>
            <p className="text-sm text-white/80">
              Made with Passion by{" "}
              <a
                href="https://gosite-web.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#bd1e23]"
              >
                GOSITE-WEB
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
