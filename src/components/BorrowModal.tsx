import { useBorrowBookMutation } from "@/redux/api/baseApi";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { useNavigate, useParams } from "react-router";

const BorrowModal = () => {
    const navigate = useNavigate();
    const { bookId } = useParams();
    const [formData, setFormData] = useState({
        book: '',
        quantity: 1,
        dueDate: ''
    })
    const [borrowBook, { isLoading }] = useBorrowBookMutation();
    const closeModal = () => {
        navigate(-1)
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const bookData = {
            ...formData,
            book: bookId
        }

        try {
            await borrowBook(bookData).unwrap()
            navigate('/borrow-summary');
            toast.success("Book borrowed succesfully")
        } catch (error: unknown) {
            navigate(-1);
            const errMsg =
                (error as any)?.data?.message ||
                (error as any)?.message ||
                "Something went wrong!";
            toast.error(errMsg)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {

        const { name, value, type } = e.target;

        const parsedValue = type === "number" ? Number(value) : value;
        console.log(parsedValue);

        setFormData({
            ...formData,
            [name]: parsedValue,
        });
    };
    return (
        <div>
            <div
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center"
                onClick={closeModal}
            >
                {
                    isLoading ?
                        <div className="w-12 h-12 border-4 border-t-transparent border-purple-500 rounded-full animate-spin"></div>
                        :
                        <div
                            className="bg-white dark:bg-[#1c1c1c] text-black dark:text-white rounded-xl shadow-lg w-full max-w-md p-6 relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={closeModal}
                                className="absolute top-2 right-2 text-xl text-gray-500 hover:text-white"
                            >
                                <IoClose />
                            </button>
                            <h2 className="text-xl font-semibold mb-4">Borrow Book</h2>
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <input
                                    value={formData.quantity}
                                    type="number"
                                    name="quantity"
                                    onChange={handleChange}
                                    min={1}
                                    required
                                    placeholder="Copies"
                                    className="w-full px-4 py-2 border rounded-md bg-transparent text-white"
                                />
                                <input
                                    value={formData.dueDate}
                                    type="date"
                                    name="dueDate"
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border rounded-md bg-transparent text-white scheme-dark"
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-purple-600 text-white py-2 rounded-md cursor-pointer"
                                >
                                    Borrow
                                </button>
                            </form>
                        </div>
                }
            </div>
        </div>
    );
};

export default BorrowModal;