import { useState } from 'react'
import './App.css'
import searchIcon from './assets/images.jpg'
import locationIcon from './assets/download (2).jpg'
import cloudIcon from './assets/download.png'
import humidityIcon from './assets/humidi.png'
import windIcon from './assets/window.png'
import pressureIcon from './assets/sunny-icon-0.png'
import rainIcon from './assets/download (1).jpg'
import snowIcon from './assets/download5.jpg'


const WeatherDetails = ({ icon, temp, city, country, lat, log, humidity, windSpeed }) => {
  return (
    <>
      <div className='image'>
        <img src={icon} alt="weather icon" />
      </div>
      <div className="temp">{temp}°C</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className="lat">latitude </span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="log">longitude </span>
          <span>{log}</span>
        </div>
      </div>
      <div className="data-container">
        <div className='element'>
          <img src={humidityIcon} alt="Humidity Icon" className="icon" />
          <div className="data">
            <div className="humidity-percent">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className='element'>
          <img src={windIcon} alt="Wind Icon" className="icon" />
          <div className="data">
            <div className="wind-speed">{windSpeed} km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </>
  )
}

function App() {
  let api_key = "1344b60e564c2e1892ef2a6255c163ef"
  const [text, setText] = useState("Chennai")
  const [icon, setIcon] = useState(pressureIcon)
  const [temp, setTemp] = useState(0)
  const [city, setCity] = useState("chennai")
  const [country, setCountry] = useState("india")
  const [lat, setLat] = useState(0)
  const [log, setLog] = useState(0)
  const [humidity, setHumidity] = useState(0)
  const [windSpeed, setWindSpeed] = useState(0)
  const [cityNotFound, setCityNotFound] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

 const weatherIconMap={
  "01d": locationIcon,
  "01n": locationIcon,
  "02d": locationIcon,
  "02n": cloudIcon,
  "03d": cloudIcon,
  "03n": cloudIcon,
  "04d": rainIcon,
  "04n": rainIcon,
  "09d": rainIcon,
  "09n": rainIcon,
  "10d": cloudIcon,
  "10n": cloudIcon,
  "11d": cloudIcon,
  "11n": cloudIcon,
  "13d":snowIcon,
  "13n": snowIcon,
  "50d": snowIcon,
  "50n": snowIcon
 }


  const search = async () => {
    setIsLoading(true);
    setCityNotFound(false); // Reset city not found state before search
    
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`

    try {
      let res = await fetch(url);
      let data = await res.json();
      
      if (res.ok) {
        setIcon(weatherIconMap[data.weather[0].icon] || pressureIcon); // Set icon based on weather condition
        setTemp(data.main.temp);
        setCity(data.name);
        setCountry(data.sys.country);
        setLat(data.coord.lat);
        setLog(data.coord.lon);
        setHumidity(data.main.humidity);
        setWindSpeed(data.wind.speed);
      } else {
        setCityNotFound(true);
        // Reset weather data when city not found
        setIcon(pressureIcon);
        setTemp(0);
        setCity("");
        setCountry("");
        setLat(0);
        setLog(0);
        setHumidity(0);
        setWindSpeed(0);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
      setCityNotFound(true);
    } finally {
      setIsLoading(false);
    }
  }

  const handleCity = (e) => {
    setText(e.target.value)
  }

  return (
    <>
      <div className="container">
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter city name"
            className="cityInput"
            onChange={handleCity}
            value={text}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                search();
              }
            }}
          />
          <div className="searchIcon" onClick={() => search()}>
            <img src={searchIcon} alt="search icon" />
          </div>
        </div>
        
        {isLoading && <div className="loading">Loading...</div>}
        
        {cityNotFound ? (
          <div className="error-message">City not found! Please try again.</div>
        ) : (
          <WeatherDetails 
            icon={icon} 
            temp={temp} 
            city={city} 
            country={country}
            lat={lat} 
            log={log} 
            humidity={humidity} 
            windSpeed={windSpeed}
          />
        )}
      </div>
      <p className='copyright'> Designed BY <span>Sriram T</span> © 2026</p>
    </>
  )
}

export default App