import React from 'react'

export default function Input({name,value,type, onChange, group}) {
    return (
        <div>
            <label>{name}</label>
            <input type={type} value={value} name={group}onChange={onChange}></input>
        </div>
    )
}
