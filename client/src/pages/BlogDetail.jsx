import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useBlog } from "../../context/BlogContext";
import { useComment } from "../../context/CommentContext";
import { useAuth } from "../../context/AuthContext";
import CommentItem from "../components/CommentItem";
import Loader from "../components/Loader";
import {
    FiCalendar,
    FiUser,
    FiEdit2,
    FiTrash2,
    FiArrowLeft,
} from "react-icons/fi";

const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        currentBlog,
        getBlogById,
        deleteBlog,
        loading: blogLoading,
    } = useBlog();
    const {
        comments,
        getCommentsByBlogId,
        createComment,
        updateComment,
        deleteComment,
        loading: commentLoading,
    } = useComment();
    const { user, isAuthenticated } = useAuth();
    const [commentText, setCommentText] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (id) {
            getBlogById(id);
            getCommentsByBlogId(id);
        }
    }, [id]);

    const isOwner = user?._id === currentBlog?.author?._id;

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const handleDeleteBlog = async () => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            const result = await deleteBlog(id);
            if (result.success) {
                navigate("/");
            }
        }
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        setSubmitting(true);
        const result = await createComment(id, {
            comment: commentText, // Backend expects 'comment' field, not 'content' or 'text'
        });
        setSubmitting(false);

        if (result.success) {
            setCommentText("");
        }
    };

    const handleUpdateComment = async (commentId, data) => {
        await updateComment(commentId, data);
    };

    const handleDeleteComment = async (commentId) => {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            await deleteComment(commentId);
        }
    };

    if (blogLoading && !currentBlog) {
        return <Loader fullScreen />;
    }

    if (!currentBlog) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Blog not found
                    </h2>
                    <Link to="/" className="text-blue-600 hover:text-blue-700">
                        Go back to home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors"
                >
                    <FiArrowLeft /> Back
                </button>

                {/* Blog Content */}
                <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8">
                    {/* Blog Image */}
                    {currentBlog.coverImage && (
                        <img
                            src={currentBlog.coverImage}
                            alt={currentBlog.title}
                            className="w-full h-96 object-cover"
                        />
                    )}

                    <div className="p-8">
                        {/* Tags */}
                        {currentBlog.tags && currentBlog.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {currentBlog.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="text-sm px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Title */}
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            {currentBlog.title}
                        </h1>

                        {/* Meta Info */}
                        <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400">
                                <div className="flex items-center gap-2">
                                    {currentBlog.author?.profilePic ? (
                                        <img
                                            src={currentBlog.author.profilePic}
                                            alt={
                                                currentBlog.author.username ||
                                                currentBlog.author.fullName ||
                                                currentBlog.author.email ||
                                                "Author"
                                            }
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    ) : (
                                        <FiUser className="w-6 h-6" />
                                    )}
                                    <span className="font-medium">
                                        {currentBlog.author?.username ||
                                            currentBlog.author?.fullName ||
                                            currentBlog.author?.email ||
                                            "Anonymous"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FiCalendar className="w-5 h-5" />
                                    <span>
                                        {formatDate(currentBlog.createdAt)}
                                    </span>
                                </div>
                            </div>

                            {isOwner && (
                                <div className="flex gap-2">
                                    <Link
                                        to={`/edit-blog/${currentBlog._id}`}
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <FiEdit2 /> Edit
                                    </Link>
                                    <button
                                        onClick={handleDeleteBlog}
                                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                    >
                                        <FiTrash2 /> Delete
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="prose dark:prose-invert max-w-none">
                            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                                {currentBlog.content}
                            </p>
                        </div>
                    </div>
                </article>

                {/* Comments Section */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Comments ({comments.length})
                    </h2>

                    {/* Add Comment Form */}
                    {isAuthenticated ? (
                        <form onSubmit={handleSubmitComment} className="mb-8">
                            <textarea
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Write a comment..."
                                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows="4"
                            />
                            <button
                                type="submit"
                                disabled={submitting || !commentText.trim()}
                                className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitting ? "Posting..." : "Post Comment"}
                            </button>
                        </form>
                    ) : (
                        <div className="mb-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                            <p className="text-gray-600 dark:text-gray-400">
                                Please{" "}
                                <Link
                                    to="/login"
                                    className="text-blue-600 hover:text-blue-700"
                                >
                                    login
                                </Link>{" "}
                                to post a comment.
                            </p>
                        </div>
                    )}

                    {/* Comments List */}
                    {commentLoading && comments.length === 0 ? (
                        <div className="flex justify-center py-8">
                            <Loader />
                        </div>
                    ) : comments.length > 0 ? (
                        <div className="space-y-4">
                            {comments.map((comment) => (
                                <CommentItem
                                    key={comment._id}
                                    comment={comment}
                                    onUpdate={handleUpdateComment}
                                    onDelete={handleDeleteComment}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-600 dark:text-gray-400 py-8">
                            No comments yet. Be the first to comment!
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
