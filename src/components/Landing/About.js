import React from 'react'
import '../landing.css'
import Button from '../Button'

export default function About({ text, onClick }) {
    return (
        <div className="aboutSection">
            <Button name={text} onClick={onClick} />
            <div className="aboutBody">
                <h3>  What? </h3>
                <p>
                    Boosting your business with the relevant audience.<br></br><br></br>

            Your business needs more exposure and you tried of spending cash on SM impressions that getting ignored? <br></br>
            Can’t reach or afford an influencer that would spread the word for you?<br></br>

                    <br></br><b> You got to the right place!</b> <br></br><br></br>

            Welcome to BoosYooner, the first marketplace for business and potential partners for the extra boost.<br></br>

            We connect you with an SM activist who has the right followers you want to reach, our Booster is not famous nor public figures but they have (at the min 5K) followers who trust and appreciate them and you definitely want your name to be seen there.
            </p>

                <h3>  Why?</h3>

                <p>
                    We won’t connect you with just a random Booster, our technology will analyze your needs and match them with a relevant crowd to increase the potential of the desired engagement.<br></br><br></br>

                    <b>For example,</b> if you open a new nail salon at Rishon Letsion we will make sure that your Booster shares content that associate with Lifestyle, Beauty, Female Groom, and a majority of his/her followers are based near your shop.<br></br>

            Or if you open a new chic Caffe in Florentin, Tel Aviv we will make sure the crowd of your Booster Like, Share, Tag similar places like it, and probably yours will be next! <br></br>

            How do we know it? That our little secret so you have to trust us and our innovative technology.
            </p>
                <h3>
                    How?
            </h3>
                <p>

                    Open your <b>free account</b> right now, use our friendly interface to set your business, and explore the options you have to push yourself forward.
            Open a request in less than a minute and we will take it from there...
            </p>
            </div>
        </div>
    )
}
