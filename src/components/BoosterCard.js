import React from 'react'
import Button from './Button'

export default function BoosterCard({pic , name , followers ,onClickPreview , onClickConfirm , id}) {
    return (
        <div className="boosterCard">
            <div style={{display:'flex'} }>
            <div className="boosterPic" style={{backgroundImage:`url(${pic})`}}></div>
            <h2>{name}</h2></div>
            <h3 style={{textAlign:'center'}}>Followed by <span>{followers} </span>people</h3>
            <h3 style={{textAlign:'center'}}>Start from <span>{(followers * 0.02).toFixed(2)} </span> ILS</h3>
            <div style={{display:'flex' , width:'100%'} }>
            <Button id={id} name="Preview" onClick={onClickPreview}/>
            <Button id={id} name="More Details" onClick={onClickConfirm}/>
            </div>
        </div>
    )
}
