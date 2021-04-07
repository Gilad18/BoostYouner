import React from 'react'

export default function BlogCard({img , title, author , url}) {
    return (
        <div className="blogCard">
        <div className="blogImg" style={{backgroundImage:`url(${img})`}}></div>
        <div className="blogInfo">
            <h4>{title}</h4>
            <h6>by {author}</h6>
            <p><a href={url} target="_blank" rel="noreferrer">Read More</a></p>
        </div> 
    </div>
    )
}
