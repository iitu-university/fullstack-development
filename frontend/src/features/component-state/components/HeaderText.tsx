import { memo } from 'react'

const HeaderText = memo(function HeaderText({ text }: { text: string }) {
  return <h3>{text}</h3>
})

export default HeaderText
