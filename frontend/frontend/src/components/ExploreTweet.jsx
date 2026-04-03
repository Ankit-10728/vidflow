import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExploreTweets } from "../features/tweet/tweetApi.js";
import { TweetCard } from "../components";
import formatMonthYear from "../assets/dateConverter.js";
import { nanoid } from "nanoid";

function TweetExplore() {
    const dispatch = useDispatch();

    const tweets = useSelector(
        (state) => state.tweet.tweets.exploreTweets
    );
    const { explorePage, hasMore } = useSelector(
        (state) => state.tweet.pagination
    );
    const loading = useSelector((state) => state.tweet.loading.explore);

    useEffect(() => {
        dispatch(getExploreTweets(1));
    }, [dispatch]);

    console.log(tweets);
    console.log("this is to print the tweets");



    const handleLoadMore = () => {
        if (hasMore && !loading) {
            dispatch(getExploreTweets(explorePage + 1));
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex justify-center ">
            <div className="w-full max-w-6xl bg-gray-800 px-56 py-6 text-gray-200">

                <div className="flex flex-col gap-4">
                    {tweets.map((tweet) => (
                        <TweetCard
                            key={nanoid()}
                            tweetId={tweet._id}
                            owner={tweet?.owner?._id}
                            content={tweet.content}
                            time={formatMonthYear(tweet?.createdAt)}
                            forfeed={true}
                        />
                    ))}
                </div>

                {(
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={handleLoadMore}
                            className="px-4 py-2 bg-gray-700 rounded"
                        >
                            {loading ? "Loading..." : "Load More"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TweetExplore;
