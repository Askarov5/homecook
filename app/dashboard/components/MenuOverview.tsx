import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Edit, Trash2 } from 'lucide-react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { MenuItem } from '@/app/types'
import { useState } from 'react'

interface MenuOverviewProps {
  menuItems: MenuItem[]
  onEditItem: (item: MenuItem) => void
  onDeleteItem: (id: number) => void
  onUpdateAvailability: (id: number, available: boolean, availablePortion: number) => void
  onUpdateAvailablePortion: (id: number, availablePortion: number) => void
}

export function MenuOverview({ menuItems, onEditItem, onDeleteItem, onUpdateAvailability, onUpdateAvailablePortion }: MenuOverviewProps) {
  const [editingPortionId, setEditingPortionId] = useState<number | null>(null);

  const handleToggleAvailability = (id: number, available: boolean) => {
    const item = menuItems.find(item => item.id === id);
    if (item) {
      const updatedItem = {
        ...item,
        available,
        availablePortion: available ? item.minPortions : 0
      };
      onUpdateAvailability(id, available, updatedItem.availablePortion);
    }
  }

  const handlePortionChange = (id: number, value: string) => {
    const portion = parseInt(value, 10);
    if (!isNaN(portion) && portion >= 0) {
      onUpdateAvailablePortion(id, portion);
    }
  }

  const handlePortionBlur = () => {
    setEditingPortionId(null);
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
          <TableHead>Portions</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {menuItems.map((item) => (
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
                onCheckedChange={(checked) => handleToggleAvailability(item.id, checked)}
              />
            </TableCell>
            <TableCell>
              {item.available ? (
                editingPortionId === item.id ? (
                  <Input
                    type="number"
                    value={item.availablePortions}
                    onChange={(e) => handlePortionChange(item.id, e.target.value)}
                    onBlur={handlePortionBlur}
                    className="w-20"
                    min={0}
                  />
                ) : (
                  <span onClick={() => setEditingPortionId(item.id)}>{item.availablePortions}</span>
                )
              ) : (
                <span className="text-gray-400">N/A</span>
              )}
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
                      <AlertDialogAction onClick={() => onDeleteItem(item.id)}>
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

