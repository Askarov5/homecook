import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function DietaryPreferences() {
  const [preferences, setPreferences] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    nutFree: false,
  })
  const [allergies, setAllergies] = useState([''])

  const handlePreferenceChange = (preference: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [preference]: !prev[preference] }))
  }

  const handleAllergyChange = (index: number, value: string) => {
    const newAllergies = [...allergies]
    newAllergies[index] = value
    setAllergies(newAllergies)
  }

  const handleAddAllergy = () => {
    setAllergies([...allergies, ''])
  }

  const handleRemoveAllergy = (index: number) => {
    const newAllergies = allergies.filter((_, i) => i !== index)
    setAllergies(newAllergies)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dietary Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Preferences</h3>
            <div className="space-y-2">
              {Object.entries(preferences).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={value}
                    onCheckedChange={() => handlePreferenceChange(key as keyof typeof preferences)}
                  />
                  <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Allergies</h3>
            <div className="space-y-2">
              {allergies.map((allergy, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={allergy}
                    onChange={(e) => handleAllergyChange(index, e.target.value)}
                    placeholder="Enter an allergy"
                  />
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleRemoveAllergy(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button onClick={handleAddAllergy}>Add Allergy</Button>
            </div>
          </div>
          <Button>Save Preferences</Button>
        </div>
      </CardContent>
    </Card>
  )
}

