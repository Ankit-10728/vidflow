import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isSubscribed, unsubscribeUser, subscribeUser } from "../../../features/subscription/subscriptionApi";

function SubscribeButton({ userId, channelId }) {

    const dispatch = useDispatch()

    const [subscribed, setSubscribed] = useState(false);
    useEffect(() => {
        if (!userId || !channelId) return;
        const check = async () => {
            const temp = await dispatch(isSubscribed({ userId, channelId }));
            setSubscribed(temp.payload.data)
        }
        check();

    }, [userId, channelId])




    const handleSubscribe = async () => {
        try {
            if (subscribed) {
                dispatch(unsubscribeUser(channelId))
                setSubscribed(false)
            } else {
                dispatch(subscribeUser(channelId))
                setSubscribed(true)
            }

            setSubscribed(!subscribed);

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <button
            onClick={handleSubscribe}
            className={`px-8 py-2 font-medium text-xl rounded-full transition-all duration-300 border-2 border-white
        ${subscribed
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-white text-black hover:bg-gray-200"}
      `}
        >
            {subscribed ? "Subscribed" : "Subscribe"}
        </button>
    );
}

export default SubscribeButton;