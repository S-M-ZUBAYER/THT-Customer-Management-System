import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { routes } from './Routes/Routes/Routes';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Perform the logout action here
      // For example, clear the authentication token from localStorage and log out the user
      localStorage.removeItem('user');
      // Any other logout actions you may need
    };

    // Add the beforeunload event listener
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    
    <div className="App lg:mx-0 xl:mx-20  2xl:mx-32 bg-white">
      
      <RouterProvider router={routes}>

      </RouterProvider>
    </div>
  );
}

export default App;











