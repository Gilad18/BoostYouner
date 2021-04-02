import {BrowserRouter, Route, Link} from 'react-router-dom'
import Account from './UI'
import Header from './Dashboard'
import NewBoost from './NewBoost'
import Landing from './Landing'
import React from 'react'

export default function Router() {
    return (
        <div >
            <BrowserRouter>
                <div className="display">
                 <Header/>
                 <Route path="/" exact component={Landing}/>
                 <Route path="/account" exact component={Account}/>
                 <Route path="/newboost" exact component={NewBoost}/>
                </div>
                </BrowserRouter>
        </div>
    )
}
