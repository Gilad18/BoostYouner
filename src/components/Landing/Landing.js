import React,{useEffect, useState} from 'react'
import Button from '../Inputs/Button'
import { useHistory} from 'react-router-dom'
import Input from '../Inputs/Input'
import Loader from '../Loader/Loader'
import About from './About'
import '../Landing/landing.css'

export default function Landing() {
   const [name, setName] = useState('')
   const [company, setCompany] = useState('')
   const [igAccount, setIGaccount] = useState('')
   const [email, setEmail] = useState('')
   const [about , setAbout] = useState(false)
   const [loading , setLoading] = useState(false)

    const history = useHistory();

    useEffect(() => {
       if(localStorage.length>0) {
        history.push("/account/welcome")
       }
    })

    const handleSubmitClick = () => {
        setLoading(true)
        localStorage.setItem('name',name);
        localStorage.setItem('company',company);
        localStorage.setItem('igAccount',igAccount);
        localStorage.setItem('email',email);
        localStorage.setItem('balance', 0);
        setTimeout( () => history.push("/account/welcome") ,2500)
    }

    const handleAbout = () => {
        setAbout(!about)
    }
    return (
        <div className="landingPage">
            <aside>
            <h4  className="aboutUsLink" onClick={handleAbout}>About US</h4>
            <div className="logoLanding"></div>
            <h2  style={{color:'white'}}>Find The Boost You Need</h2>
            <form className="landingform"> 
            <h3 style={{color:'white' , textAlign:'center'}}>Sign up:</h3>
               <Input name="Full Name:" type="text" onChange={(e) => setName(e.target.value)}/>
               <Input name="Company Name:" type="text" onChange={(e) => setCompany(e.target.value)}/>
               <Input name="Instagram Account:" type="text" onChange={(e) => setIGaccount(e.target.value)}/>
               <Input name="Email Adress:" type="email" onChange={(e) => setEmail(e.target.value)}/>
               {loading && <Loader text="Creating Account.." response={true} />}
            </form>  
            <Button name="Create Account" onClick={handleSubmitClick}/>
            </aside>
            <section>
                <div className="TextsSHowCase">
                  <h1 className="shText1">Fresh Audience</h1>
                  <h1 className="shText2" style={{color:'white'}}>Rockstar Partners</h1>
                  <h1 className="shText3">Choose Yours</h1>
                  <h1 className="shText4">Boost Your Business</h1>
                  </div>
                  {about && <About text="X" onClick={handleAbout}/>}
            </section>     
        </div>
    )
}
