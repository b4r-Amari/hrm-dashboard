import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { registerWithEmail, loginWithEmail, signInWithGoogle } from '../../lib/authService';



const AuthPage = () => {
  const navigate = useNavigate();
  
  // State for sign in
  const [isSigningIn, setIsSigningIn] = useState(false);
  
  // State for registration
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  // Mock auth state
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginWithEmail(email, password);
      setUserLoggedIn(true); // OR redirect immediately with navigate('/dashboard')
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }

    try {
      await registerWithEmail(email, password);
      setUserLoggedIn(true);
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
  try {
    await signInWithGoogle();
    setUserLoggedIn(true);
  } catch (err: any) {
    setErrorMessage(err.message);
  }
};

  // Redirect if logged in
  if (userLoggedIn) {
    return <Navigate to="/dashboard" replace={true} />;
  }

  return (
    <div className="bg-auth bg-no-repeat bg-cover min-h-screen flex items-center justify-center p-4 ">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header with logo */}
          <div className="bg-primary-100 p-6 text-center">
            <div className="flex justify-center mb-4">
              
            </div>
            <h1 className="text-2xl font-bold text-white">HRM Dashboard</h1>
            <p className="text-indigo-200 mt-1">Admin Dashboard Login</p>
          </div>

          {/* Toggle between Sign In and Register */}
          <div className="flex border-b">
            <button
              className={`flex-1 py-4 font- ${!isRegisterMode ? 'text-primary-100 border-b-2 border-primary-100' : 'text-gray-500'}`}
              onClick={() => setIsRegisterMode(false)}
            >
              Sign In
            </button>
            <button
              className={`flex-1 py-4 font-medium ${isRegisterMode ? 'text-primary-100 border-b-2 border-primary-100' : 'text-gray-500'}`}
              onClick={() => setIsRegisterMode(true)}
            >
              Register
            </button>
          </div>

          <div className="p-6">
            {!isRegisterMode ? (
              // Sign In Form
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-gray-800">Welcome Back</h2>
                  <p className="text-gray-600 mt-2">Sign in to manage your account</p>
                </div>

                {/* Sign in form */}
                <form onSubmit={(e) => handleEmailSignIn(e)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                      placeholder="••••••••"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-primary-100 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm">
                      <a href="#" className="font-medium text-primary-100 hover:text-blue-600">
                        Forgot password?
                      </a>
                    </div>
                  </div>

                  <ButtonComponent
                    type="submit"
                    className="button-class !h-11 !w-full !text-white text-xl"
                  >
                  <span className='text-white p-16-regular'>Sign in</span>
                  </ButtonComponent>
                </form>

                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="flex-shrink mx-4 text-gray-500">or</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Google Sign-in ButtonComponent */}
                <ButtonComponent
                  iconCss="e-earch-icon"
                  onClick={handleGoogleSignIn}
                  disabled={isSigningIn}
                  className='button-class !h-11 !w-full'
                  >
                  <img
                    src="/assets/icons/google.svg" 
                    alt="Google Logo"
                    className='size-5'/>
                  <span className='text-white p-16-regular'>Sign-in with Google</span>
                </ButtonComponent>
                  

                <div className="text-center text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button
                    onClick={() => setIsRegisterMode(true)}
                    className="font-medium text-primary-100 hover:text-blue-600"
                  >
                    Register now
                  </button>
                </div>
              </div>
            ) : (
              // Registration Form
              <div className="space-y-5">
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-gray-800">Create Account</h2>
                  <p className="text-gray-600 mt-2">Join us today to get started</p>
                </div>

                <form onSubmit={(e) => handleRegister(e)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                      placeholder="••••••••"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                      placeholder="••••••••"
                    />
                  </div>

                  {errorMessage && (
                    <div className="text-red-500 text-sm font-medium py-2">
                      {errorMessage}
                    </div>
                  )}

                  <ButtonComponent
                    type="submit"
                    disabled={isRegistering}
                    className={`button-class !h-11 !w-full !text-white text-xl" ${
                      isRegistering
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-primary-100 hover:bg-blue-600'
                    }`}
                  >
                    <span className='text-white p-16-regular'>{isRegistering ? 'Creating Account...' : 'Create Account'}</span>
                  </ButtonComponent>
                </form>

                <div className="text-center text-sm text-gray-600">
                  Already have an account?{' '}
                  <button
                    onClick={() => setIsRegisterMode(false)}
                    className="font-medium text-primary-100 hover:text-primary-500"
                  >
                    Sign in
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-white font-semibold">
          <p>© 2025 HRM Dashboard. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;