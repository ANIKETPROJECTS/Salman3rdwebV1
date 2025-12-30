import { DashboardLayout } from "@/components/DashboardLayout";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FileText, Video, ArrowRight, UserCheck, Upload, Bell, Settings, BarChart3, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
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
            <div className="grid gap-4 md:grid-cols-4">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-700">Total Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-700">147</div>
                  <p className="text-xs text-blue-600 mt-1">+12 this month</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-700">Active Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-700">2,847</div>
                  <p className="text-xs text-green-600 mt-1">+156 this week</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-700">Resource Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-amber-700">12.5K</div>
                  <p className="text-xs text-amber-600 mt-1">This week</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-700">Pending Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-700">8</div>
                  <p className="text-xs text-purple-600 mt-1">Needs approval</p>
                </CardContent>
              </Card>
            </div>

            {/* Admin Management Section */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Upload className="h-5 w-5 text-blue-600" />
                    <CardTitle>Content Management</CardTitle>
                  </div>
                  <CardDescription>Upload and manage platform resources</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-slate-700">Quick actions for managing resources:</p>
                  <div className="space-y-2">
                    <AddResourceDialog />
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <FileText className="h-4 w-4" />
                      Review Pending Items
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <BarChart3 className="h-4 w-4" />
                      View Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-100 bg-gradient-to-br from-green-50 to-white">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-600" />
                    <CardTitle>Community Management</CardTitle>
                  </div>
                  <CardDescription>Manage users and send announcements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-slate-700">Community actions:</p>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Bell className="h-4 w-4" />
                      Send Announcement
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Users className="h-4 w-4" />
                      Manage Members
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Settings className="h-4 w-4" />
                      Platform Settings
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
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="hover:shadow-md transition-shadow border-t-4 border-t-blue-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Study Materials</CardTitle>
                  <BookOpen className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Access</div>
                  <p className="text-xs text-muted-foreground mt-2">Comprehensive notes & guides</p>
                  <Link href="/dashboard/study-material">
                    <Button variant="link" className="px-0 h-auto mt-4 text-blue-600">
                      View All <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow border-t-4 border-t-amber-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Question Papers</CardTitle>
                  <FileText className="h-4 w-4 text-amber-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Practice</div>
                  <p className="text-xs text-muted-foreground mt-2">Previous years & mock tests</p>
                  <Link href="/dashboard/question-papers">
                    <Button variant="link" className="px-0 h-auto mt-4 text-amber-600">
                      View All <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow border-t-4 border-t-green-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Video Lectures</CardTitle>
                  <Video className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Learn</div>
                  <p className="text-xs text-muted-foreground mt-2">Expert sessions & tutorials</p>
                  <Link href="/dashboard/videos">
                    <Button variant="link" className="px-0 h-auto mt-4 text-green-600">
                      View All <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Additional Resources */}
            <Card className="border-l-4 border-l-indigo-500 hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-indigo-600" />
                  Author & Paper Setter Resources
                </CardTitle>
                <CardDescription>Specialized materials from physics experts and board examiners</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/dashboard/author-resources">
                  <Button className="gap-2">
                    Explore Resources <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </>
        )}

        {/* Announcements Section - Visible to Both Admin and Teachers */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold font-serif text-slate-900">Announcements</h2>
            {isAdmin && (
              <Button variant="outline" size="sm" className="gap-2">
                <Bell className="h-4 w-4" />
                Post Announcement
              </Button>
            )}
          </div>

          <div className="grid gap-4">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="text-2xl flex-shrink-0">{announcement.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-slate-900 text-lg">{announcement.title}</h3>
                        <Badge 
                          variant="outline"
                          className={
                            announcement.type === 'curriculum' ? 'bg-blue-50 text-blue-700' :
                            announcement.type === 'event' ? 'bg-green-50 text-green-700' :
                            'bg-amber-50 text-amber-700'
                          }
                        >
                          {announcement.type}
                        </Badge>
                      </div>
                      <p className="text-slate-700 mb-3">{announcement.content}</p>
                      <p className="text-xs text-muted-foreground">Posted {announcement.date}</p>
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
