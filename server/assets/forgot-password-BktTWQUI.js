import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { C as Card, b as CardHeader, c as CardTitle, d as CardDescription, a as CardContent } from "./card-bUfKKQGp.js";
import { I as Input } from "./input-C0QjszdI.js";
import { L as Label } from "./label-JU3yqRBo.js";
import { B as Button } from "./button-CVL4MaTW.js";
import { s as supabase } from "./router-BpKtBDtA.js";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "@tanstack/react-query";
import "@supabase/supabase-js";
function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const {
      error: error2
    } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `https://coliseum-gladiators-9f6be1a1.andrepires-ciber.workers.dev/reset-password`
    });
    if (error2) {
      setError(error2.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  };
  return /* @__PURE__ */ jsx("main", { className: "flex min-h-screen items-center justify-center bg-foreground px-4 py-12", children: /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-md border-border/30 bg-card shadow-2xl", children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "space-y-3 text-center", children: [
      /* @__PURE__ */ jsx(CardTitle, { className: "font-display text-2xl", children: "Esqueci a senha" }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Digite seu email e enviaremos um link para redefinir sua senha." })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: sent ? /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "✅ Email enviado! Verifique sua caixa de entrada e clique no link para redefinir sua senha." }),
      /* @__PURE__ */ jsx(Link, { to: "/login", className: "text-xs text-accent hover:underline", children: "Voltar para o login" })
    ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
        /* @__PURE__ */ jsx(Input, { id: "email", type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "atleta@gladiators.com.br" })
      ] }),
      error && /* @__PURE__ */ jsx("p", { className: "text-center text-sm text-destructive", children: error }),
      /* @__PURE__ */ jsx(Button, { type: "submit", disabled: loading, className: "w-full bg-accent text-accent-foreground hover:bg-accent/90", children: loading ? "Enviando…" : "Enviar link" }),
      /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx(Link, { to: "/login", className: "text-xs text-accent hover:underline", children: "Voltar para o login" }) })
    ] }) })
  ] }) });
}
export {
  ForgotPasswordPage as component
};
