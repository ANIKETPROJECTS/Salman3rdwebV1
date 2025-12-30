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
      case "video": return <Video className="h-5 w-5 text-blue-500" />;
      case "question_paper": return <FileText className="h-5 w-5 text-amber-500" />;
      default: return <BookOpen className="h-5 w-5 text-green-500" />;
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
    <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary/0 hover:border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            {getIcon()}
            <span>{getTypeName()}</span>
          </div>
          {resource.isNew && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
              New
            </Badge>
          )}
        </div>
        <CardTitle className="line-clamp-2 text-lg font-serif group-hover:text-primary transition-colors">
          {resource.title}
        </CardTitle>
        <CardDescription className="line-clamp-2 mt-1">
          {resource.description || "No description provided."}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1 bg-secondary/50 px-2 py-1 rounded">
            <Calendar className="h-3 w-3" />
            <span>Year: {resource.year}</span>
          </div>
          {resource.classLevel && (
            <div className="flex items-center gap-1 bg-secondary/50 px-2 py-1 rounded">
              <span className="font-semibold">Class {resource.classLevel}</span>
            </div>
          )}
          <div className="flex items-center gap-1 bg-secondary/50 px-2 py-1 rounded ml-auto">
            <span>{resource.subject}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-3 border-t bg-slate-50/50 flex justify-between">
        <Button variant="outline" size="sm" asChild className="gap-2">
          <a href={resource.link} target="_blank" rel="noopener noreferrer">
            {resource.type === "video" ? <ExternalLink className="h-3.5 w-3.5" /> : <Download className="h-3.5 w-3.5" />}
            {resource.type === "video" ? "Watch Video" : "Download PDF"}
          </a>
        </Button>
        
        {isAdmin && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-muted-foreground hover:text-destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
