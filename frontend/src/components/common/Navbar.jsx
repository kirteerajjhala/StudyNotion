import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { NavbarLinks } from "../../../data/navbar-links";
import studyNotionLogo from '../../assets/Logo/Logo-Full-Light.png';
import { apiConnector } from '../../services/apiConnector';
import { categories } from '../../services/api';

import ProfileDropDown from '../core/Auth/ProfileDropDown';
import MobileProfileDropDown from '../core/Auth/MobileProfileDropDown';

import { AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";

const Navbar = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);
    const location = useLocation();

    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false);

    const [showNavbar, setShowNavbar] = useState('top');
    const [lastScrollY, setLastScrollY] = useState(0);

    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY) setShowNavbar('hide');
            else setShowNavbar('show');
        } else setShowNavbar('top');
        setLastScrollY(window.scrollY);
    }

    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);
        return () => window.removeEventListener('scroll', controlNavbar);
    }, [lastScrollY]);

    const fetchSublinks = async () => {
        try {
            setLoading(true);
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            setSubLinks(result.data.data);
        } catch (error) {
            console.log("Could not fetch categories", error);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchSublinks();
    }, []);

    const matchRoute = (route) => {
        if (!route) return false;
        const pathname = location.pathname;
        const match = route.includes(':')
            ? pathname.startsWith(route.split('/:')[0])
            : pathname === route;
        return match;
    }

    return (
        <nav className={`fixed top-0 z-50 w-full bg-gray-900 transition-transform duration-300 shadow-md ${showNavbar === 'hide' ? '-translate-y-full' : 'translate-y-0'}`}>
            <div className='flex w-11/12 max-w-7xl mx-auto items-center  justify-between h-16'>

                {/* Logo */}
                <Link to="/">
                    <img src={studyNotionLogo} alt="Logo" className="w-28 sm:w-40 h-auto" />
                </Link>

                {/* Desktop Links */}
                <div className='hidden sm:flex items-center gap-6'>
                    <ul className='flex gap-x-6 text-gray-300 items-center'>
                        {NavbarLinks.map((link, index) => (
                            <li key={index} className="relative">
                                {link.title === "Catalog" ? (
                                    <div className={`group flex items-center gap-1 cursor-pointer px-3 py-1 rounded-md transition-colors duration-200 ${matchRoute("/catalog/:catalogName") ? 'bg-yellow-400 text-gray-900' : 'hover:bg-gray-700'}`}>
                                        <p>{link.title}</p>
                                        <MdKeyboardArrowDown />
                                        <div className="invisible absolute left-1/2 top-full z-50 mt-2 w-56 -translate-x-1/2 flex-col rounded-md bg-gray-100 p-4 text-gray-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-hover:translate-y-1">
                                            {loading ? (
                                                <p className="text-center">Loading...</p>
                                            ) : subLinks.length ? (
                                                subLinks.map((subLink, i) => (
                                                    <Link
                                                        to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                                                        className="block py-2 px-3 rounded hover:bg-gray-200"
                                                        key={i}
                                                    >
                                                        {subLink.name}
                                                    </Link>
                                                ))
                                            ) : (
                                                <p className="text-center">No Courses Found</p>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <Link to={link.path || '#'}>
                                        <p className={`px-3 py-1 rounded-md transition-colors duration-200 ${matchRoute(link.path) ? 'bg-yellow-400 text-gray-900' : 'hover:bg-gray-700 hover:text-white'}`}>
                                            {link.title}
                                        </p>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>

                  
                </div>

<div>
      {/* Desktop Login/Signup */}
                    {!token && (
                        <div className='flex gap-3'>
                            <Link to="/login">
                                <button className={`px-3 py-1 rounded-md border ${matchRoute('/login') ? 'border-yellow-400 bg-yellow-400 text-gray-900' : 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white'} transition-colors duration-200`}>
                                    Log In
                                </button>
                            </Link>
                            <Link to="/signup">
                                <button className={`px-3 py-1 rounded-md border ${matchRoute('/signup') ? 'border-yellow-400 bg-yellow-400 text-gray-900' : 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white'} transition-colors duration-200`}>
                                    Sign Up
                                </button>
                            </Link>
                        </div>
                    )}
</div>
                {/* Right Side Mobile */}
                <div className='flex items-center gap-4 sm:hidden'>
                    {user && user.accountType === "Student" && (
                        <Link to="/dashboard/cart" className="relative">
                            <AiOutlineShoppingCart className="text-2xl text-gray-300 hover:text-yellow-400 transition-colors duration-200" />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-2.5 grid size-4 place-items-center rounded-full bg-yellow-400 text-xs font-bold text-gray-900">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    )}

                    {token && <ProfileDropDown />}
                    {token && <MobileProfileDropDown />}

                    <button className="text-gray-300" onClick={() => setMobileMenuOpen(prev => !prev)}>
                        <AiOutlineMenu size={24} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <ul className='sm:hidden bg-gray-800 text-gray-200 flex flex-col gap-2 p-4'>
                    {NavbarLinks.map((link, index) => (
                        <li key={index}>
                            {link.title === "Catalog" ? (
                                <>
                                    <div
                                        onClick={() => setMobileCatalogOpen(prev => !prev)}
                                        className={`flex justify-between items-center px-3 py-2 rounded-md cursor-pointer ${mobileCatalogOpen ? 'bg-yellow-400 text-gray-900' : 'hover:bg-gray-700'}`}
                                    >
                                        <span>{link.title}</span>
                                        <MdKeyboardArrowDown className={`transition-transform ${mobileCatalogOpen ? 'rotate-180' : ''}`} />
                                    </div>
                                    {mobileCatalogOpen && (
                                        <div className="flex flex-col pl-4 mt-2">
                                            {loading ? (
                                                <p className="text-gray-300 py-2">Loading...</p>
                                            ) : subLinks.length ? (
                                                subLinks.map((subLink, i) => (
                                                    <Link
                                                        to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                                                        key={i}
                                                        className="py-2 px-2 rounded hover:bg-gray-700"
                                                        onClick={() => setMobileMenuOpen(false)}
                                                    >
                                                        {subLink.name}
                                                    </Link>
                                                ))
                                            ) : (
                                                <p className="text-gray-300 py-2">No Courses Found</p>
                                            )}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <Link to={link.path || '#'} onClick={() => setMobileMenuOpen(false)}>
                                    <p className={`px-3 py-2 rounded-md ${matchRoute(link.path) ? 'bg-yellow-400 text-gray-900' : 'hover:bg-gray-700'}`}>
                                        {link.title}
                                    </p>
                                </Link>
                            )}
                        </li>
                    ))}

                    {/* Mobile Login/Signup */}
                    {!token && (
                        <div className="mt-2 flex flex-col gap-2">
                            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                                <button className="w-full px-3 py-2 rounded-md border border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">
                                    Log In
                                </button>
                            </Link>
                            <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                                <button className="w-full px-3 py-2 rounded-md border border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">
                                    Sign Up
                                </button>
                            </Link>
                        </div>
                    )}
                </ul>
            )}
        </nav>
    );
}

export default Navbar;
