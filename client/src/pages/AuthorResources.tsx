import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";

interface AuthorResource {
  id: number;
  title: string;
  author: string;
  type: "book" | "paper" | "guide";
  year: number;
  description: string;
  url: string;
}

const resources: AuthorResource[] = [
  {
    id: 1,
    title: "Mechanics & Thermodynamics: A Comprehensive Guide",
    author: "Dr. H.C. Verma",
    type: "book",
    year: 2024,
    description: "Complete reference for ICSE Class 11 and 12 physics with solved examples and practice problems.",
    url: "#"
  },
  {
    id: 2,
    title: "ICSE Question Paper Analysis 2020-2024",
    author: "Prof. Ashok Kumar",
    type: "paper",
    year: 2024,
    description: "In-depth analysis of board examination papers with marking schemes and solution strategies.",
    url: "#"
  },
  {
    id: 3,
    title: "Modern Physics: Contemporary Approach",
    author: "Dr. Rajesh Sharma",
    type: "guide",
    year: 2023,
    description: "Latest developments in atomic physics, quantum mechanics, and relativity for educators.",
    url: "#"
  }
];

const typeColors: Record<string, string> = {
  book: "bg-blue-100 text-blue-700",
  paper: "bg-amber-100 text-amber-700",
  guide: "bg-green-100 text-green-700"
};

export default function AuthorResources() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-serif font-bold tracking-tight text-slate-900">
            Author & Paper Setter Resources
          </h1>
          <p className="text-muted-foreground mt-2">
            Curated collection of materials from renowned physics authors and paper setters.
          </p>
        </div>

        <div className="grid gap-6">
          {resources.map((resource) => (
            <Card key={resource.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{resource.title}</CardTitle>
                    <CardDescription className="text-base">
                      By {resource.author}
                    </CardDescription>
                  </div>
                  <Badge className={typeColors[resource.type]}>
                    {resource.type.replace(/_/g, " ")}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-700">{resource.description}</p>
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-xs text-muted-foreground">Year: {resource.year}</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <ExternalLink className="h-4 w-4" />
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
