import React, { useContext, useState } from 'react';
import { assets } from "../../assets/assets.js";
import { AppContext } from "../../context/AppContext.jsx";
import toast from 'react-hot-toast';
import { addItem } from '../../Service/ItemService.js';

const ItemForm = () => {
  const { categories, setItemsData, itemsData, setCategories } = useContext(AppContext);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    categoryId: "",
    price: "",
    description: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Select an image");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("item", JSON.stringify(data));
      formData.append("file", image);

      const response = await addItem(formData);

      if (response.status === 201) {
        // ✅ Correctly update itemsData
        setItemsData(prev => [...itemsData, response.data]);
        
        toast.success("Item added successfully");

        // Reset form
        setData({
          name: "",
          categoryId: "",
          price: "",
          description: "",
        });
        setImage(false);
      } else {
        toast.error("Unable to add item");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to add item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='items-form-container' style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}>
      <div className='mx-2 mt-2'>
        <div className='row'>
          <div className='card col-md-12 form-container'>
            <div className='card-body'>
              <form onSubmit={onSubmitHandler}>
                <div className='mb-3'>
                  <label htmlFor='image' className='form-label'>
                    <img src={image ? URL.createObjectURL(image) : assets.upload} alt='' width={48} />
                  </label>
                  <input
                    type='file'
                    name='image'
                    id='image'
                    className='form-control'
                    hidden
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>

                <div className='mb-3'>
                  <label htmlFor='name' className='form-label'>Name</label>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    className='form-control'
                    placeholder='Item Name'
                    onChange={onChangeHandler}
                    value={data.name}
                    required
                  />
                </div>

                <div className='mb-3'>
                  <label htmlFor='category' className='form-label'>Category</label>
                  <select
                    name='categoryId'
                    id='category'
                    className='form-control'
                    onChange={onChangeHandler}
                    value={data.categoryId}
                    required
                  >
                    <option value=''>--SELECT CATEGORY--</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category.categoryId}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='mb-3'>
                  <label htmlFor='price' className='form-label'>Price</label>
                  <input
                    type='number'
                    name='price'
                    id='price'
                    className='form-control'
                    placeholder='LKR500.00'
                    onChange={onChangeHandler}
                    value={data.price}
                    required
                  />
                </div>

                <div className='mb-3'>
                  <label htmlFor='description' className='form-label'>Description</label>
                  <textarea
                    name='description'
                    id='description'
                    rows='5'
                    className='form-control'
                    placeholder='Write content here...'
                    onChange={onChangeHandler}
                    value={data.description}
                  />
                </div>

                <button type='submit' className='btn btn-warning w-100' disabled={loading}>
                  {loading ? "Loading..." : "Save"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemForm;
