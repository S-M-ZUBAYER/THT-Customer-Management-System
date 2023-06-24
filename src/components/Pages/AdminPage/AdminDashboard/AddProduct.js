
import { useContext, useState } from 'react';
import axios from 'axios';
import addImg from "../../../../Assets/Images/Admin/Vector.jpg"
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../../context/UserContext';
import BtnSpinner from '../../../Shared/Loading/BtnSpinner';

function AddProduct({ product }) {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [modelNumber, setModelNumber] = useState('');
  const [printerColor, setPrinterColor] = useState('');
  const [connectorType, setConnectorType] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [shelfStartTime, setShelfStartTime] = useState('');
  const [shelfEndTime, setShelfEndTime] = useState('');
  const [afterSalesText, setAfterSalesText] = useState('');
  const [afterSalesInstruction, setAfterSalesInstruction] = useState('');
  const [inventoryText, setInventoryText] = useState('');
  // const [invoiceFile, setInvoiceFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(addImg);
  const [fileName, setFileName] = useState("Add Image");
  const [productImg, setProductImg] = useState(null);
  const [invoiceFile, setInvoiceFile] = useState(null);
  const [invoiceFiles, setInvoiceFiles] = useState(null);

  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
const now=new Date();

  const{loading,setLoading}=useContext(AuthContext);
  // const handleUpload = async () => {
  //   const formData = new FormData();

  //   // Append selected images to the form data
  //   for (let i = 0; i < selectedImages.length; i++) {
  //     formData.append('images', selectedImages[i]);
  //   }

  //   // Append selected videos to the form data
  //   for (let i = 0; i < selectedVideos.length; i++) {
  //     formData.append('videos', selectedVideos[i]);
  //   }

  //   console.log(selectedImages)

  //   // try {
  //   //   const response = await axios.post('/upload', formData, {
  //   //     headers: {
  //   //       'Content-Type': 'multipart/form-data'
  //   //     }
  //   //   });
  //   //   console.log(response.data); // Response from the server
  //   // } catch (error) {
  //   //   console.error('Error uploading files:', error);
  //   // }
  // };


  const url = window.location.href;
    const productCategory = url.split('/')[4]+"s";
    // const mallProduct = path.split('/');





  const handleImageChange = (e) => {
    setSelectedImages(e.target.files);
  };

  const handleVideoChange = (e) => {
    setSelectedVideos(e.target.files);
  };


  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleProductPriceChange = (e) => {
    setProductPrice(e.target.value);
  };

  const handleProductDescriptionChange = (e) => {
    setProductDescription(e.target.value);
  };

  const handleModelNumberChange = (e) => {
    setModelNumber(e.target.value);
  };

  const handlePrinterColorChange = (e) => {
    setPrinterColor(e.target.value);
  };

  const handleConnectorTypeChange = (e) => {
    setConnectorType(e.target.value);
  };

  const handleStockQuantityChange = (e) => {
    setStockQuantity(e.target.value);
  };

  const handleShelfStartTimeChange = (e) => {
    setShelfStartTime(e.target.value);
  };

  const handleShelfEndTimeChange = (e) => {
    setShelfEndTime(e.target.value);
  };

  const handleAfterSalesTextChange = (e) => {
    setAfterSalesText(e.target.value);
  };

  const handleAfterSalesInstructionChange = (e) => {
    setAfterSalesInstruction(e.target.value);
  };

  const handleInventoryTextChange = (e) => {
    setInventoryText(e.target.value);
  };



  const handleProductImgUpload = (event) => {
    // extract the current date and time components
    const file = event.target.files[0];
    setProductImg(file);
  };

  // const handleInvoiceFileUpload = (event) => {
  //   const file = event.target.files[0];
  //   setInvoiceFile(file);
  // };
  const handleInvoiceFileChange = (event) => {
    const files = event.target.files;
    const selectedFiles = Array.from(files);
    setInvoiceFiles(selectedFiles);
    // const selectedFiles = event.target.files;
    // setInvoiceFiles(selectedFiles);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    const formData = new FormData();
    formData.append('productImg', productImg);
    // formData.append('invoiceFile', invoiceFile);
    formData.append('productName', productName);
    formData.append('productPrice', productPrice);
    formData.append('productDescription', productDescription);
    formData.append('modelNumber', modelNumber);
    formData.append('printerColor', printerColor);
    formData.append('connectorType', connectorType);
    formData.append('stockQuantity', stockQuantity);
    formData.append('shelfStartTime', shelfStartTime);
    formData.append('shelfEndTime', shelfEndTime);
    formData.append('afterSalesText', afterSalesText);
    formData.append('afterSalesInstruction', afterSalesInstruction);
    formData.append('inventoryText', inventoryText);
    formData.append('date', date);
    formData.append('time', time);

    // Append selected invoice files to the form data
    for (let i = 0; i < invoiceFiles.length; i++) {
      formData.append('invoiceFiles', invoiceFiles[i]);
    }
    // Append selected images to the form data
    for (let i = 0; i < selectedImages.length; i++) {
      formData.append('images', selectedImages[i]);
    }

    // Append selected videos to the form data
    for (let i = 0; i < selectedVideos.length; i++) {
      formData.append('videos', selectedVideos[i]);
    }
    
    try {
      await axios.post(`https://customer-server-theta.vercel.app/tht/${productCategory}/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success(`${productCategory} Product created successfully!`);
      setLoading(false)
      // Reset form fields
      setProductName('');
      setProductPrice('');
      setProductDescription('');
      setModelNumber('');
      setPrinterColor('');
      setConnectorType('');
      setStockQuantity('');
      setSelectedImages([]);
      setSelectedVideos([]);
      setShelfStartTime('');
      setShelfEndTime('');
      setAfterSalesText('');
      setAfterSalesInstruction('');
      setInventoryText('');
      setProductImg(null);
      setInvoiceFile(null);
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error("Failed to upload, Please input every data properly")
    }
  };




  return (
    <div className="md:flex md:flex-row">
      <div className="w-full md:w-1/2 p-8 ">
        <img src={previewImage} alt="" className="mb-4 mx-auto h-1/4 w-2/3" />

        {/* <label>Product Image:</label> */}
        <input type="file"
          onChange={handleProductImgUpload}
          className="bg-[#004368] hover:bg-blue-700 text-white font-bold py-2 my-10 px-3 lg:px-10 lg:ml-5 rounded-lg required"
          accept="image/*" />
        {/* <input 
        type="file"
        onChange={handleImageUpload}
        placeholder=""
        className="bg-[#004368] hover:bg-blue-700 text-white font-bold py-2 my-10 px-3 lg:px-10 lg:ml-5 rounded-lg"
        /> */}

      </div>
      <div className="w-full md:w-1/2 p-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">

            <input
              type="text"
              id="productName"
              placeholder='ProductName'
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
              value={productName}
              onChange={handleProductNameChange}
              required
            />
          </div>
          <div className="mb-4">

            <input
              type="digit"
              id="productPrice"
              placeholder='Product Price'
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
              value={productPrice}
              onChange={handleProductPriceChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="productDescription" className="block text-start text-gray-700 font-bold mb-2">
              Product Description
            </label>
            <textarea
              id="productDescription"
              placeholder="Add Product description"
              className="shadow resize-none appearance-none border rounded-lg w-full h-44  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
              value={productDescription}
              onChange={handleProductDescriptionChange}
              required
            ></textarea>
          </div>
          <h2 className="text-lg font-bold text-start my-10">
            Product Details
          </h2>
          <div className="mb-4 grid  grid-cols-3 text-start mr-14">
            <label htmlFor="modelNumber" className="block col-span-1 text-gray-500 font-semibold mb-2">
              Model Number
            </label>
            <input
              type="text"
              id="modelNumber"
              className="shadow col-span-2  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
              value={modelNumber}
              placeholder='Model Number'
              onChange={handleModelNumberChange}
              required
            />
          </div>
          <div className="mb-4 grid  grid-cols-3 text-start mr-14">
            <label htmlFor="modelNumber" className="block col-span-1 text-gray-500 font-semibold mb-2">
              Printer Color
            </label>
            <input
              type="text"
              id="printerColor"
              className="shadow col-span-2  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
              value={printerColor}
              placeholder='Color'
              onChange={handlePrinterColorChange}
              
            />
          </div>
          <div className="mb-4 grid  grid-cols-3 text-start mr-14">
            <label htmlFor="modelNumber" className="block col-span-1 text-gray-500 font-semibold mb-2">
              connector type
            </label>
            <input
              type="text"
              id="connectorType"
              className="shadow col-span-2  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
              value={connectorType}
              placeholder='Bluetooth'
              onChange={handleConnectorTypeChange}

             
            />
          </div>
          <div className="my-8 mt-16 grid  grid-cols-3 text-start mr-14">
            <label htmlFor="modelNumber" className="block col-span-1 text-gray-700 font-bold mb-2">
              Stock Quantity
            </label>
            <input
              type="text"
              id="stockQuantity"
              className="shadow col-span-2  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
              value={stockQuantity}
              placeholder='Add quantity'
              onChange={handleStockQuantityChange}
              
            />
          </div>



          <div className="my-8 mt-16 grid  grid-cols-2 text-start mr-14">
            <label htmlFor="relatedImages" className="block col-span-1 text-gray-700 font-bold mb-2">
            Upload related Images
            </label>
            <input className='mt-5 mb-8 required bg-white' type="file" multiple onChange={handleImageChange} accept="image/*" />
          </div>


          <div className="my-8 mt-16 grid  grid-cols-2 text-start mr-14">
            <label htmlFor="relatedImages" className="block col-span-1 text-gray-700 font-bold mb-2">
            Upload related videos
            </label>
            <input className='mt-5 mb-8 required' type="file" multiple onChange={handleVideoChange} accept="video/*" />
          </div>

        

          <div className="mb-4">
            <label htmlFor="shelfTimeStart" className="block text-start text-gray-700 font-bold mb-2">
              Shelf Time
            </label>
            <div className="flex items-center justify-between">
              <input
                type="datetime-local"
                id="shelfTimeStart"
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                value={shelfStartTime}
                onChange={handleShelfStartTimeChange}
                required
              />
              <input
                type="datetime-local"
                id="shelfTimeEnd"
                className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                value={shelfEndTime}
                onChange={handleShelfEndTimeChange}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="afterSales" className="block text-gray-700 font-bold mb-2 text-start">
              After-Sales
            </label>
            <textarea
              id="afterSales"
              placeholder="Add after-sales description"
              className="shadow resize-none appearance-none border rounded w-full h-44 py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
              value={afterSalesText}
              onChange={handleAfterSalesTextChange}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="afterSalesInstructions" className="block text-start text-gray-700 font-bold mb-2">
              After-Sales Instructions
            </label>
            <textarea
              id="afterSalesInstructions"
              placeholder='Add after-sales instructions'
              className="shadow appearance-none border rounded resize-none w-full h-44 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
              value={afterSalesInstruction}
              onChange={handleAfterSalesInstructionChange}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="inventory" className="block text-start text-gray-700 font-bold mb-2">
              Inventory
            </label>
            <textarea
              id="inventory"
              placeholder="Add inventory description"
              className="shadow appearance-none border resize-none rounded w-full h-44 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
              value={inventoryText}
              onChange={handleInventoryTextChange}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-start text-gray-700 font-bold mb-2">
              Invoice
            </label>
            {/* <input type="file"
              onChange={handleInvoiceFileUpload}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white required"
              accept=".csv, .pdf, .xls, .xlsx" /> */}
            <input
              type="file"
              multiple
              accept=".csv, .pdf, .xls, .xlsx"
              onChange={handleInvoiceFileChange}
            />

            {/* <input
              type="file"
              id="invoice"
              accept="application/pdf"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
              onChange={handleInvoiceFileChange}
              required
            /> */}
          </div>
          <button
            className="bg-[#004368] hover:bg-blue-700 text-white font-bold py-2 my-10 px-20 rounded-lg"
            onClick={handleSubmit}
          >
            {
              loading?
              <BtnSpinner></BtnSpinner>
              :
              "Save"
            }
            
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;


