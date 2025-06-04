import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const Home = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await api.get('/profile');
                setUser(response.data);
            } catch (error) {
                console.error("Failed to fetch user profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) {
        return <div className="text-center py-[200px]">Loading user data...</div>;
    }

    return (
        <div>
            <h1 className='text-center font-bold text-3xl py-[200px]'>
                {user ? `Welcome, ${user.username}` : 'User is not defined'}
            </h1>
          
        </div>
    );
};

export default Home;