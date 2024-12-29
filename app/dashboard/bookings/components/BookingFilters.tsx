import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BookingFiltersProps {
  filters: {
    serviceType: string
    status: string
    searchTerm: string
  }
  setFilters: React.Dispatch<React.SetStateAction<BookingFiltersProps['filters']>>
}

export function BookingFilters({ filters, setFilters }: BookingFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1">
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          placeholder="Search by name or event type"
          value={filters.searchTerm}
          onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
        />
      </div>
      <div>
        <Label htmlFor="service-type">Service Type</Label>
        <Select
          value={filters.serviceType}
          onValueChange={(value) => setFilters(prev => ({ ...prev, serviceType: value }))}
        >
          <SelectTrigger id="service-type">
            <SelectValue placeholder="Select service type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Services</SelectItem>
            <SelectItem value="Catering">Catering</SelectItem>
            <SelectItem value="Private Events">Private Events</SelectItem>
            <SelectItem value="Cooking Lessons">Cooking Lessons</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <Select
          value={filters.status}
          onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
        >
          <SelectTrigger id="status">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Declined">Declined</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

