import Channel from "./Channel";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getChannelStats, getChannelVideos, getChannelTweets } from "../../features/dashboard/dashboardApi";
import { useParams } from "react-router-dom";

function ChannelCard() {
    const dispatch = useDispatch();
    const channelInfo = useSelector((state) => state?.dashboard?.stats)
    const channelVideos = useSelector((state) => state?.dashboard?.videos)
    const channelTweets = useSelector((state) => state?.dashboard?.tweets)
    const { slug: channelId } = useParams();

    if (!channelId) alert("from channel card")

    useEffect(() => {
        if (!channelId) return null;
        const temp = async (channelId) => {
            await dispatch(getChannelStats(channelId));
            await dispatch(getChannelVideos(channelId));
            await dispatch(getChannelTweets(channelId));
        }
        temp(channelId);
    }, [channelId, dispatch])

    return (
        <>
            <Channel channel={channelInfo} videos={channelVideos} tweets={channelTweets} />
        </>
    )

}

export default ChannelCard