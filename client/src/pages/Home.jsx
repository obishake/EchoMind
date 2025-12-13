import React, { useEffect, useState } from "react";
import { useBlog } from "../../context/BlogContext";
import { useAuth } from "../../context/AuthContext";
import BlogCard from "../components/BlogCard";
import Loader from "../components/Loader";
import { FiSearch, FiFilter } from "react-icons/fi";

const Home = () => {
    const {
        blogs,
        getAllBlogs,
        loading,
        searchQuery,
        setSearchQuery,
        filterTag,
        setFilterTag,
        getFilteredBlogs,
        deleteBlog,
    } = useBlog();
    const { isAuthenticated } = useAuth();
    const [localSearch, setLocalSearch] = useState("");

    useEffect(() => {
        getAllBlogs();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchQuery(localSearch);
    };

    const handleDeleteBlog = async (blogId) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            await deleteBlog(blogId);
        }
    };

    const filteredBlogs = getFilteredBlogs();
    const allTags = [...new Set(blogs.flatMap((blog) => blog.tags || []))];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Hero Section */}
            <div className="bg-[url('/bgImage4.jpeg')] text-white py-20 h-[500px]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                        Welcome to EchoMind
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-blue-100">
                        Discover amazing stories from writers around the world
                    </p>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                        <div className="relative">
                            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                value={localSearch}
                                onChange={(e) => setLocalSearch(e.target.value)}
                                placeholder="Search blogs by title, content, or author..."
                                className="w-full pl-12 pr-4 py-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-2 border-gray-300 text-white"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Filter Section */}
                <div className="mb-8 flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                        <FiFilter className="text-gray-600 dark:text-gray-400" />
                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                            Filter by tag:
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setFilterTag("")}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                filterTag === ""
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                            }`}
                        >
                            All
                        </button>
                        {allTags.slice(0, 10).map((tag, index) => (
                            <button
                                key={index}
                                onClick={() => setFilterTag(tag)}
                                className={`px-4 py-2 rounded-lg transition-colors ${
                                    filterTag === tag
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-gray-600 dark:text-gray-400">
                        {filteredBlogs.length}{" "}
                        {filteredBlogs.length === 1 ? "blog" : "blogs"} found
                    </p>
                </div>

                {/* Blog Grid */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader size="large" />
                    </div>
                ) : filteredBlogs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredBlogs.map((blog) => (
                            <BlogCard
                                key={blog._id}
                                blog={blog}
                                onDelete={handleDeleteBlog}
                                showActions={isAuthenticated}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-600 dark:text-gray-400 text-xl">
                            {searchQuery || filterTag
                                ? "No blogs found matching your criteria"
                                : "No blogs available yet. Be the first to create one!"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
