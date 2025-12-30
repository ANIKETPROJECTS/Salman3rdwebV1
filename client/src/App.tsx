import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/LandingPage";
import AuthPage from "@/pages/AuthPage";
import ForgotPassword from "@/pages/ForgotPassword";
import DashboardHome from "@/pages/DashboardHome";
import ResourceList from "@/pages/ResourceList";
import AuthorResources from "@/pages/AuthorResources";
import Profile from "@/pages/Profile";

function ProtectedRoute({ component: Component, ...rest }: any) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Redirect to="/auth" />;
  }

  return <Component {...rest} />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/forgot-password" component={ForgotPassword} />
      
      {/* Protected Dashboard Routes */}
      <Route path="/dashboard">
        <ProtectedRoute component={DashboardHome} />
      </Route>
      
      <Route path="/dashboard/study-material">
        <ProtectedRoute 
          component={() => (
            <ResourceList 
              type="study_material" 
              title="Study Materials" 
              description="Access lecture notes, guides, and reference documents."
            />
          )} 
        />
      </Route>
      
      <Route path="/dashboard/question-papers">
        <ProtectedRoute 
          component={() => (
            <ResourceList 
              type="question_paper" 
              title="Question Papers" 
              description="Previous years' papers and model question banks."
            />
          )} 
        />
      </Route>
      
      <Route path="/dashboard/videos">
        <ProtectedRoute 
          component={() => (
            <ResourceList 
              type="video" 
              title="Video Lectures" 
              description="Curated video content for classroom instruction."
            />
          )} 
        />
      </Route>

      <Route path="/dashboard/author-resources">
        <ProtectedRoute component={AuthorResources} />
      </Route>

      <Route path="/dashboard/profile">
        <ProtectedRoute component={Profile} />
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
