import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './app.css';
import './features.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import ServiceScreen from './screens/ServiceScreen';
import ContactScreen from './screens/ContactScreen';
// features import
import MSHome from './screens/moviesandsongs/MSHome.jsx';
import UploadVideoPage from "./screens/moviesandsongs/UploadVideoPage.jsx";
import HomepageofMS from './screens/moviesandsongs/Home.jsx'
import MuseumHome from './screens/virtualmuseum/MuseumHome.jsx';
import SHome from './screens/subscription/SHome.jsx';
import SubscriptionHomePage from './screens/subscription/Home.jsx';
import MuseumHomeMain from './screens/virtualmuseum/home.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>

      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/service' element={<ServiceScreen />} />
      <Route path='/contact' element={<ContactScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      {/* <Route path='/mshome' element={<MSHome />} /> */}


      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfileScreen />} />
        <Route path='/homepageofms' element={<HomepageofMS />} />
        <Route path='/mshome' element={<MSHome />} />
        <Route path='/video/upload' element={<UploadVideoPage />} />
        <Route path='/shome' element={<SHome />} />
        <Route path='/museumhome' element={< MuseumHome />} />
        <Route path='/submainhome' element={< SubscriptionHomePage />} />
        <Route path='/mhome' element={<MuseumHomeMain/>} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
)