import React from 'react'
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom'
import Home from './Home'
import PaymentSuccess from './PaymentSuccess'

const App = () => {


  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/paymentsuccess' element={<PaymentSuccess/>}></Route>
      </Routes>
    </Router>
  )
}

export default App