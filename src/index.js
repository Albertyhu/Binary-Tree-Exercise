import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom'; 
import App from './components/App';

//for watching the html file 
require('./home.html')

ReactDOM.render(<App />, document.getElementById('app'));

/*const MainContent = document.getElementById('app');
MainContent.innerHTML = "Hello, World!";*/
