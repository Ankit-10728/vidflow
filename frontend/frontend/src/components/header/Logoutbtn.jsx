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
            className='inline-block px-6 py-2 duration-200 hover:bg-gray-700 rounded-full'
            onClick={logoutHandler}
        >
            Logout
        </button>
    )
}

export default LogoutBtn