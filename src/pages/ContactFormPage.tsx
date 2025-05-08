import ContactForm from "@/components/contact-form"

export default function ContactFormPage() {
  return (
    <main className="min-h-screen bg-[#0067B1] text-white">
      <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row gap-12 md:gap-24 max-w-6xl">
        {/* Left Column - Contact Information */}
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-medium mb-2">Get in touch</h1>
          <div className="w-12 h-0.5 bg-white mb-8"></div>

          <p className="mb-8">For general enquiries</p>

          <div className="space-y-8">
            <div>
              <p className="font-light">Address :</p>
              <p>110, 10th Road, Chembur, Mumbai - 400071</p>
            </div>

            <div>
              <p className="font-light">Phone :</p>
              <p>+91 22 25208822</p>
            </div>

            <div>
              <p className="font-light">Email :</p>
              <p>info@supremegroup.co.in</p>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="flex-1">
          <ContactForm />
        </div>
      </div>
    </main>
  )
}
