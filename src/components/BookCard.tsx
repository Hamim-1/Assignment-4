import { CiEdit } from 'react-icons/ci'
import { AiOutlineDelete } from "react-icons/ai";
import { IoBookOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router';
import { useState } from 'react';
import { useDeleteBookMutation } from '@/redux/api/baseApi';
import toast from 'react-hot-toast';
import type { IBook } from '@/types/type';

type IProps = {
    book: IBook
}

const BookCard = ({ book }: IProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteBook, { isLoading }] = useDeleteBookMutation();
    const openEditModal = (bookId: string) => {

        navigate(`/edit-book/${bookId}`);
    };

    const openBorrowModal = (bookId: string) => {

        navigate(`/borrow/${bookId}`, {
            state: { from: location.pathname },
        })
    }

    const handleDelete = async () => {
        try {
            await deleteBook(book._id).unwrap();
            setIsDeleteModalOpen(false);
            toast.success('Book deleted successfully!')

        } catch (error: unknown) {
            navigate(-1)
            const errMsg =
                (error as any)?.data?.message ||
                (error as any)?.message ||
                "Something went wrong!";
            toast.error(errMsg);
        }
    }
    if (isLoading) return (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-black/60 backdrop-blur-sm z-50">
            <div className="w-12 h-12 border-4 border-t-transparent border-purple-500 rounded-full animate-spin"></div>
        </div>
    )
    return (
        <>
            <div
                className="rounded-2xl p-6 bg-[#120d1a] text-white shadow-md w-full max-w-md flex flex-col gap-4 justify-between mx-auto sm:mx-0"
            >
                <IoBookOutline className="text-9xl mx-auto" />
                <div className='w-full'>
                    <h2 className="text-xl font-bold mb-1 hover:underline hover:text-blue-500 duration-150"><Link to={`/books/${book._id}`}>{book.title}</Link></h2>
                    <p className="text-sm text-gray-300">Author: <span className="font-medium">{book.author}</span></p>
                    <p className="text-sm text-gray-300">Genre: <span className="font-medium">{book.genre}</span></p>
                    <p className="text-sm text-gray-300">ISBN: <span className="font-medium">{book.isbn}</span></p>
                    <p className="text-sm text-gray-300">Copies: <span className="font-medium">{book.copies}</span></p>
                    <p className={`text-sm font-semibold mt-2 ${book.available ? "text-green-400" : "text-red-400"}`}>
                        {book.available ? "Available" : "Unavailable"}
                    </p>
                    <div className='flex justify-between items-center mt-4'>
                        <button className={`bg-blue-500 px-5 py-2 rounded-md font-semibold ${book.available ? 'cursor-pointer hover:underline' : 'cursor-not-allowed'}`} onClick={() => openBorrowModal(book._id)}>
                            {/* <Link to={`/borrow/${book._id}`}>Borrow</Link> */}
                            Borrow
                        </button>
                        <div className="flex space-x-3 text-xl">
                            <Link to={`/books/${book._id}`} className="p-2 cursor-pointer border rounded-md hover:text-blue-500 duration-200">
                                <IoEyeOutline />
                            </Link>
                            <button onClick={() => openEditModal(book._id)} className="p-2 cursor-pointer border rounded-md hover:text-green-400 duration-200">
                                <CiEdit />
                            </button>
                            <button onClick={() => setIsDeleteModalOpen(true)} className="p-2 cursor-pointer border rounded-md hover:text-red-700 duration-200">
                                <AiOutlineDelete />
                            </button>


                        </div>
                    </div>
                </div>
            </div>
            {
                isDeleteModalOpen && <div className='fixed inset-0 z-50 bg-black/50 flex items-center justify-center'>

                    <div className="bg-[#1c1c1c] text-white p-6 rounded-xl w-full max-w-sm shadow-lg text-center">
                        <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
                        <p className="text-sm text-gray-400 mb-6">This will permanently delete the book from the library.</p>

                        <div className="flex gap-5 justify-end">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="cursor-pointer px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="cursor-pointer px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default BookCard;


