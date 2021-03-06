import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import { BrowserRouter, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login'
import { connect, Provider } from 'react-redux';
import { initializeApp } from './redux/app-reducer'
import Preloader from './components/Common/Preloader/Preloader';
import { compose } from 'redux';
import store from './redux/redux-store';
import { withSuspense } from './hoc/withSuspense';

//import ProfileContainer from './components/Profile/ProfileContainer.jsx';
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer.jsx'));
//import DialogsContainer from './components/Dialogs/DialogsContainer.jsx';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer.jsx'))



class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    //if (!this.props.initialized) {
    //  return <Preloader />
    //}
    return (

      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />

        <div className="app-wrapper-content">
          <Switch>
          <Route exact path='/' render={() => <Redirect to={'/profile'} />} />
            <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)} />
            <Route path='/dialogs' render={withSuspense(DialogsContainer)} />
            <Route path='/newsPage' render={() => <News />}/>
            <Route path='/music' render={() => <Music />} />
            <Route path='/settings' render={() => <Settings />} />
            <Route path='/users' render={() => <UsersContainer />} />
            <Route path='/login' render={() => <Login />} />
            <Route path='*' render = {() => <div>404 NOT FOUND</div>} />
          </Switch>
        </div>

      </div>


    );
  }
}


const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

const AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);

const TermPaperApp = (props) => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
}
export default TermPaperApp;
