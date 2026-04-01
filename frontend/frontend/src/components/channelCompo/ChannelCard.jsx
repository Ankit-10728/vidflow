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

    useEffect(() => {
        const temp = async (channelId) => {
            const resStats = await dispatch(getChannelStats(channelId));
            const resVideo = await dispatch(getChannelVideos(channelId));
            const resTweet = await dispatch(getChannelTweets(channelId));
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