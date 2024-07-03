import React from 'react'
import LoginPage from './pages/LoginPage'
import Homepage from './pages/Homepage'
import {auth} from './firebase'
import {useAuthState} from 'react-firebase-hooks/auth'

const App = () => {
  const [user] = useAuthState(auth)
  return (
    <div>
      {!user ? <LoginPage/> : <Homepage/>}
    </div>
  )
}

export default App
