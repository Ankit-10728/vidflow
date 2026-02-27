import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser, registerUser } from "../features/user/userApi";

function LoginTest() {
    const dispatch = useDispatch();
    const { loading, error, user } = useSelector(state => state.user);

    const handleLogin = () => {
        dispatch(loginUser({
            username: "rishi",
            password: "12345678"
        }));
    };

    const handleLogout = () => {
        dispatch(logoutUser());
    };
    console.log(user);

    return (
        <div>

            <div>
                {user ? " Logged in welocome " : " plz log in"}
            </div>
            <button onClick={handleLogin}>
                {user ? " " : "Login"}
            </button>



            <button onClick={handleLogout}>
                {user ? "logout" : ""}
            </button>

            {error && <p>{error.message}</p>}
        </div>
    );
}

export { LoginTest }

