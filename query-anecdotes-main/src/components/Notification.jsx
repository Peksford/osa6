import { useContext, useState, useEffect } from 'react'
import NotificationContext from '../NotificationContext'

const Notification = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)

  console.log('Notification', notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  //if (true) return null

  return notification ? <div style={style}>{notification}</div> : null
}

export default Notification
