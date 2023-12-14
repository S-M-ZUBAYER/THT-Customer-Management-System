import { useContext, useEffect, useState } from "react";
import addIcon from "../../../../../Assets/Images/Admin/AddIcon.jpg"
import { toast } from "react-hot-toast";

import axios from "axios";
import { AuthContext } from "../../../../../context/UserContext";
import AddBackgroundCategory from "./AddBackgroundCategory";
import BackgroundCategoryList from "./BackgroundCategoryList";
import ShowingVideo from "../ShowingVideoPage.js/ShowingVideo";

function AddBackgroundImg() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [BackgroundImgs, setBackgroundImgs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');

  //get current user information form useContext
  const { user } = useContext(AuthContext);


  // get the all Background images according to the category
  useEffect(() => {
    axios.get("https://grozziieget.zjweiting.com:8033/tht/icons")
      .then(res => {
        setBackgroundImgs(res.data)
      })
      .catch(err => console.log(err))
  }, []);



  // fetch to get all kinds of background categories name
  useEffect(() => {
    fetch('https://grozziieget.zjweiting.com:8033/tht/BackgroundCategories')
      .then(response => response.json())
      .then(data => {

        setCategories(data.map(category => category.allBackgroundCategoris))

      });
  }, []);


  // Create function to select images to store database as background images
  const handleImageChange = (e) => {
    const files = e.target.files;
    setSelectedImages(files);
    toast.success("Icon has already prepare to store")
  }


  // update the state to store image with these height weight data
  const handleHeightChange = (event) => {
    setHeight(event.target.value);
  };
  const handleWidthChange = (event) => {
    setWidth(event.target.value);
  };



  // Create function to select category name to store images in database as under this category
  const handleSelectChange = (e) => {
    setSelectedCategory(e.target.value);
  };



  // create function to store images in database
  const handleUpload = (event) => {
    event.preventDefault();

    // Create a new FormData object
    const formData = new FormData();
    // Append each selected image to the formData
    for (let i = 0; i < selectedImages.length; i++) {
      formData.append("images", selectedImages[i]);
    }

    formData.append('email', user?.email);
    formData.append('categoryName', selectedCategory);
    formData.append('height', height);
    formData.append('width', width);


    // axios.post('https://grozziieget.zjweiting.com:8033/tht/backgroundImgs/add', formData)
    axios.post('https://grozziieget.zjweiting.com:8033/tht/backgroundImgs/add', formData)
      .then(res => {
        if (res.data.status === "success") {
          toast.success("Images uploaded successfully");
        } else {
          toast.error("Images upload failed")
        }
      })
      .catch(error => {
        console.error("An error occurred while uploading images:", error);
        toast.error("An error occurred while uploading images");
      });
  }





  return (
    <div>

      {/* Here is the component to add new background image category */}
      <AddBackgroundCategory
        categories={categories}
        setCategories={setCategories}
      ></AddBackgroundCategory>


      {/* Background image storing section */}
      <div className="my-32 flex items-center justify-center">
        <form className="flex flex-col items-center justify-center">
          <label className="mb-16 flex justify-center">
            <img className="h-4/5 w-4/5" src={addIcon}></img>
            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} multiple />
          </label>

          <select className="bg-white text-gray-800" value={selectedCategory} onChange={handleSelectChange}>
            <option value="">Select a category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>

          <div className="mt-2">
            <label className="font-semibold" htmlFor="height">Height:</label>
            <input
              type="number"
              id="height"
              className="border-2 ml-3 bg-white"
              value={height}
              onChange={handleHeightChange}
            />
          </div>
          <div className="mt-2">
            <label className="font-semibold" htmlFor="width">Width:</label>
            <input
              type="number"
              id="width"
              value={width}
              className="border-2 ml-3 bg-white"
              onChange={handleWidthChange}
            />
          </div>

          <button
            className="bg-[#004368] hover:bg-blue-700 text-white font-bold py-2 my-10 px-20 ml-5 rounded-lg"
            onClick={handleUpload}
            disabled={!selectedImages}
          >
            Add Background Image
          </button>
        </form>
      </div>

      {/* THis is the component to show all the folder of background images according to the category name */}
      <BackgroundCategoryList
        categories={categories}
      ></BackgroundCategoryList>

      {/* This is the component to store and showing the showing video */}
      <ShowingVideo></ShowingVideo>

    </div>
  );
}


export default AddBackgroundImg;