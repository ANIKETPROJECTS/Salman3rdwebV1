import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertResourceSchema } from "@shared/schema";
import { useCreateResource } from "@/hooks/use-resources";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

// Extend schema for form validation
const formSchema = insertResourceSchema.extend({
  year: z.coerce.number().min(2000).max(2100),
});

type FormValues = z.infer<typeof formSchema>;

export function AddResourceDialog() {
  const [open, setOpen] = useState(false);
  const { mutate: createResource, isPending } = useCreateResource();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "study_material",
      year: new Date().getFullYear(),
      classLevel: "12",
      subject: "Physics",
      link: "",
      isNew: true,
    },
  });

  const onSubmit = (data: FormValues) => {
    createResource(data, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
        toast({
          title: "Success",
          description: "Resource added successfully.",
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200/50 rounded-xl px-6 h-11 transition-all active:scale-95 font-bold">
          <Plus className="h-5 w-5" /> Add Resource
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[750px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2 space-y-2 border-b border-slate-50 bg-slate-50/30">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Plus className="h-5 w-5 text-emerald-700" />
            </div>
            <div>
              <DialogTitle className="text-xl font-serif text-slate-900">Add New Resource</DialogTitle>
              <DialogDescription className="text-xs text-slate-500 font-medium">
                Upload educational materials for students.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="px-6 py-4 space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-bold text-sm">Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g. Thermodynamics Chapter Notes" 
                      className="h-10 bg-slate-50 border-slate-200 focus-visible:ring-emerald-500 rounded-xl font-medium"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-x-5 gap-y-3">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-bold">Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-10 bg-slate-50 border-slate-200 focus:ring-emerald-500 rounded-xl font-medium">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-xl border-slate-200">
                        <SelectItem value="study_material">Study Material</SelectItem>
                        <SelectItem value="question_paper">Question Paper</SelectItem>
                        <SelectItem value="video">Video Lecture</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-bold">Year</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        className="h-10 bg-slate-50 border-slate-200 focus-visible:ring-emerald-500 rounded-xl font-medium"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="classLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-bold">Class</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g. 11, 12" 
                        className="h-10 bg-slate-50 border-slate-200 focus-visible:ring-emerald-500 rounded-xl font-medium"
                        {...field} 
                        value={field.value || ''} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-bold">Subject</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Physics" 
                        className="h-10 bg-slate-50 border-slate-200 focus-visible:ring-emerald-500 rounded-xl font-medium"
                        {...field} 
                        value={field.value || ''} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-bold text-sm">Link URL</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://..." 
                      className="h-10 bg-slate-50 border-slate-200 focus-visible:ring-emerald-500 rounded-xl font-medium"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-bold text-sm">Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Brief details..." 
                      className="h-20 resize-none bg-slate-50 border-slate-200 focus-visible:ring-emerald-500 rounded-xl font-medium" 
                      {...field} 
                      value={field.value || ''} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between gap-6 pt-2">
              <FormField
                control={form.control}
                name="isNew"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value || false}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                      />
                    </FormControl>
                    <FormLabel className="text-slate-800 font-bold text-sm cursor-pointer">
                      Mark as New
                    </FormLabel>
                  </FormItem>
                )}
              />

              <DialogFooter className="gap-3 pt-0">
                <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="rounded-xl text-slate-500 font-bold hover:bg-slate-100 h-10 px-6">Cancel</Button>
                <Button type="submit" disabled={isPending} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-8 h-10 shadow-lg shadow-emerald-100 transition-all active:scale-95 font-bold">
                  {isPending ? "Adding..." : "Add Resource"}
                </Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
