import { createContext, useState, useEffect } from 'react';
import authObj from '../backendServices/auth'; // Assuming this manages authentication

const MyContext = createContext();

const MyProvider = ({ children }) => {
  let value;
  const token = localStorage.getItem('cookieFallback');
  console.log('token', token);
  if (token && token !== 'undefined' && token !== 'null' && token !== '' && token !== '[]') {
   value=true
  } else {
   value=false
  }

  const [isLogin, setIsLogin] = useState(value);


  return (
    <MyContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
