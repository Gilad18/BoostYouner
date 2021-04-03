import React,{useEffect, useState} from 'react'
import Button from './Button'
import { useHistory} from 'react-router-dom'
import Input from './Input'
import './landing.css'

export default function Landing() {
   const [name, setName] = useState('')
   const [company, setCompany] = useState('')
   const [igAccount, setIGaccount] = useState('')
   const [email, setEmail] = useState('')

    const history = useHistory();

    useEffect(() => {
       if(localStorage.length>0) {
        history.push("/account/welcome")
       }
    })

    const handleSubmitClick = () => {
        localStorage.setItem('name',name);
        localStorage.setItem('company',company);
        localStorage.setItem('igAccount',igAccount);
        localStorage.setItem('email',email);
        localStorage.setItem('balance', 0);
        setTimeout( () => history.push("/account/welcome") ,1000)
    }
    return (
        <div className="landingPage">
            <aside>
            <div className="logoLanding"></div>
            <h2 style={{color:'white'}}>Find The Boost You Need</h2>
            <h3 style={{color:'white'}}>Sign up:</h3>
            <form className="landingform"> 
               <Input name="Full Name:" type="text" onChange={(e) => setName(e.target.value)}/>
               <Input name="Company Name:" type="text" onChange={(e) => setCompany(e.target.value)}/>
               <Input name="Instagram Account:" type="text" onChange={(e) => setIGaccount(e.target.value)}/>
               <Input name="Email Adress:" type="email" onChange={(e) => setEmail(e.target.value)}/>
            </form>  
            <Button name="go to site" onClick={handleSubmitClick}/>
            </aside>
            <section>

            </section>
           
        </div>
    )
}
