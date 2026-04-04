import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getTweet } from "../../features/tweet/tweetApi";
import { useState } from "react";
import { TweetContent, TweetHeader } from "../index.js"
import { BasicSpinner } from "../../components"
import { getUserChannelProfile } from "../../features/user/userApi.js";

function Tweet() {
    const { tweetId } = useParams();
    const dispatch = useDispatch();

    const tweet = useSelector((state) => state.tweet.tweets.curTweet);
    const loading = useSelector((state) => state.tweet?.loading?.tweets)
    // const channelData = useSelector((state) => state.user.channelProfile)

    useEffect(() => {
        dispatch(getTweet(tweetId));
    }, [tweetId, dispatch])

    // useEffect(() => {
    //     if (tweet?.owner) {
    //         dispatch(getUserChannelProfile(tweet.owner));
    //     }
    // }, [tweet, dispatch]);

    if (!tweet) console.log("tweet does not exist")
    console.log(tweet);
    // console.log(channelData);

    return (
        <>
            {!loading ?
                <div className="min-h-screen flex items-center justify-center bg-gray-900">
                    <div className="w-full max-w-xl h-125 flex rounded-2xl overflow-hidden shadow-xl bg-linear-to-br from-gray-700 via-gray-800 to-gray-700 text-white p-4 flex-col justify-between">
                        <TweetHeader
                            username={tweet?.owner?.username}
                            fullname={tweet?.owner?.fullname}
                            url={tweet?.owner?.avatar?.url}
                            date={tweet?.owner?.createdAt}
                            owner={tweet?.owner?._id}
                        />
                        <TweetContent
                            content={tweet?.tweet?.content}
                        />

                    </div>
                </div>
                : <BasicSpinner />
            }
        </>
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
