import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "wouter";
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
import { BookOpen, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const forgotPasswordSchema = z.object({
  username: z.string().min(1, "Username or email is required"),
});

export default function ForgotPassword() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = (data: z.infer<typeof forgotPasswordSchema>) => {
    // Placeholder: In a real app, this would send a password reset email
    console.log("Password reset requested for:", data.username);
    setSubmitted(true);
    toast({
      title: "Request Submitted",
      description: "If an account exists, you'll receive password reset instructions via email.",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center bg-primary text-primary-foreground p-3 rounded-xl mb-4 shadow-lg shadow-primary/20">
            <BookOpen className="h-8 w-8" />
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-tight">Reset Password</h1>
          <p className="text-muted-foreground">Enter your username or email to reset your password</p>
        </div>

        {!submitted ? (
          <Card className="border-none shadow-xl shadow-slate-200">
            <CardHeader>
              <CardTitle>Forgot Password</CardTitle>
              <CardDescription>We'll send you instructions to reset your password</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username or Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your username or email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full h-11 text-base font-medium">
                    Send Reset Instructions
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-center text-sm text-muted-foreground bg-slate-50/50 pt-6">
              <Link href="/auth" className="flex items-center gap-1 hover:text-primary">
                <ArrowLeft className="h-4 w-4" />
                Back to Login
              </Link>
            </CardFooter>
          </Card>
        ) : (
          <Card className="border-none shadow-xl shadow-slate-200">
            <CardHeader>
              <CardTitle className="text-center">Check Your Email</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                If an account exists with that username or email, you'll receive instructions to reset your password.
              </p>
              <p className="text-sm text-muted-foreground">
                Please check your email (including spam folder) for the reset link.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center text-sm text-muted-foreground bg-slate-50/50 pt-6">
              <Link href="/auth" className="flex items-center gap-1 hover:text-primary">
                <ArrowLeft className="h-4 w-4" />
                Back to Login
              </Link>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
