import React, { useState } from 'react';
import './AddFurniture.css';
import mainimg from '../../Assets/addfurniture_first.png';
import imgsub from '../../Assets/addfurniture_sub.png';
import Shopnav from '../Navbar/Shopnav';
import Showdropdown from './Shopdropdown';

function AddFurniture() {
  const [mainImage, setMainImage] = useState(mainimg);
  const [subImages, setSubImages] = useState([imgsub, imgsub, imgsub]);

  const handleImageChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (index === 'main') {
          setMainImage(reader.result);
        } else {
          const newSubImages = [...subImages];
          newSubImages[index] = reader.result;
          setSubImages(newSubImages);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    dimensions: '',
    quantity:'',
    roomCategory: '',
    description: '',
    terms: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    category: '',
    price: '',
    dimensions: '',
    quantity:'',
    roomCategory: '',
    description: '',
    terms: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let formIsValid = true;
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Furniture name is required';
      formIsValid = false;
    }

    if (!formData.category) {
      newErrors.category = 'Furniture category is required';
      formIsValid = false;
    }

    if (!formData.price.trim()) {
      newErrors.price = 'Price/Month is required';
      formIsValid = false;
    }

    if (!formData.dimensions.trim()) {
      newErrors.dimensions = 'Dimensions is required';
      formIsValid = false;
    }

    if (!formData.quantity.trim()) {
        newErrors.quantity = 'Quantity is required';
        formIsValid = false;
      }

    if (!formData.roomCategory.trim()) {
      newErrors.roomCategory = 'Room Category is required';
      formIsValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
      formIsValid = false;
    }

    if (!formData.terms.trim()) {
      newErrors.terms = 'Terms & Condition is required';
      formIsValid = false;
    }

    if (!mainImage || mainImage === mainimg) {
        newErrors.mainImage = 'Image is required';
        formIsValid = false;
      }

    if (formIsValid) {
      
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div><Shopnav/><Showdropdown/>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <div className='col-md-6 col-sm-12'>
            <div className='row m-4'>
              <div className='col-12'>
                <label htmlFor="mainImageUpload">
                  <img src={mainImage} className='img-fluid main_image_style' alt="Main" style={{ cursor: 'pointer' }} />
                </label>
                <input
                  type="file"
                  id="mainImageUpload"
                  style={{ display: 'none' }}
                  onChange={(e) => handleImageChange(e, 'main')}
                />
              </div>
              {errors.mainImage && <div className="text-danger">{errors.mainImage}</div>}            </div>
            <div className='row m-4'>
              {subImages.map((img, index) => (
                <div className='col-4' key={index}>
                  <label htmlFor={`subImageUpload${index}`}>
                    <img src={img} className='img-fluid sub_image_style' alt={`Sub ${index}`} style={{ cursor: 'pointer' }} />
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
                  type="text"
                  className="form-control controls"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                />
                {errors.description && <div className="text-danger">{errors.description}</div>}
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
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Furniture Name"
              />
              {errors.name && <div className="text-danger">{errors.name}</div>}
            </div>
            <div className='m-4'>
              <label className="form-label">Furniture Category</label><span className="text-danger">*</span>
              <select
                id="furniture-category"
                className="form-control controls"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="">Select Category</option>
                <option value="Chair">Chair</option>
                <option value="Sofa">Sofa</option>
                <option value="Table">Dining Table</option>
                <option value="Cot">Cot</option>
              </select>
              {errors.category && <div className="text-danger">{errors.category}</div>}
            </div>
            <div className='m-4'>
              <label className="form-label">Price/Month</label><span className="text-danger">*</span>
              <input
                type="text"
                className="form-control controls"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Price/Month"
              />
              {errors.price && <div className="text-danger">{errors.price}</div>}
            </div>
            <div className='m-4'>
              <div className='row'>
                <div className='col-6'>
                  <label className="form-label">Dimensions</label><span className="text-danger">*</span>
                  <input
                    type="text"
                    className="form-control controls"
                    name="dimensions"
                    value={formData.dimensions}
                    onChange={handleInputChange}
                    placeholder="Dimensions"
                  />
                  {errors.dimensions && <div className="text-danger">{errors.dimensions}</div>}
                </div>
                <div className='col-6'>
                  <label className="form-label">Quantity</label><span className="text-danger">*</span>
                  <input
                    type="text"
                    className="form-control controls"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    placeholder="Quantity"
                  />
                  {errors.quantity && <div className="text-danger">{errors.quantity}</div>}
                </div>
              </div>
            </div>
            <div className='m-4'>
              <label className="form-label">Room Category</label><span className="text-danger">*</span>
              <select
                id="room-category"
                className="form-control controls"
                name="roomCategory"
                value={formData.roomCategory}
                onChange={handleInputChange}
              >
                <option value="">Select Category</option>
                <option value="Living Room">Living Room</option>
                <option value="Dining Room">Dining Room</option>
                <option value="Bed Room">Bed Room</option>
                <option value="Study Room">Study Room</option>
              </select>
              {errors.roomCategory && <div className="text-danger">{errors.roomCategory}</div>}
            </div>
            <div className='m-4'>
              <label className="form-label">Terms & Condition</label><span className="text-danger">*</span>
              <textarea
                type="text"
                className="form-control controls"
                name="terms"
                value={formData.terms}
                onChange={handleInputChange}
                placeholder="Terms & Condition"
              />
              {errors.terms && <div className="text-danger">{errors.terms}</div>}
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <button type="submit" className="btn btn-warning">
            &nbsp;&nbsp; Post &nbsp;&nbsp;
          </button>
        </div><br/><br/>
      </form>
    </div>
  );
}

export default AddFurniture;
