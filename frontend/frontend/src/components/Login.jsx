import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../features/user/userApi"
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector(state => state.user);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        const loginStatus = await dispatch(loginUser({
            username,
            password
        }))

        console.log("login reached")

        if (loginStatus.payload.success) navigate('/');

        console.log(loginStatus);

    }

    return (
        <div className="flex justify-between h-screen bg-[#F8F8F8] font-poppins text-black">
            <div className="grid grid-cols-3">
                <div className="col-span-2 flex justify-center">
                    <div className="container mx-auto flex max-w-xl flex-col  justify-center">
                        <div className="flex flex-col my-4 justify-center items-center text-left">
                            <h1 className="text-[34px] text-[#181818]">Welcome back</h1>
                            <h1 className="text-[14px] text-[#636364] ">
                                Welcome back! Please enter your details.
                            </h1>
                        </div>
                        <div>
                            <div className="my-3 flex  w-full flex-col text-[14px]">
                                <label htmlFor="email" className="text-left text-[#181818] ">
                                    Username :
                                </label>
                                <input
                                    onChange={(e) => setUsername(e.target.value)}
                                    id="username"
                                    placeholder="Enter your username"
                                    type="text"
                                    className="  rounded-xl border  border-[#C4C4C4] p-2 text-[#636364]"
                                />
                            </div>
                            <div className="my-3 flex   flex-col text-[14px]">
                                <label htmlFor="password" className="text-left text-[#181818] ">
                                    Password
                                </label>
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    id="password"
                                    placeholder="Enter your password"
                                    type="password"
                                    className=" rounded-xl border   border-[#C4C4C4] p-2 text-[#636364]"
                                />
                            </div>
                            <div className="grid grid-cols-2  ">

                            </div>
                        </div>
                        <div className="text-sm flex justify-center text-blue-500 p-0.5">
                            <Link to="/signup">don't have an account?</Link>
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="my-5 w-full rounded-xl bg-[#EA454C] py-2 text-white" >
                            Sign in
                        </button>
                    </div>

                </div>


                <div className="col-span-1">
                    <div className="h-screen">
                        <img
                            src="/right-side_ib7d7a.jpg"
                            loading="lazy"
                            width="600"
                            // height="600"
                            className="h-screen w-full"
                            alt="hero section"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
