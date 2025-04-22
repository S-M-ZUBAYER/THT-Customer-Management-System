import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { routes } from './Routes/Routes/Routes';
import { useContext, useEffect, useState } from 'react';
import { AllProductContext } from './context/ProductContext';
import toast from 'react-hot-toast';
import { AuthContext } from './context/UserContext';
import { deleteAllChatsFromDB, manageDeleteChatsInDB } from './components/Pages/CustomerServicePage/indexedDB';

function App() {
  const { showData, setShowData, SocketDisconnect } = useContext(AuthContext)

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




  // const callAPI = () => {
  //   fetch('https://grozziieget.zjweiting.com:8033/tht/allModelInfo')
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data, "again and again call");
  //       // Handle your data here
  //     })
  //     .catch(error => {
  //       console.error('Error fetching the API:', error);
  //     });
  // };
  const callAPI = () => {
    setShowData("");
    fetch('https://grozziieget.zjweiting.com:8033/tht/allModelInfo')
      .then(response => response.json())
      .then(data => {
        // Fisher-Yates shuffle algorithm to randomize the array order
        for (let i = data.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [data[i], data[j]] = [data[j], data[i]];
        }

        // Log each item with a random serial number
        const updateData = data.map(item => {
          const randomSerial = Math.floor(Math.random() * 1000);
          setShowData(item?.modelNo);
          return item;
        });
        console.log(updateData, "updateData");

      })
      .catch(error => {
        console.error('Error fetching the API:', error);
      });
  };



  useEffect(() => {
    const interval = setInterval(callAPI, 5 * 60 * 1000); // 5 minutes in milliseconds
    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    callAPI()
  }, []);

  // Closing the tab to disconnect the websocket
  const deleteCustomerServiceChatData = () => {
    // Iterate through all keys in localStorage
    Object.keys(localStorage).forEach((key) => {
      // Check if the key includes 'customerService@gmail.comLiveChat'
      if (key.includes('LiveChat')) {
        // Remove the item from localStorage
        localStorage.removeItem(key);
      }
    });
  };

  useEffect(() => {
    const handleBeforeUnload = async (event) => {
      event.preventDefault();
      event.returnValue = ""; // Some browsers require this for custom messages
      SocketDisconnect();
      console.log("Site is closing...");
      // deleteCustomerServiceChatData();
      await manageDeleteChatsInDB();
      await deleteAllChatsFromDB();
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











