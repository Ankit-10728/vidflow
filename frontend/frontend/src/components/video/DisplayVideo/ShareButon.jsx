import { useState } from "react";

function ShareButton({ url }) {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        try {
            const shareUrl = url || window.location.href;

            if (navigator.share) {
                await navigator.share({
                    title: "Check this out",
                    url: shareUrl,
                });
            } else {
                await navigator.clipboard.writeText(shareUrl);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <button
            onClick={handleShare}
            className="px-6 py-2 bg-gray-700 rounded-full hover:bg-gray-600 transition hover:scale-105"
        >
            {copied ? "Copied! ✅" : "🔗 Share"}
        </button>
    );
}

export default ShareButton;