import  { createContext, useState } from 'react';

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <MyContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
