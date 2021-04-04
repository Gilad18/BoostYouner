import React,{useState} from 'react'
import { Link  } from 'react-router-dom'
import Button from './Button'
import Input from './Input'

export default function Dashboard() {

    const [openDesposit , setOpenDeposit] = useState(false)
    const [amount , setAmount] = useState('')

    const handleDeposit = () => {
        setOpenDeposit(true)
    }

    const handlepayNow = () => {
        let currectBalnce = parseInt(localStorage.getItem('balance')) 
        currectBalnce+=amount
        localStorage.setItem('balance' , currectBalnce)
        setTimeout(setOpenDeposit(false) , 1000)
    }
    return (
        <div className="dashboard">

            <Link to="/account/welcome"><div className="logo"> </div></Link>

            <div className="userDetials">
                <h4>@{localStorage.getItem('igAccount')}</h4>
                <h2 style={{color : 'var(--second)'}}>{localStorage.getItem('company')}</h2>
                <h3>Balance : {Number.parseFloat(localStorage.getItem('balance')).toFixed(2)} ILS</h3>
            </div>
            <div className="navigation">
                <ul>
                    <li><Link to="/account/newboost">New Boost</Link> </li>
                    <li><Link to="/account/howto">How To</Link> </li>
                    <li><Link to="/account/explore">Explore</Link> </li>
                </ul>
            </div>
            <div className="deposit">
                <Button name="Add Funds" onClick={handleDeposit}/>
           </div>
           {openDesposit &&
            <div className="despositPop">
                <Button name="Discard" onClick={()=> setOpenDeposit(false)}/>
               Add Funds Here:
               <Input name="Invoice For:" type="text" value={localStorage.getItem('company')}/>
               <Input name="Amount:" type="number" onChange={(e) => setAmount(parseInt(e.target.value))}/>
               <Input name="PayPal" type="radio" group="method"/>
               <Input name="Google Pay" type="radio" group="method"/>
               <Input name="Visa" type="radio" group="method"/>
               <Button name="Pay Now" onClick={handlepayNow}/>
               </div>}
        </div>
    )
}
