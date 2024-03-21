import React from "react";

import smile from "/smile.png";
import windowImage from "/window.png";


function HomePage(){
    const [meme, setMeme] = React.useState({
        topText: " ",
        bottomText: " ",
        "randomImage": "/window.png"
    })

    const [allMemes, setAllMemes] = React.useState([])
    // const memeArray = allMemes.data.memes;
    
    // const randomNumber = Math.floor(Math.random() * memeArray.length);
    

    React.useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
            .then(res=> res.json())
            .then(data => setAllMemes(data.data.memes))

        // //USING AN ASYNC FUNCTION FOR THE API CALL
        // async function getMemes(){
        //     const res = await fetch("https://api.imgflip.com/get_memes")
        //     const data = res.json()
        //     setAllMemes(data.data.memes)
        // }
        // //with the async function, you might not need a clean up function to control the memory leak
    },[])

    function handleChange(event){
        const {name, value} = event.target
        setMeme(prevState => ({
            ...prevState,
            [name]: value
        }))
    }


    function memeDisplay(){
        const randomNumber = Math.floor(Math.random() * allMemes.length);
        const url = allMemes[randomNumber].url;
        setMeme(prevState => ({
            ...prevState,
            "randomImage": url,
        }))
    
        }
return(
    <>
        <div className="main">
            <header className="header">
                <div className="left-side">
                    <img src={smile} alt="image not found" />
                    <h1>Meme Generator</h1>
                </div>
                <div className="right-side">
                    <h2>React Course - Project</h2>
                </div>
            </header>
            <main>
                <div className="form">
                    <input type="text" className="form--input" name="topText" value={meme.topText} onChange={handleChange}
                    placeholder="type something here"/>
                    <input type="text" className="form--input" name="bottomText" value={meme.bottomText} onChange={handleChange}
                    placeholder="aAnything else?"/>
                    <button onClick={memeDisplay} className="form--button">Get a new meme image <img src={windowImage} alt="image not found" /></button>
                </div>
            </main>
                
            
            <div className="meme-image">
                <img src={meme.randomImage} alt="image not found" />
                <div className="meme-text">
                    <h2 className="top">{meme.topText}</h2>
                    <h2 className="bottom">{meme.bottomText}</h2>
                </div>
            </div>
        </div>
    </>
);
}
export default HomePage;