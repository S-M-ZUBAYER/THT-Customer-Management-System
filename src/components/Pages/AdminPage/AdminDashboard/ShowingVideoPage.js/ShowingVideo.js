import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import BtnSpinner from '../../../../Shared/Loading/BtnSpinner';
import toast from 'react-hot-toast';

function ShowingVideo() {
  // State to store the selected video and title
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState('');
  const [allVideo, setAllVideo] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    // Make a GET request to retrieve showing videos
    axios.get('https://grozziie.zjweiting.com:8033/tht/showingVideo')
      .then(response => {
        // Handle the successful response here
        setAllVideo((response?.data)?.data);
        console.log('Showing videos:', (response?.data)?.data);
      })
      .catch(error => {
        // Handle any errors here
        console.error('Error retrieving showing videos:', error);
      });
  }, []);

  // Function to handle the video input change
  const handleVideoChange = (e) => {
    const selectedVideo = e.target.files[0];
    setVideo(selectedVideo);
  };

  // Function to handle the title input change
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Function to handle the form submission
  // Frontend code
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Create a FormData object to send the video and title
    const formData = new FormData();
    formData.append('showingVideo', video); // Use 'showingVideo' instead of 'video'
    formData.append('title', title);

    try {
      // Make a POST request to your backend API to handle the video upload
      const response = await axios.post('https://grozziie.zjweiting.com:8033/tht/showingVideo/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle the response from the backend
      console.log('Video uploaded successfully:', response.data);
      toast.success('Video uploaded successfully');
      setLoading(false);
      setAllVideo([...allVideo, { title: title, video: video }])

      // Clear the form fields after successful upload
      setVideo(null);
      setTitle('');
    } catch (error) {
      console.error('Error uploading video:', error);
      toast.error('Error uploading video');
      setLoading(false);
    }
  };

  const handleToDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this showing video?');
    if (confirmed) {
      try {
        await axios.delete(`https://grozziie.zjweiting.com:8033/tht/showingVideo/delete/${id}`);
        toast.success(`One Showing Video deleted successfully`);
        const restVideo = allVideo.filter(each => (each?.id !== id));
        setAllVideo(restVideo)
      } catch (error) {
        console.error('Error deleting showing video:', error);
        toast.error('Failed to delete showing video');
      }
    }
  }

  return (
    <div className="mt-20">
      <h2 className="font-bold text-3xl text-lime-400 mb-10">Upload Showing Video</h2>

      <div className=" flex justify-center items-center">
        <form className="" onSubmit={handleFormSubmit}>
          <div className="mb-3 text-center">
            <label htmlFor="title" className=" mr-2 font-semibold ">Title:</label>
            <input
              type="text"
              id="title"
              className="bg-white border px-1 mr-auto"
              name="title"
              value={title}
              onChange={handleTitleChange}
              required
            />
          </div>
          <div className="text-center ml-20">
            <label htmlFor="video" className="mr-2 font-semibold ">Video:</label>
            <input
              type="file"
              id="video"
              className="mr-auto"
              name="video"
              accept="video/*" // Accept only video files
              onChange={handleVideoChange}
              required
            />
          </div>
          <div>
            <button type="submit" className=" bg-[#004368] hover:bg-blue-700 text-white font-bold py-2 my-10 px-20 ml-5 rounded-lg">
             {
              loading ?  <BtnSpinner></BtnSpinner> :'Upload Showing Video'
             }
              
              </button>
          </div>
        </form>
      </div>

      <div>
        <h2 className="font-bold text-3xl text-lime-400 mt-20 mb-12">Available Showing Video</h2>
        <div className="grid grid-cols-3 gap-4 mx-auto">
          {allVideo.map((video, index) => (
            <div key={index} className="mb-4 flex justify-center">
              <div className=" relative">

                <video controls width="300">
                  <source src={`https://grozziie.zjweiting.com:8033/tht/showingVideos/${video.showingVideo}`} type="video/mp4" />
                  {/* Your browser does not support the video tag. */}
                </video>
                <button onClick={() => handleToDelete(video?.id)} className="absolute right-2 top-2 text-red-600 font-bold"><RiDeleteBin6Fill></RiDeleteBin6Fill></button>
                <h3 className="font-semibold text-lg">{video.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowingVideo;

