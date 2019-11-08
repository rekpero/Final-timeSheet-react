import React from 'react';
import './App.css';
import Login from './pages/logincomponent';
// import {AppRouter} from './components/appRouter';

const App: React.FC = (props: any) => {
  return (
    <div className="App">

    {props.children}
     
    </div>
  );
}

export default App;
