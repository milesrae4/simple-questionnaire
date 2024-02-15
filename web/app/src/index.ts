import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { App } from './components/app/App';
import './css-reset.css';

const isProd = process.env.NODE_ENV !== 'production';
// imagine this is actually doing something
const pretendRemoteLogging = () => {};

ReactDOM.render(React.createElement(App), document.getElementById('root'));

// eslint-disable-next-line no-console
reportWebVitals(isProd ? console.log : pretendRemoteLogging);
