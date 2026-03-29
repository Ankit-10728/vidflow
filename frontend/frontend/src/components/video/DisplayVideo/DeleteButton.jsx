import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DeleteButton({ onDelete, label = "Delete" }) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete?");
        if (!confirmDelete) return;

        try {
            setLoading(true);
            await onDelete();
            navigate("/")
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="px-6 py-2 bg-red-600 text-white rounded-full 
                 hover:bg-red-500 transition hover:scale-105 
                 disabled:opacity-50"
        >
            {loading ? "Deleting..." : `🗑️ ${label}`}
        </button>
    );
}

export default DeleteButton;