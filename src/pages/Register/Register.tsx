import React, { useState } from 'react'
import { IonContent, IonButtons, IonBackButton, IonHeader, IonPage, IonTitle, IonInput, IonItem, IonToolbar, IonList, IonButton } from '@ionic/react';

import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import { toast } from '../../toast';
import { registerUser } from '../../firebaseConfig'
import { useDispatch } from 'react-redux';
import { set_user_state } from '../../toolkitRedux/toolkitReducer'


//component register and set on firebase ,and set in store
const Register: React.FC = () => {

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch()
  const history = useHistory();

  async function register() {
    if (username.trim() === '' || password.trim() === '') {
      return toast('Username and password are required')
    }

    const res = await registerUser(username, password)


    if (res) {
      history.replace('/item')
      toast('You have registered successfully!')
      dispatch(set_user_state(username));
    }


  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent >
        <div className="center">
          <IonItem>
            <IonInput value={username} placeholder="Name" onIonChange={(e: any) => setUsername(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonInput value={password} type="password" placeholder="Password" onIonChange={(e: any) => setPassword(e.detail.value!)}></IonInput>
          </IonItem>
          <div className="button__container">
            <IonButton onClick={register}>Register</IonButton>
          </div>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </IonContent>

    </IonPage>
  );
};

export default Register;
