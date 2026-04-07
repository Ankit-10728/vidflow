import { ExploreVideos } from "../components"
import { useSelector } from "react-redux"
import ErrorPage from "./ErrorPage"

function ExploreVideosPage() {
    const error = useSelector((state) => state.video.error.explore)

    if (error) return (
        <ErrorPage message={error.message} />
    )
    return (
        <div className=' bg-gray-900 text-white'>
            <ExploreVideos />
        </div>
    )
}

export default ExploreVideosPage