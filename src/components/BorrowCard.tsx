import type { IBorrowedBook } from "@/types/type";
import { IoBookOutline } from "react-icons/io5";

interface IProps {
    data: IBorrowedBook
}

const BorrowedCard = ({ data }: IProps) => {
    return (
        <div className="bg-[#120d1a] rounded-lg p-4 shadow-md flex flex-col items-start text-white mx-auto w-full max-w-sm gap-3">
            <div className="text-6xl mt-1 mx-auto">
                <IoBookOutline />
            </div>

            <div>
                <h3 className="text-xl font-semibold">{data.book.title}</h3>
                <p className="text-sm text-gray-400">ISBN: {data.book.isbn}</p>
                <p className="text-sm text-purple-300 font-semibold mt-2">
                    Total Borrowed: {data.totalQuantity}
                </p>
            </div>
        </div>
    );
};

export default BorrowedCard;
