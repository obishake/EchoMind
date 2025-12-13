import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FiUser, FiMail, FiImage, FiSave, FiX } from "react-icons/fi";
import Loader from "../components/Loader";

const Profile = () => {
    const { user, updateProfile } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: user?.username || "",
        fullName: user?.fullName || "",
        email: user?.email || "",
        bio: user?.bio || "",
        profilePic: user?.profilePic || "",
    });

    const [imagePreview, setImagePreview] = useState(user?.profilePic || "");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setErrors({ ...errors, profilePic: "Please select an image file" });
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setErrors({
                ...errors,
                profilePic: "Image size should be less than 5MB",
            });
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
            setFormData({ ...formData, profilePic: reader.result });
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImagePreview("");
        setFormData({ ...formData, profilePic: "" });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = "Username is required";
        } else if (formData.username.length < 3) {
            newErrors.username = "Username must be at least 3 characters";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        const result = await updateProfile(formData);
        setLoading(false);

        if (result.success) {
            navigate("/dashboard");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                        Edit Profile
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Profile Picture */}
                        <div className="flex flex-col items-center mb-8">
                            <div className="relative">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Profile"
                                        className="w-32 h-32 rounded-full object-cover border-4 border-blue-600"
                                    />
                                ) : (
                                    <div className="w-32 h-32 rounded-full bg-blue-600 flex items-center justify-center border-4 border-blue-600">
                                        <FiUser className="w-16 h-16 text-white" />
                                    </div>
                                )}
                                {imagePreview && (
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute top-0 right-0 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                                    >
                                        <FiX className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                            <label
                                htmlFor="profilePic"
                                className="mt-4 cursor-pointer text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
                            >
                                <FiImage /> Change Profile Picture
                            </label>
                            <input
                                type="file"
                                id="profilePic"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            {errors.profilePic && (
                                <p className="mt-2 text-sm text-red-500">
                                    {errors.profilePic}
                                </p>
                            )}
                        </div>

                        {/* Username */}
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                                Username *
                            </label>
                            <div className="relative">
                                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-4 py-3 border ${
                                        errors.username
                                            ? "border-red-500"
                                            : "border-gray-300 dark:border-gray-600"
                                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                                    placeholder="johndoe"
                                />
                            </div>
                            {errors.username && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.username}
                                </p>
                            )}
                        </div>

                        {/* Full Name */}
                        <div>
                            <label
                                htmlFor="fullName"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                                Full Name
                            </label>
                            <div className="relative">
                                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                                Email *
                            </label>
                            <div className="relative">
                                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-4 py-3 border ${
                                        errors.email
                                            ? "border-red-500"
                                            : "border-gray-300 dark:border-gray-600"
                                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                                    placeholder="you@example.com"
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Bio */}
                        <div>
                            <label
                                htmlFor="bio"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                                Bio
                            </label>
                            <textarea
                                id="bio"
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="Tell us about yourself..."
                            />
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {formData.bio.length} / 500 characters
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <Loader size="small" />
                                ) : (
                                    <>
                                        <FiSave /> Save Changes
                                    </>
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/dashboard")}
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

export default Profile;
