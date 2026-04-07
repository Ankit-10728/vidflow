import { useSelector } from "react-redux"
import { Tweet } from "../components"
import ErrorPage from "./ErrorPage"
function TweetPage() {
    const error = useSelector((state) => state.tweet.tweets)

    if (error) {
        return (
            <ErrorPage message={error.message} />
        )
    }
    return (
        <div className='h-screen'>
            <Tweet />
        </div>
    )
}

export default TweetPage