import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SocialLinksProps {
  links: {
    instagram?: string
    facebook?: string
    twitter?: string
  }
  onChange: (platform: string, value: string) => void
}

export function SocialLinks({ links, onChange }: SocialLinksProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Links</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="instagram">Instagram</Label>
            <Input
              id="instagram"
              value={links.instagram || ''}
              onChange={(e) => onChange('instagram', e.target.value)}
              placeholder="Username"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="facebook">Facebook</Label>
            <Input
              id="facebook"
              value={links.facebook || ''}
              onChange={(e) => onChange('facebook', e.target.value)}
              placeholder="Username"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="twitter">Twitter</Label>
            <Input
              id="twitter"
              value={links.twitter || ''}
              onChange={(e) => onChange('twitter', e.target.value)}
              placeholder="Username"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

