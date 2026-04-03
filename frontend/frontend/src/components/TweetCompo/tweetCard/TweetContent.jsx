function TweetContent({ content }) {
    return (
        <div className="flex-1 text-lg leading-relaxed overflow-y-auto py-6 px-8 bg-gray-800 rounded-4xl">
            {content}
        </div>
    );
}

export default TweetContent;
