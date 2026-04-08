import Logo from "./header/Logo";
import { Link } from "react-router-dom";
import { LogoutBtn } from "../components"
import { useSelector } from "react-redux";

function Sidebar() {
    const user = useSelector((state) => state.user?.user)
    return (
        <>
            <div className="fixed left-0 top-0 h-screen w-64 bg-gray-800 text-white text-lg">
                <aside className="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
                    <div className='mr-4'>
                        <Logo />
                    </div>

                    <div className="flex flex-col justify-between flex-1 mt-6">
                        <nav className="-mx-3 space-y-6 ">

                            <div className="space-y-3 ">
                                <label className="px-3   text-gray-500 uppercase dark:text-gray-400">content</label>

                                <Link className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                                    to="/all-posts"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <rect
                                            x="3"
                                            y="5"
                                            width="18"
                                            height="12"
                                            rx="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M10 9l5 3-5 3V9z"
                                        />
                                    </svg>

                                    <span className="mx-2   font-medium">Videos</span>
                                </Link>

                                <Link className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                                    to="/all-tweets"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.25 12c0-4.142 4.03-7.5 9-7.5s9 3.358 9 7.5-4.03 7.5-9 7.5a10.5 10.5 0 01-3.75-.675L2.25 19.5l1.125-3.375A7.47 7.47 0 012.25 12z"
                                        />
                                    </svg>

                                    <span className="mx-2   font-medium">Tweets</span>
                                </Link>
                            </div>

                            <div className="space-y-3 ">
                                {user && <div className="flex gap-2">
                                    <span className="  font-medium">< LogoutBtn /></span>
                                </div>}


                            </div>
                        </nav>
                    </div>
                </aside>
            </div>
        </>
    )
}

export default Sidebar;