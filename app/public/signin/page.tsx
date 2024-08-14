"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { loginEmail } from '@/api/auth/pocketbase'
import { useRouter } from 'next/navigation'
import { pb } from '@/api/auth/pocketbase';
import { useToast } from '@/components/ui/use-toast'

const formSchema = z.object({
    email: z.string().min(2, { message: "Username must be at least 2 characters" }).max(50, { message: "Username must be less than 50 characters" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }).max(50, { message: "Password must be less than 50 characters" }),
})


const SignIn = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await loginEmail(values);
      document.cookie = `pb_auth=${pb.authStore.exportToCookie()}; path=/`;
      router.push('/dashboard');
    } catch (error) {
      toast({ title: 'Error', description: 'Sign In Failed: ' + error, variant: 'destructive' })
    }
  }

  return (
    <>
        <div className="flex flex-row h-screen w-screen justify-start">
            <div className="sm:flex flex-col w-1/2 hidden">
              <Image draggable={false} className="h-screen object-cover" src="/images/onboarding.jpg" width={2000} height={2000} alt="Anytime Fitness Hero Bg"/>
            </div>
            <div className="flex flex-col w-full px-5 sm:px-0 sm:w-1/2 justify-center">
              <div className="flex flex-col gap-4 px-5 py-5 self-center w-full sm:w-[40%] mx-5">
                  <div className="flex flex-col gap-4 justify-center items-center">
                    <Image draggable={false} src="/images/logo/anytime-fitness-logo.png" width={200} height={200} alt="Anytime Fitness Logo" className="w-[96] aspect-auto"/>
                    <p className="text-md font-semibold">Admin Login</p>
                  </div>
                  <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                      <Input placeholder="name@example.com" type="text" {...field} />
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
                                  <FormLabel>Password</FormLabel>
                                  <FormControl>
                                      <Input placeholder="Enter your Password" type="password" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                            )}
                          />
                          <div className="flex flex-row gap-4 justify-center items-center py-4">
                            <Button type="submit">Sign In with Email</Button>
                            
                          </div>
                          <div className="flex flex-col justify-center gap-4 items-center">
                            <a href="/forgotpassword" className="text-sm hover:text-violet-500 duration-300 transition-colors ease-in-out">Forgot Password?</a>
                            <Link href="/public/signup" className="text-sm self-center hover:text-violet-500 duration-300 transition-colors ease-in-out">Don't have an account? Sign Up</Link>
                          </div>
                      </form>
                  </Form>
              </div>
            </div>
        </div>
    </>
  )
}

export default SignIn