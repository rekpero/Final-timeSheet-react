import React from 'react';
// import {AppRouter} from './components/appRouter';

const Dashboard: React.FC = (props : any) => {
  return (
    <div>
<div>Hi this is dashboard</div>
    {props.children}
     
    </div>
  );
}

export default Dashboard;
