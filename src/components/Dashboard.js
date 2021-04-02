import React from 'react'
import {Link} from 'react-router-dom'

export default function Dashboard() {
    return (
        <div className="dashboard">
           
           <Link to="/account"><div className="logo"> </div></Link> 
          
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
