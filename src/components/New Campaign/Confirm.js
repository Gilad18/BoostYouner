import React, {useState} from 'react'
import Button from '../Inputs/Button'
import { useHistory } from 'react-router-dom'
import Loader from '../Loader/Loader'

export default function Confirm({ format, date, id, amount, closePop, boostID, image }) {

    const myBoostid = boostID;
    const [error , setError] = useState(false)
    const [loading , setLoading] = useState(false)

    let pay = Number.parseFloat((amount * 0.02)).toFixed(2)
    let fee = Number.parseFloat((pay * 0.1).toFixed(2))
    let subTotal = Number.parseFloat(pay) + Number.parseFloat(fee);
    let vat = Number.parseFloat((subTotal * 0.17).toFixed(2))
    let total = Number.parseFloat(pay) + Number.parseFloat(fee) + Number.parseFloat(vat)

    const history = useHistory();

    const handleApprove = () => {
        setError(false)
        let currectBalnce = parseInt(localStorage.getItem('balance'))
        if (currectBalnce >= total) {
            setLoading(true)
            currectBalnce -= total
            localStorage.setItem('balance', currectBalnce)
            createTrasactionObj();
            setTimeout(() => history.push("/account/welcome"), 2500)
        } else { setError(true)}  

    }
    const createTrasactionObj = () => {
        let transaction = {
            campaignID: boostID,
            theDate: date,
            partnerID: id,
            format: format,
            image: image,
            spent: total,
            status: 'Due',
            followers: amount
        }
        addTrrasactionToLocalStorage(transaction);
    }

    const addTrrasactionToLocalStorage = (myObj) => {
        let myCampiagns = []
        if (localStorage.getItem('campaigns') === null) {
            myCampiagns.push(myObj)
            localStorage.setItem('campaigns', JSON.stringify(myCampiagns))
        } else {
            myCampiagns = JSON.parse(localStorage.getItem('campaigns'))
            myCampiagns.push(myObj)
            localStorage.setItem('campaigns', JSON.stringify(myCampiagns))
        }
    }

    return (
        <div className="confimPop">
            <Button name="close" onClick={closePop} />
           Please check the following details:
            <p>Boost ID : {myBoostid}</p>
            <div className="flexDiv" style={{ width: '90%' }}>
                <h3>Issue For: {localStorage.getItem('company')}</h3>
                <h3>Date: {date}</h3>
            </div>
            <div style={{ textAlign: 'left', borderBottom: '1px black solid' }}>
                <h3>Service : {format} boost with partner #{id}</h3>
                <h3>Amount : {pay}</h3>
                <h3>Service Fee : {fee}</h3>
                <h3>VAT : {vat}</h3>
            </div>
            <h3>Total : {total} ILS</h3>
            <Button name="Approve" onClick={handleApprove} />
            {error && <p style={{color:'red' }}>No sufficient funds , please make a despoit</p>} 
            {loading && <Loader text="Complete Request..." response={true}/>}

        </div>
    )
}
