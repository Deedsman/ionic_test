import React from 'react';
import { IonButton } from '@ionic/react';
import { useSelector } from 'react-redux';

//importing some props

type dayProps = {
    days: any[]
    time: string
    addDateTime(action: any): void
}

// component for add current date for meet

const WriteMeet: React.FC<dayProps> = ({ days, time, addDateTime }) => {

    //import data from useSelector from store

    const data: any = useSelector((state: any) => state.toolkit.specialist[0].current_write_time);

    return (
        <div className="write__container">
            <div className="write__description">
                <div className="write__item">
                    <h4 className="write__title">Дата</h4>
                    {days.length != 0 ? (<div className="write__day">{days[0].number} {days[0].month}</div>) :
                        data.new_day.length != 0 ? (<div className="write__day">{data.new_day[0].number} {data.new_day[0].month}</div>) : (<div className="write__day">27 may</div>)

                    }

                </div>
                <div className="write__item">
                    <h4 className="write__title">Время</h4>
                    {time.length != 0 ? (<div className="write__day">{time}</div>) :
                        data.new_day.length != 0 ? (<div className="write__day">{data.new_time}</div>) : (<div className="write__day">18:30</div>)

                    }
                </div>

            </div>
            <IonButton className="write__btn" onClick={addDateTime}>ЗАПИСАТЬСЯ НА БЕСПЛАТНУЮ ВСТРЕЧУ</IonButton>
        </div>
    );
}

// const newWrite = (prevProps: any, nestProps: any) => {
//     debugger;
//     if (prevProps) {
//         return false;
//     } else {
//         return nestProps;
//     }

// }
export default WriteMeet;