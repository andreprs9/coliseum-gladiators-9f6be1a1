import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Dumbbell, ListChecks, CalendarDays, Bell, Users, TrendingUp, Home, BookOpen, ClipboardList } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import logo from "@/assets/logo.png";
import { useRole } from "@/lib/role-context";

type NavItem = { title: string; url: string; icon: typeof LayoutDashboard; exact?: boolean };

const baseItems: NavItem[] = [
  { title: "Painel", url: "/app", icon: LayoutDashboard, exact: true },
  { title: "Treinos", url: "/app/treinos", icon: Dumbbell },
  { title: "Tarefas", url: "/app/tarefas", icon: ListChecks },
  { title: "Jogos", url: "/app/jogos", icon: CalendarDays },
  { title: "Jogadas", url: "/app/jogadas", icon: BookOpen },
  { title: "Notificações", url: "/app/notificacoes", icon: Bell },
];

const treinadorItems: NavItem[] = [
  { title: "Atletas", url: "/app/atletas", icon: Users },
  { title: "Monitoramento", url: "/app/monitoramento", icon: ClipboardList },
];
const atletaItems: NavItem[] = [{ title: "Meu Desempenho", url: "/app/desempenho", icon: TrendingUp }];

export function AppSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { role } = useRole();
  const items = [...baseItems, ...(role === "treinador" ? treinadorItems : atletaItems)];

  const isActive = (url: string, exact?: boolean) => (exact ? path === url : path === url || path.startsWith(url + "/"));

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/app" className="flex items-center gap-2 px-2 py-1">
          <img src={logo} alt="" aria-hidden="true" className="h-8 w-auto" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sidebar-foreground/70 group-data-[collapsible=icon]:hidden">
            Gestão do Time
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url, item.exact)} tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Voltar ao site">
              <Link to="/">
                <Home className="h-4 w-4" />
                <span>Voltar ao site</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
