import {
  type RouteConfig,
  index,
  route,
} from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  route("docs", "./routes/docs.tsx"),
  route("docs/:id", "./routes/doc-section.tsx"),
  route("*", "./routes/not-found.tsx"),
] satisfies RouteConfig;
