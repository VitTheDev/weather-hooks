import React, { useState } from 'react';
import axios from 'axios';

import './App.scss';

const api = {
  key: 'a47ddf44b39896e272b454c83326c68d',
  base: 'https://api.openweathermap.org/data/2.5/',
};

const App = () => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  console.log(data);

  const search = async (e) => {
    if (e.key === 'Enter') {
      await axios
        .get(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((response) => setData(response.data))
        .catch((err) => setError(err.message));
    }
  };

  const dateBuilder = (date) => {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    let day = days[date.getDay()];
    let myDate = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();

    return `${day} ${myDate} ${month} ${year}`;
  };

  const classname = (temp) => {
    if (data !== null) {
      if (data.main.temp > 15) {
        return 'warm';
      }
    }
    return;
  };

  return (
    <div className={`app ${classname()}`}>
      <main>
        <div className="search-box">
          <input
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            type="text"
            className="search-bar"
            placeholder="Search..."
            onKeyPress={search}
          />
        </div>
        {data !== null ? (
          <div>
            <div className="location-box">
              <div className="location">
                {data.name}, {data.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{data.main.temp}°C</div>
              <div className="weather">{data.weather[0].description}</div>
            </div>
          </div>
        ) : (
          <div>
            <h3>{error ? error : null}</h3>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
