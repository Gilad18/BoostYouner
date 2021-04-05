import React, { useEffect, useState } from 'react'
import '../Loader/loader.css'

export default function Loader({text , response}) {
    const [isDone , setIsDone] = useState(false)

    useEffect (() => {
        if (response) {
            const approvedTrans = () => {
                setIsDone(true)
            }
            setTimeout(approvedTrans , 1500)
        }    
    },[])
    return (
        <div className="loader">
        <div className="lds-grid">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
        <h4>{text}</h4>
        {isDone && <div className="doneDespoitCheck">
        <i className="fas fa-check-circle fa-4x"></i>
        <h4>Succeed!</h4>
            </div>}
        
        </div>
    )
}
