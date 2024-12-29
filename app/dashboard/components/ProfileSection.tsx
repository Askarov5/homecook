import Image from 'next/image'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ProfileSectionProps {
  profilePicture: string
  name: string
  location: string
  bio: string
  onBioChange: (value: string) => void
}

export function ProfileSection({ profilePicture, name, location, bio, onBioChange }: ProfileSectionProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative w-32 h-32">
            <Image
              src={profilePicture}
              alt={name}
              fill
              className="rounded-full object-cover"
            />
            <Button size="sm" className="absolute bottom-0 right-0">
              Change
            </Button>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-gray-500">{location}</p>
            <Textarea
              className="mt-4"
              placeholder="Tell us about yourself..."
              value={bio}
              onChange={(e) => onBioChange(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

