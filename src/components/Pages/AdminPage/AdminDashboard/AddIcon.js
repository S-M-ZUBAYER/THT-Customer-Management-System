import { useContext, useEffect, useState } from "react";
import addIcon from "../../../../Assets/Images/Admin/AddIcon.jpg"
import { toast } from "react-hot-toast";
import { MdDelete } from 'react-icons/md';
import { AiOutlineDownload } from 'react-icons/ai';
import axios from "axios";
import html2canvas from 'html2canvas';
import CategoryList from "./IconsComponent/Category";
import { AuthContext } from "../../../../context/UserContext";

function AddIcon() {
  const [image, setImage] = useState(null);
  const [icons,setIcons]=useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  const {user}=useContext(AuthContext);

  useEffect(()=>{
    axios.get("http://localhost:5000/tht/icons")
    .then(res=>{
      setIcons(res.data)
    })
    .catch(err=>console.log(err))
  })

  function handleImageChange(event) {
    const file = event.target.files[0];
    setImage(file);
    toast.success("Icon has already prepare to store")
  }

  function handleUpload(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append('email', user?.email);
    formData.append('categoryName', selectedCategory);
  
    // TODO: Send formData to server-side script for processing
    console.log(formData);
    axios.post('http://localhost:5000/tht/icons/add',formData)
    .then(res=>{
      if(res.data.status==="success"){
        toast.success("Image uploaded successfully");
        console.log("success")
      }
      else{
        console.log("image faild")
        toast.error("Image uploaded Failed")
      }
    })
  }

//create a function to delete icon from the frontend and database both side 
const handleToDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/tht/icons/delete/${id}`);
    toast.success('Icon deleted successfully');
    setIcons(icons.filter((icon) => icon.id !== id));
  } catch (error) {
    console.error('Error deleting user:', error);
    toast.error('Failed to delete Icon');
  }
};

const  handleToDownload=(icon)=>{
  const imageURL = `http://localhost:5000/tht/images/${icon}`; // Replace with your image URL

  fetch(imageURL)
    .then((response) => response.blob())
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'image.jpg'; // Specify the desired filename
      a.click();
      URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error('Error downloading image:', error);
    });
}


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
        <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
      </label>
      <button
        className="bg-[#004368] hover:bg-blue-700 text-white font-bold py-2 my-10 px-20 ml-5 rounded-lg"
        onClick={handleUpload}
        disabled={!image}
      >
        Add Icon
      </button>
      <div className="grid sm:grid-cols-4 md:grid-cols-8 gap-4">
      {
        icons.map((element,index)=>{
          return <div  className=" relative">
            <AiOutlineDownload onClick={()=>handleToDownload(element?.icon)} className=" absolute top-0 hover:cursor-pointer text-green-500"></AiOutlineDownload>
            <MdDelete onClick={()=>handleToDelete(element?.id)} className=" absolute right-0 hover:cursor-pointer text-red-500"></MdDelete>
            <img key={index} id="myDiv" className=" inline-block w-28 h-28" src={`http://localhost:5000/tht/images/${element.icon}`} alt="Icon"></img>
            </div>
        })
      }
      </div>
      
    </form> 
    </div>
    </div>

    
    
  );
}


export default AddIcon;