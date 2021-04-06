import React, { useState } from 'react'
import Input from './Input'
import API from './api'
import Card from './BoosterCard'
import Confirm from './Confirm'
import Preview from './Preview'
import Loader from '../components/Loader/Loader'
import Select from './Select'
import Utilities from './Utilities'

export default function NewBoost() {
    const [format, setFortmat] = useState('')
    const [location, setlocation] = useState('')
    const [label, setLabel] = useState('');
    const [newText, setNewText] = useState('');
    const [newTag, setNewTag] = useState('');
    const [newImage, setNewImg] = useState('')
    const [newDate, setNewDate] = useState('');
    const [newHour , setNewHour] =useState('')
    const [emptyForm, setEmtpy] = useState(true)
    const [loading, setLoading] = useState(false)
    const [match, setMatch] = useState([])
    const [chosen, setChosen] = useState([])
    const [confirmDis, setConfirm] = useState(false)
    const [previewDIs, setPreview] = useState(false)
    const [error, setError] = useState(false)

    const handleLocation = (e) => {
        setlocation(e.target.value)
        setError(false)
    }

    const handleLabel = (e) => {
        setLabel(e.target.value)
    }

    const checkformatch = async () => {
        setLoading(true)
        const response = await API.get('/');
        let requested = response.data.filter(item => {
            return item.location === location
        }).filter(item => {
            return item.label.includes(label)
        }).sort((a, b) => b.rate - a.rate);

        showAPIResult(requested)

    }

    const showAPIResult = (results) => {
        if (results.length > 0) {
            setMatch(results);
            setEmtpy(false);
        }
        else { setError(true) }    //set error messeage
        setLoading(false)
    }

    const getPArtnerByID = (theID) => {
        let theChosen = match.filter(item => {
            return item.id === theID
        })
        return setChosen(...theChosen)
    }

    const handlePreview = (e) => {
        getPArtnerByID(e.target.id)
        setPreview(true)
    }

    const handleConfirm = (e) => {
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
                        <Input type="radio" group="format" name="Feed" value="feed" onChange={(e) => setFortmat(e.target.value)} />
                    </div>
                    <div className="flexDiv">
                        <Select name="Location:" values={Utilities[1].location} onClick={handleLocation} />
                        <Select name="Labels:" values={Utilities[0].labels} onClick={handleLabel} />
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
                    <input className="matchButton" type="button" value="Get Boosters" onClick={checkformatch} />
                </form>}
            {loading && <Loader text="Getting Some Awesome Data, Please Wait..." response={false} />}
            {!emptyForm && <div className="results" >
                {match.map((item, index) => {
                    return <Card key={index} pic={item.avatar} name={item.name} id={item.id}
                        onClickPreview={handlePreview} onClickConfirm={handleConfirm} followers={item.followers}
                    />
                })}
            </div>
            }
            {
                previewDIs && <Preview name={chosen.name} pic={chosen.avatar} image={newImage}
                    text={newText} tag={newTag} format={format} closePop={closePop} />
            }
            {
                confirmDis && <Confirm format={format} date={newDate} id={chosen.id}
                    amount={chosen.followers} closePop={closePop} boostID={Math.floor(Math.random() * 4000 + 1)}
                    image={newImage} text={newText} />
            }
             {error && <h3 style={{color:'red',textAlign:'center'}}>Oh no! We couldn’t find a suitable match for these targets, please try again...</h3>}
        </div>
    )
}
