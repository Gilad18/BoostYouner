import React from 'react'

export default function Select({name,values,onClick}) {
    return (
        <div>
            <label>{name}</label>
            <select name={name} onClick={onClick}>
              {values.map((item,index)=> {
                  return <option  key={index} value={item}>{item}</option>
              })}
            </select>
        </div>
    )
}
