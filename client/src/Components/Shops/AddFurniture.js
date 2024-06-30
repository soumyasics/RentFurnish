import React, { useState } from 'react';
import './AddFurniture.css';
import mainimg from '../../Assets/addfurniture_first.png';
import imgsub from '../../Assets/addfurniture_sub.png';

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

  return (
    <div>
      <div className='row'>
        <div className='col-md-6 col-sm-12'>
          <div className='row m-4'>
            <div className='col-12'>
              <label htmlFor="mainImageUpload">
                <img src={mainImage} className='img-fluid main_image_style' alt="Main" style={{cursor: 'pointer'}} />
              </label>
              <input 
                type="file" 
                id="mainImageUpload" 
                style={{ display: 'none' }} 
                onChange={(e) => handleImageChange(e, 'main')} 
              />
            </div>
          </div>
          <div className='row m-4'>
            {subImages.map((img, index) => (
              <div className='col-4' key={index}>
                <label htmlFor={`subImageUpload${index}`}>
                  <img src={img} className='img-fluid sub_image_style' alt={`Sub ${index}`} style={{cursor: 'pointer'}} />
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
              placeholder="Furniture Name" 
            />
          </div>
          <div className='m-4'>
            <label className="form-label">Furniture Category</label><span className="text-danger">*</span>
            <select 
              id="furniture-category"
              className="form-control controls" 
            >
              <option value="">Select Category</option>
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
              name="price" 
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
                  name="dimensions" 
                  placeholder="Dimensions" 
                />
              </div>
              <div className='col-6'>
                <label className="form-label">Quantity</label><span className="text-danger">*</span>
                {/* <input 
                  type="text" 
                  className="form-control controls" 
                  name="dimensions" 
                  placeholder="Dimensions" 
                /> */}
              </div>
            </div>
          </div>
          <div className='m-4'>
            <label className="form-label">Room Category</label><span className="text-danger">*</span>
            <select 
              id="room-category"
              className="form-control controls" 
            >
              <option value="">Select Category</option>
              <option value="Living Room">Living Room</option>
              <option value="Dining Room">Dining Room</option>
              <option value="Bed Room">Bed Room</option>
              <option value="Study Room">Study Room</option>
            </select>
          </div>
          <div className='m-4'>
            <label className="form-label">Terms & Condition</label><span className="text-danger">*</span>
            <textarea 
              type="text" 
              className="form-control controls" 
              name="terms"  
              placeholder="Terms & Condition" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddFurniture;
