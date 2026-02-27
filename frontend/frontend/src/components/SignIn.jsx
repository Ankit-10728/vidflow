import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/user/userApi";
import { useState } from "react";

function Signup() {
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.user);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        avatar: null,
        coverImage: null
    });

    const handleChange = (e) => {
        const { name, value, files, type } = e.target;

        if (type === "file") {
            setForm({ ...form, [name]: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("username", form.username);
        formData.append("fullname", form.fullname);
        formData.append("email", form.email);
        formData.append("password", form.password);
        formData.append("avatar", form.avatar);
        formData.append("coverImage", form.coverImage);
        dispatch(registerUser(formData));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="username" placeholder="username" onChange={handleChange} />
            <input name="fullname" placeholder="fullname" onChange={handleChange} />
            <input name="email" placeholder="email" onChange={handleChange} />
            <input name="password" placeholder="password" type="password" onChange={handleChange} />
            <input type="file" placeholder="avatar" name="avatar" onChange={handleChange} />
            <input type="file" name="coverImage" onChange={handleChange} />

            <button type="submit">
                {loading.auth ? "Signing up..." : "Sign Up"}
            </button>

            {error && <p>{error.message}</p>}
        </form>
    );
}
export { Signup }