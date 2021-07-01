import React, { lazy, Suspense, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Nav from '../components/Nav/Nav';
import Loader from '../components/Loading/Loading';
import { getUser } from '../store/actions/UserActions';
import { useDispatch } from 'react-redux';
import { auth } from '../Firebase/Firebase';

const Home = lazy(() => import('../container/Home/Home'));
const Product = lazy(() => import('../container/ProductPage/ProductPage'));
const Card = lazy(() => import('../container/CardPage/CardPage'));
const SignIn = lazy(() => import('../container/AuthenticationPage/SignIn/SignIn'));
const SignUp = lazy(() => import('../container/AuthenticationPage/SignUp/SignUp'));
const Checkout = lazy(() => import('../container/Checkout/Checkout'));
const SuccessPage = lazy(() => import('../container/SripePages/SuccessPage/SuccessPage'));
const FailPage = lazy(() => import('../container/SripePages/FailPage/FailPage'));

const routes = (
  <Switch>
    <Route path='/' exact component={Home} />
    <Route path='/card' component={Card} />
    <Route path='/signIn' component={SignIn} />
    <Route path='/signUp' component={SignUp} />
    <Route path='/checkout' component={Checkout} />
    <Route path='/success_payment' component={SuccessPage} />
    <Route path='/fail_payment' component={FailPage} />
    <Route path='/:item' component={Product} />
  </Switch>
);

function App() {
  
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if(user) {
        dispatch(getUser({
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL   
        }));
      }
    });
    return unsubscribe;
  }, []);

  return (
    <div className="App">
      <Nav />
      <Suspense fallback={<Loader smallSize='80px' largeSize='80px' />}>
        {routes}
      </Suspense>
    </div>
  );
}

export default App;
