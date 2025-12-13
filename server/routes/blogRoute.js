import express from "express";
import { createBlog, deleteBlog, showAllBlog, showBlog, updateBlog } from "../controllers/blogController.js";
import { protectRoute } from "../middleware/auth.js";

const blogRouter = express.Router();

blogRouter.get('/', protectRoute, showAllBlog);

blogRouter.post('/create', protectRoute, createBlog);

blogRouter.delete('/:id', protectRoute, deleteBlog);

blogRouter.get('/:id', protectRoute, showBlog);

blogRouter.put('/:id', protectRoute, updateBlog);

export default blogRouter;
