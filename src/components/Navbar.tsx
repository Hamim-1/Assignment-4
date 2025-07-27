import { Link } from 'react-router';
import { FaBarsStaggered } from "react-icons/fa6";
import { useState } from 'react';
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="flex justify-between items-center  py-8 container">
            <Link to='/' className="text-xl font-bold italic">Library <span className="text-red-500">Management</span> </Link>

            <div className="md:flex items-center space-x-5 hidden ">
                <Link className="border border-white/30 px-3.5 duration-150 py-1.5 rounded-md hover:text-red-500" to='/books'>All Book</Link>
                <Link className="border border-white/30 px-3.5 duration-150 py-1.5 rounded-md hover:text-red-500" to='/create-book'>Add Book</Link>
                <Link className="border border-white/30 px-3.5 duration-150 py-1.5 rounded-md hover:text-red-500" to='/borrow-summary'>Borrow Summary</Link>
            </div>

            <div className='relative md:hidden'>

                <FaBarsStaggered className='md:hidden text-2xl cursor-pointer hover:text-red-500 duration-150 relative' onClick={() => setIsOpen(!isOpen)} />

                <div className={`absolute  bg-[#0d0b19] border right-0 top-10 z-10 px-5 py-3 duration-200 origin-top-right rounded-md ${isOpen ? 'scale-100' : 'scale-0'}`}>

                    <div className="flex flex-col space-y-5 w-40">
                        <Link className="border border-white/30 px-3.5 duration-150 py-1.5 rounded-md hover:text-red-500 w-fit" to='/books' onClick={() => setIsOpen(false)}>All Book</Link>
                        <Link className="border border-white/30 px-3.5 duration-150 py-1.5 rounded-md hover:text-red-500 w-fit" to='/create-book' onClick={() => setIsOpen(false)}>Add Book</Link>
                        <Link className="border border-white/30 px-3.5 duration-150 py-1.5 rounded-md hover:text-red-500 w-fit" to='/borrow-summary' onClick={() => setIsOpen(false)}>Borrow Summary</Link>
                    </div>

                </div>
            </div>




        </div>

    );
};

export default Navbar;