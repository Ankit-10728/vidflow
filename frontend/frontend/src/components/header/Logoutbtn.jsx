import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logoutUser } from "../../features/user/userApi"

function LogoutBtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        const data = await dispatch(logoutUser());
        console.log(data);
        if (data.payload.success) navigate('/');
    }

    return (
        <button
            className='inline-flex items-center gap-2 px-6 py-2 duration-200 hover:bg-gray-700 rounded-full'
            onClick={logoutHandler}
        >

            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
            </svg>

            Logout
        </button>
    )
}

export default LogoutBtn