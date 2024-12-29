"use client"

import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronUp } from 'lucide-react'
import Link from 'next/link'
import FAQSection from './FAQSection'

const sections = [
  {
    title: "Definitions",
    content: "Platform: Refers to HomeCook, the online marketplace connecting home chefs with customers.\nUser: Any individual or entity using the HomeCook platform.\nChef: A user who offers cooking services through the platform.\nCustomer: A user who purchases meals or services from chefs on the platform.\nServices: The facilitation of connections between chefs and customers, including order processing and payment handling.\nOrder: A request made by a customer for a meal or service provided by a chef."
  },
  {
    title: "Eligibility",
    content: "You must be at least 18 years old to use the HomeCook platform. By using our services, you confirm that you are of legal age to form a binding contract. You must not use the platform for any illegal activities or in any manner inconsistent with these terms."
  },
  {
    title: "Account Creation",
    content: "To use HomeCook, you must create an account. You are responsible for maintaining the confidentiality of your account information, including your password. You agree to notify us immediately of any unauthorized use of your account. HomeCook reserves the right to refuse service, terminate accounts, or remove content at our discretion."
  },
  {
    title: "Platform Role",
    content: "HomeCook acts solely as a facilitator, connecting home chefs with customers. We do not prepare, handle, or deliver food. The chefs are solely responsible for the meals they provide, including quality, safety, and adherence to all applicable laws and regulations. HomeCook does not endorse any chef or guarantee the quality of their services."
  },
  {
    title: "Payment Terms",
    content: "All payments are processed through our secure platform. Customers are charged when placing an order. Funds are held and distributed to chefs after the successful completion of orders, minus applicable platform fees. Our current fee structure is [X]% of the total order value. Prices for meals and services are set by individual chefs and may be subject to change."
  },
  {
    title: "Order Policies",
    content: "Orders are placed directly through the platform. Customers can modify or cancel orders according to the chef's stated policies, which may vary. Chefs have the right to set minimum order requirements. Once an order is confirmed, both parties are obligated to fulfill their respective responsibilities unless extenuating circumstances arise."
  },
  {
    title: "User Responsibilities",
    content: "Customers must provide accurate information, including any dietary restrictions or allergies. Chefs must maintain high standards of food safety, hygiene, and accurately represent their offerings. Both parties agree to communicate respectfully and resolve any issues in good faith."
  },
  {
    title: "Reviews and Feedback",
    content: "Users are encouraged to leave honest, factual reviews. Chefs cannot delete or modify customer reviews but may respond to them. HomeCook reserves the right to remove reviews that violate our content policies or are deemed fraudulent."
  },
  {
    title: "Liability Disclaimer",
    content: "HomeCook is not liable for any issues arising from meals or services provided by chefs, including but not limited to food quality, allergic reactions, or illness. Users agree to indemnify and hold HomeCook harmless from any claims resulting from their use of the platform or any products or services obtained through the platform."
  },
  {
    title: "Intellectual Property",
    content: "The HomeCook platform, including all associated logos, trademarks, and content, is protected by copyright and other intellectual property laws. Users retain rights to their own content, such as profile pictures and menus, but grant HomeCook a license to use this content for platform-related purposes."
  },
  {
    title: "Termination of Service",
    content: "HomeCook reserves the right to suspend or terminate user accounts for violations of these terms, illegal activities, or any behavior deemed detrimental to the platform or its users. Users may also terminate their accounts at any time, subject to the completion of any ongoing transactions."
  },
  {
    title: "Dispute Resolution",
    content: "In the event of a dispute between users or with HomeCook, we encourage parties to first attempt to resolve the issue directly. If this is unsuccessful, disputes will be resolved through binding arbitration, conducted by a neutral arbitrator, in accordance with [Arbitration Association] rules."
  },
  {
    title: "Governing Law",
    content: "These terms are governed by and construed in accordance with the laws of [State/Country], without regard to its conflict of law principles. Any legal action or proceeding arising out of these terms shall be brought exclusively in the federal or state courts located in [City, State/Country]."
  }
]

export default function TermsOfService() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
          <p className="text-gray-600">Please read these terms carefully before using our platform.</p>
          <p className="text-sm text-gray-500">Effective Date: January 1, 2025</p>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Welcome to HomeCook, a platform connecting home chefs with customers for unique, home-cooked meals.</p>
          <p className="font-semibold">By using our services, you agree to these terms and conditions.</p>
        </CardContent>
      </Card>

      <Accordion type="single" collapsible className="mb-8">
        {sections.map((section, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{section.title}</AccordionTrigger>
            <AccordionContent>
              <p className="whitespace-pre-line">{section.content}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <FAQSection />

      <Card className="mt-8">
        <CardContent className="pt-6">
          <Button asChild className="w-full mb-4">
            <a href="/terms-of-service.pdf" download>Download PDF Version</a>
          </Button>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="space-x-4">
            <Link href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link>
            <Link href="/contact" className="text-blue-600 hover:underline">Contact Us</Link>
            <Link href="/help" className="text-blue-600 hover:underline">Help Center</Link>
          </div>
          <Button onClick={scrollToTop} size="sm" variant="outline">
            <ChevronUp className="mr-2 h-4 w-4" /> Back to Top
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

