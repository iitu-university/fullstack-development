import { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import type { Item } from './App'

type AddItemProps = {
  addItem: (item: Item) => void
}

function AddItem(props: AddItemProps) {
  const [open, setOpen] = useState(false)
  const [item, setItem] = useState<Item>({ product: '', amount: '' })

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const addItem = () => {
    props.addItem(item)
    setItem({ product: '', amount: '' })
    handleClose()
  }

  return (
    <>
      <Button variant="outlined" onClick={handleOpen} sx={{ mt: 1 }}>
        Add Item
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="new-item-title">
        <DialogTitle id="new-item-title">New Item</DialogTitle>
        <DialogContent>
          <TextField
            label="Product"
            margin="dense"
            fullWidth
            value={item.product}
            onChange={(event) => setItem({ ...item, product: event.target.value })}
          />
          <TextField
            label="Amount"
            margin="dense"
            fullWidth
            value={item.amount}
            onChange={(event) => setItem({ ...item, amount: event.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addItem}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AddItem
