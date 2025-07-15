import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { routes } from './Routes/Routes/Routes';
import { useContext, useEffect } from 'react';
import { AuthContext } from './context/UserContext';
import { deleteAllChatsFromDB, manageDeleteChatsInDB } from './components/Pages/CustomerServicePage/indexedDB';

function App() {
  const { SocketDisconnect, setUser } = useContext(AuthContext)

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('user');
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  window.addEventListener("message", (event) => {
    console.log(event.origin, "origin");
    if (event.origin !== "https://grozziie.zjweiting.com:57609") {
      console.warn("Blocked message from unauthorized origin:", event.origin);
      return;
    }
    const { user } = event.data;
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    }
  });


  useEffect(() => {
    const handleBeforeUnload = async (event) => {
      event.preventDefault();
      event.returnValue = ""; // Some browsers require this for custom messages
      SocketDisconnect();
      console.log("Site is closing...");
      await manageDeleteChatsInDB();
      await deleteAllChatsFromDB();
      localStorage.removeItem('viewedBitmapUserIds');
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
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











