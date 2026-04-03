import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserChannelProfile } from "../features/user/userApi";
import { useNavigate } from "react-router-dom";
import ShareButton from "./video/DisplayVideo/ShareButon";

function TweetCard({
    owner,
    tweetId,
    time,
    forfeed,
    content,
    width = "w-1/2",
    height = "min-h-52"
}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const channelData = useSelector((state) => state.user?.channelProfile)

    useEffect(() => {
        if (!owner || !tweetId) return;
        dispatch(getUserChannelProfile(owner));
    }, [dispatch, tweetId, owner]);

    const handleClick = (tweetId) => {
        navigate(`/tweet/${tweetId}`)
    }

    return (
        <div >

            <div className={`w-full  p-2 pt-0 cursor-pointer`}>
                <div className="flex gap-3 p-4 pb-6 pr-6  border-b border-gray-500  bg-gray-900 transition rounded-2xl">

                    <img
                        onClick={() => navigate(`/channel/${owner}`)}
                        src={channelData?.avatar?.url}
                        alt="user"
                        className="w-13 h-13 rounded-full object-cover"
                    />

                    <div className="flex flex-col w-full">

                        <div className="flex items-center justify-between gap-3 text-lg mb-3">
                            <span onClick={() => navigate(`/channel/${owner}`)}>
                                <span className="text-gray-300 font-bold">@{channelData?.username}</span>
                                <span className="text-gray-500">· {time}</span>
                            </span>
                            <span>
                                <span className="flex justify-between text-gray-400 text-lg">
                                    <ShareButton url={`http://localhost:8000/tweet/${tweetId}`} />
                                </span>
                            </span>
                        </div>

                        <div
                            onClick={() => handleClick(tweetId)}
                            className={`text-xl mt-1  min-h-52 whitespace-pre-wrap wrap-break-word bg-gray-700 rounded-3xl p-4 overflow-hidden  `}>

                            <div className="p-3 text-2xl">{content.length > 140 ? content.substring(0, 140) : content}{content.length > 140 && <span className="text-lg text-blue-300">.......load more</span>} </div>


                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default TweetCard;
