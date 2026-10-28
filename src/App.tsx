import { Route, Switch } from "wouter";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { DocsPage } from "@/pages/Docs";
import { DocSectionPage } from "@/pages/DocSection";
import { HomePage } from "@/pages/Home";
import { DOC_GUIDES, DOC_COMMANDS } from "@/data/docs";

export default function App() {
  const docRoutes = [
    ...DOC_GUIDES.map((g) => ({ path: `/docs/${g.id}`, id: g.id })),
    ...DOC_COMMANDS.map((c) => ({ path: `/docs/${c.id}`, id: c.id })),
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav />
      <div className="flex-1">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/docs" component={DocsPage} />
          {docRoutes.map((route) => (
            <Route key={route.path} path={route.path}>
              <DocSectionPage id={route.id} />
            </Route>
          ))}
          <Route>
            <main className="mx-auto max-w-3xl px-6 pt-28">
              <h1 className="text-2xl font-semibold">Not found</h1>
              <a href="/" className="mt-4 inline-block text-sm text-muted-foreground underline">
                Back home
              </a>
            </main>
          </Route>
        </Switch>
      </div>
      <SiteFooter />
    </div>
  );
}

