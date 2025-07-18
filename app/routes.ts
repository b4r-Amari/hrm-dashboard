import { type RouteConfig, route, layout, index, prefix, } from "@react-router/dev/routes";

export default [
  layout("routes/admin/admin_layout.tsx", [
    index("routes/admin/dashboard.tsx"),
    index("routes/admin/all_users.tsx"),
  //   route("contact", "./marketing/contact.tsx"),
  // ]),
  // ...prefix("projects", [
  //   index("./projects/home.tsx"),
  //   layout("./projects/project-layout.tsx", [
  //     route(":pid", "./projects/project.tsx"),
  //     route(":pid/edit", "./projects/edit-project.tsx"),
  //   ]),
  ]),
] satisfies RouteConfig;
