import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import AddItem from './AddItem'
import './App.css'

export type Item = {
  product: string
  amount: string
}

function App() {
  const [items, setItems] = useState<Item[]>([])

  const addItem = (item: Item) => {
    setItems((currentItems) => [item, ...currentItems])
  }

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Shopping List</Typography>
        </Toolbar>
      </AppBar>
      <AddItem addItem={addItem} />
      <List>
        {items.map((item, index) => (
          <ListItem key={index} divider>
            <ListItemText primary={item.product} secondary={item.amount} />
          </ListItem>
        ))}
      </List>
    </Container>
  )
}

export default App
