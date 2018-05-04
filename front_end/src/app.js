import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

//Babel Polyfill for async/await
import "babel-polyfill";

// COMPONENTS
import Container from './components/container'

//CSS
import './styles/styles.css'

const app = document.getElementById('app')

ReactDOM.render(
    <BrowserRouter>
    <Container />
    </BrowserRouter>, app)
