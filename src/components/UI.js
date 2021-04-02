import React, { useState,useEffect } from 'react'
import API from './api'

export default function UI() {

    const [users , setUsers] = useState([])

    useEffect(() => {
        const search = async () => {
           const response = await API.get('/');
           setUsers(response.data)
        }
        search()
    }, [])
    return (
        
        <div className="main">
            {users.map((item,index)=> {
                return <div key={index}> 
                <h1>Name:{item.name}</h1>
                <h2>Rate:{item.rate}</h2>
                <h3>follwers:{item.followers}</h3>
                <h4>Location:{item.location}</h4>
                <h4>Labels:{
                    item.label.map((item,index)=> {
                        return <p key={index}>{item}</p>
                    })
                    }</h4>
                </div>
            })}
        </div>
    )
}
