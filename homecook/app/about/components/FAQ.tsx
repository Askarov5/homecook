import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
  const faqs = [
    {
      question: "What is HomeCook?",
      answer: "HomeCook is a platform that connects home chefs with customers looking for delicious, personalized meals. We provide a marketplace for talented cooks to showcase their skills and for food enthusiasts to discover unique culinary experiences.",
    },
    {
      question: "Is it free to join?",
      answer: "Yes, signing up is completely free for both customers and chefs. We only charge a small service fee on completed orders to maintain and improve our platform.",
    },
    {
      question: "How do I know the chef's food is safe?",
      answer: "Food safety is our top priority. All chefs on our platform must agree to follow strict food safety standards and guidelines. Additionally, our review system provides transparency, allowing customers to share their experiences and helping maintain high-quality standards.",
    },
    {
      question: "What if I have dietary restrictions?",
      answer: "When placing an order, you can specify your dietary needs or restrictions. Our chefs are experienced in accommodating various dietary requirements and will work to ensure your meal meets your needs.",
    },
    {
      question: "How do chefs get paid?",
      answer: "Payments are processed securely through our platform. Once an order is completed and the customer confirms satisfaction, the payment is transferred to the chef's account, minus our service fee.",
    },
    {
      question: "Can chefs manage their availability?",
      answer: "Chefs have full control over their availability. They can set their working days and times in their profile, ensuring they only receive orders when they're ready to cook.",
    },
    {
      question: "What happens if there's an issue with my order?",
      answer: "We have a dedicated support team to handle any issues that may arise. If you experience any problems with your order, you can reach out to our support team through the platform, and we'll work to resolve the issue promptly and fairly.",
    },
  ]
  
  export default function FAQ() {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-green-800">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg text-green-700">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    )
  }
  
  