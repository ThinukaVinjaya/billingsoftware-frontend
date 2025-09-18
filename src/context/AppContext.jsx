import React, { createContext, useEffect, useState } from 'react';
import { fetchCategories } from '../Service/CategoryService';
import { fetchItems } from '../Service/ItemService';
import toast from 'react-hot-toast'; // optional: feedback on errors

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {
  const [categories, setCategories] = useState([]);
  const [itemsData, setItemsData] = useState([]);
  const [auth, setAuth] = useState({ token: null, role: null });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [response, itemResponse] = await Promise.all([
          fetchCategories(),
          fetchItems(),
        ]);

        setCategories(response.data);
        setItemsData(itemResponse.data);
      } catch (error) {
        console.error(error);
        toast.error('Unable to load initial data');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const setAuthData = (token, role) => {
    setAuth({ token, role });
  };

  const contextValue = {
    categories,
    setCategories,
    auth,
    setAuthData,
    itemsData,
    setItemsData,
    loading,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};
