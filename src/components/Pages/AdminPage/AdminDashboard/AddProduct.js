import { useState } from 'react';
import axios from 'axios';
import addImg from "../../../../Assets/Images/Admin/Vector.jpg"

function  AddProduct() {
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
  const [invoiceFile, setInvoiceFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(addImg);
  const [fileName, setFileName] = useState("Add Image");

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

  const handleInvoiceFileChange = (e) => {
    setInvoiceFile(e.target.files[0]);
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    formData.append('key', process.env.REACT_APP_IMG_BB_API_KEY);
    const res = await axios.post('https://api.imgbb.com/1/upload', formData);
    setPreviewImage(res.data.data.url);
  };

  const handleSubmit = (e) => {   
    e.preventDefault();
    const product = {
      productName,
      productPrice,
      productDescription,
      modelNumber,
      printerColor,
      connectorType,
      stockQuantity,
      shelfStartTime,
      shelfEndTime,
      afterSalesText,
      afterSalesInstruction,
      inventoryText,
      invoiceFile,
      previewImage,
    };
    // Add your code to save the product object into an array or a database
    console.log(product)
  };

  return (
    <div className="md:flex md:flex-row">
      <div className="w-1/2 p-8 ">
        <img src={previewImage} alt="" className="mb-4 mx-auto h-1/4 w-2/3" />
        
        
        <input 
        type="file"
        onChange={handleImageUpload}
        placeholder=""
        className="bg-[#004368] hover:bg-blue-700 text-white font-bold py-2 my-10 px-3 lg:px-10 lg:ml-5 rounded-lg"
        />
       
      </div>
      <div className="w-1/2 p-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
          
            <input
              type="text"
              id="productName"
              placeholder='ProductName'
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              className="shadow resize-none appearance-none border rounded-lg w-full h-44  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              className="shadow col-span-2  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              className="shadow col-span-2  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={printerColor}
              placeholder='Color'
              onChange={handlePrinterColorChange}
              required
            />
          </div>
          <div className="mb-4 grid  grid-cols-3 text-start mr-14">
            <label htmlFor="modelNumber" className="block col-span-1 text-gray-500 font-semibold mb-2">
              connector type
            </label>
            <input
              type="text"
              id="connectorType"
              className="shadow col-span-2  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={connectorType}
              placeholder='Bluetooth'
              onChange={handleConnectorTypeChange}

              required
            />
          </div>
          <div className="my-8 mt-16 grid  grid-cols-3 text-start mr-14">
            <label htmlFor="modelNumber" className="block col-span-1 text-gray-700 font-bold mb-2">
               Stock Quantity
            </label>
            <input
              type="text"
              id="stockQuantity"
              className="shadow col-span-2  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={stockQuantity}
              placeholder='Add quantity'
              onChange={handleStockQuantityChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="shelfTimeStart" className="block text-start text-gray-700 font-bold mb-2">
              Shelf Time 
            </label>
            <div className="flex items-center justify-between">
            <input
              type="datetime-local"
              id="shelfTimeStart"
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={shelfStartTime}
              onChange={handleShelfStartTimeChange}
              required
            />
            <input
              type="datetime-local"
              id="shelfTimeEnd"
              className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              className="shadow resize-none appearance-none border rounded w-full h-44 py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              className="shadow appearance-none border rounded resize-none w-full h-44 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              className="shadow appearance-none border resize-none rounded w-full h-44 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={inventoryText}
              onChange={handleInventoryTextChange}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="invoice" className="block text-start text-gray-700 font-bold mb-2">
              Invoice
            </label>
            <input
              type="file"
              id="invoice"
              accept="application/pdf"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleInvoiceFileChange}
              required
            />
          </div>
          <button
                        className="bg-[#004368] hover:bg-blue-700 text-white font-bold py-2 my-10 px-20 rounded-lg"
                        onClick={handleSubmit}
                    >
                        Save
                    </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;


