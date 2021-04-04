import React, { useState } from 'react'
import Input from './Input'
import API from './api'
import Card from './BoosterCard'
import Confirm from './Confirm'
import Preview from './Preview'

export default function NewBoost() {
    const [format, setFortmat] = useState('')
    const [location, setlocation] = useState('')
    const [label, setLabel] = useState('');
    const [newText, setNewText] = useState('');
    const [newTag, setNewTag] = useState('');
    const [newImage, setNewImg] = useState('')
    const [newDate, setNewDate] = useState('');
    const [newHour, setNewHour] = useState('')
    const [emptyForm , setEmtpy] = useState(true)
    const [loading , setLoading] = useState(false)
    const [match , setMatch] = useState([])
    const [chosen , setChosen] = useState([])
    const [confirmDis , setConfirm] = useState(false)
    const [previewDIs , setPreview] = useState(false)

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

        setMatch(reuier);
        setEmtpy(false)
    }

    const getPArtnerByID = (theID) => {
      let theChosen =  match.filter( item => {
            return item.id === theID
        })
       return setChosen(...theChosen)
    }

    const handlePreview = (e) => {
        console.log('preview' , e.target.id)
        getPArtnerByID(e.target.id)
        setPreview(true)
       
    }

    const handleConfirm = (e) => {
        console.log('confirm' , e.target.id)
        getPArtnerByID(e.target.id)
        setConfirm(true)
    }

    const closePop = () => {
        setConfirm(false);
        setPreview(false)
    }
    return (
        <div className="main">
            
            {emptyForm && 
             <form className="targeting">
                 <h1>Create a New Boost:</h1>
                <div className="flexDiv">
            <Input type="radio" group="format" name="Story" value="story" onChange={(e) => setFortmat(e.target.value)} />
            <Input type="radio"group="format" name="Feed" value="feed" onChange={(e) => setFortmat(e.target.value)} />
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
                <option value="lifestyle">lifestyle</option>
                <option value="travel">travel</option>
                <option value="music">music</option>
                <option value="art">art</option>
                <option value="parents">parents</option>
                <option value="fitness">fitness</option>
                <option value="gatgets">gatgets</option>
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
            <input type="button" value="Get Boosters" onClick={checkformatch}/>
            </form>}
            {!emptyForm && <div className="results" > 
            {match.map((item , index) => {
                return <Card key={index} pic={item.avatar} name={item.name} id={item.id}
                onClickPreview={handlePreview} onClickConfirm={handleConfirm} followers={item.followers}
                 />
            })}
            </div>
            }
            {
             previewDIs && <Preview name={chosen.name} pic={chosen.avatar} image={newImage}
                             text={newText} tag={newTag} format={format} closePop={closePop}/>
            }
            {
             confirmDis && <Confirm format={format} date={newDate} id={chosen.id} 
             amount={chosen.followers} closePop={closePop} boostID={Math.floor(Math.random()*4000 +1)}
             image={newImage} text={newText} />
            }
            
        </div>
    )
}
