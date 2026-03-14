import React from 'react'
import { useSelector } from 'react-redux'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
    const authStatus = useSelector((state) => state.user.isAuthenticated)
    const navigate = useNavigate()

    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true
        },
        {
            name: 'Login',
            slug: '/login',
            active: !authStatus
        },
        {
            name: 'SignUp',
            slug: '/signup',
            active: !authStatus
        },
        {
            name: 'All Posts',
            slug: '/all-posts',
            active: authStatus
        },
        {
            name: 'Add Posts',
            slug: '/add-post',
            active: authStatus
        }
    ]
    return (

        <header className='py-3 shadow font-bold text-gray-900 dark:text-white  bg-gray-900 border border-gray-700'>
            <Container>
                <nav className='flex '>

                    <ul className='ml-auto flex'>
                        {navItems.map((item) => item.active ? (

                            <li key={item.name}>
                                <button
                                    className='inline-block px-6 py-2 duration-200 hover:bg-gray-700 rounded-full '
                                    onClick={() => navigate(item.slug)}>
                                    {item.name}
                                </button>
                            </li>

                        ) : null)}

                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header