import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const ContactForm = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    reason: "",
    message: "",
  });
  const [result, setResult] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult("Sending...");
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Ajouter la clé d'accès Web3Forms
    formData.append("access_key", "a942acba-c508-47d6-b12d-5be8d05d8de7"); // Remplace par ta clé d'accès Web3Forms

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        form.reset();
      } else {
        setResult(data.message || "An error occurred.");
      }
    } catch (error) {
      console.log("Error:", error);
      setResult("There was an error with the submission.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-medium text-[#3a6053]"
          >
            {t("form.fullName")}
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            required
            className="mt-1 block w-full rounded-md border-[#3a6053]/20 shadow-sm focus:border-[#bd1e23] focus:ring-[#bd1e23]"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-medium text-[#3a6053]"
          >
            Email
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            required
            className="mt-1 block w-full rounded-md border-[#3a6053]/20 shadow-sm focus:border-[#bd1e23] focus:ring-[#bd1e23]"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-reason"
          className="block text-sm font-medium text-[#3a6053]"
        >
          {t("form.reason")}
        </label>
        <select
          id="contact-reason"
          name="reason"
          required
          className="mt-1 block w-full rounded-md border-[#3a6053]/20 shadow-sm focus:border-[#bd1e23] focus:ring-[#bd1e23]"
          value={formData.reason}
          onChange={handleChange}
        >
          <option value="">{t("form.select.reason")}</option>
          <option value="general">{t("form.reason.general")}</option>
          <option value="group">{t("form.reason.group")}</option>
          <option value="private">{t("form.reason.private")}</option>
          <option value="feedback">{t("form.reason.feedback")}</option>
          <option value="partnership">{t("form.reason.partnership")}</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="contact-subject"
          className="block text-sm font-medium text-[#3a6053]"
        >
          {t("form.subject")}
        </label>
        <input
          type="text"
          id="contact-subject"
          name="subject"
          required
          className="mt-1 block w-full rounded-md border-[#3a6053]/20 shadow-sm focus:border-[#bd1e23] focus:ring-[#bd1e23]"
          value={formData.subject}
          onChange={handleChange}
        />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-[#3a6053]"
        >
          {t("form.message")}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          className="mt-1 block w-full rounded-md border-[#3a6053]/20 shadow-sm focus:border-[#bd1e23] focus:ring-[#bd1e23]"
          value={formData.message}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#bd1e23] text-white py-2 px-4 rounded-md hover:bg-[#a01a1e] transition-colors"
      >
        {t("form.send")}
      </button>

      {/* Affichage du résultat */}
      <div className="mt-4 text-center text-sm">
        {result && <p>{result}</p>}
      </div>
    </form>
  );
};

export default ContactForm;
