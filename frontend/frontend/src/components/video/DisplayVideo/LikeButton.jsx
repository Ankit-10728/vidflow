import { useState } from "react";
import { likeVideo, unlikeVideo } from "../../../features/like/likeApi";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { checkIsLiked } from "../../../features/like/likeApi";

function LikeButton({ initialLikes = 0, id }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    console.log("tjis is from like button");
    console.log(id);


    const liked = useSelector((state) => state.like.curItemLiked);
    const [likes, setLikes] = useState(initialLikes);

    // ✅ Check initial like status
    useEffect(() => {
        if (!id) return
        dispatch(checkIsLiked(id));
    }, [id, dispatch]);

    // ✅ Handle toggle
    // const handleLike = async () => {
    //     if (liked) {
    //         setLikes((prev) => prev - 1);
    //         await dispatch(unlikeVideo(id));
    //     } else {
    //         setLikes((prev) => prev + 1);
    //         await dispatch(likeVideo(id));
    //     }
    // };

    const handleLike = async () => {
        if (loading) return; // 🚫 prevent spam

        setLoading(true);

        if (liked) {
            setLikes(prev => Math.max(0, prev - 1)); // prevent negative
            await dispatch(unlikeVideo(id));
        } else {
            setLikes(prev => prev + 1);
            await dispatch(likeVideo(id));
        }

        setLoading(false);
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