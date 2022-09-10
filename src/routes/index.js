
import { Switch } from 'react-router-dom';
import Route from './Private';

import React from 'react'

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Profile from '../pages/Profile';
import Customers from '../pages/Customers';
import New from '../pages/New';
import Dashboard from '../pages/Dashboard';


export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/register" component={SignUp} />

            <Route exact path="/new" component={New} isPrivate />
            <Route exact path="/profile" component={Profile} isPrivate />
            <Route exact path="/customers" component={Customers} isPrivate />
            <Route exact path="/dashboard" component={Dashboard} isPrivate />
            <Route exact path="/new/:id" component={New} isPrivate />
        </Switch>
    )
}