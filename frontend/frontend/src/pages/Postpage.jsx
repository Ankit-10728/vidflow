// import { Login as LoginComponent } from '../components'
import Video from "../components/video/DisplayVideo/VideoCard"
import { useSelector } from "react-redux"
import ErrorPage from "./ErrorPage"

function Post() {

    const error = useSelector((state) => state.video.fetchOne)
    if (error) return (
        < ErrorPage message={error.message} />
    )
    return (
        <div className=' h-screen '>
            <Video />
        </div>
    )
}

export default Post