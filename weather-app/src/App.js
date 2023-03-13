import { useState } from 'react';
import './App.css';


const api = {
  'key' : "bf1bff29170736bb4375fda0dfd00882",
  'base' : "https://api.openweathermap.org/data/2.5/weather?"
}

function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  // listening to key event to run the code
  const search = evt => {
    if (evt.key === 'Enter') {
      fetch (`${api.base}q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
      })
    }
  }


  // // reading and displaying date
  const dateBuilder = (d) => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return  `${day} ${date} ${month} ${year}`
  }


  return (
    <div className={(typeof weather.main != "undefined" ? (weather.main.temp > 16 ? 'app warm' : 'app'): 'app')}>
      <main>
        <div className='search-Box'>
          <input type='text' placeholder='Search....' className='search-bar' 
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyDown={search}></input>
        </div>
        {(typeof weather.main != 'undefined') ? (
          <div>
            <div className='location-box'>
              <div className='location'>{weather.name}, {weather.sys.country}</div>
              <div className='date'>{dateBuilder(new Date())}</div>
            </div>
            <div className='weather-box'>
              <div className='temp'>
                {Math.round(weather.main.temp)}°C
              </div>
              <div className='weather'>{weather.weather[0].main}</div>
            </div>
          </div>
        ):("")}
        
      </main>
    </div>
  );
}

export default App;
