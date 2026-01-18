import {
	type RouteConfigEntry,
	index,
	route,
} from '@react-router/dev/routes';

// Static route configuration for production builds
const routes: RouteConfigEntry[] = [
	index('./page.jsx'),
	route('blog', './blog/page.jsx'),
	route('*', './__create/not-found.tsx'),
];

export default routes;
