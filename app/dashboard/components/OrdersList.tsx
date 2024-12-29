import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

const orders = [
  { id: 1, customer: 'John Doe', amount: '$45.00', status: 'Pending', dietaryRestrictions: 'Gluten-free' },
  { id: 2, customer: 'Jane Smith', amount: '$32.50', status: 'Confirmed', dietaryRestrictions: 'Vegetarian' },
  { id: 3, customer: 'Bob Johnson', amount: '$28.75', status: 'Preparing', dietaryRestrictions: 'None' },
]

export function OrdersList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Dietary Restrictions</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.customer}</TableCell>
            <TableCell>{order.amount}</TableCell>
            <TableCell>{order.status}</TableCell>
            <TableCell>{order.dietaryRestrictions}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm">View</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

