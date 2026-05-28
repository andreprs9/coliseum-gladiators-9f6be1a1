import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { C as Card, b as CardHeader, c as CardTitle, d as CardDescription, a as CardContent } from "./card-bUfKKQGp.js";
import { I as Input } from "./input-C0QjszdI.js";
import { L as Label } from "./label-JU3yqRBo.js";
import { B as Button } from "./button-CVL4MaTW.js";
import { u as useAuth } from "./router-BpKtBDtA.js";
import { l as logo } from "./logo-xJElNanM.js";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "@tanstack/react-query";
import "@supabase/supabase-js";
function LoginPage() {
  const {
    login,
    user
  } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.includes("access_token") && hash.includes("type=recovery")) {
      navigate({
        to: `/reset-password${hash}`
      });
    }
  }, [navigate]);
  useEffect(() => {
    if (user) navigate({
      to: "/app"
    });
  }, [user, navigate]);
  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate({
        to: "/app"
      });
    } catch (err) {
      setError(err.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx("main", { className: "flex min-h-screen items-center justify-center bg-foreground px-4 py-12", children: /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-md border-border/30 bg-card shadow-2xl", children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "space-y-3 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto flex items-center gap-2", children: /* @__PURE__ */ jsx("img", { src: logo, alt: "", "aria-hidden": "true", className: "h-12 w-auto" }) }),
      /* @__PURE__ */ jsx(CardTitle, { className: "font-display text-2xl", children: "Acesse a área do time" }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Entre com seu email para acessar treinos, jogos e jogadas." })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
        /* @__PURE__ */ jsx(Input, { id: "email", type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "atleta@gladiators.com.br" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Senha" }),
          /* @__PURE__ */ jsx(Link, { to: "/forgot-password", className: "text-xs text-accent hover:underline", children: "Esqueci a senha" })
        ] }),
        /* @__PURE__ */ jsx(Input, { id: "password", type: "password", required: true, value: password, onChange: (e) => setPassword(e.target.value) })
      ] }),
      error && /* @__PURE__ */ jsx("p", { className: "text-center text-sm text-destructive", children: error }),
      /* @__PURE__ */ jsx(Button, { type: "submit", disabled: loading, className: "w-full bg-accent text-accent-foreground hover:bg-accent/90", children: loading ? "Entrando…" : "Entrar" })
    ] }) })
  ] }) });
}
export {
  LoginPage as component
};
