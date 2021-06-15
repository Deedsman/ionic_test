import React from 'react'
import { IonContent, IonPage, IonButton } from '@ionic/react';
import './styles.css';

//component home page

const Home: React.FC = () => {

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
