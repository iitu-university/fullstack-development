import { useMemo, useState } from 'react'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import Stack from '@mui/material/Stack'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import type { GridColDef } from '@mui/x-data-grid'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteCar, getCars } from '../api/carapi'
import type { CarResponse } from '../api/carapi'
import CarDialog from './CarDialog'

const getRowId = (car: CarResponse) => car._links.self.href

function Carlist() {
  const [dialog, setDialog] = useState<'create' | CarResponse | null>(null)
  const [showDeleted, setShowDeleted] = useState(false)
  const queryClient = useQueryClient()
  const { data: cars = [], isLoading, isError } = useQuery({
    queryKey: ['cars'],
    queryFn: getCars,
  })
  const { mutate: removeCar, isLoading: isDeleting, isError: deleteFailed } = useMutation({
    mutationFn: deleteCar,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['cars'] })
      setShowDeleted(true)
    },
  })

  const columns = useMemo<GridColDef<CarResponse>[]>(() => [
    { field: 'brand', headerName: 'Brand', minWidth: 110, flex: 1 },
    { field: 'model', headerName: 'Model', minWidth: 110, flex: 1 },
    { field: 'color', headerName: 'Color', minWidth: 100, flex: 1 },
    { field: 'registrationNumber', headerName: 'Registration number', minWidth: 160, flex: 1 },
    { field: 'modelYear', headerName: 'Year', type: 'number', width: 100 },
    { field: 'price', headerName: 'Price', type: 'number', width: 110 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 165,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      disableExport: true,
      renderCell: ({ row, tabIndex }) => (
        <>
          <Button tabIndex={tabIndex} onClick={() => setDialog(row)}>Edit</Button>
          <Button
            tabIndex={tabIndex}
            color="error"
            disabled={isDeleting}
            onClick={() => {
              if (window.confirm('Are you sure you want to delete ' + row.brand + ' ' + row.model + '?')) {
                removeCar(row._links.car.href)
              }
            }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ], [isDeleting, removeCar])

  return (
    <Stack component="main" spacing={2} sx={{ py: 3 }}>
      <Button variant="contained" sx={{ alignSelf: 'flex-start' }} onClick={() => setDialog('create')}>
        New Car
      </Button>
      {isError && <Alert severity="error">Error when fetching cars.</Alert>}
      {deleteFailed && <Alert severity="error">Error when deleting the car.</Alert>}
      <DataGrid
        autoHeight
        rows={cars}
        columns={columns}
        getRowId={getRowId}
        loading={isLoading}
        disableRowSelectionOnClick
        initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
        pageSizeOptions={[5, 10, 25]}
        slots={{ toolbar: GridToolbar }}
        slotProps={{ toolbar: { csvOptions: { fileName: 'cars' } } }}
      />
      <Snackbar
        open={showDeleted}
        onClose={() => setShowDeleted(false)}
        autoHideDuration={2000}
        message="Car deleted"
      />
      {dialog && (
        <CarDialog
          car={dialog === 'create' ? undefined : dialog}
          onClose={() => setDialog(null)}
        />
      )}
    </Stack>
  )
}

export default Carlist
