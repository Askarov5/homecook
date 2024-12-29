import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon, Star } from 'lucide-react'

interface DashboardMetricProps {
  title: string
  value: string
  trend?: string
  icon?: 'star'
}

export function DashboardMetric({ title, value, trend, icon }: DashboardMetricProps) {
  const trendValue = trend ? parseFloat(trend) : 0
  const isPositive = trendValue >= 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon === 'star' && <Star className="h-4 w-4 text-yellow-400" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className={`text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <ArrowUpIcon className="inline h-4 w-4" /> : <ArrowDownIcon className="inline h-4 w-4" />}
            {trend}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

