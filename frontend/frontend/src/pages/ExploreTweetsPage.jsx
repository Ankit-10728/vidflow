import { TweetExplore } from "../components"
import { useSelector } from "react-redux"
import ErrorPage from "./ErrorPage"

function ExploreTweetsPage() {
    const error = useSelector((state) => state.tweet.error.explore)

    if (error) return (
        <ErrorPage message={error.message} />
    )

    return (
        <>
            <TweetExplore />

        </>
    )
}

export default ExploreTweetsPage