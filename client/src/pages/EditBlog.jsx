import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBlog } from "../../context/BlogContext";
import { FiImage, FiX } from "react-icons/fi";
import Loader from "../components/Loader";

const EditBlog = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        tags: "",
        image: "",
    });
    const [imagePreview, setImagePreview] = useState("");
    const [errors, setErrors] = useState({});
    const [initialLoad, setInitialLoad] = useState(true);

    const { currentBlog, getBlogById, updateBlog, loading } = useBlog();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getBlogById(id);
        }
    }, [id]);

    useEffect(() => {
        if (currentBlog && initialLoad) {
            setFormData({
                title: currentBlog.title || "",
                content: currentBlog.content || "",
                tags: currentBlog.tags?.join(", ") || "",
                image: currentBlog.coverImage || "", // Use coverImage from backend
            });
            setImagePreview(currentBlog.coverImage || "");
            setInitialLoad(false);
        }
    }, [currentBlog, initialLoad]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setErrors({ ...errors, image: "Please select an image file" });
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setErrors({
                ...errors,
                image: "Image size should be less than 5MB",
            });
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
            setFormData({ ...formData, image: reader.result });
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImagePreview("");
        setFormData({ ...formData, image: "" });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = "Title is required";
        } else if (formData.title.length < 5) {
            newErrors.title = "Title must be at least 5 characters";
        }

        if (!formData.content.trim()) {
            newErrors.content = "Content is required";
        } else if (formData.content.length < 50) {
            newErrors.content = "Content must be at least 50 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const tagsArray = formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag);

        const blogData = {
            title: formData.title,
            content: formData.content,
            tags: tagsArray,
            coverImage: formData.image, // Backend expects 'coverImage', not 'image'
        };

        const result = await updateBlog(id, blogData);

        if (result.success) {
            navigate(`/blog/${id}`);
        }
    };

    if (loading && initialLoad) {
        return <Loader fullScreen />;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                        Edit Blog
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                                Title *
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border ${
                                    errors.title
                                        ? "border-red-500"
                                        : "border-gray-300 dark:border-gray-600"
                                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                                placeholder="Enter your blog title"
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        {/* Content */}
                        <div>
                            <label
                                htmlFor="content"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                                Content *
                            </label>
                            <textarea
                                id="content"
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                rows="12"
                                className={`w-full px-4 py-3 border ${
                                    errors.content
                                        ? "border-red-500"
                                        : "border-gray-300 dark:border-gray-600"
                                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                                placeholder="Write your blog content here..."
                            />
                            {errors.content && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.content}
                                </p>
                            )}
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {formData.content.length} characters
                            </p>
                        </div>

                        {/* Tags */}
                        <div>
                            <label
                                htmlFor="tags"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                                Tags (Optional)
                            </label>
                            <input
                                type="text"
                                id="tags"
                                name="tags"
                                value={formData.tags}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="technology, coding, javascript (comma separated)"
                            />
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Separate tags with commas
                            </p>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Cover Image (Optional)
                            </label>

                            {imagePreview ? (
                                <div className="relative">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                                    >
                                        <FiX />
                                    </button>
                                </div>
                            ) : (
                                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                                    <FiImage className="mx-auto w-12 h-12 text-gray-400 mb-4" />
                                    <label
                                        htmlFor="image"
                                        className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        Click to upload
                                    </label>
                                    <input
                                        type="file"
                                        id="image"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                        PNG, JPG, GIF up to 5MB
                                    </p>
                                </div>
                            )}
                            {errors.image && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.image}
                                </p>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {loading ? (
                                    <Loader size="small" />
                                ) : (
                                    "Update Blog"
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditBlog;
