import React, { useState } from 'react';
import './AddFurniture.css';
import mainimg from '../../Assets/addfurniture_first.png';
import imgsub from '../../Assets/addfurniture_sub.png';
import Shopnav from '../Navbar/Shopnav';
import Showdropdown from './Shopdropdown';
import axiosMultipartInstance from '../Constants/FormDataUrl';

function AddFurniture() {
  const [mainImage, setMainImage] = useState(mainimg);
  const [subImages, setSubImages] = useState([imgsub, imgsub, imgsub]);
  const shopid = localStorage.getItem("shopid");

  const [data, setData] = useState({
    name: '',
    category: '',
    condition: '',
    dimension: '',
    quantity: '',
    roomType: '',
    description: '',
    terms: '',
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    shopId: shopid
  });

  const [errors, setErrors] = useState({
    name: '',
    category: '',
    condition: '',
    dimension: '',
    quantity: '',
    roomType: '',
    description: '',
    terms: '',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
  });

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
    let formIsValid = true;
    let newErrors = {};

    if (!data.name.trim()) {
        newErrors.name = 'Furniture name is required';
        formIsValid = false;
      } else if (!/^[A-Za-z\s]+$/.test(data.name.trim())) {
        newErrors.name = 'Furniture name should only contain letters and spaces';
        formIsValid = false;
      }

    if (!data.category) {
      newErrors.category = 'Furniture category is required';
      formIsValid = false;
    }

    if (!data.condition.trim()) {
      newErrors.condition = 'Price/Month is required';
      formIsValid = false;
    }

    if (!data.dimension.trim()) {
      newErrors.dimension = 'Dimensions is required';
      formIsValid = false;
    }

    if (!data.quantity.trim()) {
        newErrors.quantity = 'Quantity is required';
        formIsValid = false;
      } else if (!/^\d+$/.test(data.quantity.trim())) {
        newErrors.quantity = 'Quantity should only contain numbers';
        formIsValid = false;
      }

    if (!data.roomType.trim()) {
      newErrors.roomType = 'Room Category is required';
      formIsValid = false;
    }

    if (!data.description.trim()) {
        newErrors.description = 'Description name is required';
        formIsValid = false;
      } else if (!/^[A-Za-z\s]+$/.test(data.description.trim())) {
        newErrors.description = 'Description name should only contain letters and spaces';
        formIsValid = false;
      }

      if (!data.terms.trim()) {
        newErrors.terms = 'Terms & Condition name is required';
        formIsValid = false;
      } else if (!/^[A-Za-z\s]+$/.test(data.terms.trim())) {
        newErrors.terms = 'Terms & Condition name should only contain letters and spaces';
        formIsValid = false;
      }

    if (!data.image1) {
      newErrors.image1 = 'Image is required';
      formIsValid = false;
    }

    setErrors(newErrors);

    if (formIsValid) {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('category', data.category);
      formData.append('condition', data.condition);
      formData.append('dimension', data.dimension);
      formData.append('quantity', data.quantity);
      formData.append('roomType', data.roomType);
      formData.append('description', data.description);
      formData.append('terms', data.terms);
      formData.append('image1', data.image1);
      formData.append('image2', data.image2);
      formData.append('image3', data.image3);
      formData.append('image4', data.image4);
      formData.append('shopId', data.shopId);

      try {
        const res = await axiosMultipartInstance.post('/registerFurniture', formData);
        if (res.data.status === 200) {
          alert('Furniture added successfully');
        } else {
          alert(`Furniture not added: ${res.data.msg}`);
        }
      } catch (error) {
        console.error('There was an error!', error);
        alert('Error');
      }
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
                  <img src={mainImage} className='img-fluid main_image_style' alt="Main" style={{ cursor: 'pointer' }} />
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
                  className="form-control controls"
                  name="description"
                  value={data.description}
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
                value={data.name}
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
                value={data.category}
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
                name="condition"
                value={data.condition}
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
                    name="dimension"
                    value={data.dimension}
                    onChange={handleInputChange}
                    placeholder="Dimension"
                  />
                  {errors.dimension && <div className="text-danger">{errors.dimension}</div>}
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
                  {errors.quantity && <div className="text-danger">{errors.quantity}</div>}
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
                <option value="Bedroom">Bedroom</option>
                <option value="Studyroom">Study Room</option>

              </select>
              {errors.roomType && <div className="text-danger">{errors.roomType}</div>}
            </div>
            <div className='m-4'>
              <label className="form-label">Terms & Conditions</label><span className="text-danger">*</span>
              <textarea
                className="form-control controls"
                name="terms"
                value={data.terms}
                onChange={handleInputChange}
                placeholder="Terms & Conditions"
              />
              {errors.terms && <div className="text-danger">{errors.terms}</div>}
            </div>
          </div>
          <div className="text-center mt-4">
            <button type="submit" className="btn btn-warning">
              &nbsp;&nbsp; Post &nbsp;&nbsp;
            </button>
          </div>
        </div><br />
      </form>
    </div>
  );
}

export default AddFurniture;
