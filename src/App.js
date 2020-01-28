import React, { Component } from 'react'

import {WEATHER_KEY} from './keys'
import './App.css'
class App extends Component {
  state = {
    error: '',
    temp: null,
    pressure: null,
    humidity: null,
    wind: null,
    name: null,
    icon:null,
    description:null 
  } 

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( async position =>{             
       
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${WEATHER_KEY}`

      const req = await fetch(URL)
      const res = await req.json()

      if (res.cod === 200) {
        this.setState({
          temp: res.main.temp,
          pressure: res.main.pressure,
          humidity: res.main.humidity,
          wind: res.wind.speed,
          name: res.name + ", " + res.sys.country,
          icon: res.weather[0].icon,
          description: res.weather[0].description
        })
      }else{
        this.setState({error:"Error, try again."})
      }
    
     });
    } else {
      this.setState({error:"Geolocation is not supported by this browser."})
    }
  }

  render() {
    console.log(this.state)
    const {
      temp,
      pressure,
      humidity,
      wind,
      name,
      icon,
      description
    } = this.state

    return (
      <div className="card mx-auto mt-5">
        <div className="card-header bg-info text-white">
          <h3>{name}</h3>
          <div className="row">
            <div className="col-9">
              <p className="text-capitalize mt-2">{description}</p>
            </div>

            <div className="col-3">
              <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="icon-weather" className="img-fluid"/>
            </div>

          </div>

        </div>
        <div className="card-body">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Temperature: {temp} ºC</li>
          <li className="list-group-item">Pressure: {pressure} hPa</li>
          <li className="list-group-item">Humidity: {humidity}%</li>
          <li className="list-group-item">Wind: {wind} meter/sec</li>        
        </ul>
        </div>  
      </div>
    )
      
  }

}

export default App;