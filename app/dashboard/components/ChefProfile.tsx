import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileSection } from './ProfileSection'
import { SocialLinks } from './SocialLinks'
import { PortfolioManagement } from './PortfolioManagement'
import { AvailabilitySettings } from './AvailabilitySettings'
import { Chef } from '@/app/types'

export function ChefProfile() {
  const [chef, setChef] = useState<Chef>({
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    phone: '+1234567890',
    location: 'New York, NY',
    bio: 'Passionate chef specializing in Italian cuisine with a modern twist.',
    image: 'https://www.placehold.co/200x200',
    banner: 'https://www.placehold.co/1200x400',
    socialMedia: {
      instagram: 'chefalicej',
      facebook: 'chefalicej',
      twitter: 'chefalicej',
    },
    rating: 4.8,
    reviews: 120,
    minPreorderDays: 2,
    portfolio: [],
    menu: [],
    readyMeals: [],
    cateringServices: '',
    customerReviews: [],
    cuisines: ['Italian'],
    isDeliveryAvailable: true,
    deliveryConditions: 'Free delivery for orders over $50',
    additionalServices: [],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setChef(prev => ({ ...prev, [name]: value }))
  }

  const handleSocialLinkChange = (platform: string, value: string) => {
    setChef(prev => ({
      ...prev,
      socialMedia: { ...prev.socialMedia, [platform]: value },
    }))
  }

  const handleSave = () => {
    // Here you would typically send the updated chef data to your backend
    console.log('Saving chef data:', chef)
  }

  return (
    <div className="space-y-8">
      <ProfileSection
        profilePicture={chef.image}
        name={chef.name}
        location={chef.location}
        bio={chef.bio}
        onBioChange={(value) => setChef(prev => ({ ...prev, bio: value }))}
      />

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={chef.name} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={chef.email} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" type="tel" value={chef.phone} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" value={chef.location} onChange={handleInputChange} />
              </div>
            </div>
            <Button onClick={handleSave}>Save Changes</Button>
          </form>
        </CardContent>
      </Card>

      <SocialLinks links={chef.socialMedia} onChange={handleSocialLinkChange} />

      <Tabs defaultValue="portfolio">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
        </TabsList>
        <TabsContent value="portfolio">
          <PortfolioManagement />
        </TabsContent>
        <TabsContent value="availability">
          <AvailabilitySettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}

