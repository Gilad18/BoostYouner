import React from 'react'

export default function Button({name ,onClick ,id}) {
    return (
        <div>
            <button className="btn" id={id} onClick={onClick}>{name}</button>
        </div>
    )
}
