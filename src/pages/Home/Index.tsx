import React, { useState } from 'react'
import { IonContent, IonHeader, IonPage, IonItem, IonButton, IonTitle, IonToolbar, IonInput } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import './styles.css';

const Home: React.FC = () => {
  // const [text, setText] = useState<string>();
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonContent >
          <div className="center">
            <h1>Hello Login or Registration</h1>
            <div className="button__container">
              <IonButton routerLink="/login">Login</IonButton>
              <IonButton routerLink="/register">Registration</IonButton>
            </div>
          </div>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Home;
