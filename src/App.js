import React from "react";
import Login from "./Login";
import DataTable from "./DataTable";
// import {Route, Switch} from 'react-router-dom';
function App() {
  return (
    <>
    <Switch>
      <Route exact path="/" component={Login}/>
      <Route exact path="/data" component={DataTable}/>
      
    </Switch>
      {/*<Login/>*/} 
      {/* <DataTable/> */}
    </>
  );
}

export default App;

