import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ResourceCard } from "@/components/ResourceCard";
import { useResources } from "@/hooks/use-resources";
import { AddResourceDialog } from "@/components/AddResourceDialog";
import { useAuth } from "@/hooks/use-auth";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Search, FilterX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResourceListProps {
  type: "study_material" | "question_paper" | "video";
  title: string;
  description: string;
}

export default function ResourceList({ type, title, description }: ResourceListProps) {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState<string>("all");
  const [yearFilter, setYearFilter] = useState<string>("all");

  const { data: resources, isLoading } = useResources({ type });

  // Filter logic
  const filteredResources = resources?.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(search.toLowerCase()) || 
                          resource.subject?.toLowerCase().includes(search.toLowerCase());
    const matchesClass = classFilter === "all" || resource.classLevel === classFilter;
    const matchesYear = yearFilter === "all" || String(resource.year) === yearFilter;
    
    return matchesSearch && matchesClass && matchesYear;
  });

  // Get unique years and classes for filters
  const years = Array.from(new Set(resources?.map(r => r.year))).sort((a, b) => b - a);
  const classes = Array.from(new Set(resources?.map(r => r.classLevel).filter(Boolean))).sort();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold tracking-tight text-slate-900">{title}</h1>
            <p className="text-muted-foreground mt-1">{description}</p>
          </div>
          {isAdmin && <AddResourceDialog />}
        </div>

        {/* Filters Bar */}
        <div className="bg-white p-4 rounded-xl border shadow-sm space-y-4 sm:space-y-0 sm:flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by title or subject..." 
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {classes.map(c => <SelectItem key={c} value={c as string}>Class {c}</SelectItem>)}
              </SelectContent>
            </Select>

            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {years.map(y => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}
              </SelectContent>
            </Select>
            
            {(classFilter !== "all" || yearFilter !== "all" || search) && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => {
                  setSearch("");
                  setClassFilter("all");
                  setYearFilter("all");
                }}
                title="Clear filters"
              >
                <FilterX className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Content Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : filteredResources?.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed">
            <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Search className="h-6 w-6 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">No resources found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredResources?.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
