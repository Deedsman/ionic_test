import React, { useState } from 'react'
import { IonContent, IonHeader, IonButtons, IonBackButton, IonPage, IonTitle, IonInput, IonItem, IonToolbar, IonList, IonButton } from '@ionic/react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import { loginUser } from '../../firebaseConfig'
import { toast } from '../../toast';
import { useDispatch } from 'react-redux';
import { set_user_state, add_new_write } from '../../toolkitRedux/toolkitReducer'
import { getCurrentUser } from '../../firebaseConfig';

//login component

const Login: React.FC = () => {

  //useState for set username and password
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const history = useHistory();
  const dispatch = useDispatch()

  async function login() {


    const res: any = await loginUser(username, password);

    if (res) {
      //get User when login
      getCurrentUser().then((user: any) => {
        if (user) {
          dispatch(set_user_state(user.user.email))
          dispatch(add_new_write(user.userData.data()))
          history.replace('/item')
          toast('You have logged in');
        } else {
          history.replace('/login')
          toast("I not login");
        }
      })
    }
  }



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Login</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent >
        <div className="center">
          <IonItem>
            <IonInput value={username} placeholder="Name?" onIonChange={(e: any) => setUsername(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonInput value={password} type="password" placeholder="Password?" onIonChange={(e: any) => setPassword(e.detail.value!)}></IonInput>
          </IonItem>
          <div className="button__container">
            <IonButton onClick={login}>Login</IonButton>
          </div>
          <p>New account? <Link to="/register">Registration</Link></p>
        </div>
      </IonContent>

    </IonPage>
  );
};

export default Login;
