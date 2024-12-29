import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Edit, Trash2 } from 'lucide-react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { MenuItem } from '@/app/types'

interface MenuOverviewProps {
  menuItems: MenuItem[]
  onEditItem: (item: MenuItem) => void
}

export function MenuOverview({ menuItems, onEditItem }: MenuOverviewProps) {
  const handleToggleAvailability = (id: number) => {
    // Implement toggle availability logic here
    const updatedMenuItems = menuItems.map(item => 
      item.id === id ? { ...item, available: !item.available } : item
    );
    // Assuming you have a way to update the menuItems state from outside this component.  This would likely involve a prop or context.
    // For this example, we'll just console log the updated state.  In a real application, you would update the state appropriately.
    console.log("Updated Menu Items:", updatedMenuItems);

  }

  const handleDeleteItem = (id: number) => {
    // Implement delete item logic here
    // Assuming you have a way to update the menuItems state from outside this component.  This would likely involve a prop or context.
    // For this example, we'll just console log the updated state.  In a real application, you would update the state appropriately.
    console.log("Deleted Item with ID:", id);
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Available</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {menuItems.map(item => (
          <TableRow key={item.id} className={item.available ? '' : 'opacity-50'}>
            <TableCell>
              <Image
                src={item.image || '/placeholder.svg?height=50&width=50&text=No+Image'}
                alt={item.name}
                width={50}
                height={50}
                className="rounded-md object-cover"
              />
            </TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.category}</TableCell>
            <TableCell>
              ${typeof item.price === 'number' ? item.price.toFixed(2) : Number(item.price).toFixed(2)}
              {item.discount && item.discount > 0 && (
                <span className="ml-2 text-sm text-red-500">-{item.discount}%</span>
              )}
            </TableCell>
            <TableCell>
              <Switch
                checked={item.available}
                onCheckedChange={() => handleToggleAvailability(item.id)}
              />
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => onEditItem(item)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the menu item.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteItem(item.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

