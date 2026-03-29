import { useState } from "react";

function LikeButton({ initialLikes = 0 }) {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(initialLikes);

    const handleLike = () => {
        if (liked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setLiked(!liked);
    };

    return (
        <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition 
        ${liked
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"}
      `}
        >
            <span className={`text-lg transition ${liked ? "scale-125" : ""}`}>
                👍
            </span>

            <span className="text-sm font-medium">
                {likes}
            </span>
        </button>
    );
}

export default LikeButton;