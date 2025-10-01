import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { fetchItems, deleteItem } from '../../Service/ItemService';
import toast from 'react-hot-toast';
import './ItemList.css';

const ItemList = () => {
  const { itemsData, setItemsData } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch items from backend on mount
  useEffect(() => {
    const loadItems = async () => {
      try {
        setLoading(true);
        const response = await fetchItems();
        if (response.status >= 200 && response.status < 300) {
          setItemsData(response.data);
        } else {
          toast.error('Failed to load items');
        }
      } catch (err) {
        console.error(err);
        toast.error('Failed to load items');
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, [setItemsData]);

  // Filter items by search term
  const filteredItems = itemsData?.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Delete item
  const handleDelete = async (itemId) => {
    if (!itemId) {
      toast.error('No item ID provided');
      return;
    }

    try {
      const response = await deleteItem(itemId);
      if (response.status >= 200 && response.status < 300) {
        const updatedItems = itemsData.filter((item) => item.itemId !== itemId);
        setItemsData(updatedItems);
        toast.success('Item deleted');
      } else {
        toast.error('Unable to delete item');
      }
    } catch (err) {
      console.error(err);
      toast.error('Unable to delete item');
    }
  };

  return (
    <div
      className="category-list-container"
      style={{ height: '100vh', overflowY: 'auto', overflowX: 'auto' }}
    >
      {/* Search Bar */}
      <div className="row pe-2">
        <div className="input-group mb-3">
          <input
            type="text"
            name="keyword"
            placeholder="Search by keyword"
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="input-group-text bg-warning">
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>

      {/* Items List */}
      <div className="row g-3 pe-2">
        {!loading && filteredItems.length === 0 && (
          <p className="text-white text-center">No items found</p>
        )}

        {filteredItems.map((item) => (
          <div className="col-12" key={item.itemId}>
            <div className="card p-3 bg-dark">
              <div className="d-flex align-items-center">
                <div style={{ marginRight: '15px' }}>
                  <img
                    src={item.imgUrl || '/default-image.png'}
                    alt={item.name}
                    className="item-image"
                  />
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-1 text-white">{item.name}</h6>
                  <p className="mb-0 text-white">Category: {item.categoryName}</p>
                  <span className="mb-0 text-block badge rounded-pill text-bg-warning">
                    LKR {item.price}
                  </span>
                </div>
                <div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item.itemId)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
