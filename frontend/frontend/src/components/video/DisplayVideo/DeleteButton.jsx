import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function DeleteButton({ onDelete, label = "Delete" }) {
    const navigate = useNavigate();
    const loading = useSelector((state) => state.video.loading.delete)
    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete?");
        if (!confirmDelete) return;

        try {

            await onDelete();
            navigate("/all-posts")
        } catch (err) {
            console.error(err);
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