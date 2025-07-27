import { useGetSingleBookQuery } from "@/redux/api/baseApi";
import { useParams } from "react-router";

const SingleBookView = () => {
    const { id = '' } = useParams<{ id: string }>();

    const { data, isLoading, error } = useGetSingleBookQuery(id);
    if (isLoading)
        return (
            <div className="flex items-center justify-center min-h-[80vh] bg-transparent">
                <div className="w-12 h-12 border-4 border-t-transparent border-purple-500 rounded-full animate-spin"></div>
            </div>

        );
    if (error) {
        const errMsg =
            (error as any)?.data?.message ||
            (error as any)?.message ||
            'Something went wrong!';

        return (
            <div className="flex items-center justify-center min-h-[80vh]">
                <p className="text-red-500 text-2xl">{errMsg}</p>
            </div>
        );
    }
    const book = data.data;

    return (
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row bg-[#1a0d1f] text-white md:rounded-xl overflow-hidden border border-gray-700 shadow-lg my-16 sm:my-44">
            <div className="flex h-72 sm:h-96 mx-auto sm:mx-0 mt-5 sm:mt-0">
                <img src="/book.png" className="rounded-md sm:rounded-none" alt="Book Cover" />
            </div>


            <div className="p-6 flex-1 space-y-4">
                <div>
                    <h2 className="text-3xl font-bold mb-1">{book.title}</h2>
                    <p className="text-gray-400 text-sm mb-2">by {book.author}</p>
                </div>

                <div className="grid grid-cols-2 gap-x-3 gap-y-5 text-md pt-5">
                    <p><span className="text-gray-400">Genre:</span> {book.genre}</p>
                    <p><span className="text-gray-400">ISBN:</span> {book.isbn || "N/A"}</p>
                    <p><span className="text-gray-400">Copies:</span> {book.copies}</p>
                    <p><span className="text-gray-400">Status:</span> {book.copies > 0 ? <span className="text-green-400">Available</span> : <span className="text-red-400">Unavailable</span>}</p>
                </div>

                <button className="my-10 border border-white/50 rounded-md px-5 py-2.5">Read Sample</button>
            </div>
        </div>

    );
};

export default SingleBookView;
