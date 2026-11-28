import { useState } from 'react'
import type { FormEvent } from 'react'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addCar, updateCar } from '../api/carapi'
import type { Car, CarResponse } from '../api/carapi'

type CarDialogProps = {
  car?: CarResponse
  onClose: () => void
}

const fields = [
  { name: 'brand', label: 'Brand' },
  { name: 'model', label: 'Model' },
  { name: 'color', label: 'Color' },
  { name: 'registrationNumber', label: 'Registration number' },
  { name: 'modelYear', label: 'Year', type: 'number' },
  { name: 'price', label: 'Price', type: 'number' },
] as const

function CarDialog({ car, onClose }: CarDialogProps) {
  const [values, setValues] = useState({
    brand: car?.brand ?? '',
    model: car?.model ?? '',
    color: car?.color ?? '',
    registrationNumber: car?.registrationNumber ?? '',
    modelYear: car?.modelYear.toString() ?? '',
    price: car?.price.toString() ?? '',
  })
  const queryClient = useQueryClient()
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: (values: Car) => car ? updateCar(car._links.car.href, values) : addCar(values),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['cars'] })
      onClose()
    },
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    mutate({
      ...values,
      modelYear: Number(values.modelYear),
      price: Number(values.price),
    })
  }

  return (
    <Dialog
      open
      onClose={isLoading ? undefined : onClose}
      aria-labelledby="car-dialog-title"
      fullWidth
      maxWidth="xs"
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle id="car-dialog-title">{car ? 'Edit car' : 'Create car'}</DialogTitle>
        <DialogContent>
          {isError && <Alert severity="error">Error when saving the car.</Alert>}
          {fields.map((field) => {
            const type = 'type' in field ? field.type : 'text'
            return (
              <TextField
                key={field.name}
                label={field.label}
                type={type}
                value={values[field.name]}
                onChange={(event) => setValues({ ...values, [field.name]: event.target.value })}
                inputProps={type === 'number' ? { min: 0, max: 2147483647 } : undefined}
                margin="dense"
                fullWidth
                required
                disabled={isLoading}
              />
            )
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isLoading}>Cancel</Button>
          <Button type="submit" disabled={isLoading}>Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default CarDialog
