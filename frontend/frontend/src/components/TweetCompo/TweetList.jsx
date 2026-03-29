import { TweetHeader, TweetContent, TweetActions } from "../index";

function TweetList({ tweets }) {

    if (!tweets || tweets.length === 0) {
        return (
            <div className="text-white text-center mt-10">
                No tweets found
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 p-6 flex flex-col items-center gap-6">

            {tweets.map((tweet, index) => (
                <div
                    key={index}
                    className="w-full max-w-xl rounded-2xl shadow-xl bg-linear-to-br from-gray-500 via-gray-700 to-gray-900 text-white p-5 flex flex-col gap-4"
                >

                    <TweetHeader
                        username={tweet.owner?.username}
                        fullname={tweet.owner?.fullname}
                        url={tweet.owner?.avatar?.url}
                        date={tweet.tweet?.createdAt}
                    />

                    <TweetContent
                        content={tweet.tweet?.content}
                    />

                    <TweetActions />

                </div>
            ))}

        </div>
    );
}


export default TweetList