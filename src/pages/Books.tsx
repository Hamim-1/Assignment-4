import BookCard from "@/components/BookCard";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import type { IBook } from './../types/type';
import ErrorMessage from "@/components/ErrorMessage";


const Books = () => {
    const { data, isLoading, error } = useGetBooksQuery(undefined);
    console.log(error);

    if (error) {
        return <ErrorMessage error={error} />
    }
    return (
        <div className="container pb-32">
            <div className="mb-6 text-center pt-14 pb-5">
                <h2 className="text-3xl font-bold text-white">Explore Our Library</h2>
                <p className="text-gray-400 mt-1">
                    Discover all available books in the system
                </p>
            </div>

            {
                isLoading
                    ?
                    <div className="flex items-center justify-center min-h-[60vh] bg-transparent">
                        <div className="w-12 h-12 border-4 border-t-transparent border-purple-500 rounded-full animate-spin"></div>
                    </div>
                    :


                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {
                            data.data.map((book: IBook) => (
                                <BookCard book={book} key={book._id} />
                            ))
                        }
                    </div>
            }

        </div>
    );
};

export default Books;