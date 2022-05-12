import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
function Layout({ children }) {
    return (
        <div>
            <Topbar />
            <div className="container">
                <Sidebar />
                {children}
            </div>
        </div>
    );
}

export default Layout;