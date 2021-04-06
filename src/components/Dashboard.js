import React,{useState} from 'react'
import { Link  } from 'react-router-dom'
import Button from './Button'
import Input from './Input'
import Loader from '../components/Loader/Loader'

export default function Dashboard() {

    const [openDesposit , setOpenDeposit] = useState(false)
    const [amount , setAmount] = useState('')
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(false)

    const handleDeposit = () => {
        setOpenDeposit(true)
        setError(false)
    }

    const handlepayNow = () => {
        
        if(amount>=50) {
            setLoading(true)
            let currectBalnce = parseInt(localStorage.getItem('balance')) 
            currectBalnce+=amount
            localStorage.setItem('balance' , currectBalnce)
            setTimeout(doneDeposit , 2500)
        }
      else { setError(true)}
     
    }
    const doneDeposit = () => {
        setOpenDeposit(false)
        setLoading(false)
    }

    const handleAmount = (e) => {
        setAmount(parseInt(e.target.value))
        if (e.target.value>=50) {
            setError(false)
        }
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
                <Button name="-" onClick={()=> setOpenDeposit(false)}/>
               Add Funds Here:
               <Input name="Invoice For:" type="text" value={localStorage.getItem('company')}/>
               <Input name="Amount:" type="number" onChange={handleAmount}/>
              <div className="payMethod">
               <Input name="PayPal" type="radio" group="method"/>
               <Input name="Google Pay" type="radio" group="method"/>
               <Input name="Visa" type="radio" group="method"/>
               </div>
               {error && <p style={{lineHeight:'5px' , color:'red'}}>Minimum 50ILS</p>}
               <Button name="Pay Now" onClick={handlepayNow}/>
               {loading && <Loader text="Getting Authorization..." response={true}/>}
               </div>
               }
        </div>
    )
}
