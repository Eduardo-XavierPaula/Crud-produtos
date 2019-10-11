import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import UserCrud from '../components/user/UserCrud'
import Products from '../components/products/Products'
import Compras from '../components/compras/Compras'

export default props => 
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/users' component={UserCrud} />
        <Route path='/products' component={Products} />
        <Route path='/compras' component={Compras} />
        <Redirect from='*' to='/' />
    </Switch>