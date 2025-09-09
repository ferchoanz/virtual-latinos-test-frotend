import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    route('/login', 'routes/auth/login.tsx'),
    route('/posts', 'routes/post/post.tsx'),
    route('/posts/create', 'routes/post/createPost.tsx'),
    route('/posts/:id', 'routes/post/postShow.tsx'),
    route('/posts/:id/edit', 'routes/post/postEdit.tsx')
] satisfies RouteConfig;
