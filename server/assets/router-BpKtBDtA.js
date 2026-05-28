import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, useRouter, Link, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect, createContext, useContext } from "react";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ljimokpvbktoexgipbeh.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqaW1va3B2Ymt0b2V4Z2lwYmVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5ODM5ODAsImV4cCI6MjA5NDU1OTk4MH0.2y2qC--ZtiGdrHN6fZMsoxHOl2qm37G_2cM1YPVbjIM";
const supabase = createClient(supabaseUrl, supabaseKey);
const AuthContext = createContext(null);
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      if (data.session?.user) fetchRole(data.session.user.id);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchRole(session.user.id);
      else setRole(null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);
  const fetchRole = async (userId) => {
    const { data } = await supabase.from("profiles").select("role").eq("id", userId).single();
    setRole(data?.role ?? "atleta");
  };
  const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
  };
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
  };
  const requestReset = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });
    if (error) throw new Error(error.message);
  };
  const resetPassword = async (password) => {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) throw new Error(error.message);
  };
  return /* @__PURE__ */ jsx(AuthContext.Provider, { value: { user, role, login, logout, requestReset, resetPassword }, children });
}
function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
const appCss = "/coliseum-gladiators/assets/styles-MmHnRNh1.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(Link, { to: "/login", className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90", children: "Ir para o login" }) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "Algo deu errado" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Tente novamente ou volte para o login." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Tentar novamente"
        }
      ),
      /* @__PURE__ */ jsx("a", { href: "/login", className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent", children: "Ir para o login" })
    ] })
  ] }) });
}
const Route$i = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Gladiators" },
      { name: "description", content: "Team Management App" },
      { property: "og:title", content: "Gladiators" },
      { property: "og:description", content: "Team Management App" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Gladiators" },
      { name: "twitter:description", content: "Team Management App" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/40c1a65c-9d2c-40b3-af30-0a4afd4c07cb/id-preview-97b780fe--60d0550e-9996-4617-a16a-21fc5c5a5338.lovable.app-1779056772809.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/40c1a65c-9d2c-40b3-af30-0a4afd4c07cb/id-preview-97b780fe--60d0550e-9996-4617-a16a-21fc5c5a5338.lovable.app-1779056772809.png" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [{ rel: "stylesheet", href: appCss }]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "pt-BR", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$i.useRouteContext();
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(AuthProvider, { children: /* @__PURE__ */ jsx(Outlet, {}) }) });
}
const $$splitComponentImporter$h = () => import("./time-Cj5qE6Qx.js");
const Route$h = createFileRoute("/time")({
  head: () => ({
    meta: [{
      title: "O Time · Gladiators Futebol Americano"
    }, {
      name: "description",
      content: "História, valores e comissão técnica do Gladiators Futebol Americano — 15 anos de paixão."
    }, {
      property: "og:title",
      content: "O Time · Gladiators"
    }, {
      property: "og:description",
      content: "15 anos forjando uma das maiores histórias do futebol americano."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./reset-password-XdKlSq6E.js");
const Route$g = createFileRoute("/reset-password")({
  head: () => ({
    meta: [{
      title: "Redefinir senha — Gladiators"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./login-DlxA_rw6.js");
const Route$f = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: "Entrar — Gladiators"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./forgot-password-BktTWQUI.js");
const Route$e = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [{
      title: "Esqueci a senha — Gladiators"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./elenco-CoL3J9G5.js");
const Route$d = createFileRoute("/elenco")({
  head: () => ({
    meta: [{
      title: "Elenco · Gladiators Futebol Americano"
    }, {
      name: "description",
      content: "Conheça os atletas do Gladiators Futebol Americano — temporada 2026."
    }, {
      property: "og:title",
      content: "Elenco · Gladiators"
    }, {
      property: "og:description",
      content: "Os guerreiros que vestem a armadura preta e vermelha."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./contato-GtnwT9sJ.js");
const Route$c = createFileRoute("/contato")({
  head: () => ({
    meta: [{
      title: "Contato · Gladiators Futebol Americano"
    }, {
      name: "description",
      content: "Fale com o Gladiators — atletas, torcedores e patrocinadores são bem-vindos."
    }, {
      property: "og:title",
      content: "Contato · Gladiators"
    }, {
      property: "og:description",
      content: "Vamos conversar."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./calendario-Bi3EP80C.js");
const Route$b = createFileRoute("/calendario")({
  head: () => ({
    meta: [{
      title: "Calendário · Gladiators Futebol Americano"
    }, {
      name: "description",
      content: "Calendário oficial de jogos do Gladiators Futebol Americano — temporada 2026."
    }, {
      property: "og:title",
      content: "Calendário · Gladiators"
    }, {
      property: "og:description",
      content: "Próximos jogos, mando de campo e resultados."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./app-IUpfSVeN.js");
const Route$a = createFileRoute("/app")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./index-FDwuVWDr.js");
const Route$9 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./app.index-BK2w3tYi.js");
const Route$8 = createFileRoute("/app/")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./app.treinos-CdnS4nnC.js");
const Route$7 = createFileRoute("/app/treinos")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./app.tarefas-BSfyDo1B.js");
const Route$6 = createFileRoute("/app/tarefas")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./app.notificacoes-B2LY6oVK.js");
const Route$5 = createFileRoute("/app/notificacoes")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./app.monitoramento-Bu0zyXul.js");
const Route$4 = createFileRoute("/app/monitoramento")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./app.jogos-BFcs9580.js");
const Route$3 = createFileRoute("/app/jogos")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./app.jogadas-Dq8MZcU9.js");
const Route$2 = createFileRoute("/app/jogadas")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./app.desempenho--nD8VJNB.js");
const Route$1 = createFileRoute("/app/desempenho")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./app.atletas-DdlvjCd_.js");
const Route = createFileRoute("/app/atletas")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const TimeRoute = Route$h.update({
  id: "/time",
  path: "/time",
  getParentRoute: () => Route$i
});
const ResetPasswordRoute = Route$g.update({
  id: "/reset-password",
  path: "/reset-password",
  getParentRoute: () => Route$i
});
const LoginRoute = Route$f.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$i
});
const ForgotPasswordRoute = Route$e.update({
  id: "/forgot-password",
  path: "/forgot-password",
  getParentRoute: () => Route$i
});
const ElencoRoute = Route$d.update({
  id: "/elenco",
  path: "/elenco",
  getParentRoute: () => Route$i
});
const ContatoRoute = Route$c.update({
  id: "/contato",
  path: "/contato",
  getParentRoute: () => Route$i
});
const CalendarioRoute = Route$b.update({
  id: "/calendario",
  path: "/calendario",
  getParentRoute: () => Route$i
});
const AppRoute = Route$a.update({
  id: "/app",
  path: "/app",
  getParentRoute: () => Route$i
});
const IndexRoute = Route$9.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$i
});
const AppIndexRoute = Route$8.update({
  id: "/",
  path: "/",
  getParentRoute: () => AppRoute
});
const AppTreinosRoute = Route$7.update({
  id: "/treinos",
  path: "/treinos",
  getParentRoute: () => AppRoute
});
const AppTarefasRoute = Route$6.update({
  id: "/tarefas",
  path: "/tarefas",
  getParentRoute: () => AppRoute
});
const AppNotificacoesRoute = Route$5.update({
  id: "/notificacoes",
  path: "/notificacoes",
  getParentRoute: () => AppRoute
});
const AppMonitoramentoRoute = Route$4.update({
  id: "/monitoramento",
  path: "/monitoramento",
  getParentRoute: () => AppRoute
});
const AppJogosRoute = Route$3.update({
  id: "/jogos",
  path: "/jogos",
  getParentRoute: () => AppRoute
});
const AppJogadasRoute = Route$2.update({
  id: "/jogadas",
  path: "/jogadas",
  getParentRoute: () => AppRoute
});
const AppDesempenhoRoute = Route$1.update({
  id: "/desempenho",
  path: "/desempenho",
  getParentRoute: () => AppRoute
});
const AppAtletasRoute = Route.update({
  id: "/atletas",
  path: "/atletas",
  getParentRoute: () => AppRoute
});
const AppRouteChildren = {
  AppAtletasRoute,
  AppDesempenhoRoute,
  AppJogadasRoute,
  AppJogosRoute,
  AppMonitoramentoRoute,
  AppNotificacoesRoute,
  AppTarefasRoute,
  AppTreinosRoute,
  AppIndexRoute
};
const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AppRoute: AppRouteWithChildren,
  CalendarioRoute,
  ContatoRoute,
  ElencoRoute,
  ForgotPasswordRoute,
  LoginRoute,
  ResetPasswordRoute,
  TimeRoute
};
const routeTree = Route$i._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  router as r,
  supabase as s,
  useAuth as u
};
