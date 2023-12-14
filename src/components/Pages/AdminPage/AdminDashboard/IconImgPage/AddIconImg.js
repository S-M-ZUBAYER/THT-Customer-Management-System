import { useContext, useEffect, useState } from "react";
import addIcon from "../../../../../Assets/Images/Admin/AddIcon.jpg"
import { toast } from "react-hot-toast";

import axios from "axios";
import { AuthContext } from "../../../../../context/UserContext";
import AddIconCategory from "./AddIconCategory";
import ShowIconCategoryList from "./ShowIconCategoryList";

function AddIconImg() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [iconImgs, setIconImgs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  // collect data from useContext
  const { user } = useContext(AuthContext);


  // fetch data to get all the icons from backend
  useEffect(() => {
    axios.get("https://grozziieget.zjweiting.com:8033/tht/icons")
      .then(res => {
        setIconImgs(res.data)
      })
      .catch(err => console.log(err))
  }, []);


  // here the function to select multiple images as icons to store in database
  const handleSelectChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // fetch data to get all the category name from backend
  useEffect(() => {
    fetch('https://grozziieget.zjweiting.com:8033/tht/iconCategories')
      .then(response => response.json())
      .then(data => {
        setCategories(data.map(category => category.allIconsCategoris))
      });
  }, []);
  const handleImageChange = (e) => {
    const files = e.target.files;
    setSelectedImages(files);
    toast.success("Icon has already prepare to store")
  }


  // Here create function to store multiple icons store in database
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
    axios.post('https://grozziieget.zjweiting.com:8033/tht/icons/add', formData)
      .then((res) => {
        if (res.data.status === "success") {
          toast.success("Images uploaded successfully");
        } else {
          console.log("image failed");
          toast.error("Images uploaded failed");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred while uploading images"); // Show a toast for the error
      });
  }


  return (
    <div>

      {/* Here is the component to add new icon category  */}
      <AddIconCategory
        categories={categories}
        setCategories={setCategories}
      ></AddIconCategory>

      {/* Here is the form to add the multiple icons according to the category name */}
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

          <button
            className="bg-[#004368] hover:bg-blue-700 text-white font-bold py-2 my-10 px-20 ml-5 rounded-lg"
            onClick={handleUpload}
            disabled={!selectedImages}
          >
            Add Icon Image
          </button>
        </form>
      </div>

      {/* Here show all of the icons category list  */}
      <ShowIconCategoryList
        categories={categories}
      ></ShowIconCategoryList>

    </div>
  );
}


export default AddIconImg;