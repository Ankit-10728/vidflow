import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideoComments, createVideoComment, deleteVideoComment } from "../../../features/comment/commentApi";

function CommentsSection() {
    const [comment, setComment] = useState("");
    const dispatch = useDispatch();
    const user = useSelector((state) => state?.user?.user?._id)

    const video = useSelector((state) => state.video.videos.currentVideo);
    const comments = useSelector((state) => state.comment.comments.videoComments);
    const owner = video?.owner;

    useEffect(() => {
        if (video?._id) {
            dispatch(getVideoComments(video._id));

        }
    }, [dispatch, video?._id]);

    const handleSubmit = async () => {
        await dispatch(createVideoComment({
            videoId: video._id,
            content: comment
        }));

        dispatch(getVideoComments(video._id));
        setComment("");
    };

    const handleDelete = async (id) => {
        await dispatch(deleteVideoComment(id))
        dispatch(getVideoComments(video._id));
    }

    return (
        <div className="bg-gray-800 p-4 rounded-xl">
            <h2 className="mb-3 font-bold text-2xl">Comments</h2>
            <div className="flex items-center gap-3 m-3">

                <textarea
                    value={comment}
                    onChange={(e) => {
                        setComment(e.target.value);
                        e.target.style.height = "auto";
                        e.target.style.height = e.target.scrollHeight + "px";
                    }}
                    placeholder="Add a comment..."
                    rows={1}
                    className="flex-1 p-3 pl-6 rounded-2xl bg-gray-700 text-white text-lg outline-none resize-none overflow-hidden"
                />

                <button
                    onClick={handleSubmit}
                    className="px-6 py-3 rounded-full bg-gray-600 hover:bg-gray-500 transition">
                    Post
                </button>

            </div>

            <div className="mt-8">

                {
                    comments.length ?
                        <div className="space-y-4 ">
                            {comments?.map((c) => (
                                <div
                                    key={c._id}
                                    className="flex justify-between items-start gap-3 p-6 rounded-lg bg-[#1e1b2e] group"
                                >

                                    <div className="flex items-start gap-3">

                                        <img
                                            src={c.owner?.avatar?.url || "/default-avatar.png"}
                                            alt="avatar"
                                            className="w-13 h-13 rounded-full object-cover"
                                        />

                                        <div className="flex flex-col">

                                            <div className="flex items-center gap-3 text-xl">
                                                <span className="text-gray-300 font-bold">
                                                    @{c.owner?.username}
                                                </span>

                                                <span className="text-gray-500">
                                                    {new Date(c.createdAt).toLocaleDateString("en-IN", {
                                                        day: "numeric",
                                                        month: "long",
                                                        year: "numeric",
                                                    })}
                                                </span>
                                            </div>

                                            <span className="text-gray-400 text-xl font-medium">
                                                {c.owner?.fullname}
                                            </span>

                                            <p className="text-gray-300 mt-1 text-lg p-4 pr-0">
                                                {c.content}
                                            </p>

                                        </div>
                                    </div>

                                    {user === c.owner?._id && (
                                        <button
                                            onClick={() => handleDelete(c._id)}
                                            className="px-6 py-2  bg-gray-700 rounded-full hover:bg-gray-600 transition hover:scale-105">
                                            Delete
                                        </button>
                                    )}

                                </div>
                            ))}
                        </div>
                        :
                        <div className="space-y-4 bg-gray-900 flex justify-center p-4"> No Comments Yet</div>

                }
            </div>
        </div >
    );
}

export default CommentsSection;