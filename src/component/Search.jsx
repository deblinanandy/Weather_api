import React, { useState, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';


import './style.css';
import TextField from '@material-ui/core/TextField';
function Search() {
  const [info, setInfo] = useState({});
  const ref1 = useRef();

  const search = () => {
    if (ref1.current.value) {
      const cityName = ref1.current.value;
      const apiKey = '2aad8e85aa54a41c4e2d67df2667948c';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

      axios
        .get(apiUrl)
        .then((res) => {
          setInfo(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert('Please enter a city name.');
    }
  };

  const Fahrenheit = (f) => {
    
    return (f * 9/5) + 32; 
  };

  const Celsius = (c) => {
    return c - 273.15;
  };

  return (
    <>
    <div className='c'>
    <p className='a'>Day: {moment().format('dddd')}</p>
        <p className='a'>Date: {moment().format('LL')}</p>
      <h1 >Weather Information</h1>  <br/>
    <h2>ENTER CITY:</h2> 

    <TextField id="outlined-basic" label="enter city name" variant="outlined" inputRef={ref1} />
    
    <button className='e' onClick={search}>Search</button>
    <br/>
    <p className='d'>Temperature: {Celsius(info.main?.temp).toFixed(2)} °C / {Fahrenheit(info.main?.temp).toFixed(2)} °F</p>
    <p className='d'>Max Temperature: {Celsius(info.main?.temp_max).toFixed(2)} °C / {Fahrenheit(info.main?.temp_max).toFixed(2)} °F</p>
    <p className='d'>Min Temperature: {Celsius(info.main?.temp_min).toFixed(2)} °C / {Fahrenheit(info.main?.temp_min).toFixed(2)} °F</p>
    <p className='d'>Wind Speed: {info.wind?.speed} m/s</p>
    <p className='d'>Latitude: {info?.coord?.lat}</p>
    <p className='d'>Clouds: {info?.clouds?.all}</p>
    <p className='d'>Timezone: {info.timezone}</p>
   
    {info.weather && (
          <img
            src={`http://openweathermap.org/img/w/${info.weather[0].icon}.png`}
            alt='Weather Icon'
            height="340px"
            width="340px"
          />
        )}
    </div>
    
    </>
  
  );
}

export default Search;
