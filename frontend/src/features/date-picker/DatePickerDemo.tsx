import { useState } from 'react'
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import styles from './DatePickerDemo.module.css'

type SingleDate = Date | null
type DateValue = SingleDate | [SingleDate, SingleDate]

function DatePickerDemo() {
  const [date, setDate] = useState<DateValue>(null)

  return (
    <DatePicker
      className={styles.picker}
      value={date}
      onChange={setDate}
      locale="ru-RU"
      format="dd.MM.yyyy"
      calendarAriaLabel="Открыть календарь"
      clearAriaLabel="Очистить дату"
      dayAriaLabel="День"
      monthAriaLabel="Месяц"
      yearAriaLabel="Год"
    />
  )
}

export default DatePickerDemo
