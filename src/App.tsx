import { Redirect, Route, useHistory } from 'react-router-dom';
import React, { useEffect, useState } from "react"
import { IonApp, IonRouterOutlet, IonSpinner } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import RoutingPath from './components/RoutingPath';
import { set_user_state } from './toolkitRedux/toolkitReducer'
import { add_new_write } from './toolkitRedux/toolkitReducer'


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { getCurrentUser, loginUser } from './firebaseConfig';
import { useDispatch } from 'react-redux';



const App: React.FC = () => {
  const history = useHistory();
  const [spinner, setSpinner] = useState<boolean>(true);
  const dispatch = useDispatch()


  useEffect(() => {
    console.log('компонент вмонтирован')

    getCurrentUser().then((user: any) => {
      if (user) {
        dispatch(set_user_state(user.user.email))
        dispatch(add_new_write(user.userData.data()))
        window.history.replaceState({}, '', '/item')
        console.log('запрос выполнен')

      } else {
        window.history.replaceState({}, '', '/')
        console.log("I have not login")
      }
      setSpinner(false)
    })
    //setSpinner(false)
  }, [dispatch])


  return (
    <IonApp>
      {spinner ? <IonSpinner /> : <RoutingPath />}
    </IonApp>
  );
}

export default App;
