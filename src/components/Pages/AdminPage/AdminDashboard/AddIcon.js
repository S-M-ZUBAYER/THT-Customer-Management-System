import { useContext, useEffect, useState } from "react";
import addIcon from "../../../../Assets/Images/Admin/AddIcon.jpg"
import { toast } from "react-hot-toast";

import axios from "axios";
import html2canvas from 'html2canvas';
import CategoryList from "./IconsComponent/Category";
import { AuthContext } from "../../../../context/UserContext";
import IconsCategoryList from "./IconsCategory/IconsCategoryList";

function AddIcon() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [icons, setIcons] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const [category, setCategory] = useState('');

  const { user, categories, setCategories } = useContext(AuthContext);

  useEffect(() => {
    axios.get("https://grozziie.zjweiting.com:8033/tht/icons")
      .then(res => {
        setIcons(res.data)
      })
      .catch(err => console.log(err))
  }, []);

  useEffect(() => {
    fetch('https://grozziie.zjweiting.com:8033/tht/categories')
      .then(response => response.json())
      .then(data => {
        setCategories(JSON.parse(data[0]?.allcategories))
      });
  }, []);

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



  // const handleUpload = (event) => {
  //   event.preventDefault();
    
  //   // Create a new FormData object
  //   const formData = new FormData();
    
  //   // Append each selected image to the formData
  //   for (let i = 0; i < selectedImages.length; i++) {
  //     formData.append("images", selectedImages[i]);
  //   }
  
  //   formData.append('email', user?.email);
  //   formData.append('categoryName', selectedCategory);
  
  //   // TODO: Send formData to server-side script for processing
  
  //   axios.post('https://grozziie.zjweiting.com:8033/tht/icons/add', formData)
  //     .then(res => {
  //       if (res.data.status === "success") {
  //         toast.success("Images uploaded successfully");
  //         console.log("success")
  //       }
  //       else {
  //         console.log("image faild")
  //         toast.error("Images uploaded failed")
  //       }
  //     })
  // }
  
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
    axios.post('http://localhost:2000/tht/icons/add', formData)
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
      <CategoryList
        category={category}
        setCategory={setCategory}
        categories={categories}
        setCategories={setCategories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      ></CategoryList>


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
            Add Icon
          </button>


        </form>
      </div>
      <IconsCategoryList
        categories={categories}
      ></IconsCategoryList>

    </div>



  );
}


export default AddIcon;