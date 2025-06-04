import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchShops = async () => {
            try {
                const response = await api.get('/profile');
                setShops(response.data.shops || []);
            } catch (error) {
                console.error("Failed to fetch shops:", error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchShops();
    }, []);
 
    const handleLogout = async () => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out of your account.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        });

        if (result.isConfirmed) {
            try {
                await api.post('/logout');
                navigate('/signin');
            } catch (error) {
                Swal.fire({
                    title: "Error!",
                    text: error.response?.data?.message || "Logout failed",
                    icon: "error"
                });
            }
        }
    };

    const handleShopClick = (shopName) => {
     
        api.get(`/verify-shop?shop=${shopName}`)
          .then(() => {
           
            window.location.href = `http://${shopName}.localhost:5173/shop-dashboard`;
          })
          .catch(error => {
            console.error("Access Denied:", error.response?.data?.message || "You don't have access to this shop");
          });
      };

    return (
        <div>
            <div className="navbar bg-blue-400 shadow-sm">
                <div className="flex-1">
                    <a className="btn btn-ghost text-2xl text-white italic">Shop</a>
                </div>
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://i.ibb.co/dwNncf18/image.png" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                       
                            <li className="menu-title">
                                <span>My Shops</span>
                            </li>
                            
                  
                            {loading && (
                                <li>
                                    <span className="text-sm text-gray-500">Loading shops...</span>
                                </li>
                            )}
                            
                     
                            {!loading && shops.length === 0 && (
                                <li>
                                    <span className="text-sm text-gray-500">No shops available</span>
                                </li>
                            )}
                            
                    
                            {shops.map((shop, index) => (
                                <li key={index}>
                                    <a onClick={() => handleShopClick(shop)}>
                                        {shop}
                                    </a>
                                </li>
                            ))}
                            
               
                            <li><hr className="my-1" /></li>
                         
                            <li>
                                <a onClick={handleLogout}>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;