import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileSection } from './ProfileSection'
import { SocialLinks } from './SocialLinks'
import { OrderHistory } from './OrderHistory'
import { Favorites } from './Favorites'
import { DietaryPreferences } from './DietaryPreferences'
import { User } from '@/app/types'
import { AvailabilitySettings } from './AvailabilitySettings'

export function UserProfile() {
  const [user, setUser] = useState<User>({
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1987654321',
    location: 'Los Angeles, CA',
    bio: 'Food enthusiast always on the lookout for new culinary experiences.',
    profilePicture: '/placeholder.svg?height=200&width=200',
    socialLinks: {
      instagram: 'johndoe',
      facebook: 'johndoe',
      twitter: 'johndoe',
    },
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUser(prev => ({ ...prev, [name]: value }))
  }

  const handleSocialLinkChange = (platform: string, value: string) => {
    setUser(prev => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value },
    }))
  }

  const handleSave = () => {
    // Here you would typically send the updated user data to your backend
    console.log('Saving user data:', user)
  }

  return (
    <div className="space-y-8">
      <ProfileSection
        profilePicture={user.profilePicture}
        name={user.name}
        location={user.location}
        bio={user.bio}
        onBioChange={(value) => setUser(prev => ({ ...prev, bio: value }))}
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
                <Input id="name" name="name" value={user.name} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={user.email} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" type="tel" value={user.phone} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" value={user.location} onChange={handleInputChange} />
              </div>
            </div>
            <Button onClick={handleSave}>Save Changes</Button>
          </form>
        </CardContent>
      </Card>

      <SocialLinks links={user.socialLinks} onChange={handleSocialLinkChange} />

      <Tabs defaultValue="orders">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="orders">Order History</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="preferences">Dietary Preferences</TabsTrigger>
        </TabsList>
        <TabsContent value="orders">
          <OrderHistory />
        </TabsContent>
        <TabsContent value="favorites">
          <Favorites />
        </TabsContent>
        <TabsContent value="preferences">
          <DietaryPreferences />
        </TabsContent>
      </Tabs>
    </div>
  )
}

