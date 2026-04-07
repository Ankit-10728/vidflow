import ChannelCard from "../components/channelCompo/ChannelCard"
import { useSelector } from "react-redux"
import ErrorPage from "./ErrorPage"

function ChannelPage() {
    const error = useSelector((state) => state.dashboard.error)

    if (error) return (
        < ErrorPage meassge={error.meassge} />
    )
    return (
        <>
            <ChannelCard />
        </>
    )
}

export default ChannelPage