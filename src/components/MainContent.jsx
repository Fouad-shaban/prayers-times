/* eslint-disable no-unused-vars */
import axios from "axios";
import Prayer from "./Prayer";
import { useState } from "react";
import { useEffect } from "react";
import moment from "moment";
import "moment/dist/locale/ar";

moment.locale("ar");

const MainContent = () => {
  const getTiming = async () => {
    const response = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?country=SA&city=${city.name}`
    );
    setTimings(response.data.data.timings);
  };
  const [timings, setTimings] = useState({
    Fajr: "4:30 AM",
    Sunrise: "6:00 AM",
    Dhuhr: "12:30 PM",
    Asr: "3:30 PM",
    Maghrib: "6:00 PM",
    Isha: "8:00 PM",
  });
  const [city, setCity] = useState({
    displayName: "مكة المكرمة",
    name: "Makkah Al Mukarramah",
  });

  const [nextPrayer, setNextPrayer] = useState(2);

  const [remainingTime, setRemainingTime] = useState("");

  const [today, setToday] = useState();


  const availableCities = [
    {
      displayName: "مكة المكرمة",
      name: "Makkah Al Mukarramah",
    },
    {
      displayName: "المدينة المنورة",
      name: " AL Madinah AL Munawwarah",
    },
    {
      displayName: "القاهرة",
      name: "Cairo",
    },
  ];

  const prayersArray = [
    {
      key: "Fajr",
      displayName: "صلاة الفجر",
      name: "Fajr",
      time: timings.Fajr,
      image: "/images/mosque5.jpg",
    },
    {
      key: "Sunrise",
      displayName: "الشروق",
      name: "Sunrise",
      time: timings.Sunrise,
      image: "/images/sunset.jpg",
    },
    {
      key: "Dhuhr",
      displayName: "صلاة الظهر",
      name: "Dhuhr",
      time: timings.Dhuhr,
      image: "/images/mosque3.jpg",
    },
    {
      key: "Asr",
      displayName: "صلاة العصر",
      name: "Asr",
      time: timings.Asr,
      image: "/images/mosque1.jpg",
    },
    {
      key: "Maghrib",
      displayName: "صلاة المغرب",
      name: "Maghrib",
      time: timings.Maghrib,
      image: "/images/mosque2.jpg",
    },
    {
      key: "Isha",
      displayName: "صلاة العشاء",
      name: "Isha",
      time: timings.Isha,
      image: "/images/mosque4.jpg",
    },
  ];

  useEffect(() => {
    getTiming();
  }, [city]);

  useEffect(() => {
    let interval = setInterval(() => {
      setupCountdownTimer();
    }, 1000);

    const t = moment().format("dddd, MMMM Do YYYY || h:mm a");
    setToday(t);

    return () => {
      clearInterval(interval);
    };
  }, [timings]);

  const setupCountdownTimer = () => {
    const now = moment();
    let nextPrayer= null;

    if(now.isAfter(moment(timings.Fajr, "HH:mm")) && now.isBefore(moment(timings.Sunrise, "HH:mm"))){
      nextPrayer = 1;
    }else if(now.isAfter(moment(timings.Sunrise, "HH:mm")) && now.isBefore(moment(timings.Dhuhr, "HH:mm"))){
      nextPrayer = 2;
    }else if(now.isAfter(moment(timings.Dhuhr, "HH:mm")) && now.isBefore(moment(timings.Asr, "HH:mm"))){
      nextPrayer = 3;
    }else if(now.isAfter(moment(timings.Asr, "HH:mm")) && now.isBefore(moment(timings.Maghrib, "HH:mm"))){
      nextPrayer = 4;
    }else if(now.isAfter(moment(timings.Maghrib, "HH:mm")) && now.isBefore(moment(timings.Isha, "HH:mm"))){
      nextPrayer = 5;
    }else if(now.isAfter(moment(timings.Isha, "HH:mm"))){
      nextPrayer = 0;
    }
    setNextPrayer(nextPrayer);

    const nextPrayerObj = prayersArray[nextPrayer];
    const nextPrayerTime = timings[nextPrayerObj.key];
    const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm");
    let remainingTime = moment(nextPrayerTime, "HH:mm").diff(now);
    
    if(remainingTime < 0){
    const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(now);
    const fajrDiff = nextPrayerTimeMoment.diff(moment("00:00:00", "hh:mm:ss"));
    const totalDiff = midnightDiff + fajrDiff;
    remainingTime = totalDiff;
  }

    console.log(remainingTime);
    const duration = moment.duration(remainingTime);
    setRemainingTime(`${duration.hours()}:${duration.minutes()}:${duration.seconds()}`);

    console.log(duration.hours(), duration.minutes(), duration.seconds());
    
};

  const handleCityChange = (e) => {
    const selectedCity = availableCities.find(
      (city) => city.name === e.target.value
    );
    console.log(e.target.value);
    setCity(selectedCity);
  };
  return (
    <div className="m-5 flex justify-center flex-col h-full">
      {/* header */}
      <div className="bg-white text-gray-900 items-center p-1 rounded-2xl">
        <div className="flex justify-around px-7">
          <div className="flex flex-col justify-center rounded-lg ">
            <p className="text-xl mb-2"> {city.displayName}</p>
            <p className="text-xl"> {today} </p>
          </div>
          <div className="flex flex-col justify-center rounded-lg p-3">
            <h1 className="text-3xl text-center p-1 ">مواقيت الصلاة</h1>
            <select
              name="city"
              id="cities"
              onChange={handleCityChange}
              className="p-1  rounded-lg border-2 "
            >
              {availableCities.map((city) => {
                return (
                  <option value={city.name} key={city.name}>
                    {city.displayName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col justify-center rounded-lg ">
            <p className="text-xl mb-2">
              {" "}
              متبقي حتي {prayersArray[nextPrayer].displayName}
            </p>
            <p className="text-xl"> {remainingTime}</p>

          </div>
        </div>
      </div>

      <div className="flex  justify-around mt-5">
        
        <div className="flex flex-wrap justify-center  rounded-lg">
          <Prayer
            name="صلاة الفجر"
            time={timings.Fajr}
            image="/images/mosque5.jpg"
          />
          <Prayer
            name="الشروق"
            time={timings.Sunrise}
            image="/images/sunset.jpg"
          />
          <Prayer
            name="صلاة الظهر"
            time={timings.Dhuhr}
            image="/images/mosque3.jpg"
          />
          <Prayer
            name="صلاة العصر"
            time={timings.Asr}
            image="/images/mosque1.jpg"
          />
          <Prayer
            name="صلاة المغرب"
            time={timings.Maghrib}
            image="/images/mosque2.jpg"
          />
          <Prayer
            name="صلاة العشاء"
            time={timings.Isha}
            image="/images/mosque4.jpg"
          />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
