import { TweetCard } from "../../components"

function TweetTab({ tweets }) {
    return (
        <div className="mt-4">
            <div className="flex flex-col divide-y divide-gray-700">
                {tweets.map((tweet) => (
                    <TweetCard
                        key={tweet.id}
                        avatar={tweet.avatar}
                        name={tweet.name}
                        username={tweet.username}
                        time={tweet.time}
                        content={tweet.content}
                        image={tweet.image}
                        likes={tweet.likes}
                        comments={tweet.comments}
                    />
                ))}
            </div>
        </div>
    );
}
export default TweetTab