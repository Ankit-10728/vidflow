import { Routes, Route, Outlet } from "react-router-dom";
import { Header, Footer, Sidebar } from "./components";
import { fetchCurrentUser } from "./features/user/userApi";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Fetching user...&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&7");
    dispatch(fetchCurrentUser());
  }, [dispatch]);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
      />
      <Sidebar />
      <div className="ml-64">
        <Header />
        <main >
          <Outlet />
        </main>
        {/* <Footer /> */}
      </div>

    </>
  );
}

export default App
