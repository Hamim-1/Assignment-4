import BookCard from "@/components/BookCard";
import ErrorMessage from "@/components/ErrorMessage";
import { useGetLimitedBookQuery } from "@/redux/api/baseApi";
import type { IBook } from "@/types/type";
import { Link } from "react-router";
const Home = () => {
    const { data, isLoading, error } = useGetLimitedBookQuery(4);

    if (error) return <ErrorMessage error={error} />

    return (
        <>
            <div className='flex flex-col container pb-32'>
                <div className="my-20 h-[500px] bg-[url('/bg.jpg')] bg-cover bg-center relative rounded-lg">
                    <div className="absolute top-0 left-0 h-full w-full bg-black/70 flex flex-col space-y-10 justify-center items-center">
                        <h2 className="text-3xl sm:text-4xl font-semibold text-center"> <span className="text-red-500">Wellcome to</span> our online Book Library</h2>

                        <Link to='/books' className="text-lg hover:text-red-500 hover:tracking-wider border rounded-lg px-5 py-2 duration-200 cursor-pointer border-white/50">Explore All Books</Link>
                    </div>
                </div>

                <div className="flex flex-col space-y-10">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg md:text-2xl">Discover Your Next Book</h3>
                        <Link className="border border-white/30 px-3.5 duration-150 py-1.5 rounded-md hover:text-red-500" to='/books'>View All</Link>
                    </div>

                    {
                        isLoading
                            ?
                            <div className="flex items-center justify-center min-h-[50vh] bg-transparent">
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
            </div>
        </>
    );
};

export default Home;