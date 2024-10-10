import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'

const Navbar = () => {
    return (
        <nav className="bg-blue-500 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">

                <ul className="flex gap-4">
                    <li>
                        <Link to="/" className="flex flex-col items-center">
                            <img src="https://via.placeholder.com/100/34495e/ffffff?text=All" alt="All Products" className="h-10 mb-1" />
                            All Products
                        </Link>
                    </li>
                    <li>
                        <Link to="/category/men's clothing" className="flex flex-col items-center">
                            <img src="https://via.placeholder.com/100/3498db/ffffff?text=Men" alt="Men's Clothing" className="h-10 mb-1" />
                            Men's Clothing
                        </Link>
                    </li>
                    <li>
                        <Link to="/category/women's clothing" className="flex flex-col items-center">
                            <img src="https://via.placeholder.com/100/e74c3c/ffffff?text=Women" alt="Women's Clothing" className="h-10 mb-1" />
                            Women's Clothing
                        </Link>
                    </li>
                    <li>
                        <Link to="/category/jewelery" className="flex flex-col items-center">
                            <img src="https://via.placeholder.com/100/9b59b6/ffffff?text=Jewelry" alt="Jewelry" className="h-10 mb-1" />
                            Jewelry
                        </Link>
                    </li>
                    <li>
                        <Link to="/category/electronics" className="flex flex-col items-center">
                            <img src="https://via.placeholder.com/100/2ecc71/ffffff?text=Electronics" alt="Electronics" className="h-10 mb-1" />
                            Electronics
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
