import { DashboardLayout } from "@/components/DashboardLayout";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FileText, Video, ArrowRight, UserCheck, Upload, Bell, Settings, BarChart3, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { AddResourceDialog } from "@/components/AddResourceDialog";

export default function DashboardHome() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  // Announcements data (would come from API in real app)
  const announcements = [
    {
      id: 1,
      title: "2025 ICSE Physics Curriculum Update",
      content: "Important changes to Class 11 and 12 syllabi. New focus areas include modern physics applications.",
      type: "curriculum",
      date: "2 days ago",
      icon: "📋"
    },
    {
      id: 2,
      title: "Expert Workshop: Quantum Mechanics Made Easy",
      content: "Join Dr. Rajesh Sharma for an interactive workshop on teaching quantum mechanics effectively. This Saturday 2 PM IST.",
      type: "event",
      date: "5 days ago",
      icon: "🎓"
    },
    {
      id: 3,
      title: "New Question Bank: Class 12 Board Papers 2024",
      content: "Complete analysis of 2024 board examination papers with marking schemes and common mistakes students make.",
      type: "resource",
      date: "1 week ago",
      icon: "📝"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold tracking-tight text-slate-900">
              {isAdmin ? "Admin Dashboard" : "Welcome Back"}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isAdmin 
                ? "Manage platform resources and oversee the community"
                : `Great to see you, ${user?.name}! Access your learning resources below.`}
            </p>
          </div>
          {isAdmin && <AddResourceDialog />}
        </div>

        {/* Admin Dashboard - Admin Specific View */}
        {isAdmin ? (
          <>
            {/* Admin Stats Grid */}
            <div className="grid gap-6 md:grid-cols-4">
              <StatCard title="Total Resources" value="147" subValue="+12 this month" color="emerald" />
              <StatCard title="Active Members" value="2,847" subValue="+156 this week" color="emerald" />
              <StatCard title="Resource Views" value="12.5K" subValue="This week" color="emerald" />
              <StatCard title="Pending Reviews" value="8" subValue="Needs approval" color="emerald" />
            </div>

            {/* Admin Management Section */}
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="border-none shadow-md shadow-slate-200/50 rounded-2xl ring-1 ring-slate-100 overflow-hidden">
                <CardHeader className="bg-slate-50/50 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-emerald-100 rounded-xl">
                      <Upload className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-serif text-slate-900">Content Management</CardTitle>
                      <CardDescription className="text-slate-500 font-medium">Upload and manage platform resources</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-8 space-y-6">
                  <div className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100 space-y-2">
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Quick Actions</h4>
                    <p className="text-sm text-slate-500 font-medium">Commonly used tools for managing your resources.</p>
                  </div>
                  <div className="grid gap-4">
                    <AddResourceDialog />
                    <Button variant="outline" className="justify-start gap-3 h-12 rounded-xl border-slate-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-100 transition-all font-bold">
                      <FileText className="h-5 w-5" /> Review Pending Items
                    </Button>
                    <Button variant="outline" className="justify-start gap-3 h-12 rounded-xl border-slate-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-100 transition-all font-bold">
                      <BarChart3 className="h-5 w-5" /> View Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md shadow-slate-200/50 rounded-2xl ring-1 ring-slate-100 overflow-hidden">
                <CardHeader className="bg-slate-50/50 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-emerald-100 rounded-xl">
                      <Users className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-serif text-slate-900">Community Management</CardTitle>
                      <CardDescription className="text-slate-500 font-medium">Manage users and send announcements</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-8 space-y-6">
                  <div className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100 space-y-2">
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Communication</h4>
                    <p className="text-sm text-slate-500 font-medium">Keep your community informed and engaged.</p>
                  </div>
                  <div className="grid gap-4">
                    <Button className="gap-3 h-12 bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-lg shadow-slate-200 font-bold">
                      <Bell className="h-5 w-5" /> Post New Announcement
                    </Button>
                    <Button variant="outline" className="justify-start gap-3 h-12 rounded-xl border-slate-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-100 transition-all font-bold">
                      <Users className="h-5 w-5" /> Manage Members
                    </Button>
                    <Button variant="outline" className="justify-start gap-3 h-12 rounded-xl border-slate-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-100 transition-all font-bold">
                      <Settings className="h-5 w-5" /> Platform Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        ) : (
          /* Teacher/Member Dashboard - Learning Resources View */
          <>
            {/* Resource Cards Grid */}
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="group hover:shadow-xl transition-all duration-300 border-none bg-white shadow-sm ring-1 ring-slate-200 hover:ring-emerald-500/50 relative overflow-hidden rounded-2xl">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500" />
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <CardTitle className="text-xl font-serif text-slate-900">Study Materials</CardTitle>
                  <CardDescription className="text-slate-500 font-medium">Comprehensive notes & expert guides</CardDescription>
                </CardHeader>
                <CardFooter className="pt-0 pb-6">
                  <Link href="/dashboard/study-material" className="w-full">
                    <Button variant="link" className="px-0 h-auto text-blue-600 font-bold hover:no-underline">
                      Explore Library
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              
              <Card className="group hover:shadow-xl transition-all duration-300 border-none bg-white shadow-sm ring-1 ring-slate-200 hover:ring-emerald-500/50 relative overflow-hidden rounded-2xl">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500" />
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 bg-amber-50 rounded-xl text-amber-600">
                      <FileText className="h-6 w-6" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-amber-500 transition-colors" />
                  </div>
                  <CardTitle className="text-xl font-serif text-slate-900">Question Papers</CardTitle>
                  <CardDescription className="text-slate-500 font-medium">Previous years & mock test papers</CardDescription>
                </CardHeader>
                <CardFooter className="pt-0 pb-6">
                  <Link href="/dashboard/question-papers" className="w-full">
                    <Button variant="link" className="px-0 h-auto text-amber-600 font-bold hover:no-underline">
                      Practice Now
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              
              <Card className="group hover:shadow-xl transition-all duration-300 border-none bg-white shadow-sm ring-1 ring-slate-200 hover:ring-emerald-500/50 relative overflow-hidden rounded-2xl">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500" />
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600">
                      <Video className="h-6 w-6" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                  </div>
                  <CardTitle className="text-xl font-serif text-slate-900">Video Lectures</CardTitle>
                  <CardDescription className="text-slate-500 font-medium">Expert sessions & visual tutorials</CardDescription>
                </CardHeader>
                <CardFooter className="pt-0 pb-6">
                  <Link href="/dashboard/videos" className="w-full">
                    <Button variant="link" className="px-0 h-auto text-emerald-600 font-bold hover:no-underline">
                      Watch Sessions
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>

            {/* Additional Resources */}
            <Card className="border-none shadow-md shadow-slate-200/50 rounded-3xl ring-1 ring-slate-100 overflow-hidden bg-slate-900 text-white">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
              <CardHeader className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 bg-emerald-500/20 rounded-xl">
                    <BookOpen className="h-6 w-6 text-emerald-400" />
                  </div>
                  <CardTitle className="text-2xl font-serif">Author & Paper Setter Resources</CardTitle>
                </div>
                <CardDescription className="text-slate-400 text-lg font-medium">Specialized materials from physics experts and board examiners</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 pb-8">
                <Link href="/dashboard/author-resources">
                  <Button className="gap-3 h-12 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl px-8 shadow-lg shadow-emerald-900/20 font-bold transition-all active:scale-95">
                    Explore Resources <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </>
        ) || null}

        {/* Announcements Section - Visible to Both Admin and Teachers */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-serif font-bold text-slate-900">Recent Announcements</h2>
            {isAdmin && (
              <Button variant="outline" size="sm" className="gap-2 border-slate-200 hover:bg-emerald-50 rounded-xl font-bold">
                <Bell className="h-4 w-4 text-emerald-600" />
                Post New
              </Button>
            )}
          </div>

          <div className="grid gap-6">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="group hover:shadow-lg transition-all duration-300 border-none bg-white shadow-sm ring-1 ring-slate-100 rounded-3xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex gap-6 items-start">
                    <div className="text-3xl p-4 bg-slate-50 rounded-2xl group-hover:bg-emerald-50 transition-colors shrink-0">{announcement.icon}</div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-xl font-bold text-slate-900">{announcement.title}</h3>
                        <Badge 
                          variant="secondary"
                          className={cn(
                            "font-bold text-[10px] uppercase tracking-widest px-3 py-1 border-none",
                            announcement.type === 'curriculum' ? 'bg-blue-100 text-blue-700' :
                            announcement.type === 'event' ? 'bg-emerald-100 text-emerald-700' :
                            'bg-amber-100 text-amber-700'
                          )}
                        >
                          {announcement.type}
                        </Badge>
                      </div>
                      <p className="text-slate-600 font-medium leading-relaxed max-w-4xl">{announcement.content}</p>
                      <div className="flex items-center gap-4 pt-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Posted {announcement.date}</span>
                        <div className="h-1 w-1 rounded-full bg-slate-300" />
                        <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest cursor-pointer hover:underline">View Details</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ title, value, subValue, color }: { title: string, value: string, subValue: string, color: string }) {
  const colorMap: Record<string, string> = {
    blue: "from-blue-50 to-blue-100 border-blue-200 text-blue-700",
    emerald: "from-emerald-50 to-emerald-100 border-emerald-200 text-emerald-700",
    amber: "from-amber-50 to-amber-100 border-amber-200 text-amber-700",
    purple: "from-purple-50 to-purple-100 border-purple-200 text-purple-700",
  };

  return (
    <Card className={cn("bg-gradient-to-br border-none shadow-sm ring-1 ring-slate-200/60 rounded-2xl overflow-hidden", colorMap[color])}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-600">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-black">{value}</div>
        <p className="text-xs font-bold mt-2 opacity-80 uppercase tracking-widest">{subValue}</p>
      </CardContent>
    </Card>
  );
}
