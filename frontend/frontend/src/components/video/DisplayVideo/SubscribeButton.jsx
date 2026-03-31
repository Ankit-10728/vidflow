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

            console.log("this is form sub button");
            console.log(temp.payload.data);
            setSubscribed(temp.payload.data)
            console.log("ewghiuegt iergiosdgriuoers iosurgioeub");

        }
        check();

    }, [userId, channelId])



    console.log("this is for checking the inital state of subscribe");
    console.log(subscribed);




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
            className={`px-6 py-2 font-bold rounded-full transition-all duration-300
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