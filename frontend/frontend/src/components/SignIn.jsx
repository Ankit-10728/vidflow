import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form"
import { Input, FileInput } from "./index.js"
import { registerUser } from "../features/user/userApi.js"
export default function Signin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector(state => state.user);
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");


    const { handleSubmit, getValues, register, watch, setValue, reset, control } = useForm({
        defaultValues: {
            email: "",
            password: "",
            username: "",
            fullname: ""
        }
    })

    const submit = async (data) => {
        const formData = new FormData()

        formData.append("username", data.username)
        formData.append("email", data.email)
        formData.append("fullname", data.fullname)
        formData.append("password", data.password)
        formData.append("avatar", data.avatar[0])
        formData.append("coverImage", data.coverImage[0])

        try {
            const response = await dispatch(registerUser(formData)).unwrap()
            reset();
            navigate("/login")
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div >
            <form onSubmit={handleSubmit(submit)} className="flex">

                <div className="flex justify-between bg-[#F8F8F8] h-full font-poppins text-black">
                    <div className="grid grid-cols-3 w-screen">

                        <div className="col-span-1">
                            <img

                                src="/Nike _ App Illustrations.jpg"
                                loading="lazy"
                                width="600"
                                // height="600"
                                className="h-screen w-full"
                                alt="/free 4K wallpapers guy, skateboard, cap, sneakers, graffiti, ai, art by ♤CRISTIAN♧¿.jpg"
                            />
                        </div>

                        <div className="container col-span-2  mx-auto  max-w-3xl flex flex-col items-center justify-center">
                            <div className="flex flex-col text-left">
                                <h1 className="text-[34px] text-[#181818]">Create an Account</h1>
                                <h1 className="text-[14px] text-[#636364] flex justify-center">
                                    Hey User! Please enter your details.
                                </h1>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="">

                                    <div className="flex">
                                        <div className="flex-1 p-4">
                                            <div className="my-2 flex   flex-col text-[14px]">

                                                <Input
                                                    readOnly={false}
                                                    label="username :"
                                                    placeholder="username"
                                                    className="mb-4"
                                                    {...register("username", { required: true })}
                                                />



                                            </div>
                                            <div className="my-2 flex   flex-col text-[14px]">
                                                <Input
                                                    readOnly={false}
                                                    label="Email :"
                                                    placeholder="email"
                                                    className="mb-4"
                                                    {...register("email", { required: true })}
                                                />

                                            </div>
                                            <div className="my-2 flex   flex-col text-[14px]">
                                                <Input
                                                    readOnly={false}
                                                    label="fullname :"
                                                    placeholder="fullname"
                                                    className="mb-4"
                                                    {...register("fullname", { required: true })}
                                                />

                                            </div>
                                            <div className="my-2 flex   flex-col text-[14px]">
                                                <Input
                                                    readOnly={false}
                                                    label="password :"
                                                    placeholder="password"
                                                    className="mb-4"
                                                    {...register("password", { required: true })}
                                                />

                                            </div>


                                        </div>

                                    </div>


                                </div>

                                <div>

                                    <div className="">
                                        <div className="p-4">

                                            <div className="my-2 flex   flex-col text-[14px]">
                                                <FileInput
                                                    readOnly={false}
                                                    label="Avatar : "
                                                    placeholder="avatar"
                                                    className="mb-4"
                                                    {...register("avatar", { required: true })}
                                                />

                                            </div>

                                            <div className="my-2 flex   flex-col text-[14px]">
                                                <FileInput
                                                    readOnly={false}
                                                    label="Cover Image : "
                                                    placeholder="coverImage"
                                                    className="mb-4"
                                                    {...register("coverImage", { required: true })}
                                                />

                                            </div>

                                            <div className="text-sm flex justify-center text-blue-500">
                                                <Link to="/login">allready have an account?</Link>
                                            </div>

                                        </div>

                                    </div>


                                </div>
                            </div>
                            <button
                                onClick={handleSubmit}
                                className="my-5 w-85 rounded-xl bg-[#EA454C] py-2 text-white" >
                                {loading ? "Processing..." : "Sign Up"}
                            </button>
                        </div>



                    </div>
                </div>
            </form>
        </div>
    );
}


