import React, { useState } from 'react'
import TR from './CampiagnTR'
import './account.css'


export default function UI() {

  const date = new Date()
  const campaigns = JSON.parse(localStorage.getItem('campaigns'))
  const [moreStas, setMoreStat] = useState(false)
  const [moreStatsText, setMoreStatsText] = useState('Show More Stats')

  const partDay = () => {
    let currentDate = date.getHours()
    let text;
    switch (true) {
      case currentDate >= 6 && currentDate < 12:
        text = "Morning"
        break;
      case currentDate >= 12 && currentDate < 18:
        text = "Afternoon"
        break;
      case currentDate >= 18 && currentDate < 23:
        text = "Evening"
        break;
      default:
        text = "Night"
    }
    return text
  }

  const getStatus = (certain) => {                           // add also the time
    let requested = new Date(certain)
    return (requested.getTime() < date.getTime()) ? 'Completed' : 'Due'
  }

  const getNum = () => {               //change all to if(campiagns)
    if (campaigns) {
      return campaigns.filter(item => { return item.status === 'Due' }).length
    } else {
      return 0
    }
  }

  const getReached = () => {
    if (campaigns !== null) {
      let followersTotal = campaigns.reduce((a, b) => {
        return a + b.followers;
      }, 0)
      return Math.floor(followersTotal * 0.45)
    }
    else { return 0 }
  }

  const getAVGspent = () => {
    if (campaigns !== null) {
      let totalSpent = campaigns.reduce((a, b) => { return a + b.spent }, 0)
      let reached = getReached()
      return Number.parseFloat(totalSpent / reached).toFixed(3)
    }
    else { return Number.parseFloat(0).toFixed(2) }
  }
  const handleMoreStats = () => {
    setMoreStat(!moreStas)
    moreStas ? setMoreStatsText('Show More Stats') : setMoreStatsText('Show Less Stats')
  }

  const getTotalSpent = () => {
    if (campaigns !== null) {
      let totalSpent = campaigns.reduce((a, b) => { return a + b.spent }, 0)
      return Number.parseFloat(totalSpent).toFixed(2)
    }
    else { return Number.parseFloat(0).toFixed(2) }
  }

  const spentByFormatStory = () => {
    if (campaigns !== null) {
      let total = getTotalSpent();
      let story = campaigns.filter(item => { return item.format === 'story' }).reduce((a, b) => { return a + b.spent }, 0)
      return Number.parseFloat(story / total * 100).toFixed(2)
    } else { return 0 }
  }

  const spentByFormatFeed = () => {
    if (campaigns !== null) {
      let total = getTotalSpent();
      let feed = campaigns.filter(item => { return item.format === 'feed' }).reduce((a, b) => { return a + b.spent }, 0)
      return Number.parseFloat(feed / total * 100).toFixed(2)
    } else { return 0 }
  }

  const spentToday = () => {
    if (campaigns !== null) {
      let today = date.toISOString().slice(0,10)
     let campaignToday = campaigns.filter(item => { return item.theDate === today}).reduce((a,b)=>{return a +b.spent} ,0)
    return  Number.parseFloat(campaignToday).toFixed(2)
    }
     else { return 'Not Avaiable Yet' }

}


  return (

    <div className="main">
      <h1>Good {partDay()}, {localStorage.getItem('name')}</h1>
      <div className="firstPage">
        <div className="cell stat1">
          <h3>Live Campaigns:</h3>
          <h1><span>{getNum()}</span></h1>
        </div>
        <div className="cell stat2">
          <i style={{ float: 'right' }} className="fas fa-info-circle"></i>
          <h3>Estimated Reach:</h3>
          <h2>{getReached().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h2>
        </div>
        <div className="cell stat3">
          <i style={{ float: 'right' }} className="fas fa-info-circle"></i>
          <h3>CPI</h3>
          <h2>{getAVGspent()}</h2>
        </div>
        {campaigns && <div className={`cell history moreStats ${moreStas ? "moreStasOpen " : " "}`}>
          <p className="expandStats" onClick={handleMoreStats}>{moreStatsText} <i className="fas fa-expand-alt"></i></p><br></br>
          <div className="moreStasDivs">
            <div className="moreStastDivBox">
              <h3>Spent By Format:</h3>
              <div className="formatsNames">
                <p>Story</p><p style={{float:'right'}}>Feed</p>
              </div>
              <div className="barDiv">
                <div className="barDivStory" style={{width:`${spentByFormatStory()}%`}}>{spentByFormatStory()}%</div>
                <div className="barDivfeed" style={{width:`${spentByFormatFeed()}%`}}>{spentByFormatFeed()}%</div>
              </div>
            </div>
            <div className="moreStastDivBox">
              <h3>Total Spent:</h3>
              <h1><span>{getTotalSpent()} </span>ILS</h1>
            </div>
            <div className="moreStastDivBox">
              <h3>Spent Today:</h3>
              <h1><span>{spentToday()} </span>ILS</h1>
            </div>
          </div>
        </div>}
        <fieldset className="cell history">
          <legend style={{ fontWeight: 'bold' }}>My History Campaigns</legend>
          <table>
            <thead>
              <tr className="mainTR">
                <th>Campaign ID</th>
                <th>Date</th>
                <th>PartnerID</th>
                <th>Format</th>
                <th>Image</th>
                <th>Spent </th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {campaigns && campaigns.map((item, index) => {
                return <TR key={index} campaignID={item.campaignID} date={item.theDate}
                  partnerID={item.partnerID} format={item.format} spent={item.spent}
                  status={getStatus(item.theDate)} img={item.image} />
              })}
            </tbody>
          </table>
          {!campaigns && <h3 style={{ textAlign: 'center' }}>You d'ont have any live campigns yet, go ahead and create one!</h3>}
        </fieldset>
      </div>
    </div>
  )
}
