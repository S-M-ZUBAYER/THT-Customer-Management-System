import { useState } from "react";
import addIcon from "../../../../Assets/Images/Admin/AddIcon.jpg"

function AddIcon() {
  const [image, setImage] = useState(null);

  function handleImageChange(event) {
    const file = event.target.files[0];
    setImage(file);
  }

  function handleUpload(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    // TODO: Send formData to server-side script for processing
    console.log(formData);
  }

  return (
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
    </form> 
    </div>
    
  );
}

export default AddIcon;