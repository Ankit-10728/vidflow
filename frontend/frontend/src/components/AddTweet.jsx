import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTweet } from "../features/tweet/tweetApi"
import { useDispatch } from "react-redux";
import { getTweet } from "../features/tweet/tweetApi";

function TweetForm() {
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;
        console.log("tweet submitted")
        const tweetStatus = await dispatch(createTweet({ content }))
        console.log(tweetStatus)
        if (!tweetStatus.payload.success) {
            throw new ApiError(500, "Error posting tweet! Try again", tweetStatus)
        }

        const id = tweetStatus.payload.data._id;
        navigate(`/tweet/${id}`);
        setContent("");
    };

    return (
        <div className="min-h-screen w-full bg-gray-800 flex items-center justify-center px-4">

            <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[55%] xl:w-[45%]">

                <form
                    onSubmit={handleSubmit}
                    className="bg-blue-100 border border-blue-300 rounded-3xl p-10 shadow-xl min-h-80"
                >


                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What's happening?"
                        rows={6}
                        className="w-full resize-none bg-transparent outline-none text-gray-900 placeholder-gray-600 text-lg leading-relaxed"
                    />


                    <div className="flex justify-between items-center mt-6">
                        <span className="text-sm text-gray-600">
                            {content.length}/280
                        </span>

                        <button
                            type="submit"
                            className="bg-blue-900 hover:bg-blue-800 text-white font-semibold px-6 py-2.5 rounded-full transition disabled:opacity-50"
                            disabled={!content.trim()}
                        >
                            Tweet
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default TweetForm;
