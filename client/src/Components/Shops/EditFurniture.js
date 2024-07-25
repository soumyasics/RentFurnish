import React, { useState, useEffect } from 'react';
import './Furniture.css';
import mainimg from '../../Assets/addfurniture_first.png';
import imgsub from '../../Assets/addfurniture_sub.png';
import Shopnav from '../Navbar/Shopnav';
import Showdropdown from './Shopdropdown';
// import axiosMultipartInstance from '../Constants/FormDataUrl';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import axiosInstance from '../Constants/Baseurl';
import axiosMultipartInstance from '../Constants/FormDataUrl';

function EditFurniture() {
  const [mainImage, setMainImage] = useState(mainimg);
  const [subImages, setSubImages] = useState([imgsub, imgsub, imgsub]);
  const shopid = localStorage.getItem("shopid");
  const { id } = useParams();
  const url = axiosInstance.defaults.url;

  const [data, setData] = useState({
    name: '',
    category: '',
    rent: '',
    dimension: '',
    quantity: '',
    roomType: '',
    description: '',
    condition: '',
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    shopId: shopid
  });

  const [errors, setErrors] = useState({
    name: '',
    category: '',
    rent: '',
    dimension: '',
    quantity: '',
    roomType: '',
    description: '',
    condition: '',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axiosMultipartInstance.post(`/viewFurnitureById/${id}`);
        const furniture = res.data.data;
        setData({
          name: furniture.name,
          category: furniture.category,
          rent: furniture.rent,
          dimension: furniture.dimension,
          quantity: furniture.quantity,
          roomType: furniture.roomType,
          description: furniture.description,
          condition: furniture.condition,
          image1: null,
          image2: null,
          image3: null,
          image4: null,
          shopId: shopid
        });

        setMainImage(furniture.image1 ? `${url}/${furniture.image1.filename}` : mainimg);
        setSubImages([
          furniture.image2 ? `${url}/${furniture.image2.filename}` : imgsub,
          furniture.image3 ? `${url}/${furniture.image3.filename}` : imgsub,
          furniture.image4 ? `${url}/${furniture.image4.filename}` : imgsub,
        ]);
      } catch (error) {
        console.error('Error fetching furniture data', error);
      }
    };

    getData();
  }, [id, shopid]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleImageChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (index === 'main') {
          setMainImage(reader.result);
          setData({ ...data, image1: file });
        } else {
          const newSubImages = [...subImages];
          newSubImages[index] = reader.result;
          setSubImages(newSubImages);
          setData({ ...data, [`image${index + 2}`]: file });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('category', data.category);
    formData.append('rent', data.rent);
    formData.append('dimension', data.dimension);
    formData.append('quantity', data.quantity);
    formData.append('roomType', data.roomType);
    formData.append('description', data.description);
    formData.append('condition', data.condition);
    formData.append('image1', data.image1);
    formData.append('image2', data.image2);
    formData.append('image3', data.image3);
    formData.append('image4', data.image4);
    formData.append('shopId', data.shopId);
  
    try {
      const res = await axiosMultipartInstance.post(`editFurnitureById/${id}`, formData);
  
      if (res.data.status === 200) {
        toast.success("Furniture Updated successfully");
      } else {
        toast.error(`Furniture not Updated: ${res.data.msg}`);
      }
    } catch (error) {
      console.error('Error updating furniture:', error);
      toast.error('Error Updating furniture. Please try again later.');
    }
  };

  return (
    <div>
      <Shopnav />
      <Showdropdown />
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <div className='col-md-6 col-sm-12'>
            <div className='row m-4'>
              <div className='col-12'>
                <label htmlFor="mainImageUpload">
                  <img
                    src={mainImage}
                    className='img-fluid main_image_style'
                    alt="Main"
                    style={{ cursor: 'pointer' }}
                  />
                </label>
                <input
                  type="file"
                  id="mainImageUpload"
                  style={{ display: 'none' }}
                  onChange={(e) => handleImageChange(e, 'main')}
                />
              </div>
              {errors.image1 && <div className="text-danger">{errors.image1}</div>}
            </div>
            <div className='row m-4'>
              {subImages.map((img, index) => (
                <div className='col-4' key={index}>
                  <label htmlFor={`subImageUpload${index}`}>
                    <img
                      src={img}
                      className='img-fluid sub_image_style'
                      alt={`Sub ${index}`}
                      style={{ cursor: 'pointer' }}
                    />
                  </label>
                  <input
                    type="file"
                    id={`subImageUpload${index}`}
                    style={{ display: 'none' }}
                    onChange={(e) => handleImageChange(e, index)}
                  />
                </div>
              ))}
            </div>
            <div className='row m-4'>
              <div className='col-12'>
                <label className="form-label">Description</label><span className="text-danger">*</span>
                <textarea
                  className="form-control controls"
                  name="description"
                  value={data.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                />
              </div>
            </div>
          </div>
          <div className='col-md-6 col-sm-12'>
            <div className='m-4'>
              <label className="form-label">Furniture name</label><span className="text-danger">*</span>
              <input
                type="text"
                className="form-control controls"
                name="name"
                value={data.name}
                onChange={handleInputChange}
                placeholder="Furniture Name"
              />
            </div>
            <div className='m-4'>
              <label className="form-label">Furniture Category</label><span className="text-danger">*</span>
              <select
                id="furniture-category"
                className="form-control controls"
                name="category"
                value={data.category}
                onChange={handleInputChange}
              >
                <option value="" disabled>--Select Furniture Category--</option>
                <option value="Chair">Chair</option>
                <option value="Sofa">Sofa</option>
                <option value="Table">Dining Table</option>
                <option value="Cot">Cot</option>
              </select>
            </div>
            <div className='m-4'>
              <label className="form-label">Price/Month</label><span className="text-danger">*</span>
              <input
                type="text"
                className="form-control controls"
                name="rent"
                value={data.rent}
                onChange={handleInputChange}
                placeholder="Price/Month"
              />
            </div>
            <div className='m-4'>
              <div className='row'>
                <div className='col-6'>
                  <label className="form-label">Dimensions</label><span className="text-danger">*</span>
                  <input
                    type="text"
                    className="form-control controls"
                    name="dimension"
                    value={data.dimension}
                    onChange={handleInputChange}
                    placeholder="Dimension"
                  />
                </div>
                <div className='col-6'>
                  <label className="form-label">Quantity</label><span className="text-danger">*</span>
                  <input
                    type="text"
                    className="form-control controls"
                    name="quantity"
                    value={data.quantity}
                    onChange={handleInputChange}
                    placeholder="Quantity"
                  />
                </div>
              </div>
            </div>
            <div className='m-4'>
              <label className="form-label">Room Category</label><span className="text-danger">*</span>
              <select
                id="room-category"
                className="form-control controls"
                name="roomType"
                value={data.roomType}
                onChange={handleInputChange}
              >
                <option value="">Select Room Category</option>
                <option value="Living Room">Living Room</option>
                <option value="Dining Room">Dining Room</option>
                <option value="Bed Room">Bed Room</option>
                <option value="Studyroom">Study Room</option>
              </select>
            </div>
            <div className='m-4'>
                <label className="form-label">Terms & Conditions</label><span className="text-danger">*</span>
                <textarea
                    className="form-control controls"
                    name="condition"
                    value={data.condition}
                    onChange={handleInputChange}
                    placeholder="Terms & Conditions"
                />
            </div>
          </div>
          <div className="text-center m-4">
            <button type="submit" className="btn btn-warning">
              &nbsp;&nbsp; Update &nbsp;&nbsp;
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditFurniture;

