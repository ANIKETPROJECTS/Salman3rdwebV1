import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { BookOpen, ShieldCheck, GraduationCap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export default function AuthPage() {
  const { login, isLoggingIn } = useAuth();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    login(data, {
      onError: (error) => {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: 'url("/bg.jpg")' }}
    >
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-8 relative z-10">
        <div className="w-full md:w-1/3 max-w-sm flex">
          <Card className="border-none shadow-2xl bg-white/90 backdrop-blur-md p-6 w-full flex flex-col items-center justify-center text-center">
            <div className="inline-flex items-center justify-center bg-emerald-600 text-white p-3 rounded-2xl mb-4 shadow-lg shadow-emerald-200">
              <BookOpen className="h-8 w-8" />
            </div>
            <h1 className="font-serif text-3xl font-bold tracking-tight text-slate-900 mb-3">Welcome Back</h1>
            <p className="text-slate-600 text-base font-medium leading-relaxed">Sign in to your member account to access premium resources and collaborate with peers.</p>
          </Card>
        </div>

        <div className="w-full md:w-1/2 max-w-md">
          <Tabs defaultValue="admin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm p-1 rounded-xl h-12 shadow-lg mb-4">
              <TabsTrigger value="admin" className="rounded-lg data-[state=active]:bg-emerald-600 data-[state=active]:text-white flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                Admin
              </TabsTrigger>
              <TabsTrigger value="teacher" className="rounded-lg data-[state=active]:bg-emerald-600 data-[state=active]:text-white flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Teacher
              </TabsTrigger>
            </TabsList>

            <TabsContent value="admin">
              <Card className="border-none shadow-2xl bg-white/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-emerald-700">
                    <ShieldCheck className="h-5 w-5" />
                    Admin Login
                  </CardTitle>
                  <CardDescription>Enter administrator credentials to access the portal</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700">Admin Username</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter admin username" {...field} className="focus-visible:ring-emerald-500" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700">Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} className="focus-visible:ring-emerald-500" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex justify-end">
                        <Link href="/forgot-password">
                          <Button variant="link" size="sm" className="px-0 font-normal text-muted-foreground hover:text-emerald-600" type="button">
                            Forgot password?
                          </Button>
                        </Link>
                      </div>

                      <Button type="submit" className="w-full h-11 text-base font-medium bg-emerald-600 hover:bg-emerald-700 text-white" disabled={isLoggingIn}>
                        {isLoggingIn ? "Signing in..." : "Sign In as Admin"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 text-center text-sm text-muted-foreground bg-slate-50/50 py-4 rounded-b-xl">
                  <Link href="/" className="hover:text-emerald-600 underline-offset-4 hover:underline">
                    Back to Home
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="teacher">
              <Card className="border-none shadow-2xl bg-white/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-emerald-700">
                    <GraduationCap className="h-5 w-5" />
                    Teacher Login
                  </CardTitle>
                  <CardDescription>Enter your teacher credentials to access your classroom</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700">Teacher Email / Username</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter teacher username" {...field} className="focus-visible:ring-emerald-500" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700">Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} className="focus-visible:ring-emerald-500" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex justify-end">
                        <Link href="/forgot-password">
                          <Button variant="link" size="sm" className="px-0 font-normal text-muted-foreground hover:text-emerald-600" type="button">
                            Forgot password?
                          </Button>
                        </Link>
                      </div>

                      <Button type="submit" className="w-full h-11 text-base font-medium bg-emerald-600 hover:bg-emerald-700 text-white" disabled={isLoggingIn}>
                        {isLoggingIn ? "Signing in..." : "Sign In as Teacher"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 text-center text-sm text-muted-foreground bg-slate-50/50 py-4 rounded-b-xl">
                  <Link href="/" className="hover:text-emerald-600 underline-offset-4 hover:underline">
                    Back to Home
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
