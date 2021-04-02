import React, { useState } from 'react'
import Input from './Input'
import API from './api'

export default function NewBoost() {
    const [format, setFortmat] = useState('')
    const [location, setlocation] = useState('')
    const [label, setLabel] = useState('');
    const [newText, setNewText] = useState('');
    const [newTag, setNewTag] = useState('');
    const [newImage, setNewImg] = useState('')
    const [newDate, setNewDate] = useState('');
    const [newHour, setNewHour] = useState('')

    const handleLocation = (e) => {
        setlocation(e.target.value)
    }

    const handleLabel = (e) => {
        setLabel(e.target.value)
    }

  

    const checkformatch = async () => {
        const response = await API.get('/');
        let reuier = response.data.filter(item => {
            return item.location === location
        }).filter(item => {
            return item.label.includes(label)
        }).sort((a, b) => b.rate - a.rate)

        console.log(reuier)
    }
    return (
        <div className="main">
            <h1>Request a New Boost:</h1>
            <form className="targeting">
                <div className="flexDiv">
            <Input type="checkbox" name="Story" value="story" onChange={(e) => setFortmat(e.target.value)} />
            <Input type="checkbox" name="Feed" value="feed" onChange={(e) => setFortmat(e.target.value)} />
            </div>
            <div className="flexDiv">
            <label >Loation:</label>
            <select onClick={handleLocation} >
                <option value="north">north</option>
                <option value="center">center</option>
                <option value="telaviv">telaviv</option>
                <option value="south">south</option>
            </select>
            
            <label >Label:</label>
            <select onChange={handleLabel}>
                <option value="fashion">fashion</option>
                <option value="food">food</option>
                <option value="beauty">beauty</option>
                <option value="shopping">shopping</option>
            </select>
            </div>
            <div className="secondFlexDiv">
            <Input type="text" name="Caption:" onChange={(e) => setNewText(e.target.value)} />
            <Input type="text" name="Tag:" onChange={(e) => setNewTag(e.target.value)} />
            <Input type="text" name="Image URL:" onChange={(e) => setNewImg(e.target.value)} />
            </div>
            <div className="flexDiv">
            <Input type="date" name="Post Date:" onChange={(e) => setNewDate(e.target.value)} />
            <Input type="time" name="Post Time:" onChange={(e) => setNewHour(e.target.value)} />
           </div>
            <button  onClick={checkformatch} >Get Boosters</button>
            </form>
        </div>
    )
}
