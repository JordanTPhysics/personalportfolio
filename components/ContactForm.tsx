"use client";

import { useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";

interface FormData {
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await emailjs.send(
        "service_iryb57a",
        "template_up0hhaa",
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone || "Not provided",
          topic: formData.topic || "General Inquiry",
          message: formData.message,
        },
        "3oQOYQi8O2nwB1qNI"
      );

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        topic: "",
        message: "",
      });
    } catch (error) {
      console.error("EmailJS error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold mb-1">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-black px-4 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-black px-4 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold mb-1">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-black px-4 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label htmlFor="topic" className="block text-sm font-semibold mb-1">
            Topic
          </label>
          <select
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            className="w-full border border-black px-4 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">Select a topic</option>
            <option value="Revenue Growth">Revenue Growth</option>
            <option value="Cost Savings">Cost Savings</option>
            <option value="Customer Analysis">Customer Analysis</option>
            <option value="Forecasting">Forecasting</option>
            <option value="General Inquiry">General Inquiry</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold mb-1">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={formData.message}
          onChange={handleChange}
          className="w-full border border-black px-4 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-black resize-none"
        />
      </div>

      {submitStatus === "success" && (
        <div className="border-2 border-black p-4 bg-green-100">
          <p className="text-body font-semibold">Thank you! Your message has been sent.</p>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="border-2 border-black p-4 bg-red-100">
          <p className="text-body font-semibold">Something went wrong. Please try again or email directly.</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="border mx-auto border-black px-8 py-3 font-semibold bg-background hover:bg-blue-500 hover:text-white duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

