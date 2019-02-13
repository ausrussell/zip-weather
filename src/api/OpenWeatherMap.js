const mostCommon = array => {
  //helper to get most most used word in an array
  var counts = {};
  var compare = 0;
  var mostFrequent;
  for (let i = 0, len = array.length; i < len; i++) {
    let word = array[i];
    if (counts[word] === undefined) {
      counts[word] = 1;
    } else {
      counts[word] = counts[word] + 1;
    }
    if (counts[word] > compare) {
      compare = counts[word];
      mostFrequent = array[i];
    }
  }
  return mostFrequent;
};

const processJson = json => {
  //create a convenient data structure, cleanData, from json with the 5 days as the key
  //and "details" of 3 hourly, temp wind speed, rain, cloud, etc for day details
  //and "summary" of high, low, and main descriptor for 5 day forecast
  //e.g. {2019-02-10: {summary: {…}, details: Array(8)}...}
  let list = Object.values(json.list);
  let cleanData = {};
  list.forEach(element => {
    //details
    // the api's data has no unique date to access so use its dt_txt value without its time string
    var date = new Date(0);
    date.setUTCSeconds(element.dt);

    let dayString = date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric"
    });

    if (cleanData[dayString]) {
      //check if we've already added this day
      cleanData[dayString].details.push(element); //push to array of day's details
    } else {
      cleanData[dayString] = { summary: null, details: [element] }; //create an array to hold the details for the day
    }
  });

  let arr = Object.entries(cleanData);
  arr.forEach(([day, dayObj]) => {
    //summary
    //build and add the summary to the day
    //this is to extract highs lows and most frequent descriptor from the day
    let minTempArray = [];
    let maxTempArray = [];
    let descriptionArray = [];
    let iconArray = [];
    dayObj.details.forEach(obj => {
      minTempArray.push(obj.main.temp_min);
      maxTempArray.push(obj.main.temp_max);
      descriptionArray.push(obj.weather[0].main);
      iconArray.push(obj.weather[0].icon);
    });
    let summary = {
      high: Math.max(...maxTempArray),
      low: Math.min(...minTempArray),
      description: mostCommon(descriptionArray),
      icon: mostCommon(iconArray)
    };
    cleanData[day].summary = summary;
  });

  console.log("cleanData", cleanData);
  return cleanData;
};

const GetWeatherDataFromZip = zip => {
  const url = new URL("http://api.openweathermap.org/data/2.5/forecast");
  const params = {
    zip: zip + ",us",
    APPID: "8c2512992e4a719d359e1fcfc1e0d3b5",
    units: "imperial"
  };

  url.search = new URLSearchParams(params);
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(json => {
      console.log("json", json);
      return processJson(json);
    });
};

export default GetWeatherDataFromZip;
