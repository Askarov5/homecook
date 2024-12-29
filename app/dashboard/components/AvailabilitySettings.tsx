import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export function AvailabilitySettings() {
  const [availability, setAvailability] = useState({
    isAvailable: true,
    days: daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: true }), {}),
    times: daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: { start: '09:00', end: '17:00' } }), {}),
  })

  const handleAvailabilityToggle = () => {
    setAvailability(prev => ({ ...prev, isAvailable: !prev.isAvailable }))
  }

  const handleDayToggle = (day: string) => {
    setAvailability(prev => ({
      ...prev,
      days: { ...prev.days, [day]: !prev.days[day] },
    }))
  }

  const handleTimeChange = (day: string, period: 'start' | 'end', value: string) => {
    setAvailability(prev => ({
      ...prev,
      times: { ...prev.times, [day]: { ...prev.times[day], [period]: value } },
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Availability Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="availability-toggle">Available for Orders</Label>
            <Switch
              id="availability-toggle"
              checked={availability.isAvailable}
              onCheckedChange={handleAvailabilityToggle}
            />
          </div>
          {daysOfWeek.map(day => (
            <div key={day} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor={`${day}-toggle`}>{day}</Label>
                <Switch
                  id={`${day}-toggle`}
                  checked={availability.days[day]}
                  onCheckedChange={() => handleDayToggle(day)}
                />
              </div>
              {availability.days[day] && (
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Label htmlFor={`${day}-start`}>Start Time</Label>
                    <Select
                      value={availability.times[day].start}
                      onValueChange={(value) => handleTimeChange(day, 'start', value)}
                    >
                      <SelectTrigger id={`${day}-start`}>
                        <SelectValue placeholder="Select start time" />
                      </SelectTrigger>
                      <SelectContent>
                        {['09:00', '10:00', '11:00', '12:00'].map(time => (
                          <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <Label htmlFor={`${day}-end`}>End Time</Label>
                    <Select
                      value={availability.times[day].end}
                      onValueChange={(value) => handleTimeChange(day, 'end', value)}
                    >
                      <SelectTrigger id={`${day}-end`}>
                        <SelectValue placeholder="Select end time" />
                      </SelectTrigger>
                      <SelectContent>
                        {['17:00', '18:00', '19:00', '20:00'].map(time => (
                          <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          ))}
          <Button>Save Availability Settings</Button>
        </div>
      </CardContent>
    </Card>
  )
}

