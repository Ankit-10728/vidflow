import { useState } from "react";
import { likeVideo, unlikeVideo } from "../../../features/like/likeApi";
import { useDispatch } from "react-redux";

function LikeButton({ initialLikes = 0, id }) {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(initialLikes);
    const dispatch = useDispatch();

    const handleLike = async () => {
        if (liked) {
            setLikes(likes - 1);
            const likedItem = await dispatch(likeVideo(id));
            console.log(likedItem);

        } else {
            setLikes(likes + 1);
            const unlikedItem = await dispatch(unlikeVideo(id));
            console.log(unlikedItem);

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