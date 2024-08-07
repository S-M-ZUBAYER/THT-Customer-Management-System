import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { routes } from './Routes/Routes/Routes';
import { useContext, useEffect, useState } from 'react';
import { AllProductContext } from './context/ProductContext';

function App() {
  const { showData, setShowData } = useContext(AllProductContext)

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

  return (

    <div className="App lg:mx-0 xl:mx-20  2xl:mx-32 bg-white">

      <RouterProvider router={routes}>

      </RouterProvider>
    </div>
  );
}

export default App;











