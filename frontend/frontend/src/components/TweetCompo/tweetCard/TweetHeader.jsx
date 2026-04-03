import { useSelector } from "react-redux";
import formatMonthYear from "../../../assets/dateConverter";
import { SubscribeButton } from "../../../components"
import { useNavigate } from "react-router-dom";

function TweetHeader({
    url = "",
    username = "Unknown",
    fullname = "",
    date = "",
    owner
}) {
    const navigate = useNavigate();
    const userId = useSelector((state) => state.user?.user?._id)
    console.log("from tweet header")
    console.log(userId);

    console.log(url + username)
    return (
        <div className="flex justify-between items-center p-4 rounded-4xl">
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate(`/channel/${owner}`)}>
                <img
                    src={url}
                    alt="avatar"
                    className="w-15 h-15 rounded-full object-cover ring-2 ring-gray-300"
                />
                <div >
                    <h3 className="font-semibold text-2xl">{fullname}</h3>
                    <span>
                        <h3 className="font-thin text-lg">@{username}</h3>
                        <p className="text-sm opacity-70">{formatMonthYear(date)}</p>

                    </span>
                </div>
            </div>


            <SubscribeButton userId={userId} channelId={owner} />
        </div>
    );
}

export default TweetHeader;
