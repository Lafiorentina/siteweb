import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ReservationForm from "./components/ReservationForm";
import ImageCarousel from "./components/ImageCarousel";
import ContactForm from "./components/ContactForm";
import {
  MapPin,
  Phone,
  Clock,
  Star,
  FileText,
  ChevronDown,
} from "lucide-react";
import { useLanguage } from "./contexts/LanguageContext";
import client, { urlFor } from "./Lib/sanityClient.js";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [heroData, setHeroData] = useState({
    phrase1: { en: "", pt: "" },
    phrase2: { en: "", pt: "" },
  });
  const [menuData, setMenuData] = useState({
    title: "",
    pdfUrl: "",
    description: "",
  });
  const [galleryData, setGalleryData] = useState({
    title: "",
    images: [],
  });
  const [roomData, setRoomData] = useState({
    images: [],
  });
  const [contactInfo, setContactInfo] = useState({
    phone: "",
    email: "",
    hours: [],
  });
  const { t, language } = useLanguage();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleScrollToMenu = () => {
    const menuSection = document.querySelector("#menu");
    if (menuSection) {
      const navbarHeight = 96;
      const elementPosition = menuSection.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const query = `*[_type == "heroText"][0]{
          phrase1,
          phrase2
        }`;

        const data = await client.fetch(query);

        setHeroData({
          phrase1: data.phrase1,
          phrase2: data.phrase2,
        });
      } catch (error) {
        console.error("Error fetching hero data:", error);
      }
    };

    fetchHeroData();
  }, []);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const query = `*[_type == "menu"][0]{
          title,
          description,
          pdfFile {
            asset->{
              _id,
              url
            }
          }
        }`;

        const data = await client.fetch(query);
        const pdfUrl = data.pdfFile?.asset?.url || "";

        setMenuData({
          title: data.title,
          pdfUrl: pdfUrl,
          description: data.description,
        });
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchMenuData();
  }, []);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const query = `*[_type == "gallery"][0]{
          title,
          images[] {
            asset->{
              _id,
              url
            },
            alt
          }
        }`;

        const data = await client.fetch(query);

        const images = data.images.map((image) => ({
          url: urlFor(image.asset).url(),
          alt: image.alt,
        }));

        setGalleryData({
          title: data.title,
          images: images,
        });
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      }
    };

    fetchGalleryData();
  }, []);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const query = `*[_type == "ourRoomGallery"][0]{
          images[] {
            asset->{
              _id,
              url
            },
            caption
          }
        }`;

        const data = await client.fetch(query);

        const images = data.images.map((image) => ({
          url: urlFor(image.asset).url(),
          caption: image.caption || "",
        }));

        setRoomData({
          images: images,
        });
      } catch (error) {
        console.error("Error fetching room gallery data:", error);
      }
    };

    fetchRoomData();
  }, []);

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
    <div className="font-sans">
      <Navbar />

      <main id="main-content">
        <section
          id="inicio"
          className="min-h-screen bg-[url('https://lh3.googleusercontent.com/pw/AP1GczOq9HsOj4HlyixYifXmUTfo-zPBP59Qou1MDR4jh8sYIrATDHAQYTKaEMso5mwa60_tmqC4mJ5AdZfXG8Ywk_PxrQe2Nm8w5LNC8VMzbmDaYuYbvzoEI8w2Fs_qTQy2NjbD4cpnHY6XtKawy1uPePPN=w2491-h1661-s-no-gm?authuser=0')] bg-cover bg-center relative"
        >
          <div className="min-h-screen bg-gradient-to-b from-black/50 to-black/30 backdrop-brightness-75 flex items-center justify-center text-white">
            <div className="max-w-3xl text-center px-4">
              <h1 className="text-5xl md:text-6xl font-serif italic mb-6">
                La Fiorentina
              </h1>
              <p className="text-2xl font-serif italic mb-4">
                {heroData.phrase1[language]}
              </p>
              <p className="text-xl mb-8">{heroData.phrase2[language]} </p>
              <a
                href="#reservas"
                className="bg-[#bd1e23] text-white px-8 py-3 rounded-md hover:bg-[#a01a1e] transition-colors"
              >
                {t("hero.cta")}
              </a>
            </div>
          </div>

          <div
            onClick={handleScrollToMenu}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          >
            <div className="relative">
              <ChevronDown
                size={32}
                className="text-[#bd1e23] animate-bounce-delayed-1"
              />
              <ChevronDown
                size={32}
                className="text-[#bd1e23] absolute top-[-8px] animate-bounce-delayed-2"
              />
            </div>
          </div>
        </section>

        <section id="menu" className="py-20 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-serif italic text-center mb-8 text-[#1a472a] ">
              {t("menu.title")}
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="max-w-2xl mx-auto text-center mb-12">
                  <p className="text-lg text-gray-600 mb-8 ">
                    {t("menu.description")}
                  </p>
                  {menuData.pdfUrl && (
                    <a
                      href={menuData.pdfUrl}
                      className="inline-flex items-center gap-2 bg-[#1a472a] text-white px-8 py-3 rounded-md hover:bg-[#143d23] transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FileText size={20} />
                      {t("menu.discover")}
                    </a>
                  )}
                </div>
              </div>
              <div>
                <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                  <img
                    src="https://lh3.googleusercontent.com/pw/AP1GczMDZmLaEnapCLyl_lu2GyzCq2Ckm50pndSUenDv8mNipkT7DnnP8A7LpqKO6bB5xuFiiZcuZXEoGw2PsF_4_Hd48xa6u4sTCBflfgY3JiWhbQE48MRSWSofQ5q1wwjJ7jxG-i6Ueea_OpkWgYSnuJ1T=w1200-h1600-s-no-gm?authuser=0"
                    alt="Cozinha Italiana"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="galeria" className="py-20 bg-[#1a472a]/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-serif italic text-center mb-16 text-[#1a472a]">
              {language === "pt" ? "Galeria" : "Gallery"}
            </h2>

            {/* Version mobile : Carrousel */}
            <div className="md:hidden">
              <ImageCarousel images={galleryData.images} />
            </div>

            {/* Version desktop : Grille 3x2 */}
            <div className="hidden md:grid grid-cols-3 gap-8">
              {galleryData.images.map((image, index) => (
                <div
                  key={index}
                  className="aspect-[3/4] group relative overflow-hidden rounded-xl shadow-lg"
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="sala" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-serif italic text-center mb-16 text-[#1a472a] ">
              {t("room.title")}
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg mb-8">{t("room.description")}</p>
                <div className="bg-[#1a472a]/5 p-6 rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="text-[#bd1e23]" />
                    <span className="font-semibold">
                      4,8/5 {t("room.rating")}
                    </span>
                  </div>
                  <p className="italic">{t("room.review")}</p>
                </div>
              </div>
              <div>
                <ImageCarousel images={roomData.images} />
              </div>
            </div>
          </div>
        </section>

        <section id="reservas" className="py-20 bg-[#1a472a]/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-serif italic text-center mb-8 text-[#1a472a]">
              {t("reservations.title")}
            </h2>
            <div className="max-w-2xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="mb-8">
                  <h3 className="text-2xl font-serif italic mb-4 text-[#1a472a]">
                    {t("reservations.hours.title")}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="text-[#bd1e23]" />
                      <span>{t("reservations.hours.weekdays")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="text-[#bd1e23]" />
                      <span>{t("reservations.hours.weekend")}</span>
                    </div>
                  </div>
                </div>
                <ReservationForm />
              </div>
            </div>
          </div>
        </section>

        <section id="contato" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-serif italic text-center mb-16 text-[#1a472a]">
              {t("contact.title")}
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-serif italic mb-4 text-[#1a472a]">
                      {t("contact.how.to.reach")}
                    </h3>
                    <div className="flex items-start gap-3">
                      <MapPin className="text-[#bd1e23] flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold">La Fiorentina</p>
                        <p>R. de São Pedro de Alcântara 65</p>
                        <p>Bairro Alto, Lisboa</p>
                        <p>Portugal</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-serif italic mb-4 text-[#1a472a]">
                      {t("contact.talk.to.us")}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Phone className="text-[#bd1e23]" />
                        <a
                          href={`tel:${contactInfo.phone}`}
                          className="hover:text-[#bd1e23]"
                        >
                          {contactInfo.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="text-[#bd1e23]" />
                        <div>
                          {contactInfo.hours.length > 0 && (
                            <>
                              {getTranslatedHours(contactInfo.hours).map(
                                (hour, index) => (
                                  <p key={index}>{hour}</p>
                                )
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <ContactForm />
                </div>
              </div>
            </div>

            <div className="mt-16 h-[400px] rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3113.275259750262!2d-9.144994684685773!3d38.71472537959791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd19338e21f11ab1%3A0x1d94d0fb5f5b6ae5!2sR.%20de%20S%C3%A3o%20Pedro%20de%20Alc%C3%A2ntara%2065%2C%201250-238%20Lisboa%2C%20Portugal!5e0!3m2!1spt!2spt!4v1645541234567!5m2!1spt!2spt"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Restaurant location map"
              ></iframe>
            </div>
          </div>
        </section>
      </main>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="menu-title"
        >
          <div
            ref={menuRef}
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
          >
            {/* Menu modal content */}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;
