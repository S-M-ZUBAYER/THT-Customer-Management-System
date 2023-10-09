import { useContext, useEffect, useState } from "react";
import addIcon from "../../../../../Assets/Images/Admin/AddIcon.jpg"
import { toast } from "react-hot-toast";

import axios from "axios";
import html2canvas from 'html2canvas';
import { AuthContext } from "../../../../../context/UserContext";
import AddWarehouseName from "./AddWarehouse";
import ShowWarehouseList from "./ShowWarehouseList";




function WarehouseAndCities() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [iconImgs, setIconImgs] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [allWarehouseNameList, setAllWarehouseNameList] = useState([]);
  const [cityName, setCityName] = useState('');
  useEffect(() => {
    axios.get("https://grozziie.zjweiting.com:8033/tht/icons")
      .then(res => {
        setIconImgs(res.data)
      })
      .catch(err => console.error(err))
  }, []);


  useEffect(() => {
    fetch('https://grozziie.zjweiting.com:8033/tht/warehouseNameList')
      .then(response => response.json())
      .then(data => {

        setAllWarehouseNameList(data.map(warehouseNames => warehouseNames.warehouseName))

      });
  }, []);
  


  // Function to handle changes in the city name input field
  const handleCityNameChange = (event) => {
    const { value } = event.target;
    setCityName(value);
  };



  const handleUpload = (event) => {
    event.preventDefault();

    axios
      .post('https://grozziie.zjweiting.com:8033/tht/cities/add', { cityName, warehouseName: selectedWarehouse })
      .then((res) => {
        if (res.data.status === "success") {
          toast.success("City Name uploaded successfully");
          setCityName('')
        } else {
          toast.error("City Name uploaded failed");
        }
      })
      .catch((error) => {
        console.error(error); // Log the error to the console
        toast.error("An error occurred while uploading cityName"); // Show a toast for the error
      });
  }


  const handleSelectChange = (e) => {
    setSelectedWarehouse(e.target.value);
  };


  return (

    <div>
      <AddWarehouseName
        setAllWarehouseNameList={setAllWarehouseNameList}
        allWarehouseNameList={allWarehouseNameList}
      ></AddWarehouseName>



      <div className="my-32 flex items-center justify-center">
        <form className="flex flex-col items-center justify-center">
          <label className="mb-4 flex justify-center">
            <input
              type="text" // Changed type to "text" for city names
              className="px-4 py-2 border rounded-md w-48 bg-white"
              placeholder="Enter City Name" // Placeholder text for city names
              onChange={handleCityNameChange} // Handle the input change event
            />
          </label>

          <select className="bg-white text-gray-800" value={selectedWarehouse} onChange={handleSelectChange}>
            <option value="">Select warehouseName</option>
            {allWarehouseNameList.map((warehouse, index) => (
              <option key={index} value={warehouse}>{warehouse}</option>
            ))}
          </select>


          <button
            className="bg-[#004368] hover:bg-blue-700 text-white font-bold py-2 my-10 px-20 ml-5 rounded-lg"
            onClick={handleUpload}
            disabled={!selectedImages}
          >
            Add CityName
          </button>


        </form>
      </div>
      <ShowWarehouseList
        allWarehouseNameList={allWarehouseNameList}
      ></ShowWarehouseList>

    </div>



  );
}


export default WarehouseAndCities;