"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Utensils, Users, DollarSign } from 'lucide-react'

export function CateringServices({ description }: { description: string }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4 text-green-800">Catering Services</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <p className="text-gray-600 mb-4">{description}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center">
                <Utensils className="w-6 h-6 text-orange-500 mr-2" />
                <span className="text-gray-700">Custom Menus</span>
              </div>
              <div className="flex items-center">
                <Users className="w-6 h-6 text-orange-500 mr-2" />
                <span className="text-gray-700">Events up to 50 people</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="w-6 h-6 text-orange-500 mr-2" />
                <span className="text-gray-700">Minimum order $300</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  Contact for Catering
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Contact for Catering Services</DialogTitle>
                </DialogHeader>
                <form onSubmit={(e) => {
                  e.preventDefault()
                  // Handle form submission here
                  setIsDialogOpen(false)
                }}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="name" className="text-right">
                        Name
                      </label>
                      <Input id="name" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="email" className="text-right">
                        Email
                      </label>
                      <Input id="email" type="email" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="event-type" className="text-right">
                        Event Type
                      </label>
                      <Input id="event-type" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="message" className="text-right">
                        Message
                      </label>
                      <Textarea id="message" className="col-span-3" />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                      Send Inquiry
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  )
}

