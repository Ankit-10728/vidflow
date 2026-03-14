import Home01 from "./Home01";
import HomeBottom from "./HomeBottom";
import Home02 from "./Home02";
import HomeTop from "./HomeTop";
function Home() {
    return (
        <div>
            <section className="bg-[#302c42] overflow-hidden pb-9">
                <HomeTop />
                <Home01 />
                <Home02 />
                <HomeBottom />
            </section>
        </div>
    )
}

export default Home;
