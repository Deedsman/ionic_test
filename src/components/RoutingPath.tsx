import React from "react"
import { Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from '../pages/Home/Index';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Item from '../pages/Item/Item';


//component for routing

const RoutingPath: React.FC = () => {
    return (
        <IonReactRouter>
            <IonRouterOutlet>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/item" component={Item} />
            </IonRouterOutlet>
        </IonReactRouter>
    )
}
export default RoutingPath;