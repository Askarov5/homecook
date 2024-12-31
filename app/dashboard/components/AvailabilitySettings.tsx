"use client"

import React, { useState, useEffect } from 'react'
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, parseISO } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type ServiceType = 'inHomeCooking' | 'privateEvents' | 'cookingLessons' | 'dietaryPlanning' | 'groceryShopping' | 'catering';

interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  serviceType: ServiceType;
  address: string;
}

interface DayEvents {
  date: Date;
  events: Event[];
}

const serviceTypeColors: Record<ServiceType, string> = {
  inHomeCooking: 'bg-red-200',
  privateEvents: 'bg-blue-200',
  cookingLessons: 'bg-green-200',
  dietaryPlanning: 'bg-yellow-200',
  groceryShopping: 'bg-purple-200',
  catering: 'bg-pink-200',
};

export function AvailabilitySettings() {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [events, setEvents] = useState<DayEvents[]>([]);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event>({ id: '', title: '', start: '', end: '', serviceType: 'inHomeCooking', address: '' });
  const [isEditing, setIsEditing] = useState(false);

  const handleDayClick = (day: Date) => {
    setSelectedDay(day);
  };

  const handleAddOrUpdateEvent = () => {
    if (selectedDay) {
      const updatedEvents = isEditing
        ? events.map(e => 
            isSameDay(e.date, selectedDay)
              ? { ...e, events: e.events.map(ev => ev.id === currentEvent.id ? currentEvent : ev) }
              : e
          )
        : events.map(e => 
            isSameDay(e.date, selectedDay)
              ? { ...e, events: [...e.events, { ...currentEvent, id: Date.now().toString() }] }
              : e
          );
      
      if (!events.some(e => isSameDay(e.date, selectedDay))) {
        updatedEvents.push({ date: selectedDay, events: [{ ...currentEvent, id: Date.now().toString() }] });
      }
      
      setEvents(updatedEvents);
      setIsEventDialogOpen(false);
      setCurrentEvent({ id: '', title: '', start: '', end: '', serviceType: 'inHomeCooking', address: '' });
      setIsEditing(false);
    }
  };

  const handleEditEvent = (event: Event) => {
    setCurrentEvent(event);
    setIsEditing(true);
    setIsEventDialogOpen(true);
  };

  const handleRemoveEvent = (eventId: string) => {
    if (selectedDay) {
      const updatedEvents = events.map(e => 
        isSameDay(e.date, selectedDay)
          ? { ...e, events: e.events.filter(event => event.id !== eventId) }
          : e
      );
      setEvents(updatedEvents);
    }
  };

  const isDayUnavailable = (day: Date) => {
    return events.some(e => isSameDay(e.date, day) && e.events.length > 0);
  };

  const getEventColor = (day: Date) => {
    const dayEvents = events.find(e => isSameDay(e.date, day))?.events;
    if (dayEvents && dayEvents.length > 0) {
      return serviceTypeColors[dayEvents[0].serviceType];
    }
    return '';
  };

  const renderCalendar = () => {
    const monthStart = startOfMonth(selectedMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = addDays(monthStart, -monthStart.getDay());
    const endDate = addDays(monthEnd, 6 - monthEnd.getDay());

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={cn(
              "h-10 w-10 flex items-center justify-center rounded-full cursor-pointer",
              !isSameMonth(day, monthStart) && "text-gray-400",
              selectedDay && isSameDay(day, selectedDay) && "bg-blue-500 text-white",
              isDayUnavailable(day) && getEventColor(day)
            )}
            key={day.toString()}
            onClick={() => handleDayClick(cloneDay)}
          >
            {formattedDate}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="flex justify-between mt-2" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="mt-4">{rows}</div>;
  };

  const renderMonthlyEventList = () => {
    const monthEvents = events.filter(e => isSameMonth(e.date, selectedMonth));
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Events for {format(selectedMonth, 'MMMM yyyy')}</h3>
        {monthEvents.map((dayEvent) => (
          <div key={dayEvent.date.toString()}>
            <h4 className="font-semibold">{format(dayEvent.date, 'MMMM d, yyyy')}</h4>
            {dayEvent.events.map((event) => (
              <div key={event.id} className={cn("p-2 rounded mt-2", serviceTypeColors[event.serviceType])}>
                <p className="font-semibold">{event.title}</p>
                <p className="text-sm">{event.start} - {event.end}</p>
                <p className="text-sm">{event.serviceType}</p>
                <p className="text-sm">{event.address}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Set Your Unavailable Times</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <Button onClick={() => setSelectedMonth(addDays(selectedMonth, -30))}>Previous Month</Button>
              <h2 className="text-lg font-semibold">{format(selectedMonth, 'MMMM yyyy')}</h2>
              <Button onClick={() => setSelectedMonth(addDays(selectedMonth, 30))}>Next Month</Button>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="font-semibold">{day}</div>
              ))}
            </div>
            {renderCalendar()}
          </div>
          <div className="flex-1">
            {selectedDay ? (
              <Card>
                <CardHeader>
                  <CardTitle>{format(selectedDay, 'MMMM d, yyyy')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button onClick={() => {
                      setIsEditing(false);
                      setCurrentEvent({ id: '', title: '', start: '', end: '', serviceType: 'inHomeCooking', address: '' });
                      setIsEventDialogOpen(true);
                    }}>
                      Add Unavailable Time
                    </Button>
                    {events.find(e => isSameDay(e.date, selectedDay))?.events.map((event) => (
                      <div key={event.id} className={cn("flex items-center justify-between p-2 rounded", serviceTypeColors[event.serviceType])}>
                        <div>
                          <p className="font-semibold">{event.title}</p>
                          <p className="text-sm">{event.start} - {event.end}</p>
                          <p className="text-sm">{event.serviceType}</p>
                          <p className="text-sm">{event.address}</p>
                        </div>
                        <div>
                          <Button variant="outline" size="sm" onClick={() => handleEditEvent(event)} className="mr-2">
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleRemoveEvent(event.id)}>
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              renderMonthlyEventList()
            )}
          </div>
        </div>
      </CardContent>
      <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Unavailable Time' : 'Add Unavailable Time'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={currentEvent.title}
                onChange={(e) => setCurrentEvent({ ...currentEvent, title: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="start" className="text-right">
                Start Time
              </Label>
              <Input
                id="start"
                type="time"
                value={currentEvent.start}
                onChange={(e) => setCurrentEvent({ ...currentEvent, start: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="end" className="text-right">
                End Time
              </Label>
              <Input
                id="end"
                type="time"
                value={currentEvent.end}
                onChange={(e) => setCurrentEvent({ ...currentEvent, end: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="serviceType" className="text-right">
                Service Type
              </Label>
              <Select
                value={currentEvent.serviceType}
                onValueChange={(value: ServiceType) => setCurrentEvent({ ...currentEvent, serviceType: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inHomeCooking">In-Home Cooking</SelectItem>
                  <SelectItem value="privateEvents">Private Events</SelectItem>
                  <SelectItem value="cookingLessons">Cooking Lessons</SelectItem>
                  <SelectItem value="dietaryPlanning">Dietary Planning</SelectItem>
                  <SelectItem value="groceryShopping">Grocery Shopping</SelectItem>
                  <SelectItem value="catering">Catering</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Textarea
                id="address"
                value={currentEvent.address}
                onChange={(e) => setCurrentEvent({ ...currentEvent, address: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddOrUpdateEvent}>
              {isEditing ? 'Update Event' : 'Add Event'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

