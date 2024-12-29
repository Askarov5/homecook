"use client"

import * as React from "react"
import { CalendarIcon, Clock } from 'lucide-react'
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function DateTimePicker({
  value,
  onChange,
  minDate,
}: {
  value: Date
  onChange: (date: Date | null) => void
  minDate: Date
}) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(value)
  const [selectedTime, setSelectedTime] = React.useState<string>(format(value, "HH:mm"))

  React.useEffect(() => {
    if (selectedDate) {
      const [hours, minutes] = selectedTime.split(":").map(Number)
      const newDate = new Date(selectedDate)
      newDate.setHours(hours)
      newDate.setMinutes(minutes)
      if (newDate.getTime() !== value.getTime()) {
        onChange(newDate)
      }
    }
  }, [selectedDate, selectedTime, onChange, value])

  return (
    <div className="flex space-x-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            initialFocus
            disabled={(date) => date < minDate}
          />
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[120px] justify-start text-left font-normal",
              !selectedTime && "text-muted-foreground"
            )}
          >
            <Clock className="mr-2 h-4 w-4" />
            {selectedTime || <span>Pick a time</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="grid gap-2 p-2">
            <Select
              value={selectedTime}
              onValueChange={(value) => setSelectedTime(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a time" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 24 * 4 }).map((_, index) => {
                  const hours = Math.floor(index / 4)
                  const minutes = (index % 4) * 15
                  const timeString = `${hours.toString().padStart(2, "0")}:${minutes
                    .toString()
                    .padStart(2, "0")}`
                  return (
                    <SelectItem key={timeString} value={timeString}>
                      {timeString}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

