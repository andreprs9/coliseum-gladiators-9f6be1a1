import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/65">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/time" className="flex items-center gap-3" aria-label="Gladiators Futebol Americano">
          <img src={logo} alt="" aria-hidden="true" width={400} height={200} className="h-10 w-auto" />
          <span className="hidden text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:block">Futebol Americano</span>
        </Link>
        <nav aria-label="Principal" className="hidden items-center gap-7 text-sm md:flex">
          <Link to="/time" className="text-muted-foreground hover:text-foreground" activeProps={{ className: "text-foreground font-semibold" }}>O Time</Link>
          <Link to="/elenco" className="text-muted-foreground hover:text-foreground" activeProps={{ className: "text-foreground font-semibold" }}>Elenco</Link>
          <Link to="/calendario" className="text-muted-foreground hover:text-foreground" activeProps={{ className: "text-foreground font-semibold" }}>Calendário</Link>
          <Link to="/contato" className="text-muted-foreground hover:text-foreground" activeProps={{ className: "text-foreground font-semibold" }}>Contato</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" className="hidden sm:inline-flex">
            <Link to="/login">Área do Time</Link>
          </Button>
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/contato">Faça parte</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="" aria-hidden="true" width={400} height={200} className="h-11 w-auto" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-background/60">Futebol Americano</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-background/70">
            15 anos construindo uma trajetória marcada por paixão, determinação e momentos memoráveis no futebol americano.
          </p>
        </div>
        <div className="text-sm text-background/70">
          <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-background">Navegação</h3>
          <ul className="space-y-2">
            <li><Link to="/time" className="hover:text-background">O Time</Link></li>
            <li><Link to="/elenco" className="hover:text-background">Elenco</Link></li>
            <li><Link to="/calendario" className="hover:text-background">Calendário</Link></li>
            <li><Link to="/contato" className="hover:text-background">Contato</Link></li>
          </ul>
        </div>
        <div className="text-sm text-background/70">
          <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-background">Lema</h3>
          <p className="font-display text-lg italic text-background">"O que fazemos na vida ecoa na eternidade."</p>
          <p className="mt-4">© {new Date().getFullYear()} Gladiators Futebol Americano.</p>
        </div>
      </div>
    </footer>
  );
}
