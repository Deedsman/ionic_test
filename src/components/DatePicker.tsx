import React, { useState, useMemo } from 'react';
import { IonSlides, IonSlide, IonContent, IonDatetime } from '@ionic/react';


interface AddDay {
  setDay(arrDays: Array<any>): void
  addTime(time: string): void
  days: any[]
  times: any[]

}

const slideOpts = {
  slidesPerView: 3.5,
  speed: 400,
  spaceBetween: 16,
};
const slideTime = {
  slidesPerView: 3.5,
  speed: 400,
  spaceBetween: 25,
};



export const DataPicker: React.FC<AddDay> = (props) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeTime, setActiveTime] = useState(0)
  const addDay = (arrDays: Array<any> = [], index: number) => {
    setActiveIndex(index);
    props.setDay(arrDays);
  }
  const setTime = (time: string, index: number) => {
    setActiveTime(index)
    props.addTime(time);
  }
  let days: any[] = props.days;
  let times: any[] = props.times;


  return (

    <div>
      <div className="item__date">
        <div className="item__date-nav">
          <div className="item__date-title">Возможная дата</div>
          <div className="item__date-change-view">
            <img className="item__disable" src="./assets/disable.svg" />
            <img className="item__calendar-icon" src="./assets/calendar.svg" />

          </div>
        </div>
        <IonSlides options={slideOpts}>
          {days.map((day: any, i: number) => (
            <IonSlide onClick={(e) => addDay([day], i)} key={i}>
              <div className={`item__day-container ${activeIndex === i && "active"}`}>
                <h4 className="item__day-name">{day.day}</h4>
                <span>{day.number}</span>
              </div>
            </IonSlide>
          ))}
        </IonSlides>
        <div className="item__date-title date-title">Свободное время</div>
        <IonSlides options={slideTime}>
          {times.map((t: any, i: number) => (
            <IonSlide onClick={(e) => setTime(t.time, i)} key={i}>
              <div className="item__time-container">
                <h4 className={`item__time ${activeTime === i && "active"}`}>{t.time}</h4>
              </div>
            </IonSlide>
          ))}
        </IonSlides>
      </div>

    </div >
  );
}


