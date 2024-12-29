"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function PortfolioGallery({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)

  const nextImage = () => setCurrentIndex((prevIndex) => (prevIndex !== null ? (prevIndex + 1) % images.length : 0))
  const prevImage = () => setCurrentIndex((prevIndex) => (prevIndex !== null ? (prevIndex - 1 + images.length) % images.length : 0))

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4 text-green-800">Portfolio</h2>
      <div className="relative">
        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
          {images.map((image, index) => (
            <Dialog key={index} open={currentIndex === index} onOpenChange={(isOpen) => setCurrentIndex(isOpen ? index : null)}>
              <DialogTrigger asChild>
                <div className="relative w-40 h-40 flex-shrink-0 cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <Image
                    src={image}
                    alt={`Portfolio image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <div className="relative aspect-square">
                  <Image
                    src={images[currentIndex ?? 0]}
                    alt={`Portfolio image ${currentIndex !== null ? currentIndex + 1 : 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white bg-opacity-50 p-2">
                  <Button onClick={prevImage} variant="ghost">
                    <ChevronLeft size={24} />
                  </Button>
                </div>
                <div className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white bg-opacity-50 p-2">
                  <Button onClick={nextImage} variant="ghost">
                    <ChevronRight size={24} />
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  )
}