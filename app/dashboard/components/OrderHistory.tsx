import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const orders = [
  { id: 1, chef: 'Alice Johnson', dish: 'Spaghetti Carbonara', price: '$15.99', date: '2023-06-01', status: 'Completed' },
  { id: 2, chef: 'Bob Smith', dish: 'Margherita Pizza', price: '$12.99', date: '2023-05-28', status: 'Completed' },
  { id: 3, chef: 'Charlie Davis', dish: 'Tiramisu', price: '$7.99', date: '2023-05-25', status: 'Completed' },
]

export function OrderHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Chef</TableHead>
              <TableHead>Dish</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.chef}</TableCell>
                <TableCell>{order.dish}</TableCell>
                <TableCell>{order.price}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

