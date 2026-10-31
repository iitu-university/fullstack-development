import { memo } from 'react'
import PropTypes from 'prop-types'

const HeaderText = memo(function HeaderText({ text }) {
  return <h3>{text}</h3>
})

HeaderText.propTypes = { text: PropTypes.string.isRequired }

export default HeaderText
