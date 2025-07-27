import BorrowedCard from "@/components/BorrowCard";
import ErrorMessage from "@/components/ErrorMessage";
import { useGetBorrowedSummaryQuery } from "@/redux/api/baseApi";
import type { IBorrowedBook } from "@/types/type";

const BorrowedBooks = () => {
    const { data, isLoading, error } = useGetBorrowedSummaryQuery(undefined);
    if (error) return <ErrorMessage error={error} />

    return (
        <div className="flex flex-col space-y-10 pb-32 pt-10">
            <div>
                <h1 className="text-3xl font-bold text-center text-white mb-2">
                    Borrowed Books Summary
                </h1>
                <p className="text-gray-400 text-center">
                    A list of all books that have been borrowed from the library so far.
                </p>

            </div>
            {
                isLoading
                    ?
                    <div className="flex items-center justify-center min-h-[60vh] bg-transparent">
                        <div className="w-12 h-12 border-4 border-t-transparent border-purple-500 rounded-full animate-spin"></div>
                    </div>
                    :
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5 container">
                        {
                            data.data.map((borrowedBook: IBorrowedBook, i: number) => (
                                <BorrowedCard key={i} data={borrowedBook} />
                            ))
                        }
                    </div>
            }
        </div>
    );
};

export default BorrowedBooks;