import { createContext, useState, useEffect } from 'react';
import authObj from '../backendServices/auth'; // Assuming this manages authentication

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(null);
  const [user, setUser] = useState(null);
  // Default to null while checking login

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await authObj.getAccount();
        setUser(res);
        // console.log("....res.......>",res);
        setIsLogin(!!res); // Set isLogin to true if res is truthy, else false
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsLogin(false); // Default to logged out on error
      }finally{
        setLoading(false);
      }
    };

    checkLogin();
  }, []); // Empty dependency array ensures this runs only on mount

  return (
    <MyContext.Provider value={{ isLogin, setIsLogin }}>
      {loading?<p></p>:children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
