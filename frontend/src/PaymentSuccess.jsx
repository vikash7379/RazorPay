import React from 'react'
import { useSearchParams } from 'react-router-dom'

const PaymentSuccess = () => {
    const searchParams = useSearchParams()[0];
    const refNum = searchParams.get('reference')

    console.log("first",refNum)


  return (
    <div className='divCenter' style={{flexDirection :"column",gap:"10px"}}>
        <h1>Payment Successfull</h1>
        <h5>Refrence ID :  {refNum} </h5>
    </div>
  )
}

export default PaymentSuccess