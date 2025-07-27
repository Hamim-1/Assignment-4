import { useNavigate, useParams } from "react-router";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import { useGetSingleBookQuery, useUpdateBookMutation } from "@/redux/api/baseApi";
import { useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";

const EditBookModal = () => {
    const navigate = useNavigate();
    const { id = '' } = useParams();
    const { data, isLoading, error } = useGetSingleBookQuery(id);
    const [inputError, setInputError] = useState('');
    const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        genre: "",
        isbn: "",
        description: "",
        copies: "",
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

    const hasEmptyFields = () => {
        const isTitleEmty = formData.title.trim().length < 1;
        const isAuthorEmty = formData.author.trim().length < 1;
        const isIsbnEmty = formData.isbn.trim().length < 1;
        if (isAuthorEmty || (isIsbnEmty || isTitleEmty)) {
            setInputError('Field cannot be empty or spaces only.');
            return true;
        };
        setInputError('');
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!hasEmptyFields()) {
            try {
                await updateBook({ id, book: formData }).unwrap();
                toast.success('Book updated successfully');
                navigate(-1);
            } catch (error) {
                navigate(-1)
                toast.error('Update failed');
            }
        }



    };
    const closeModal = () => {
        navigate(-1);
    };
    useEffect(() => {
        if (data?.data) {
            setFormData({
                title: data.data.title,
                author: data.data.author,
                genre: data.data.genre,
                isbn: data.data.isbn,
                description: data.data.description,
                copies: data.data.copies,
                available: data.data.available,
            });
        }
    }, [data]);

    if (error) return <ErrorMessage error={error} />

    return (
        <>

            <div>

                <div
                    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center"
                >
                    {
                        isLoading || isUpdating ?
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
                                <h2 className="text-xl font-semibold mb-4">Edit Book</h2>

                                <form className="space-y-4" onSubmit={handleSubmit}>

                                    {
                                        inputError && <p className="text-red-500">{inputError}</p>
                                    }
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
                                        value={formData.copies}
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
                                        Update Book
                                    </button>
                                </form>
                            </div>
                    }
                </div>
            </div>
        </>
    );
};

export default EditBookModal;
