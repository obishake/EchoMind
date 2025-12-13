import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiUser, FiSave, FiX } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

const CommentItem = ({ comment: commentData, onUpdate, onDelete }) => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(
        commentData.comment || "" // Backend uses 'comment' field
    );
    const isOwner =
        user?._id === commentData?.author?._id ||
        user?._id === commentData?.user?._id;

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const handleSave = () => {
        if (editedContent.trim()) {
            onUpdate(commentData._id, {
                comment: editedContent, // Backend expects 'comment' field
            });
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setEditedContent(commentData.comment || "");
        setIsEditing(false);
    };

    const commentAuthor = commentData.author || commentData.user;
    const commentContent = commentData.comment || "";

    return (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-3 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                    {commentAuthor?.profilePic ? (
                        <img
                            src={commentAuthor.profilePic}
                            alt={commentAuthor.username}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                            <FiUser className="text-white" />
                        </div>
                    )}
                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                            {commentAuthor?.username ||
                                commentAuthor?.fullName ||
                                "Anonymous"}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(commentData.createdAt)}
                        </p>
                    </div>
                </div>

                {isOwner && !isEditing && (
                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="p-1 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                            title="Edit"
                        >
                            <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onDelete(commentData._id)}
                            className="p-1 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                            title="Delete"
                        >
                            <FiTrash2 className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>

            {isEditing ? (
                <div className="mt-3">
                    <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows="3"
                    />
                    <div className="flex gap-2 mt-2">
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <FiSave className="w-4 h-4" />
                            Save
                        </button>
                        <button
                            onClick={handleCancel}
                            className="flex items-center gap-1 px-3 py-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                        >
                            <FiX className="w-4 h-4" />
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                    {commentContent}
                </p>
            )}

            {commentData.updatedAt &&
                commentData.updatedAt !== commentData.createdAt && (
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 italic">
                        (edited)
                    </p>
                )}
        </div>
    );
};

export default CommentItem;
