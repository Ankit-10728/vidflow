import React from 'react'
import { useSelector } from 'react-redux'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Header() {
    const navigate = useNavigate();
    const { isAuthenticated, isAuthChecked } = useSelector(state => state.user);
    const user = useSelector((state) => state?.user?.user)

    console.log(user);

    console.log("ths is form header");


    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true
        },
        {
            name: 'Login',
            slug: '/login',
            active: !isAuthenticated
        },
        {
            name: 'SignUp',
            slug: '/signup',
            active: !isAuthenticated
        },
        {
            name: 'All Posts',
            slug: '/all-posts',
            active: isAuthenticated
        },
        {
            name: 'Add Post',
            slug: '/add-post',
            active: isAuthenticated
        },
        {
            name: 'Post Tweet',
            slug: '/tweet/add-tweet',
            active: isAuthenticated
        }
    ]
    return (

        <header className='py-3 shadow font-bold text-gray-900 dark:text-white  bg-gray-900 border border-gray-700'>
            <Container>

                <nav className='flex'>

                    <ul className='ml-auto flex'>
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <NavLink
                                        to={item.slug}
                                        className={({ isActive }) =>
                                            `inline-block px-6 py-2 duration-200 rounded-full 
                            ${isActive
                                                ? "bg-gray-700 text-pink-300"
                                                : "hover:bg-gray-700"}`
                                        }
                                    >
                                        {item.name}
                                    </NavLink>
                                </li>
                            ) : null
                        )}

                        {isAuthenticated && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}

                        <li>
                            <div className="w-12 h-12 rounded-full mx-5">
                                <img
                                    src={user?.avatar?.url}
                                    alt="profile"
                                    onClick={() => navigate(`/channel/${user?._id}`)}
                                    className="w-full h-full rounded-full object-cover cursor-pointer border-2 border-white shadow-lg hover:scale-105 transition"
                                />
                            </div>
                        </li>
                    </ul>

                </nav>
            </Container>
        </header>
    )
}

export default Header