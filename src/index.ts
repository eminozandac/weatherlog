import app from './App'

const request = require('request')
const locationList = require("./locationList.json");
const port = process.env.PORT || 3000
const weatherApiKey = process.env.API_KEY || '060fbf492eede0342799c61f387396fe';

app.listen(port, (err) => {
  if (err) {
    return console.log(err)
  }

  for(let i=0;i<locationList.length;i++) {
      let city = locationList[i].city
      let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}`
      request({
        url: weatherApiUrl,
        json: true
      }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          let weatherDetail = body

          let locationTime = new Date(body.dt * 1000)
          let locationTimeString = locationTime.toUTCString()
          locationTimeString = locationTimeString.substring(4, locationTimeString.length)
          
          let weatherMessage = `-${weatherDetail.name}: ${locationTimeString} , ${weatherDetail.weather[0].description} ${weatherDetail.main.temp} degrees`
          console.log(weatherMessage);
        
      }else {
          console.log('failed to get weather info!')
        }
      })
    }

  return console.log(`server is listening on ${port}`)
})
