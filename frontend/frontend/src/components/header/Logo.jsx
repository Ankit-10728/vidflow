import { Link } from "react-router-dom";

function Logo() {
    return (
        <Link
            to="/"
            className="w-15 h-15 rounded-full overflow-hidden border-2 border-gray-300 flex items-center justify-center"
        >
            <img src="/logo01.jpg" alt="/logo02.jpg" className="w-full h-full object-cover" />
        </Link>
    );
}


export default Logo