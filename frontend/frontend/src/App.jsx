import { Routes, Route, Outlet } from "react-router-dom";
import { Header, Footer, Sidebar } from "./components";

function App() {
  return (
    <>
      <Sidebar />
      <div className="ml-64">
        <Header />
        <main >
          <Outlet />
        </main>
        <Footer />
      </div>

    </>
  );
}

export default App
