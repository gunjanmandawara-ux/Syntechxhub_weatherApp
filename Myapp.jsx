import React, {useState} from "react";
import cloud from "../images/cloudy.png"
import clear from "../images/clear-sky.png"

import fog from "../images/fog.png"
import mark from "../images/mark.png"
import raining from "../images/raining.png"
import searchIcon from "../images/search.png"



function Myapp() {

    const[search, setSearch] = useState("")
    const [data, setData] = useState()
const [error, setError] = useState("")


    const API_KEY = "19bec8399c1257134d715bda6556f82b"
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}`

    const handleInput = (event)=>{
        setSearch(event.target.value)
        console.log(event.target.value)
    }

       const myFun = async () => {

    if (search.trim() === "") {
        setError("Please enter a city name")
        return
    }

    try {
        const get = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`
        )

        const jsonData = await get.json()

        console.log(jsonData)

        if (jsonData.cod === 404 || jsonData.cod === "404") {
            setError("City not found")
            return
        }

        setData(jsonData)
        setError("")
        setSearch("")

    } catch (error) {
        setError("Something went wrong")
    }
}

  

    return(
        <>
        <div className="container">
            <div className="inputs">
                <input placeholder="Enter City Name, Country" value={search} onChange={handleInput} />
                <button onClick={myFun}>
                 <img src={searchIcon} alt="search" />
                </button>
            </div>
            <div>
{
    error ?
    <div className="error">
      <p>  {error} </p>
      < img src ={mark} alt="error"/>
        </div> :""
}




{
    data && data. weather ? 
    <div className="weather">
        <h2>{data.name}</h2>
       


            <img src = {data.weather[0].main == "Clouds" ? cloud : data.weather[0].main == "Rain" ? raining : data.weather[0].main == "Clear" ? clear : data.weather[0].main == "Fog" ? fog : data.weather[0].main == "Haze" ? mark : ""} alt="weather" />


         <h2>{Math.trunc(data.main.temp)} °C</h2> 
          <h3>{data.weather[0].description}</h3>
          <h4>{data.wind.speed}</h4>
    </div> :""
    }

            </div>
        </div>
        </>
    )
}


export default Myapp;