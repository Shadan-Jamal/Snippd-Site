import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "react-router";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { ThemeProvider } from "@/lib/theme";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";

const themeScript = `(function(){try{var t=localStorage.getItem("snippd-theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})();`;

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Analytics />
      <div className="flex min-h-screen flex-col">
        <SiteNav />
        <div className="flex-1">
          <Outlet />
        </div>
        <SiteFooter />
      </div>
    </ThemeProvider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const isNotFound = isRouteErrorResponse(error) && error.status === 404;

  return (
    <main className="mx-auto max-w-3xl px-6 pt-28">
      <h1 className="text-2xl font-semibold">
        {isNotFound ? "Page not found" : "Something went wrong"}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {isNotFound
          ? "The page you are looking for does not exist."
          : "An unexpected error occurred. Please try again."}
      </p>
      <a
        href="/"
        className="mt-4 inline-block text-sm text-muted-foreground underline"
      >
        Back home
      </a>
    </main>
  );
}
