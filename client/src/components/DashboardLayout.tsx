import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  Video, 
  LogOut, 
  Menu,
  User
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const [location] = useLocation();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/study-material", label: "Study Materials", icon: BookOpen },
    { href: "/dashboard/question-papers", label: "Question Papers", icon: FileText },
    { href: "/dashboard/videos", label: "Video Lectures", icon: Video },
    { href: "/dashboard/author-resources", label: "Author Resources", icon: BookOpen },
    { href: "/dashboard/profile", label: "Profile", icon: User },
  ];

  const Sidebar = ({ className }: { className?: string }) => (
    <div className={cn("flex h-full flex-col border-r bg-white", className)}>
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-serif font-bold text-lg text-primary">
          <BookOpen className="h-6 w-6" />
          <span>AIPTA Portal</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-6">
        <nav className="grid gap-1 px-4">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3",
                    isActive && "bg-blue-50 text-blue-700 font-medium"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="border-t p-4">
        <div className="flex items-center gap-3 px-2 py-4">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
            {user?.username?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="overflow-hidden">
            <p className="truncate text-sm font-medium">{user?.name || "User"}</p>
            <p className="truncate text-xs text-muted-foreground capitalize">{user?.role || "Member"}</p>
          </div>
        </div>
        <Button variant="outline" className="w-full justify-start gap-3 text-muted-foreground" onClick={() => logout()}>
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 lg:block fixed inset-y-0 z-30">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:pl-64 min-h-screen">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b bg-white/80 px-6 backdrop-blur lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="-ml-2">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <Sidebar className="border-none" />
            </SheetContent>
          </Sheet>
          <span className="font-serif font-bold text-lg">AIPTA Portal</span>
        </header>
        
        <main className="flex-1 p-6 lg:p-8 overflow-x-hidden">
          <div className="mx-auto max-w-6xl animate-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
