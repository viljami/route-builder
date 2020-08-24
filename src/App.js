import React from 'react';
import { Provider } from 'react-redux';
import Map from './components/Map/Map';
import LocationList from './components/LocationList';
import store from './store/store';
import Divider from './components/Divider';
import TotalDistance from './components/TotalDistance';
import DownloadButtom from './components/DownloadButton';
import '@fortawesome/fontawesome-free/css/all.css';
import "./App.css";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <menu>
          <h1>Route Builder</h1>
          <Divider />

          <TotalDistance />
          <LocationList />

          <DownloadButtom />
        </menu>

        <Map />
      </Provider>
    </div>
  );
}

export default App;
