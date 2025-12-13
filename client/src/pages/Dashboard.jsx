import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useBlog } from "../../context/BlogContext";
import { useAuth } from "../../context/AuthContext";
import BlogCard from "../components/BlogCard";
import Loader from "../components/Loader";
import { FiPlus, FiBook, FiUser } from "react-icons/fi";

const Dashboard = () => {
    const { blogs, getAllBlogs, deleteBlog, loading } = useBlog();
    const { user } = useAuth();

    useEffect(() => {
        getAllBlogs();
    }, []);

    const handleDeleteBlog = async (blogId) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            await deleteBlog(blogId);
        }
    };

    // Filter blogs created by current user
    const userBlogs = blogs.filter((blog) => blog.author?._id === user?._id);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        My Dashboard
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Manage your blogs and profile
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    Total Blogs
                                </p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                                    {userBlogs.length}
                                </p>
                            </div>
                            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                <FiBook className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    Profile Views
                                </p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                                    {user?.views || 0}
                                </p>
                            </div>
                            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                                <FiUser className="w-8 h-8 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                    </div>

                    <Link
                        to="/create-blog"
                        className="bg-emerald-600 rounded-lg shadow-md p-6 flex items-center justify-center gap-3 text-white hover:shadow-xl transition-shadow group"
                    >
                        <FiPlus className="w-8 h-8 group-hover:rotate-90 transition-transform" />
                        <span className="text-xl font-semibold">
                            Create New Blog
                        </span>
                    </Link>
                </div>

                {/* Profile Section */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {user?.profilePic ? (
                                <img
                                    src={user.profilePic}
                                    alt={user.username}
                                    className="w-20 h-20 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center">
                                    <FiUser className="w-10 h-10 text-white" />
                                </div>
                            )}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {user?.fullName || user?.username}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    @{user?.username}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400 mt-1">
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                        <Link
                            to="/profile"
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Edit Profile
                        </Link>
                    </div>
                    {user?.bio && (
                        <p className="mt-4 text-gray-700 dark:text-gray-300">
                            {user.bio}
                        </p>
                    )}
                </div>

                {/* My Blogs Section */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        My Blogs ({userBlogs.length})
                    </h2>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader size="large" />
                        </div>
                    ) : userBlogs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {userBlogs.map((blog) => (
                                <BlogCard
                                    key={blog._id}
                                    blog={blog}
                                    onDelete={handleDeleteBlog}
                                    showActions={true}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                            <FiBook className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 dark:text-gray-400 text-xl mb-4">
                                You haven't created any blogs yet
                            </p>
                            <Link
                                to="/create-blog"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <FiPlus /> Create Your First Blog
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
