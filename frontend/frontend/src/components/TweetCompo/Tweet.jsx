import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getTweet } from "../../features/tweet/tweetApi";
import { useState } from "react";
import { TweetActions, TweetContent, TweetHeader } from "../index.js"

function Tweet() {
    const { tweetId } = useParams();
    console.log(tweetId + "from Tweet")
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTweet(tweetId));
    }, [tweetId, dispatch])

    const tweet = useSelector((state) => state.tweet.tweets.curTweet);
    console.log(tweet + "this is the tweet from store ")
    console.log(tweet)
    if (!tweet) console.log("tweet does not exist")
    if (!tweet) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                Loading...
            </div>
        );
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="w-full max-w-xl h-125 flex rounded-2xl overflow-hidden shadow-xl bg-linear-to-br from-gray-500 via-gray-700 to-gray-900 text-white p-5 flex-col justify-between">
                <TweetHeader
                    username={tweet.owner.username}
                    fullname={tweet.owner.fullname}
                    url={tweet.owner.avatar.url}
                    date={tweet.tweet.createdAt}
                />
                <TweetContent
                    content={tweet.tweet.content}
                />
                <TweetActions
                />
            </div>
        </div>
    );
}

export default Tweet




// import TweetCard from "./TweetCard";
// import CommentSection from "./CommentSection";

// function TweetPage({ temp }) {
//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
//             <div className="w-full max-w-5xl h-100 flex rounded-2xl overflow-hidden shadow-xl">

//                 <TweetCard temp={temp} />
//                 <CommentSection />

//             </div>
//         </div>
//     );
// }

// export default TweetPage;
