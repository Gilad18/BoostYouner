import React from 'react'
import Video from '../../media/VideoHowTo/myVideo.mp4'

export default function HowTo() {

    return (
        <div className="main" style={{textAlign:'center'}}>
            <h1>New around? Watch this quick "How To" video</h1>
            <video style={{outline:'none'}} width="820" height="640" controls>
              <source src={Video}/>
              </video>
        </div>
    )
}
