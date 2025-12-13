import React from "react";
import { Link } from "react-router-dom";
import { FiCalendar, FiUser, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

const BlogCard = ({ blog, onDelete, showActions = false }) => {
    const { user } = useAuth();
    const isOwner = user?._id === blog?.author?._id;

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const truncateText = (text, maxLength) => {
        if (!text) return "";
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + "...";
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            {/* Image */}
            {blog.coverImage && (
                <Link to={`/blog/${blog._id}`}>
                    <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                </Link>
            )}

            <div className="p-6">
                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                        {blog.tags.slice(0, 3).map((tag, index) => (
                            <span
                                key={index}
                                className="text-xs px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Title */}
                <Link to={`/blog/${blog._id}`}>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2">
                        {blog.title}
                    </h3>
                </Link>

                {/* Content Preview */}
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {truncateText(blog.content, 150)}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            {blog.author?.profilePic ? (
                                <img
                                    src={blog.author.profilePic}
                                    alt={
                                        blog.author?.username ||
                                        blog.author?.fullName ||
                                        blog.author?.email ||
                                        "Author"
                                    }
                                    className="w-6 h-6 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                                    <FiUser className="text-white w-3 h-3" />
                                </div>
                            )}
                            <span>
                                {blog.author?.username ||
                                    blog.author?.fullName ||
                                    blog.author?.email ||
                                    "Anonymous"}
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <FiCalendar className="w-4 h-4" />
                            <span>{formatDate(blog.createdAt)}</span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Link
                        to={`/blog/${blog._id}`}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                    >
                        Read More →
                    </Link>

                    {showActions && isOwner && (
                        <div className="flex gap-2">
                            <Link
                                to={`/edit-blog/${blog._id}`}
                                className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                                title="Edit"
                            >
                                <FiEdit2 className="w-5 h-5" />
                            </Link>
                            <button
                                onClick={() => onDelete && onDelete(blog._id)}
                                className="p-2 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                                title="Delete"
                            >
                                <FiTrash2 className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
