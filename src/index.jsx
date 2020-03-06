import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

//get all files from folder for webpack
function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('./public/scss', true, /\.css|scss|sass/));

ReactDOM.render(<App />, document.getElementById('root'));