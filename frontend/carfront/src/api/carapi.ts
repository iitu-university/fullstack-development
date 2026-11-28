import axios from 'axios'

export type Car = {
  brand: string
  model: string
  color: string
  registrationNumber: string
  modelYear: number
  price: number
}

export type CarResponse = Car & {
  _links: {
    self: { href: string }
    car: { href: string }
  }
}

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080'
const carsUrl = `${apiUrl.replace(/\/+$/, '')}/api/cars`

export async function getCars(): Promise<CarResponse[]> {
  const response = await axios.get<{ _embedded?: { cars: CarResponse[] } }>(carsUrl)
  return response.data._embedded?.cars ?? []
}

export async function addCar(car: Car) {
  await axios.post(carsUrl, car)
}

export async function updateCar(url: string, car: Car) {
  await axios.put(url, car)
}

export async function deleteCar(url: string) {
  await axios.delete(url)
}
