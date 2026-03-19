function TweetActions({ like, comments }) {
    return (
        <div className="flex gap-6 text-lg">
            <button className="opacity-80">❤️ 0</button>
            <button className="opacity-80">💬 0</button>
        </div>
    );
}

export default TweetActions;
