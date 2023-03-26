import PropTypes from 'prop-types'

const Notification = ({ message, tone }) => {
  if (message === null) {
    return null
  }
  else if (tone === 'n') {
    return (
      <div className='error'>
        {message}
      </div>
    )
  } else if (tone === 'p') {
    return (
      <div className='success'>
        {message}
      </div>
    )
  } else return null
}
Notification.propTypes = {
  message: PropTypes.string.isRequired,
  tone: PropTypes.string.isRequired
}
Notification.displayName = 'Notification'
export default Notification