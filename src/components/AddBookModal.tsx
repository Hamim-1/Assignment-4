
import { useCreateBookMutation } from "@/redux/api/baseApi";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router";
import toast from 'react-hot-toast';


const AddBookModal = () => {
    const navigate = useNavigate();
    const [createBook, { isLoading }] = useCreateBookMutation();
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        genre: "",
        isbn: "",
        description: "",
        copies: 0,
        available: true,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {

        const { name, value, type } = e.target;

        const parsedValue = type === "number" ? Number(value) : value;

        setFormData({
            ...formData,
            [name]: parsedValue,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const bookData = {
            ...formData,
            available: formData.copies > 0,
        };
        try {
            await createBook(bookData).unwrap();
            navigate('/books');
            toast.success('Book added successfully!');
        } catch (error: unknown) {
            const errMsg =
                (error as any)?.data?.message ||
                (error as any)?.message ||
                "Something went wrong!";
            navigate(-1)
            toast.error(errMsg);
        }


    };

    const closeModal = () => {
        navigate(-1);
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
                            className="bg-[#1c1c1c] text-black dark:text-white rounded-xl shadow-lg w-full max-w-md p-6 relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={closeModal}
                                className="absolute top-2 right-2 text-xl text-gray-500 hover:text-white"
                            >
                                <IoClose />
                            </button>
                            <h2 className="text-xl font-semibold mb-4">Add Book</h2>

                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Title"
                                    className="w-full px-4 py-2 border rounded-md bg-transparent text-white"
                                    required
                                />
                                <input
                                    type="text"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleChange}
                                    placeholder="Author"
                                    className="w-full px-4 py-2 border rounded-md bg-transparent text-white"
                                    required
                                />
                                <select
                                    name="genre"
                                    value={formData.genre}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-md bg-[#1c1c1c] text-white/50"
                                    required
                                >
                                    <option value="" disabled>Select Genre</option>
                                    <option value="FICTION">FICTION</option>
                                    <option value="NON_FICTION">NON_FICTION</option>
                                    <option value="SCIENCE">SCIENCE</option>
                                    <option value="HISTORY">HISTORY</option>
                                    <option value="BIOGRAPHY">BIOGRAPHY</option>
                                    <option value="FANTASY">FANTASY</option>
                                </select>
                                <input
                                    type="text"
                                    name="isbn"
                                    value={formData.isbn}
                                    onChange={handleChange}
                                    placeholder="ISBN"
                                    className="w-full px-4 py-2 border rounded-md bg-transparent text-white"
                                    required
                                />
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Description (optional)"
                                    className="w-full px-4 py-2 border rounded-md bg-transparent text-white"
                                    rows={3}
                                />
                                <input
                                    type="number"
                                    name="copies"
                                    value={formData.copies === 0 ? "" : formData.copies}
                                    onChange={handleChange}
                                    placeholder="Copies"
                                    min={1}
                                    className="w-full px-4 py-2 border rounded-md bg-transparent text-white"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-purple-600 text-white py-2 rounded-md cursor-pointer"
                                >
                                    Add Book
                                </button>
                            </form>
                        </div>
                }
            </div>
        </div>
    );
};

export default AddBookModal;
