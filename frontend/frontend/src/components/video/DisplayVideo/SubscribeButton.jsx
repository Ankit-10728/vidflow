import { useState } from "react";

function SubscribeButton({
    initialSubscribed = false,
    onToggle
}) {
    const [subscribed, setSubscribed] = useState(initialSubscribed);

    const handleSubscribe = async () => {
        try {
            if (subscribed) {
                setCount(count - 1);
            } else {
                setCount(count + 1);
            }

            setSubscribed(!subscribed);

            if (onToggle) {
                await onToggle(!subscribed); // API call from parent
            }
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