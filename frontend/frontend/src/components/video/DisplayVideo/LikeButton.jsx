import { useState } from "react";
import { likeVideo, unlikeVideo, checkIsLiked } from "../../../features/like/likeApi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function LikeButton({ initialLikes = 0, id }) {
    const dispatch = useDispatch();
    const isVideoLiked = useSelector((state) => state?.like?.curItemLiked);

    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(initialLikes);

    useEffect(() => {
        if (!id) return;
        dispatch(checkIsLiked(id));

        fetchData();
    }, [dispatch, id])

    useEffect(() => {
        setLiked(isVideoLiked);
    }, [isVideoLiked]);

    const handleLike = async () => {
        if (liked) {
            setLikes((prev) => prev - 1);
            const likedItem = await dispatch(likeVideo(id));
            console.log(likedItem);

        } else {
            setLikes((prev) => prev + 1);
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