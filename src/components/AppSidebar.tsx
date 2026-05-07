import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Users, CalendarDays, MessageSquare, Trophy, Accessibility, Home } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

const items = [
  { title: "Visão Geral", url: "/app", icon: LayoutDashboard },
  { title: "Patotas", url: "/app/patotas", icon: Trophy },
  { title: "Jogos", url: "/app/jogos", icon: CalendarDays },
  { title: "Membros", url: "/app/membros", icon: Users },
  { title: "Mural", url: "/app/mural", icon: MessageSquare },
];

export function AppSidebar() {
  const currentPath = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (path: string) =>
    path === "/app" ? currentPath === "/app" : currentPath.startsWith(path);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2 px-2 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-accent-foreground font-display font-bold">
            P
          </div>
          <span className="font-display text-lg font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
            Patota
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Protótipo</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" aria-hidden="true" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Projeto</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Acessibilidade">
                  <Link to="/acessibilidade">
                    <Accessibility className="h-4 w-4" aria-hidden="true" />
                    <span>Acessibilidade</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Voltar à landing">
                  <Link to="/">
                    <Home className="h-4 w-4" aria-hidden="true" />
                    <span>Landing</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-3 text-xs text-sidebar-foreground/60 group-data-[collapsible=icon]:hidden">
        v1 · Extensão UNIASSELVI
      </SidebarFooter>
    </Sidebar>
  );
}
