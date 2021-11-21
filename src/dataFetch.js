import React, {useState} from 'react';
import waterdrop from './img/water-drop.svg';
import rays from './img/rays.svg';
import wind from './img/wind.svg';

function DataFetch({data}) {
  var today = new Date();
  const [dayWeather, setDayWeather] = useState([]);
  var today_day = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();


  var day = [];
  var weeks = [];

  data.forecast.forecastday.map((item) => {
    console.log(item);
    var number = today.getHours();
    if(today.getHours().toString().length === 1){
      number = '0'+ today.getHours().toString();
    }

    if(today_day === item.date){
      item.hour.map(element => {
        if(element.time.substr(-5, 2) >= number){
          day.push(element)
        }
      })
    }else{
      weeks.push(item)
    }

    if(day.length < 25){
      if(item.date === today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate()+1)){
        item.hour.map(element => {
          if(day.length < 25){
            day.push(element)
          }
        })
      }
    }
  })

  return (
      <div className="main-infos">
        <div className="min-infos">
            <div className="">
              <p>{data.location.name}, {data.location.country}</p>
              <h1>{data.current.temp_c}°C</h1>
              <span>{data.current.condition.text}</span>
            </div>
            <div className="img-bg"></div>
          </div>

          <div className="icon-infos">
            <div className="c-icon_card">
              <img src={wind} width="100px" alt=""/>
              <p>{data.current.wind_kph} km/h</p>
            </div>
            <div className="c-icon_card">
              <img src={waterdrop} width="100px" alt=""/>
              <p>{data.current.humidity} %</p>
            </div>
            <div className="c-icon_card">
              <img src={rays} width="100px" alt=""/>
              <p>{data.current.uv}</p>
            </div>
          </div>

          <div className="day-infos">
            <p>Today</p>
            <div className="c-day">
              <div className="infos-hours">
                {
                  day.map(item => {
                      return (
                        <div className="hour-weather">
                          <p>{item.time.substr(-5, 2)}h</p>
                          <img src={item.condition.icon}/>
                          <p>{Math.round(item.temp_c)}°</p>
                        </div>
                      )
                  })
                }
              </div>
            </div>
          </div>

          <div className="week-infos">
            <p>Météo de la semaine</p>
            <div className="infos-week">
              {
                weeks.map(item => {
                  let date = new Date(item.date);
                  let day = date.toLocaleString('fr-FR', {weekday: 'long'});
                  return (
                    <div className="week-weather">
                      <p>{day}</p>
                      <img src={item.day.condition.icon}/>
                      <p>{Math.round(item.day.mintemp_c)}° / {Math.round(item.day.maxtemp_c)}°</p>
                    </div>
                  )
                })
              }
            </div>
          </div>
      </div>



  );
}

export default DataFetch;
