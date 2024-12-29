"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { Moon, Sun, Bell } from 'lucide-react'

export default function SettingsPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
  })

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
    // In a real application, you would apply the theme change here
    document.documentElement.classList.toggle('dark')
  }

  const handleNotificationChange = (type: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [type]: !prev[type] }))
  }

  const handleSave = () => {
    // In a real application, you would save the settings to a backend or local storage here
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your general preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="theme-toggle">Theme</Label>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Choose between light and dark mode
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Sun className="h-5 w-5" />
                  <Switch
                    id="theme-toggle"
                    checked={theme === 'dark'}
                    onCheckedChange={toggleTheme}
                  />
                  <Moon className="h-5 w-5" />
                </div>
              </div>
              {/* Add more general settings here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor={`${key}-notifications`}>{key.charAt(0).toUpperCase() + key.slice(1)} Notifications</Label>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Receive notifications via {key}
                    </div>
                  </div>
                  <Switch
                    id={`${key}-notifications`}
                    checked={value}
                    onCheckedChange={() => handleNotificationChange(key as keyof typeof notifications)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="mt-8 flex justify-end">
        <Button onClick={handleSave}>Save Settings</Button>
      </div>
    </div>
  )
}

