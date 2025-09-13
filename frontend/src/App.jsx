
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserList from "./components/UserList"

import "./App.css"


function App() {
  return (
    <html>
       <body>
         <header className="header">
            <div className="Titulo">
              <h1>CRUD CON MERN</h1>
            </div>
            <div>
              <UserList/>
            </div>
         </header>
       </body>
    </html>
  );
}

export default App;
