import { useContext, useEffect, useState } from "react";
import addIcon from "../../../../../Assets/Images/Admin/AddIcon.jpg"
import { toast } from "react-hot-toast";

import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from 'react-icons/md';
import { AuthContext } from "../../../../../context/UserContext";
import DisplaySpinner from "../../../../Shared/Loading/DisplaySpinner";



function AddWifiModelHightWidth() {
  const [selectedModelNo, setSelectedModelNo] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedMusicStatus, setSelectedMusicStatus] = useState('');
  const [selectedPID, setSelectedPID] = useState('');
  const [allModelNoList, setAllModelNoList] = useState([]);
  const [defaultHeight, setDefaultHeight] = useState('');
  const [defaultWidth, setDefaultWidth] = useState('');
  const [maxHeight, setMaxHeight] = useState('');
  const [maxWidth, setMaxWidth] = useState('');
  const [allModelInfo, setAllModelInfo] = useState([]);
  const [sliderImageMark, setSliderImageMark] = useState('');
  const { loading, setLoading } = useContext(AuthContext)

  useEffect(() => {
    fetch('https://grozziieget.zjweiting.com:8033/tht/modelNoList')
      .then(response => response.json())
      .then(data => {

        setAllModelNoList(data.map(modelNo => modelNo.modelNo))

      });
  }, []);

  // Make a GET request to fetch all model number for the specified category
  useEffect(() => {
    const apiUrl = ` https://grozziieget.zjweiting.com:8033/tht/allWifiModelInfo`;
    axios.get(apiUrl)
      .then((response) => {
        setAllModelInfo(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);


  //create a function to delete icon from the frontend and database both side 
  const handleToDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this model information?');
    if (!confirmed) {
      return;
    }
    try {
      await axios.delete(`https://grozziieget.zjweiting.com:8033/tht/wifiModelList/delete/${id}`);
      toast.success('Model information deleted successfully');
      setAllModelInfo(allModelInfo.filter((model) => model.id !== id));
    } catch (error) {
      console.error('Error deleting model information:', error);
      toast.error('Failed to delete model information. Please try again later.');
    }
  };




  // Function to handle changes in the city name input field
  const handleDefaultHightChange = (event) => {
    const { value } = event.target;
    setDefaultHeight(value);
  };

  const handleDefaultWidthChange = (event) => {
    const { value } = event.target;
    setDefaultWidth(value);
  };

  const handleMaxHightChange = (event) => {
    const { value } = event.target;
    setMaxHeight(value);
  };

  const handleMaxWidthChange = (event) => {
    const { value } = event.target;
    setMaxWidth(value);
  };

  const handleSliderImageMarkChange = (e) => {
    setSliderImageMark(e.target.value);
  };


  const handleUpload = (event) => {
    event.preventDefault();
    if (!selectedModelNo) {
      toast.error("Please Write minimum model No");
      return;
    }

    axios
      // .post('http://localhost:2000/tht/wifiModelHightWidth/add', { PID: selectedPID, modelNo: selectedModelNo, maxHeight, maxWidth, defaultHeight, defaultWidth, type: selectedType, musicValue: selectedMusicStatus, sliderImageMark: sliderImageMark })
      .post('https://grozziieget.zjweiting.com:8033/tht/wifiModelHightWidth/add', { PID: selectedPID, modelNo: selectedModelNo, maxHeight, maxWidth, defaultHeight, defaultWidth, type: selectedType, musicValue: selectedMusicStatus, sliderImageMark: sliderImageMark })
      .then((res) => {
        if (res.data.status === "success") {
          setAllModelInfo([...allModelInfo, { PID: selectedPID, modelNo: selectedModelNo, maxHeight, maxWidth, defaultHeight, defaultWidth, type: selectedType, musicValue: selectedMusicStatus, sliderImageMark }])
          toast.success("Model information uploaded successfully");
          setDefaultHeight('')
          setDefaultWidth('')
          setMaxHeight('')
          setMaxWidth('')
          setSelectedModelNo('')
          setSelectedType('')
          setSelectedMusicStatus('')
          setSelectedPID('')
          setSliderImageMark('')
        } else {
          toast.error("Model information uploaded failed");
        }
      })
      .catch((error) => {
        console.error(error); // Log the error to the console
        toast.error("An error occurred while uploading Model information"); // Show a toast for the error
      });
  }


  const handleInputChange = (e) => {
    setSelectedModelNo(e.target.value);
  };
  const handleInputTypeChange = (e) => {
    setSelectedType(e.target.value);
  };
  const handleInputMusicChange = (e) => {
    setSelectedMusicStatus(e.target.value);
  };
  const handleInputPIDChange = (e) => {
    setSelectedPID(e.target.value);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState("");


  const closeModal = () => setIsModalOpen(false);

  // Handle form input change
  const handleModalInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the PUT request to update the data in the backend
      // const response = await fetch('http://localhost:2000/tht/wifiModelHightWidth/update', {
      const response = await fetch('https://grozziieget.zjweiting.com:8033/tht/wifiModelHightWidth/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.status === 'success') {
        toast.success("Data updated successfully")
        console.log("Data updated successfully");
        // Perform any other actions you need, like refreshing data, showing a success message, etc.
      } else {
        console.error("Error updating data:", result.message);
        toast.error(result.message)
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error)
    }

    closeModal(); // Close modal after submission
  };





  return (

    <div>
      <h2 className=" font-bold text-3xl text-lime-600 mt-5">Please Input new printer model info:</h2>

      <div className="my-32 mt-20 flex items-center justify-center">

        <form className="flex flex-col items-center justify-center">
          <p className="mb-3">PID</p>
          <input
            type="text"
            className="bg-white text-gray-800 mb-5 px-4 py-2 border rounded-md w-48 mr-2"
            value={selectedPID}
            onChange={handleInputPIDChange}
            placeholder="Enter PID"
          />

          <p className="mb-3">Model Name</p>
          <input
            type="text"
            className="bg-white text-gray-800 mb-5 px-4 py-2 border rounded-md w-48 mr-2"
            value={selectedModelNo}
            onChange={handleInputChange}
            placeholder="Enter model No"
          />

          <p className="mb-3">Type Name</p>
          <input
            type="text"
            className="bg-white text-gray-800 mb-5 px-4 py-2 border rounded-md w-48 mr-2"
            value={selectedType}
            onChange={handleInputTypeChange}
            placeholder="Thermal or Dot"
          />
          <p className="mb-3">Music Status</p>
          <input
            type="text"
            className="bg-white text-gray-800 mb-5 px-4 py-2 border rounded-md w-48 mr-2"
            value={selectedMusicStatus}
            onChange={handleInputMusicChange}
            placeholder="Input Music Status"
          />
          <div>
            <p className="mb-3  mt-5">Slider Image Mark</p>
            <input
              type="text"
              className="bg-white text-gray-800 mb-5 px-4 py-2 border rounded-md w-48 mr-2"
              value={sliderImageMark}
              onChange={handleSliderImageMarkChange}
              placeholder="Enter Slider Image Mark"
            />
          </div>

          <p className="mb-3">Default H&W</p>
          <label className="mb-4 flex justify-center">
            <input
              type="text" // Changed type to "text" for city names
              className="px-4 py-2 border rounded-md w-48 bg-white mr-2"
              placeholder="Enter Default Hight" // Placeholder text for city names
              onChange={handleDefaultHightChange} // Handle the input change event
            />
            <input
              type="text" // Changed type to "text" for city names
              className="px-4 py-2 border rounded-md w-48 bg-white"
              placeholder="Enter Default Width" // Placeholder text for city names
              onChange={handleDefaultWidthChange} // Handle the input change event
            />
          </label>
          <p className="mb-3">Max H&W</p>
          <label className="mb-4 flex justify-center">
            <input
              type="text" // Changed type to "text" for city names
              className="px-4 py-2 border rounded-md w-48 bg-white mr-2"
              placeholder="Enter Max Hight" // Placeholder text for city names
              onChange={handleMaxHightChange} // Handle the input change event
            />
            <input
              type="text" // Changed type to "text" for city names
              className="px-4 py-2 border rounded-md w-48 bg-white"
              placeholder="Enter Max Width" // Placeholder text for city names
              onChange={handleMaxWidthChange} // Handle the input change event
            />
          </label>


          <button
            className="bg-[#004368] hover:bg-blue-700 text-white font-bold py-2 my-10 px-20 ml-5 rounded-lg"
            onClick={handleUpload}
          >
            Add WifiModelInfo
          </button>


        </form>
      </div>



      <div className=" min-h-screen">
        <h1 className="text-3xl font-bold text-yellow-400 my-10">
          Available Model Full Information
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
                        <th className="border border-gray-400 px-4 py-2 text-white">PID</th>
                        <th className="border border-gray-400 px-4 py-2 text-white">Model Name</th>
                        <th className="border border-gray-400 px-4 py-2 text-white">Type</th>
                        <th className="border border-gray-400 px-4 py-2 text-white">Default Hight</th>
                        <th className="border border-gray-400 px-4 py-2 text-white">Default Width</th>
                        <th className="border border-gray-400 px-4 py-2 text-white">Max Hight</th>
                        <th className="border border-gray-400 px-4 py-2 text-white">Max Width</th>
                        <th className="border border-gray-400 px-4 py-2 text-white">Music Status</th>
                        <th className="border border-gray-400 px-4 py-2 text-white">Slider Mark</th>
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
                            <td className="px-4 py-2 border">{element.PID}</td>
                            <td className="px-4 py-2 border">{element.modelNo}</td>
                            <td className="px-4 py-2 border">{element.type}</td>
                            <td className="px-4 py-2 border">{element.defaultHeight}</td>
                            <td className="px-4 py-2 border">{element.defaultWidth}</td>
                            <td className="px-4 py-2 border">{element.maxHeight}</td>
                            <td className="px-4 py-2 border">{element.maxWidth}</td>
                            <td className="px-4 py-2 border">{element.musicValue}</td>
                            <td className="px-4 py-2 border">{element.sliderImageMark}</td>
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




    </div>



  );
}


export default AddWifiModelHightWidth;