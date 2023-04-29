import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { routes } from './Routes/Routes/Routes';

function App() {
  return (
    <div className="App lg:mx-0 xl:mx-20  2xl:mx-32">
      <RouterProvider router={routes}>

      </RouterProvider>
    </div>
  );
}

export default App;
