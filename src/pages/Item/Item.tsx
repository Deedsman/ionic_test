import { IonContent, IonHeader, IonPage, IonGrid, IonCol, IonButton, IonTitle, IonRow, IonToolbar, IonItem, IonThumbnail, IonImg } from '@ionic/react';
import './styles.css';
import { DataPicker } from '../../components/DatePicker';
import WriteMeet from '../../components/WriteMeet';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { logoutUser } from '../../firebaseConfig';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { get_specialist_state } from '../../toolkitRedux/toolkitReducer'
import { addData } from '../../firebaseConfig';


interface Days {
  arrayDays: Array<any>
}
interface someState {
  state: any
}

const Item: React.FC<someState> = (props) => {
  const [day, setDay] = useState<Days[]>([])
  const [time, setTime] = useState<string>('')
  const history = useHistory();
  const dispatch = useDispatch()
  const username = useSelector((state: any) => state.toolkit.user.username);
  const specialist: any = useSelector((state: any) => state.toolkit.specialist);

  const addDay = (arrDays: Array<any>) => {
    // console.log(arrDays);
    setDay(arrDays);
  }
  const addTime = (newTime: string) => {
    setTime(newTime);
  }
  const logout = async () => {
    await logoutUser();
    history.replace('/')

  }
  const addDateTime = async () => {
    const res: any = await addData(day, time);
  }
  useEffect(() => {
    dispatch(get_specialist_state())
  }, [])

  return (
    <IonPage className="item">
      <div className="item__logout" onClick={logout}>Logout</div>
      <span className="item__header-name">{username}</span>
      <IonContent>
        <div className="item__description">
          {specialist.map((item: any, i: number) => (
            <IonGrid key={i}>
              <IonRow><IonCol><div className="item__title">{item.full_name}</div></IonCol></IonRow>
              <IonRow >
                <IonCol><IonImg src={item.avatar} /></IonCol>
                <IonCol className="item__text-container"><div className="item__text">Длительность консультации </div><strong>50 минут</strong></IonCol>
              </IonRow>
            </IonGrid>
          ))}
        </div>

        <DataPicker days={specialist[0].variant_data_time.days} times={specialist[0].variant_data_time.time} setDay={addDay} addTime={addTime} />
        <WriteMeet addDateTime={addDateTime} days={day} time={time} />
      </IonContent>
    </IonPage>
  );
};

export default Item;
