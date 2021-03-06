
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { Provider } from 'react-redux'
import store, {persistor} from './store';
import { PersistGate } from 'redux-persist/es/integration/react'
import 'font-awesome/css/font-awesome.css';
import './styles/general.less';
import 'sweetalert2/dist/sweetalert2.css';
import './styles/utilities/colors.css';

const onBeforeLift = () => {
  console.log("reading state ...")
}

ReactDOM.render(
    <Provider store={store}>
        <PersistGate onBeforeLift={onBeforeLift} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.querySelector('#root')
);
