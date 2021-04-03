import {BrowserRouter, Route} from 'react-router-dom'
import Account from './UI'
import Header from './Dashboard'
import NewBoost from './NewBoost'
import Landing from './Landing'
import Explore from './Explore'
import React from 'react'

export default function Router() {
    return (
        <div >
            <BrowserRouter>
                <div className="display">
                 <Route path="/" exact component={Landing}/>
                 <Route path="/account"  component={Header}/>
                 <Route path="/account/welcome" exact component={Account}/>
                 <Route path="/account/newboost" exact component={NewBoost}/>
                 <Route path="/account/explore" exact component={Explore}/>
                </div>
                </BrowserRouter>
        </div>
    )
}
