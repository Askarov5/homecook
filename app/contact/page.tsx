import ContactHeader from './components/ContactHeader'
import ContactForm from './components/ContactForm'
import ContactInfo from './components/ContactInfo'
import FAQ from './components/ContactFAQ'
import SocialMedia from './components/SocialMedia'

export default function ContactPage() {
  return (
    <>
        <ContactHeader />
        <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <ContactForm />
            <SocialMedia />
          </div>
          <div>
            <ContactInfo />
            <FAQ />
          </div>
        </div>
    </>
  )
}

