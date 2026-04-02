function TweetCard({
    avatar,
    name,
    username,
    time,
    content,
    image,
    likes,
    comments
}) {
    return (
        <div className="flex gap-3 p-4 border-b border-gray-700 hover:bg-gray-800 transition">

            {/* Avatar */}
            <img
                src={avatar}
                alt="user"
                className="w-10 h-10 rounded-full object-cover"
            />

            {/* Content */}
            <div className="flex flex-col w-full">

                {/* Header */}
                <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold">{name}</span>
                    <span className="text-gray-400">@{username}</span>
                    <span className="text-gray-500">· {time}</span>
                </div>

                {/* Tweet Text */}
                <p className="text-sm mt-1 whitespace-pre-wrap">
                    {content}
                </p>

                {/* Optional Image */}
                {image && (
                    <div className="mt-2 rounded-xl overflow-hidden">
                        <img
                            src={image}
                            alt="tweet"
                            className="w-full max-h-80 object-cover"
                        />
                    </div>
                )}

                {/* Actions */}
                <div className="flex justify-between mt-3 text-gray-400 text-sm max-w-md">
                    <span>💬 {comments}</span>
                    <span>❤️ {likes}</span>
                    <span>🔁</span>
                    <span>📤</span>
                </div>
            </div>
        </div>
    );
}

export default TweetCard;
