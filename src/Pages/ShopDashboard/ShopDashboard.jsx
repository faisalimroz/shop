import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const ShopDashboard = () => {
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyShopAccess = async () => {
      try {
    
        const shopName = window.location.hostname.split('.').length > 2 ? hostParts[0] : null;
        
        if (!shopName) {
          throw new Error('Invalid shop URL');
        }

        const { data } = await api.get(`/verify-shop?shop=${shopName}`);
        setShop(data.shop);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to verify shop access');
       
      } finally {
        setLoading(false);
      }
    };

    verifyShopAccess();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4">Verifying shop access...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">This is {shop} shop</h1>
 
    </div>
  );
};

export default ShopDashboard;