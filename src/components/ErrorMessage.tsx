interface ErrorMessageProps {
    error: unknown;
}

const ErrorMessage = ({ error }: ErrorMessageProps) => {
    const errMsg =
        (error as any)?.data?.message ||
        (error as any)?.message ||
        "Something went wrong!";

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <p className="text-red-500 text-2xl">{errMsg}</p>
        </div>
    );
};

export default ErrorMessage;
