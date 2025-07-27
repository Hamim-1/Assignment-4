const Footer = () => {
    return (
        <footer className="w-full border-t py-6 mt-10 absolute bottom-0 left-0 ">
            <div className="max-w-screen-xl mx-auto px-4 text-center text-sm">
                <p>&copy; {new Date().getFullYear()} Minimal Library System. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
