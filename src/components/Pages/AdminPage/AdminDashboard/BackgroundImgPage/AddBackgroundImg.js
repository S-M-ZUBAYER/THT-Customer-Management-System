import { useContext, useEffect, useState } from "react";
import addIcon from "../../../../../Assets/Images/Admin/AddIcon.jpg"
import { toast } from "react-hot-toast";

import axios from "axios";
import html2canvas from 'html2canvas';
import { AuthContext } from "../../../../../context/UserContext";
import CategoryList from "../IconsComponent/Category";
import IconsCategoryList from "../IconsCategory/IconsCategoryList";
import AddBackgroundCategory from "./AddBackgroundCategory";

function AddBackgroundImg() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [BackgroundImgs, setBackgroundImgs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get("https://grozziie.zjweiting.com:8033/tht/icons")
      .then(res => {
        setBackgroundImgs(res.data)
      })
      .catch(err => console.log(err))
  })

  useEffect(() => {
    fetch('http://localhost:2000/tht/BackgroundCategories')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setCategories(data.map(category=>category.allBackgroundCategoris))
        
      });
  }, []);
  console.log(categories)
  const handleImageChange = (e) => {
    const files = e.target.files;
    setSelectedImages(files);
    toast.success("Icon has already prepare to store")
  }


  // useEffect(()=>{
  //   axios.get("https://grozziie.zjweiting.com:8033/tht/categories")
  //   .then(res=>{
  //     setCategories(JSON.parse(res.data[0]?.allcategories));
  //   })
  //   .catch(err=>console.log(err))
  // })



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
  
    // TODO: Send formData to server-side script for processing
    axios.post('http://localhost:2000/tht/backgroundImgs/add', formData)
      .then(res => {
        if (res.data.status === "success") {
          toast.success("Images uploaded successfully");
          console.log("success")
        }
        else {
          console.log("image failed")
          toast.error("Images uploaded failed")
        }
      })
  }
 

  const handleSelectChange = (e) => {
    setSelectedCategory(e.target.value);
  };


  return (

    <div>
      <AddBackgroundCategory
        categories={categories}
        setCategories={setCategories}
      ></AddBackgroundCategory>


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
            Add Background Image
          </button>


        </form>
      </div>
      <IconsCategoryList
        categories={categories}
      ></IconsCategoryList>

    </div>



  );
}


export default AddBackgroundImg;