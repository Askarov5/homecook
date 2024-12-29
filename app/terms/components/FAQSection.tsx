import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const faqs = [
  {
    question: "What happens if there's a dispute between a chef and a customer?",
    answer: "We encourage users to first attempt to resolve disputes directly. If this is unsuccessful, HomeCook provides a mediation service. For unresolved issues, disputes will be settled through binding arbitration as outlined in our Terms of Service."
  },
  {
    question: "Can I use HomeCook for my catering business?",
    answer: "HomeCook is designed for individual home chefs. If you operate a catering business, you may use the platform, but you must comply with all applicable laws and regulations for commercial food preparation and service in your area."
  },
  {
    question: "What are my rights if I have a bad experience with a meal?",
    answer: "If you have a negative experience, we encourage you to contact the chef directly first. If the issue isn't resolved, you can report it to HomeCook support. While we don't guarantee refunds, we will review each case and may offer compensation or take action against chefs who consistently provide poor experiences."
  },
  {
    question: "How does HomeCook ensure food safety?",
    answer: "While HomeCook doesn't directly handle food preparation, we require all chefs to comply with local health and safety regulations. We also provide food safety guidelines and may suspend chefs who receive consistent complaints about food safety issues."
  },
  {
    question: "Can I delete my account and all my data?",
    answer: "Yes, you can request account deletion through your account settings or by contacting our support team. We will delete your personal information, although some data may be retained for legal or operational purposes as outlined in our Privacy Policy."
  }
]

export default function FAQSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}

