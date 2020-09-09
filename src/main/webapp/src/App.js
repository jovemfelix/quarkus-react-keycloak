import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [userLogged, setUserLogged] = React.useState({});

  fetch('/api/user/me')
    .then(res => res.json())
	.then((data) => {
	  setUserLogged(data)
	})
	.catch(console.log);
	  
  const getUserName = () => {
    return userLogged.userName;
  }
	
  const isAuthenticated = () => {
    return userLogged != null && userLogged.userName != null;
  }
	  
  const hasRole = (roles) => {
    return userLogged != null && userLogged.roles != null && roles.some(role => userLogged.roles.includes(role));
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {!isAuthenticated() && <p><h2>You are not authenticated</h2></p>}
        {isAuthenticated() && <p>
          <h2>Hello {getUserName()}!</h2>
          {hasRole(['custom-role']) && <p>You have the Custom Role, congratulations!</p>}
          {!hasRole(['custom-role']) && <p>You don't have the Custom Role, sorry!</p>}        
        </p>}
      </header>
    </div>
  );
}

export default App;
