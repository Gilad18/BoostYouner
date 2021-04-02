import React from 'react'

export default function Input({name,value,type, onChange}) {
    return (
        <div>
            <label>{name}</label>
            <input type={type} value={value} onChange={onChange}></input>
        </div>
    )
}
