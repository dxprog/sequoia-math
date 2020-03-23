import React from 'react';
import ReactDOM from 'react-dom';

import GetEquation from './pages/GetEquation.jsx';

const el = document.getElementById('math');
ReactDOM.render(<GetEquation {...window.mathConfig} />, el);
