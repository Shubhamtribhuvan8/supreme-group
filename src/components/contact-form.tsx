"use client"

import type React from "react"

import { useState, type FormEvent } from "react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Form submitted:", formData)
    // Reset form after submission
    setFormData({
      fullName: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full name"
          className="w-full bg-transparent border-b border-white/50 py-2 px-1 focus:outline-none focus:border-white placeholder-white/70"
          required
        />
      </div>

      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="E-mail"
          className="w-full bg-transparent border-b border-white/50 py-2 px-1 focus:outline-none focus:border-white placeholder-white/70"
          required
        />
      </div>

      <div>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject"
          className="w-full bg-transparent border-b border-white/50 py-2 px-1 focus:outline-none focus:border-white placeholder-white/70"
          required
        />
      </div>

      <div>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
          rows={3}
          className="w-full bg-transparent border-b border-white/50 py-2 px-1 focus:outline-none focus:border-white placeholder-white/70 resize-none"
          required
        />
      </div>

      <div className="flex justify-start pt-4">
        <button
          type="submit"
          className="bg-white text-[#2751b8] px-8 py-2 rounded-full hover:bg-white/90 transition-colors"
        >
          Send
        </button>
      </div>
    </form>
  )
}
