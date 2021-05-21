import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard'
import axios from 'axios'

export default function Explore() {
    const [blogs , setBlogs] = useState([])

    useEffect(() => {
        const search = async () => {
        const response = await axios.get('https://newsapi.org/v2/everything?qInTitle=influencer&language=en&apiKey=cf03f99001ac4168a727057571615849');
        setBlogs(response.data.articles)
        }
        search();
    },[])
    return (
        <div className="main">
            <h2>Need some guidence for influencer marketing?</h2>
            <h3>We got for you the latest blogs with inspring insights and trends</h3>
            <div className="blogsGrid">
                  {blogs.map((item,index)=> {
                      return <BlogCard key={index} img={item.urlToImage} title={item.title}
                      author={item.author} url={item.url}/>
                  })}
                </div>
        </div>
    )
}
