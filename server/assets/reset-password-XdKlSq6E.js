import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
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
function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const {
      data: listener
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" && session) {
        setReady(true);
      }
    });
    const hash = window.location.hash;
    if (hash && hash.includes("access_token")) {
      const params = new URLSearchParams(hash.replace("#", "?"));
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");
      if (accessToken && refreshToken) {
        supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken
        }).then(({
          error
        }) => {
          if (!error) setReady(true);
          else setMessage("Link inválido ou expirado.");
        });
      } else {
        setMessage("Link inválido ou expirado.");
      }
    } else {
      setMessage("Link inválido ou expirado.");
    }
    return () => listener.subscription.unsubscribe();
  }, []);
  const submit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setMessage("As senhas não coincidem.");
      return;
    }
    if (password.length < 6) {
      setMessage("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    setLoading(true);
    const {
      error
    } = await supabase.auth.updateUser({
      password
    });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Senha redefinida com sucesso!");
      await supabase.auth.signOut();
      setTimeout(() => navigate({
        to: "/login"
      }), 2e3);
    }
    setLoading(false);
  };
  return /* @__PURE__ */ jsx("main", { className: "flex min-h-screen items-center justify-center bg-foreground px-4 py-12", children: /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-md border-border/30 bg-card shadow-2xl", children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "space-y-3 text-center", children: [
      /* @__PURE__ */ jsx(CardTitle, { className: "font-display text-2xl", children: "Redefinir senha" }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Digite sua nova senha abaixo." })
    ] }),
    /* @__PURE__ */ jsxs(CardContent, { children: [
      !ready && !message && /* @__PURE__ */ jsx("p", { className: "text-center text-sm text-muted-foreground", children: "Verificando link…" }),
      !ready && message && /* @__PURE__ */ jsx("p", { className: "text-center text-sm text-destructive", children: message }),
      ready && /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Nova senha" }),
          /* @__PURE__ */ jsx(Input, { id: "password", type: "password", required: true, minLength: 6, value: password, onChange: (e) => setPassword(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "confirm", children: "Confirmar senha" }),
          /* @__PURE__ */ jsx(Input, { id: "confirm", type: "password", required: true, minLength: 6, value: confirm, onChange: (e) => setConfirm(e.target.value) })
        ] }),
        message && /* @__PURE__ */ jsx("p", { className: "text-center text-sm text-accent", children: message }),
        /* @__PURE__ */ jsx(Button, { type: "submit", disabled: loading, className: "w-full bg-accent text-accent-foreground hover:bg-accent/90", children: loading ? "Salvando…" : "Redefinir senha" })
      ] })
    ] })
  ] }) });
}
export {
  ResetPasswordPage as component
};
