import React from 'react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
    return (
        <div className="dashboard">

            <Link to="/account"><div className="logo"> </div></Link>

            <div className="userDetials">
                <h3>Welcome , {localStorage.getItem('name')}</h3>
                <h2 style={{color : 'var(--second)'}}>{localStorage.getItem('company')}</h2>
                <h3>Balance : {Number.parseFloat(localStorage.getItem('balance')).toFixed(2)} ILS</h3>
            </div>
            <div className="navigation">
                <ul>
                    <li><Link to="/account/newboost">New Boost</Link> </li>
                    <li><Link to="/account/explore">Explore</Link> </li>
                </ul>
            </div>
            <div className="deposit">
                Deposit
           </div>
        </div>
    )
}
