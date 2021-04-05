import React,{useEffect, useState} from 'react'
import TR from './CampiagnTR'
import '../CSS/account.css'


export default function UI() {

   const [ campaigns , setCampaigns] = useState([])

   useEffect(()=> {
     const update = () => {
      setCampaigns(JSON.parse(localStorage.getItem('campaigns')));
     }
      update();
   },[])
    
   const partDay = () => {
    let currentDate = new Date().getHours()
    let text;
    switch(true) {
      case currentDate>6 && currentDate<12:
        text ="Morning"
        break;
        case currentDate>12 && currentDate<18 :
          text ="Afternoon"
          break;  
          case currentDate>18 && currentDate<23:
            text ="Evening"
            break;  
            default :
            text="Night"
    }
    return text
   }
   const getNum = () => {
     if(localStorage.getItem('campaigns') !== null) {
       return campaigns.length
     } else {return 0}
   }

   const getReached = () => {
     if(localStorage.getItem('campaigns') !== null) {
      let followersTotal =  campaigns.reduce((a,b) => {
        return a  + b.followers; },0)

      return Math.floor(followersTotal*0.45)
     }
    else {return 0}
   }

   const getAVGspent = ()  => {
     if(localStorage.getItem('campaigns') !== null) {
      let totalSpent = campaigns.reduce((a,b) => {return a  + b.spent },0)
      let reached = getReached()
       return Number.parseFloat(totalSpent / reached).toFixed(3)
     }
     else {return Number.parseFloat(0).toFixed(2)}
   }

  return (

    <div className="main">
      <h1>Good {partDay()} , {localStorage.getItem('name')}</h1>
      <div className="firstPage">
        <div className="cell stat1">
          <h4>Live Campigns:</h4>
          <h1>{getNum()}</h1>
        </div>
        <div className="cell stat2">
          <h4>Estimated Reach:</h4>
          <h2>{getReached() }</h2>
        </div>
        <div className="cell stat3">
          <h4>CPI</h4>
          <h2>{getAVGspent()}</h2>
        </div>
        <fieldset className="cell history">
          
          <legend style={{fontWeight:'bold'}}>My History Campaigns</legend>
          <table>
          <thead>
            <tr className="mainTR">
              <th>Campaign ID</th>
              <th>Date</th>
              <th>PartnerID</th>
              <th>Format</th>
              <th>Image</th>
              <th>Spent</th>
              <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {campaigns && campaigns.map((item ,index) => {
                return <TR key={index} campaignID={item.campaignID} date={item.theDate}
                partnerID={item.partnerID} format={item.format} spent={item.spent}
                status={item.status} img={item.image} />
            })}
           </tbody>
          </table>
        </fieldset>
      </div>
    </div>
  )
}
