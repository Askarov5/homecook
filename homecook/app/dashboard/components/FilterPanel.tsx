import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range"
import { DateRange } from 'react-day-picker'
import { Switch } from "@/components/ui/switch"

interface FilterPanelProps {
  filters: {
    status: string
    paymentStatus: string
    searchTerm: string
    dateRange: DateRange | undefined
    cuisine: string
    showTodayOrders: boolean
  }
  onFilterChange: (filters: FilterPanelProps['filters']) => void
}

export function FilterPanel({ filters, onFilterChange }: FilterPanelProps) {
  const [localFilters, setLocalFilters] = useState(filters)
  const [showTodayOrders, setShowTodayOrders] = useState(false)

  useEffect(() => {
    setLocalFilters(filters)
  }, [filters])

  const handleFilterChange = (key: keyof FilterPanelProps['filters'], value: string | DateRange | boolean | undefined) => {
    const newFilters = { ...localFilters, [key]: value, showTodayOrders }
    setLocalFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleResetFilters = () => {
    const initialFilters = {
      status: 'all',
      paymentStatus: 'all',
      searchTerm: '',
      dateRange: undefined,
      cuisine: 'all',
      showTodayOrders: false,
    }
    setLocalFilters(initialFilters)
    onFilterChange(initialFilters)
  }

  return (
    <div className="space-y-4 flex flex-wrap gap-2 justify-between">
      <div>
        <Label htmlFor="status">Order Status</Label>
        <Select
          value={localFilters.status}
          onValueChange={(value) => handleFilterChange('status', value)}
        >
          <SelectTrigger id="status">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="paymentStatus">Payment Status</Label>
        <Select
          value={localFilters.paymentStatus}
          onValueChange={(value) => handleFilterChange('paymentStatus', value)}
        >
          <SelectTrigger id="paymentStatus">
            <SelectValue placeholder="Select payment status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Paid">Paid</SelectItem>
            <SelectItem value="Unpaid">Unpaid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="searchTerm">Search</Label>
        <Input
          id="searchTerm"
          value={localFilters.searchTerm}
          onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
          placeholder="Search by customer or order ID"
        />
      </div>

      <div className="flex items-center space-x-2 mb-4">
        <Switch
          id="today-orders"
          checked={showTodayOrders}
          onCheckedChange={(checked) => {
            setShowTodayOrders(checked)
            handleFilterChange('showTodayOrders', checked)
          }}
        />
        <Label htmlFor="today-orders">Show Todays Orders</Label>
      </div>

      <div>
        <Label>Date Range</Label>
        <DatePickerWithRange
          dateRange={localFilters.dateRange}
          onDateRangeChange={(range) => handleFilterChange('dateRange', range)}
        />
      </div>

      <div className="flex justify-end space-x-2 mt-4">
        <Button type="button" variant="outline" onClick={handleResetFilters}>
          Reset Filters
        </Button>
        <Button onClick={() => onFilterChange(localFilters)}>Apply Filters</Button>
      </div>
    </div>
  )
}

