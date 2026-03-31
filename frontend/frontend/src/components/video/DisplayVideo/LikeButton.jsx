
import { useState, useEffect } from "react";
import { likeVideo, unlikeVideo, checkIsLiked } from "../../../features/like/likeApi";
import { useDispatch, useSelector } from "react-redux";
import { setLike, setUnlike } from "../../../features/like/likeSlice";

function LikeButton({ id, initialCount = 0 }) {
    const dispatch = useDispatch();


    const liked = useSelector((state) => state.like.curItemLiked);
    console.log(liked);
    console.log("this is foe checking is liekd");


    const [likes, setLikes] = useState(initialCount);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (!id) return;

        dispatch(checkIsLiked(id));
    }, [id, dispatch]);


    const handleLike = async () => {

        if (loading) return;

        setLoading(true);

        try {
            if (liked) {
                setLikes(prev => Math.max(0, prev - 1));
                await dispatch(unlikeVideo(id));
                dispatch(setUnlike(false))
            } else {
                setLikes(prev => prev + 1);
                await dispatch(likeVideo(id));
                dispatch(setLike(true))
            }
        } catch (err) {
            console.error(err);

        }

        setLoading(false);
    };

    return (
        <button
            onClick={handleLike}
            disabled={loading}
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