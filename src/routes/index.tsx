import App from "@/App";

import { createBrowserRouter } from "react-router";
import Home from "@/pages/Home";
import Books from "@/pages/Books";
import EditBookModal from "@/components/EditBookModal";
import BorrowModal from "@/components/BorrowModal";
import SingleBookView from "@/components/SingleBook";
import BorrowedBooks from "@/pages/BorrowedBooks";
import AddBookModal from "@/components/AddBookModal";
import NotFound from "@/components/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "/books",
                Component: Books,
            },
            {
                path: "/create-book",
                Component: AddBookModal,
            },
            {
                path: "/books/:id",
                Component: SingleBookView,
            },
            {
                path: "/borrow-summary",
                Component: BorrowedBooks,
            },
            {
                path: '/edit-book/:id',
                Component: EditBookModal
            },
            {
                path: "/borrow/:bookId",
                Component: BorrowModal,
            }
        ]
    },
    {
        path: '*',
        Component: NotFound
    }

])

export default router;