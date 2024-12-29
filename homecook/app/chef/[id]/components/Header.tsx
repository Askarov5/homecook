import { Chef } from '@/app/types'
import { Star, Instagram, Phone, Send, MapPin, Clock } from 'lucide-react'
import Image from 'next/image'

export function Header({ chef }: { chef: Chef }) {
  return (
    <section className="mb-12 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 md:h-64">
        <Image
          src={chef.banner as string}
          alt="Chef's banner"
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="relative w-32 h-32 md:w-48 md:h-48 -mt-20 md:-mt-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <Image
              src={chef.image}
              alt={chef.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2 text-green-800">{chef.name}</h1>
            <p className="text-gray-600 mb-4">{chef.bio}</p>
            <div className="flex items-center justify-center md:justify-start mb-4">
              <Star className="w-5 h-5 text-yellow-400 mr-1" />
              <span className="font-semibold mr-2">{chef.rating.toFixed(1)}</span>
              <span className="text-gray-600">({chef.reviews} reviews)</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
              <a href={`https://instagram.com/${chef.socialMedia.instagram}`} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href={`https://wa.me/${chef.socialMedia.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 transition-colors">
                <Phone className="w-6 h-6" />
              </a>
              <a href={`https://t.me/${chef.socialMedia.telegram}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 transition-colors">
                <Send className="w-6 h-6" />
              </a>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-2 text-orange-500" />
                <span>{chef.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-2 text-orange-500" />
                <span>Min. {chef.minPreorderDays} days pre-order</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

