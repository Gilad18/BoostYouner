import {BrowserRouter, Route} from 'react-router-dom'
import Account from '../DashBoard/UI'
import Header from '../DashBoard/Dashboard'
import NewBoost from '../New Campaign/NewBoost'
import Landing from '../Landing/Landing'
import Explore from '../Explore/Explore'
import React from 'react'
import HowTo from '../How To/HowTo'

export default function Router() {
    return (
        <div >
            <BrowserRouter>
                <div className="display">
                 <Route path="/" exact component={Landing}/>
                 <Route path="/account"  component={Header}/>
                 <Route path="/account/welcome" exact component={Account}/>
                 <Route path="/account/newboost" exact component={NewBoost}/>
                 <Route path="/account/howto" exact component={HowTo}/>
                 <Route path="/account/explore" exact component={Explore}/>
                </div>
                </BrowserRouter>
        </div>
    )
}
