import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-foreground text-background font-display font-bold">
            P
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">Patota</span>
        </Link>
        <nav aria-label="Principal" className="hidden items-center gap-7 text-sm md:flex">
          <Link to="/sobre" className="text-muted-foreground hover:text-foreground" activeProps={{ className: "text-foreground font-semibold" }}>Sobre</Link>
          <Link to="/metodologia" className="text-muted-foreground hover:text-foreground" activeProps={{ className: "text-foreground font-semibold" }}>Metodologia</Link>
          <Link to="/acessibilidade" className="text-muted-foreground hover:text-foreground" activeProps={{ className: "text-foreground font-semibold" }}>Acessibilidade</Link>
          <Link to="/contato" className="text-muted-foreground hover:text-foreground" activeProps={{ className: "text-foreground font-semibold" }}>Contato</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="default" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/app">Abrir protótipo</Link>
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
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-accent-foreground font-display font-bold">P</div>
            <span className="font-display text-lg font-semibold">Patota</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-background/70">
            Solução colaborativa, acessível e gratuita para a gestão de patotas de futebol.
          </p>
        </div>
        <div className="text-sm text-background/70">
          <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-background">Projeto</h3>
          <ul className="space-y-2">
            <li><Link to="/sobre" className="hover:text-background">Sobre</Link></li>
            <li><Link to="/metodologia" className="hover:text-background">Metodologia (M3C)</Link></li>
            <li><Link to="/acessibilidade" className="hover:text-background">Acessibilidade (WCAG)</Link></li>
          </ul>
        </div>
        <div className="text-sm text-background/70">
          <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-background">Atividade de Extensão</h3>
          <p>Público-alvo: grupos de patotas de futebol da comunidade local.</p>
          <p className="mt-2">© {new Date().getFullYear()} Projeto Patota.</p>
        </div>
      </div>
    </footer>
  );
}
