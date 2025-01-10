import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import authObj from '../backendServices/auth';
import { useContext } from 'react';
import { MyContext } from '../context/Context';
import { useNavigate } from 'react-router-dom';

function AuthModal({ isOpen, onClose, onLogin }) {
  const navigate = useNavigate();
  const { isLogin ,setIsLogin} = useContext(MyContext);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(''); // State for password error message

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isSignUp) {
      if (password.trim().length < 8) {
        setPasswordError('Password must be at least 8 characters long.');
        setLoading(false);
        return;
      } else {
        setPasswordError(''); // Clear error if password is valid
      }

      try {
        const userAccount = await authObj.createAccount(email.trim(), password.trim());
        // console.log('Created user account:', userAccount);
        onLogin();
        setIsLogin(true);
       
      } catch (error) {
        setPasswordError('Error creating account');
        // console.log('Error creating account:', error.message);
        throw new Error('Account not created');
      }finally{
        setLoading(false);}

    }

    if (!isSignUp) {
      try {
        const userAccount = await authObj.login(email.trim(), password.trim());
        // console.log('Logged in user account:', userAccount);
        
        onLogin();
        setIsLogin(true);
      
      }catch (error) {
        setPasswordError('Account not found');
        console.log('Error logging in:', error.message);
        setLoading(false);
        throw new Error('Account not found');
      }


     
    }
setLoading(false);
    // onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded bg-white p-6">
          <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 mb-4">
            {isSignUp ? 'Create an Account' : 'Login'}
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full p-2 rounded-md border-2 border-slate-200 focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full p-2 rounded-md border-2 border-slate-200 focus:border-primary-500 focus:ring-primary-500"
                required
              />
              {passwordError && (
                <p className="mt-1 text-sm text-red-600">{passwordError}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 text-white px-4 h-12 rounded-md active:bg-primary-900 hover:bg-primary-700"
            >
              {
                loading ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white my-auto mx-auto"></div> :
                
              isSignUp ? 'Sign Up' : 'Login'
              
              }
            </button>
          </form>
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setPasswordError(''); // Clear error when toggling form
            }}
            className="mt-4 text-sm text-primary-600 hover:text-primary-700"
          >
            {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default AuthModal;
