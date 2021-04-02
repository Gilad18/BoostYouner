import React from 'react'
import Button from './Button'

export default function Confirm({format , date , id , amount , closePop}) {
    
    let pay = parseInt((amount * 0.02).toFixed(2))
    let fee = parseInt((pay * 0.1).toFixed(2))
    let total = pay + fee;
    let vat = parseInt((total * 0.17).toFixed(2))
    let total1 = pay + fee + vat
    return (
       
        <div className="confimPop">
              <Button name="close" onClick={closePop}/>
           Please check the following details:
           <div className="flexDiv" style={{width:'90%'}}>
           <h3>Name: xxx</h3>
           <h3>Date: {date}</h3>
           </div>
           <div style={{textAlign:'left' , borderBottom:'1px black solid'}}>
           <h3>Service : {format} boost with partner #{id}</h3>
           <h3>Amount : {pay}</h3>
           <h3>Service Fee : {fee}</h3>
           <h3>VAT : {vat}</h3>
           </div>
           <h3>Total : {total1} ILS</h3>
           <Button name="Approve"/>
        </div>
    )
}
