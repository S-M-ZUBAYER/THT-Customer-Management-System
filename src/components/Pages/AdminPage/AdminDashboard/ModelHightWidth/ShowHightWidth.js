import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { AuthContext } from '../../../../../context/UserContext';
import DisplaySpinner from '../../../../Shared/Loading/DisplaySpinner';



const ShowHightWidth = () => {
  const [allModelInfo, setAllModelInfo] = useState([]);

  // get model number from path name
  const location = useLocation();
  const modelNo = location.pathname.split('/').pop().replace(/%20/g, ' ');

  // get data from useContext
  const { loading, setLoading } = useContext(AuthContext)




  // Make a GET request to fetch all model number for the specified category
  useEffect(() => {
    const apiUrl = ` https://grozziieget.zjweiting.com:8033/tht/modelInfo/${modelNo}`;
    axios.get(apiUrl)
      .then((response) => {
        setAllModelInfo(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [modelNo]);


  //create a function to delete icon from the frontend and database both side 
  const handleToDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete all questions?');
    if (!confirmed) {
      return;
    }
    try {
      await axios.delete(`https://grozziieget.zjweiting.com:8033/tht/modelInfo/delete/${id}`);
      toast.success('Model Information deleted successfully');
      setAllModelInfo(allModelInfo.filter((city) => city.id !== id));
    } catch (error) {
      console.error('Error deleting city:', error);
      toast.error('Failed to delete city');
    }
  };




  return (
    <div className=" min-h-screen">
      <h1 className="text-3xl font-bold text-yellow-400 my-10">
        Available Hight Width for <span className="text-teal-400">{modelNo}</span> Model
      </h1>
      {
        loading ?
          <DisplaySpinner></DisplaySpinner>
          :
          allModelInfo && allModelInfo?.length === 0 ? <p className="text-2xl font-semibold text-amber-500">No Model Information Available For This Model !!!</p>
            :
            <div className="grid grid-cols-1 mx-1 md:mx-5  gap-4 text-center">
              {/* Show all model information in a table */}
              {
                <table className="border-collapse w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-teal-400 to-purple-400">
                      <th className="border border-gray-400 px-4 py-2 text-white">Model Name</th>
                      <th className="border border-gray-400 px-4 py-2 text-white">PID</th>
                      <th className="border border-gray-400 px-4 py-2 text-white">Default Hight</th>
                      <th className="border border-gray-400 px-4 py-2 text-white">Default Width</th>
                      <th className="border border-gray-400 px-4 py-2 text-white">Max Hight</th>
                      <th className="border border-gray-400 px-4 py-2 text-white">Max Width</th>
                      <th className="border border-gray-400 px-4 py-2 text-white">Slide Mark</th>
                      <th className="border border-gray-400 px-4 py-2 text-white">command</th>
                      <th className="border border-gray-400 px-4 py-2 text-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allModelInfo && allModelInfo.length > 0 ? (
                      allModelInfo.map((element) => (
                        <tr
                          className="border hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100"
                          key={element.id}
                        >
                          <td className="px-4 py-2 border">{element?.modelNo}</td>
                          <td className="px-4 py-2 border">{element?.pidNo}</td>
                          <td className="px-4 py-2 border">{element?.defaultHight}</td>
                          <td className="px-4 py-2 border">{element?.defaultWidth}</td>
                          <td className="px-4 py-2 border">{element?.maxHight}</td>
                          <td className="px-4 py-2 border">{element?.maxWidth}</td>
                          <td className="px-4 py-2 border">{element?.sliderImageMark}</td>
                          <td className="px-4 py-2 border">{element?.command}</td>
                          <td className="px-4 py-2 border-r flex justify-center">
                            <MdDelete
                              onClick={() => handleToDelete(element.id)}
                              className="text-red-500 hover:cursor-pointer"
                            ></MdDelete>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" className="text-center py-4">
                          No Model information found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              }
            </div>
      }
    </div>
  );
};

export default ShowHightWidth;