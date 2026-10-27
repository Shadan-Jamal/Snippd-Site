import { Route, Switch } from "wouter";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { DocsPage } from "@/pages/Docs";
import { HomePage } from "@/pages/Home";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav />
      <div className="flex-1">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/docs" component={DocsPage} />
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

