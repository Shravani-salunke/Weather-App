import React,{useEffect, useRef, useState} from 'react'
import './Home.css'
import SearchIcon from '@mui/icons-material/Search';
import clear_icon from "../assets/clear.png"
import cloud_icon from "../assets/cloud.png"
import drizzle_icon from "../assets/drizzle.png"
import rain_icon from "../assets/rain.png"
import snow_icon from "../assets/snow.png"
import wind_icon from "../assets/wind.png"
import humidity_icon from "../assets/humidity.png"
const Home=()=> {
     const inputRef = useRef()
    const [weatherData,setWeatherData]=useState(false);
    const allIcons ={
        "01d":clear_icon,
        "01n":clear_icon,
        "02d":cloud_icon,
        "02n":cloud_icon,
        "03d":cloud_icon,
        "03n":cloud_icon,
        "04d":drizzle_icon,
        "04n":drizzle_icon,
        "09d":rain_icon,
        "09n":rain_icon,
        "10d":rain_icon,
        "10n":rain_icon,
        "13d":snow_icon,
        "13n":snow_icon,


    }
    const search =async(city)=>{
        if(city===""){
            alert("Enter City Name");
            return;
        }
        try{
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
        
            const response = await fetch(url);
            const data = await response.json();
            if(!response.ok){
                alert(data.message);
                return;
            }
            console.log(data);
            const icon= allIcons[data.weather[0].icon] ||clear_icon ;
            setWeatherData({
                humidity:data.main.humidity,
                windSpeed:data.wind.speed,
                temperature:Math.floor(data.main.temp),
                location:data.name,
                icon:icon
            })
        }catch(error){
        setWeatherData(false);
        console.error("Error while fetching data");
        }
    }
    useEffect(()=>{
        search("");
    },[])
  return (
    <div className="container">
        <div className="weather">
            <div className="search">
                <input  ref={inputRef} type="text" placeholder='Enter the City Name' />
                <button className='btn'>
                    <SearchIcon onClick={()=>search(inputRef.current.value)}/>
                </button>
            </div>
            {weatherData?<>
                <img src={weatherData.icon} alt="" />
            <div className="windinfo">
                <h1>{weatherData.temperature}°c</h1>
                <h2>{weatherData.location}</h2>
                <div className="details">
                    <div className="col">
                      <img src={humidity_icon} alt="" />
                        <div className='humidity'>
                            <p>{weatherData.humidity}%</p>
                            <p>humidity</p>
                        </div>
                    </div>
                    <div className="col">
                     <img src={wind_icon} alt="" />  
                        <div className='wind'>
                            <p>{weatherData.windSpeed} km/h</p>
                            <p>Wind Speed</p>
                        </div>
                    </div>
                </div>
            </div>
            </>:<></>}
          
        </div>
    </div>
  )
};

export default Home
