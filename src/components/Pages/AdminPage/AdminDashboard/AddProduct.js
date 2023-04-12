import { useState } from 'react';
import axios from 'axios';

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
  const [previewImage, setPreviewImage] = useState(null);

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
    formData.append('key', 'your_imgbb_api_key');
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
    <div className="flex flex-row">
      <div className="w-1/2 p-8">
        <img src={previewImage} alt="" className="mb-4" />
        <input type="file" onChange={handleImageUpload} />
      </div>
      <div className="w-1/2 p-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="productName" className="block text-gray-700 font-bold mb-2">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={productName}
              onChange={handleProductNameChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="productPrice" className="block text-gray-700 font-bold mb-2">
              Product Price
            </label>
            <input
              type="number"
              id="productPrice"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={productPrice}
              onChange={handleProductPriceChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="productDescription" className="block text-gray-700 font-bold mb-2">
              Product Description
            </label>
            <textarea
              id="productDescription"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={productDescription}
              onChange={handleProductDescriptionChange}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="modelNumber" className="block text-gray-700 font-bold mb-2">
              Model Number
            </label>
            <input
              type="text"
              id="modelNumber"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={modelNumber}
              onChange={handleModelNumberChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="printerColor" className="block text-gray-700 font-bold mb-2">
              Printer Color
            </label>
            <input
              type="text"
              id="printerColor"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={printerColor}
              onChange={handlePrinterColorChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="connectorType" className="block text-gray-700 font-bold mb-2">
              Connector Type
            </label>
            <input
              type="text"
              id="connectorType"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={connectorType}
              onChange={handleConnectorTypeChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="stockQuantity" className="block text-gray-700 font-bold mb-2">
              Stock Quantity
            </label>
            <input
              type="number"
              id="stockQuantity"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={stockQuantity}
              onChange={handleStockQuantityChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="shelfTimeStart" className="block text-gray-700 font-bold mb-2">
              Shelf Time Start
            </label>
            <input
              type="datetime-local"
              id="shelfTimeStart"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={shelfStartTime}
              onChange={handleShelfStartTimeChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="shelfTimeEnd" className="block text-gray-700 font-bold mb-2">
              Shelf Time End
            </label>
            <input
              type="datetime-local"
              id="shelfTimeEnd"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={shelfEndTime}
              onChange={handleShelfEndTimeChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="afterSales" className="block text-gray-700 font-bold mb-2">
              After-Sales Text
            </label>
            <textarea
              id="afterSales"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={afterSalesText}
              onChange={handleAfterSalesTextChange}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="afterSalesInstructions" className="block text-gray-700 font-bold mb-2">
              After-Sales Instructions
            </label>
            <textarea
              id="afterSalesInstructions"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={afterSalesInstruction}
              onChange={handleAfterSalesInstructionChange}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="inventory" className="block text-gray-700 font-bold mb-2">
              Inventory
            </label>
            <textarea
              id="inventory"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={inventoryText}
              onChange={handleInventoryTextChange}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="invoice" className="block text-gray-700 font-bold mb-2">
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
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;


