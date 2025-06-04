
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '../Components/Navbar';
import Footer from '../Components/Footer';

const Layout = () => {
    const location = useLocation();
    const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup';

    return (
        <div>
            {!isAuthPage && <NavBar />}
            <div className='min-h-screen'>
                <Outlet />
            </div>
            {!isAuthPage && <Footer />}
        </div>
    );
};

export default Layout;