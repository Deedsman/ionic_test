import { IonContent, IonHeader, IonPage, IonGrid, IonCol, IonButton, IonTitle, IonRow, IonToolbar, IonItem, IonThumbnail, IonImg } from '@ionic/react';
import './styles.css';
import { DataPicker } from '../../components/DatePicker';
import WriteMeet from '../../components/WriteMeet';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { logoutUser } from '../../firebaseConfig';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { get_specialist_state } from '../../toolkitRedux/toolkitReducer'
import { addData } from '../../firebaseConfig';


//component Item import props and 


const Item: React.FC = () => {
  //useState for add day and time local
  const [day, setDay] = useState<any[]>([])
  const [time, setTime] = useState<string>('')
  //useHistory for change path in route
  const history = useHistory();
  //useDispatch for dispatching get State for simple information
  const dispatch = useDispatch()
  //useSelector for load user name and specialist
  const username = useSelector((state: any) => state.toolkit.user.username);
  const specialist: any = useSelector((state: any) => state.toolkit.specialist);

  const addDay = (arrDays: Array<any>) => {
    setDay(arrDays);
  }
  const addTime = (newTime: string) => {
    setTime(newTime);
  }

  //logout from account
  const logout = async () => {
    await logoutUser();
    history.replace('/')

  }
  //add time to firebase
  const addDateTime = async () => {
    const res: any = await addData(day, time);
  }
  //add state component mount
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
