import React from 'react'
import {Link} from 'react-router-dom'

export default function Dashboard() {
    return (
        <div className="dashboard">
           <div className="logo">
           <Link to="/account">LOGO</Link> 
           </div>
           <div className="userDetials">
               <h3>Wlecome , XXX</h3>
               <h3>Balance : XXX</h3>
           </div>
           <div className="navigation">
               <ul>
                   <li><Link to="/newboost">New Boost</Link> </li>
                   <li>Boost History</li>
                   <li>Setting</li>
                   <li>Explore</li>
               </ul>
           </div>
           <div className="deposit">
               Deposit
           </div>
        </div>
    )
}
