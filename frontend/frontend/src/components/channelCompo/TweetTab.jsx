import { TweetCard } from "../../components"
import formatMonthYear from "../../assets/dateConverter.js"
import formatDuration from "../../assets/timeConverter.js";

function TweetTab({ tweets }) {
    return (
        <div className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...tweets].reverse().map((tweet) => (
                    <TweetCard
                        key={tweet._id}
                        forfeed={false}
                        tweetId={tweet?._id}
                        owner={tweet.owner}
                        time={formatMonthYear(tweet?.createdAt)}
                        content={tweet.content}

                    />
                ))}
            </div>
        </div>
    );
}
export default TweetTab