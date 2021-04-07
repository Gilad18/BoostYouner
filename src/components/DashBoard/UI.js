import React, { useEffect, useState } from 'react'
import TR from './CampiagnTR'
import './account.css'


export default function UI() {

  const date = new Date()
  const [campaigns, setCampaigns] = useState([])
  const [moreStas, setMoreStat] = useState(false)
  const [moreStatsText, setMoreStatsText] = useState('Show More Stats')

  useEffect(() => {
    const update = () => {
      setCampaigns(JSON.parse(localStorage.getItem('campaigns')));
    }
    update();
  }, [])

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

  const getStatus = (certain) => {
    let requested = new Date(certain)
    return (requested.getTime() < date.getTime()) ? 'Completed' : 'Due'
  }

  const getNum = () => {
    if (localStorage.getItem('campaigns') !== null) {
      return campaigns.filter(item => { return item.status === 'Due' }).length
    } else {
      return 0
    }
  }

  const getReached = () => {
    if (localStorage.getItem('campaigns') !== null) {
      let followersTotal = campaigns.reduce((a, b) => {
        return a + b.followers;
      }, 0)
      return Math.floor(followersTotal * 0.45)
    }
    else { return 0 }
  }

  const getAVGspent = () => {
    if (localStorage.getItem('campaigns') !== null) {
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
    if (localStorage.getItem('campaigns') !== null) {
      let totalSpent = campaigns.reduce((a, b) => { return a + b.spent }, 0)
      return Number.parseFloat(totalSpent).toFixed(2)
    }
    else { return Number.parseFloat(0).toFixed(2) }
  }

  const spentByFormat = () => {
    if (localStorage.getItem('campaigns') !== null) {
      let total = getTotalSpent();
      let story = campaigns.filter(item => { return item.format === 'story' }).reduce((a, b) => { return a + b.spent }, 0)
      let feed = campaigns.filter(item => { return item.format === 'feed' }).reduce((a, b) => { return a + b.spent }, 0)
      return `Story:${Number.parseFloat(story / total * 100).toFixed(2)}%  ||  Feed:${Number.parseFloat(feed / total * 100).toFixed(2)}%`
    } else { return 'Not Avaiable Yet' }
  }

  const getTopPartner = () => {
    if (localStorage.getItem('campaigns') !== null) {
      let been = []
      for (let i = 0; i < campaigns.length; i++) {
        let searched = been.filter(item => { return item.id === campaigns[i].partnerID })
        if (searched.length > 0) {
          let thevaluesof = [...searched]
          let theValue = parseInt(thevaluesof[0].spent)
          let thesearced = been.indexOf(...searched)
          been[thesearced] = { id: campaigns[i].partnerID, spent: theValue + campaigns[i].spent }
        } else {
          let record = { id: campaigns[i].partnerID, spent: campaigns[i].spent }
          been.push(record)
        }
      }
      let theMax = been.reduce((a, b) => { return a > b.spent ? a : b.spent }, 0)
      let theMAxObj = been.filter(item => { return item.spent === theMax })
      return ` Parnter #${theMAxObj.id}, (${theMAxObj.spent} ILS) `
    }
     else { return 'Not Avaiable Yet' }
  }


  return (

    <div className="main">
      <h1>Good {partDay()} , {localStorage.getItem('name')}</h1>
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
        <div className={`cell history moreStats ${moreStas ? "moreStasOpen " : " "}`}>
          <p style={{ float: 'right' }} onClick={handleMoreStats}>{moreStatsText}</p><br></br>
          <div className="moreStasDivs">
            <div className="moreStastDivBox">
              <h3>Spent By Formt:</h3>
              <h3 style={{ textAlign: 'center' }}>{spentByFormat()}</h3>
            </div>
            <div className="moreStastDivBox">
              <h3>Total Spent:</h3>
              <h1><span>{getTotalSpent()} ILS</span></h1>
            </div>
            <div className="moreStastDivBox">
              <h3>Top Partner:</h3>
              <h3>{getTopPartner()}</h3>
            </div>
          </div>
        </div>
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
