import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Video, Download, ExternalLink, Calendar, BookOpen, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useDeleteResource } from "@/hooks/use-resources";
import { useToast } from "@/hooks/use-toast";
import type { ResourceResponse } from "@shared/schema";

interface ResourceCardProps {
  resource: ResourceResponse;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const { user } = useAuth();
  const { mutate: deleteResource, isPending } = useDeleteResource();
  const { toast } = useToast();

  const isAdmin = user?.role === "admin";

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this resource?")) {
      deleteResource(resource.id, {
        onSuccess: () => {
          toast({ title: "Resource deleted", description: "The resource has been removed successfully." });
        },
        onError: () => {
          toast({ title: "Error", description: "Failed to delete resource.", variant: "destructive" });
        }
      });
    }
  };

  const getIcon = () => {
    switch (resource.type) {
      case "video": return <Video className="h-5 w-5 text-emerald-500" />;
      case "question_paper": return <FileText className="h-5 w-5 text-emerald-500" />;
      default: return <BookOpen className="h-5 w-5 text-emerald-500" />;
    }
  };

  const getTypeName = () => {
    switch (resource.type) {
      case "video": return "Video Lecture";
      case "question_paper": return "Question Paper";
      default: return "Study Material";
    }
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-none bg-white shadow-sm ring-1 ring-slate-200 hover:ring-emerald-500/50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700/70 mb-2">
            <div className="p-1.5 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-colors">
              {getIcon()}
            </div>
            <span>{getTypeName()}</span>
          </div>
          {resource.isNew && (
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200 font-bold text-[10px] px-2 py-0">
              NEW
            </Badge>
          )}
        </div>
        <CardTitle className="line-clamp-2 text-xl font-serif text-slate-900 group-hover:text-emerald-700 transition-colors leading-tight">
          {resource.title}
        </CardTitle>
        <CardDescription className="line-clamp-2 mt-2 text-slate-600 font-medium leading-relaxed">
          {resource.description || "No description provided."}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-4">
        <div className="flex flex-wrap gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-md border border-slate-100">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <span className="font-semibold text-slate-700">{resource.year}</span>
          </div>
          {resource.classLevel && (
            <div className="flex items-center gap-1.5 bg-emerald-50/50 px-2.5 py-1.5 rounded-md border border-emerald-100/50">
              <span className="font-bold text-emerald-700">Class {resource.classLevel}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-md border border-slate-100 ml-auto">
            <span className="font-bold text-slate-600">{resource.subject}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-4 border-t border-slate-50 bg-slate-50/30 flex justify-between items-center">
        <Button variant="default" size="sm" asChild className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-200 transition-all active:scale-95">
          <a href={resource.link} target="_blank" rel="noopener noreferrer">
            {resource.type === "video" ? <ExternalLink className="h-4 w-4" /> : <Download className="h-4 w-4" />}
            <span className="font-bold">{resource.type === "video" ? "Watch Now" : "Download Resource"}</span>
          </a>
        </Button>
        
        {isAdmin && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors rounded-full"
            onClick={handleDelete}
            disabled={isPending}
          >
            <Trash2 className="h-4.5 w-4.5" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
