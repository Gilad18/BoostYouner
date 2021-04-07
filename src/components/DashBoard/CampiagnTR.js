import React from 'react'

export default function CampiagnTR({campaignID , date, partnerID, format, img, spent, status}) {

    return (
        <>
            <tr>
              <td style={{fontWeight:'bold'}}>{campaignID}</td>
              <td>{date}</td>
              <td>{partnerID}</td>
              <td>{format}</td>
              <td><div className="trImg" style={{backgroundImage:`url(${img})`}}></div></td>
              <td>{Number.parseFloat(spent).toFixed(1)}</td>
              <td>{status}</td>
            </tr>
        </>
    )
}
