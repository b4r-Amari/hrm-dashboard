import { type RouteConfig, route, layout, index } from "@react-router/dev/routes";

export default [
  index('routes/root/sign-in.tsx'),
  layout( 'routes/admin/adminlayout.tsx', [
    route('dashboard', 'routes/admin/dashboard.tsx'),
    route('all-users', 'routes/admin/allusers.tsx'),
    route('athletes', 'routes/admin/athletes.tsx'),
    route('athletes/create', 'routes/admin/addathletes.tsx')
  ])
] satisfies RouteConfig;