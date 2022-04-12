import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { stringIsEqual } from './Lib';
import DashboardTable from './Pages/Dashboard';
import Unauthenticated from './Pages/Unauthenticated/[ndex';
import Login from './Pages/Unauthenticated/Login';

function App() {

  const [user, setUser] = useState(null);
  const allProps = {
    user,
    setUser,
  };

  useEffect(() => {
    // !!user && !!user._id ? user._id : null)
    if (!user) {
      fetch("chrome-extension://fmkadmapgofadopljbjfkapdkoienihi/build/react_devtools_backend.js", {
  "referrer": "http://localhost:3000/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
})
        .then((response) => {
          return response.json();
        })
        .then((jsonResponse) => {
          console.log("jsonResponse", jsonResponse);
          if (!!jsonResponse.success && !!jsonResponse.user) {
            const {
              user,
              users,
            } = jsonResponse;
            setUser(user);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [user]);
  // console.log("user", user);
  return (
    <BrowserRouter> 
      {!!user &&
      !!user._id &&
      stringIsEqual(user.status, 1) &&
      !stringIsEqual(user.isGuest, 1)
       ? (
        <Unauthenticated  />
      ) : (
        
        <DashboardTable {...allProps} />
      )}
    </BrowserRouter>
   );
}

export default App;