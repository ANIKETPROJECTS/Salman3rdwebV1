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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
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
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader className="space-y-3">
          <div className="mx-auto sm:mx-0 w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-2">
            <Plus className="h-6 w-6 text-emerald-600" />
          </div>
          <DialogTitle className="text-2xl font-serif text-slate-900">Add New Resource</DialogTitle>
          <DialogDescription className="text-slate-500 font-medium">
            Upload study materials, question papers, or video links for students.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-bold">Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g. Thermodynamics Chapter Notes" 
                      className="h-11 bg-slate-50 border-slate-200 focus-visible:ring-emerald-500 rounded-xl font-medium"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-bold">Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-11 bg-slate-50 border-slate-200 focus:ring-emerald-500 rounded-xl font-medium">
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
                        className="h-11 bg-slate-50 border-slate-200 focus-visible:ring-emerald-500 rounded-xl font-medium"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="classLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-bold">Class</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g. 11, 12" 
                        className="h-11 bg-slate-50 border-slate-200 focus-visible:ring-emerald-500 rounded-xl font-medium"
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
                        className="h-11 bg-slate-50 border-slate-200 focus-visible:ring-emerald-500 rounded-xl font-medium"
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
                  <FormLabel className="text-slate-700 font-bold">Link URL</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://..." 
                      className="h-11 bg-slate-50 border-slate-200 focus-visible:ring-emerald-500 rounded-xl font-medium"
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
                  <FormLabel className="text-slate-700 font-bold">Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Brief details about the resource..." 
                      className="resize-none bg-slate-50 border-slate-200 focus-visible:ring-emerald-500 rounded-xl font-medium" 
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
              name="isNew"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-2xl border border-slate-200 bg-slate-50/30 p-4 transition-all hover:bg-emerald-50/20 hover:border-emerald-100">
                  <FormControl>
                    <Checkbox
                      checked={field.value || false}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-slate-800 font-bold">
                      Mark as New
                    </FormLabel>
                    <p className="text-sm text-slate-500 font-medium">
                      This will add a "NEW" badge to the card.
                    </p>
                  </div>
                </FormItem>
              )}
            />

            <DialogFooter className="gap-3 pt-4 border-t border-slate-50">
              <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="rounded-xl text-slate-500 font-bold hover:bg-slate-100">Cancel</Button>
              <Button type="submit" disabled={isPending} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-8 h-11 shadow-lg shadow-emerald-100 transition-all active:scale-95 font-bold">
                {isPending ? "Adding..." : "Add Resource"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
