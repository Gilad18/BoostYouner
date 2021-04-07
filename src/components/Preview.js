import React from 'react'
import Button from './Button'

export default function Preview({name , pic , image , text, tag , format , closePop}) {
    return (
       
        <div className="confimPop" style={{textAlign:'center'}}>
            <Button name="close" onClick={closePop}/>
            {format==='feed' && 
            <div className="feed">
                <div className="feedTop">
                    <div className="feedProfilefeed" style={{backgroundImage:`url(${pic})`}}></div>
                    <p>{name.toLowerCase()}</p>
                </div>
                <div className="feedpic" style={{backgroundImage:`url(${image})`}}></div>
                <div className="feeddata"></div>
                <div className="feedComments">
                    <p style={{fontWeight:'bold'}}>{name.toLowerCase()}</p>
                   <p>{text}</p> <br></br><p style={{color:'blue'}}> #{tag}</p>
                    <p style={{color:'purple'}}> @{localStorage.getItem('igAccount')}</p>
                </div>
                <div className="feedFooter"></div>
            </div>}
            {
                format==='story' && 
                <div className="story" style={{backgroundImage:`url(${image})`}}>
                    <div className="storyTop">
                    <div className="feedProfilefeed" style={{backgroundImage:`url(${pic})`}}></div>
                    <h6 style={{color:'white' }}>{name.toLowerCase()}</h6></div>
                    <div className="storyMain">
                        <h3 style={{backgroundColor:'white',width:'10rem'}}>{text}</h3>
                        <p style={{color:'blue' ,width:'10rem', fontWeight: 'bold' }}> #{tag}</p>
                        <p style={{color:'purple' ,width:'10rem' , fontWeight: 'bold'}}> @{localStorage.getItem('igAccount')}</p>
                        </div>
                    <div className="storyFooter">
                        <div className="messageStory">Message {name.toLowerCase()}...</div>
                    </div>
                </div>
            }
        </div>
    )
}
