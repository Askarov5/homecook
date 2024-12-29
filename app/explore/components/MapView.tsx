import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Chef } from '@/app/types/chef'

interface MapViewProps {
  chefs: Chef[]
}

export function MapView({ chefs }: MapViewProps) {
  const [selectedChef, setSelectedChef] = useState<Chef | null>(null)

  return (
    <div className="relative h-[600px] bg-gray-200 rounded-lg">
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-gray-500">Map View (Integration required)</p>
      </div>
      {chefs.map((chef) => (
        <div
          key={chef.id}
          className="absolute"
          style={{
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
          }}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedChef(chef)}
          >
            {chef.name}
          </Button>
        </div>
      ))}
      {selectedChef && (
        <Card className="absolute bottom-4 left-4 w-64">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">{selectedChef.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{selectedChef.location}</p>
            <Button onClick={() => window.alert(`Viewing profile of ${selectedChef.name}`)}>View Profile</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

