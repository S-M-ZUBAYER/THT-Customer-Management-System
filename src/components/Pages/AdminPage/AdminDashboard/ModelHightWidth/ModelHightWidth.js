import { useContext, useEffect, useState } from "react";
import addIcon from "../../../../../Assets/Images/Admin/AddIcon.jpg"
import { toast } from "react-hot-toast";

import axios from "axios";
import html2canvas from 'html2canvas';
import { AuthContext } from "../../../../../context/UserContext";

import ShowModelNo from "./ShowModelNo";
import AddModelNo from "./AddModelNo";




function ModelHightWidth() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [iconImgs, setIconImgs] = useState([]);
  const [selectedModelNo, setSelectedModelNo] = useState('');
  const [allModelNoList, setAllModelNoList] = useState([]);
  const [defaultHight, setDefaultHight] = useState('');
  const [defaultWidth, setDefaultWidth] = useState('');
  const [maxHight, setMaxHight] = useState('');
  const [maxWidth, setMaxWidth] = useState('');
  const [selectedCommands, setSelectedCommands] = useState([]);
  const [selectedPID, setSelectedPID] = useState('');
  useEffect(() => {
    axios.get("https://grozziieget.zjweiting.com:8033/tht/icons")
      .then(res => {
        setIconImgs(res.data)
      })
      .catch(err => console.error(err))
  }, []);


  useEffect(() => {
    fetch('https://grozziieget.zjweiting.com:8033/tht/modelNoList')
      .then(response => response.json())
      .then(data => {

        setAllModelNoList(data.map(modelNo => modelNo.modelNo))

      });
  }, []);



  // Function to handle changes in the city name input field
  const handleDefaultHightChange = (event) => {
    const { value } = event.target;
    setDefaultHight(value);
  };
  const handleDefaultWidthChange = (event) => {
    const { value } = event.target;
    setDefaultWidth(value);
  };
  const handleMaxHightChange = (event) => {
    const { value } = event.target;
    setMaxHight(value);
  };
  const handleMaxWidthChange = (event) => {
    const { value } = event.target;
    setMaxWidth(value);
  };
  const handleInputPIDChange = (e) => {
    setSelectedPID(e.target.value);
  };





  const handleUpload = (event) => {
    event.preventDefault();

    axios
      .post('https://grozziieget.zjweiting.com:8033/tht/hightWidth/add', { pidNo: selectedPID, defaultHight, defaultWidth, maxHight, maxWidth, command: selectedCommands, modelNo: selectedModelNo })
      .then((res) => {
        if (res.data.status === "success") {
          toast.success("Model information uploaded successfully");
          setSelectedPID("");
          setDefaultHight("")
          setDefaultWidth("")
          setMaxHight("")
          setMaxWidth("")
          setSelectedCommands([])
        } else {
          toast.error("Model information uploaded failed");
        }
      })
      .catch((error) => {
        console.error(error); // Log the error to the console
        toast.error("An error occurred while uploading Model information"); // Show a toast for the error
      });
  }


  const handleSelectChange = (e) => {
    setSelectedModelNo(e.target.value);
  };


  //check box 


  // Define the list of elements to choose from
  const elements = ['CPCL', 'ESC'];

  // Function to handle checkbox changes
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    // Update the selectedElements array based on checkbox changes
    if (checked) {
      setSelectedCommands([...selectedCommands, value]);
    } else {
      setSelectedCommands(selectedCommands.filter((element) => element !== value));
    }
  };



  return (

    <div>
      <AddModelNo
        setAllWarehouseNameList={setAllModelNoList}
        allWarehouseNameList={allModelNoList}
      ></AddModelNo>



      <div className="my-32 flex items-center justify-center">
        <form className="flex flex-col items-center justify-center">
          <p className="mb-3">PID</p>
          <input
            type="text"
            className="bg-white text-gray-800 mb-5 px-4 py-2 border rounded-md w-48 mr-2"
            value={selectedPID}
            onChange={handleInputPIDChange}
            placeholder="Enter PID"
          />
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

          <div>
            <h2 className="mb-2">Select Elements:</h2>
            <form>
              {elements.map((element) => (
                <label className="mr-6" key={element}>
                  <input
                    type="checkbox"
                    value={element}
                    className="mr-1"
                    checked={selectedCommands.includes(element)}
                    onChange={handleCheckboxChange}
                  />
                  {element}
                </label>
              ))}
            </form>
            <h3>Selected Elements:</h3>
            <ul>
              {selectedCommands.map((element) => (
                <li key={element}>{element}</li>
              ))}
            </ul>
          </div>

          <select className="bg-white text-gray-800" value={selectedModelNo} onChange={handleSelectChange}>
            <option value="">Select model No</option>
            {allModelNoList.map((modeNo, index) => (
              <option key={index} value={modeNo}>{modeNo}</option>
            ))}
          </select>


          <button
            className="bg-[#004368] hover:bg-blue-700 text-white font-bold py-2 my-10 px-20 ml-5 rounded-lg"
            onClick={handleUpload}
            disabled={!selectedImages}
          >
            Add H&W
          </button>


        </form>
      </div>
      <ShowModelNo
        allModelNoList={allModelNoList}
      ></ShowModelNo>

    </div>



  );
}


export default ModelHightWidth;