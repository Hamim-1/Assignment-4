export interface IBook {
    _id: string,
    title: string,
    author: string,
    genre: 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY',
    isbn: string,
    description: string,
    copies: number,
    available: boolean,
}
export interface IError {
    message: string;
    success: boolean;
    error: any
}

export interface IBorrowedBook {
    book: {
        title: string;
        isbn: string
    };
    totalQuantity: number
}