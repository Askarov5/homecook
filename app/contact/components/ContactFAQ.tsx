import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

const faqs = [
  {
    question: "How do I reset my password?",
    answer: "Use the 'Forgot Password' option on the login page. You'll receive an email with instructions to reset your password."
  },
  {
    question: "What should I do if I have an issue with an order?",
    answer: "Contact the chef directly through the order page or use the form above to reach our support team. We'll help resolve any issues promptly."
  },
  {
    question: "How can I become a chef on the platform?",
    answer: "Visit our 'Join as a Chef' page to create your profile and start earning today! You'll need to provide some basic information and pass a brief verification process."
  }
]

export default function FAQ() {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <Button asChild className="w-full mt-4">
          <Link href="/faq">Explore More FAQs</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

