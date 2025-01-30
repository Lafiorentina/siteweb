import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const ReservationForm = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    guests: "2",
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-[#3a6053]"
        >
          {t("form.fullName")}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="mt-1 block w-full rounded-md border-[#3a6053]/20 shadow-sm focus:border-[#bd1e23] focus:ring-[#bd1e23]"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-[#3a6053]"
          >
            {t("form.date")}
          </label>
          <input
            type="date"
            id="date"
            name="date"
            required
            className="mt-1 block w-full rounded-md border-[#3a6053]/20 shadow-sm focus:border-[#bd1e23] focus:ring-[#bd1e23]"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="time"
            className="block text-sm font-medium text-[#3a6053]"
          >
            {t("form.time")}
          </label>
          <input
            type="time"
            id="time"
            name="time"
            required
            className="mt-1 block w-full rounded-md border-[#3a6053]/20 shadow-sm focus:border-[#bd1e23] focus:ring-[#bd1e23]"
            value={formData.time}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="guests"
          className="block text-sm font-medium text-[#3a6053]"
        >
          {t("form.guests")}
        </label>
        <select
          id="guests"
          name="guests"
          className="mt-1 block w-full rounded-md border-[#3a6053]/20 shadow-sm focus:border-[#bd1e23] focus:ring-[#bd1e23]"
          value={formData.guests}
          onChange={handleChange}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <option key={num} value={num}>
              {num} {num === 1 ? t("form.person") : t("form.people")}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-[#bd1e23] text-white py-2 px-4 rounded-md hover:bg-[#a01a1e] transition-colors"
      >
        {t("form.reserve")}
      </button>

      {/* Affichage du résultat */}
      <div className="mt-4 text-center text-sm">
        {result && <p>{result}</p>}
      </div>
    </form>
  );
};

export default ReservationForm;
