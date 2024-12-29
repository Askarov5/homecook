import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MessageCircle, MapPin } from 'lucide-react'

export default function ContactInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Direct Contact</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Mail className="text-green-600" />
          <span>support@homecook.com</span>
        </div>
        <div className="flex items-center space-x-2">
          <Phone className="text-green-600" />
          <span>+1-800-123-4567</span>
        </div>
        <div>
          <Button className="w-full flex items-center justify-center space-x-2">
            <MessageCircle className="mr-2" />
            <span>Chat Now</span>
          </Button>
          <p className="text-sm text-gray-500 mt-2">
            For faster responses, use our live chat available 9 AM - 6 PM (local time).
          </p>
        </div>
        <div className="pt-4 border-t">
          <h3 className="font-semibold mb-2 flex items-center">
            <MapPin className="mr-2 text-green-600" />
            Office Address
          </h3>
          <p>123 Culinary Lane, Foodie City, FC 12345</p>
          <div className="mt-4 aspect-video">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968459391!3d40.74844797932861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1635186714513!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

