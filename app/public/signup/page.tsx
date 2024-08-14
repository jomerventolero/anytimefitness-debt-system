"use client"
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/navigation'

import { createUser } from '@/api/auth/pocketbase'
import Link from 'next/link'
import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'

const formSchema = z.object({
    username: z.string().min(2, { message: "Username must be at least 2 characters" }).max(50, { message: "Username must be less than 50 characters" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }).max(50, { message: "Password must be less than 50 characters" }),
    passwordConfirm: z.string().min(8, { message: "Password must be at least 8 characters" }).max(50, { message: "Password must be less than 50 characters" }),
    email: z.string().email({ message: "Email must be valid" }),
    firstName: z.string().min(2, { message: "First name must be at least 2 characters" }).max(50, { message: "First name must be less than 50 characters" }),
    lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }).max(50, { message: "Last name must be less than 50 characters" }),
})


const SignUp = () => {
  const router = useRouter();
  const { toast } = useToast()
  const [loading, setLoading] = React.useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.password !== values.passwordConfirm) {
      alert("Passwords do not match")
      return
    }
    try {
      createUser(values);
      setLoading(true);
      toast({ title: 'Success', 
        description: 'Sign Up Successful', 
        action: 
        <ToastAction altText="View Profile" 
          onClick={() => router.push("/public/signin")}>
          View Profile
        </ToastAction>})
    }
    catch (error) {
      toast({ title: 'Error', description: 'Sign Up Failed: ' + error, variant: 'destructive' })
    }
}

  return (
    <div className="flex flex-row w-screen h-screen justify-start">
        <div className={`${loading ? "absolute top-0 right-0 left-0 z-30 bg-slate-400 opacity-80 h-screen w-screen" : "hidden"}`} />
        <div className="sm:flex flex-col w-1/2 hidden">
          <Image draggable={false} className="h-screen object-cover" src="/images/onboarding.jpg" width={2000} height={2000} alt="Anytime Fitness Hero Bg"/>
        </div>
        <div className="flex flex-col gap-4 justify-center h-screen w-screen sm:w-1/2 px-5">
            <div className="flex flex-col gap-4 px-5 py-5 self-center w-full">
                <div className="flex flex-col gap-4 justify-center items-center">
                  <Image src="/images/logo/anytime-fitness-logo.png" width={200} height={200} alt="Anytime Fitness Logo" className="w-[96] aspect-auto"/>
                  <p className="text-md font-semibold">Membership Sign Up</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                  <FormLabel>First Name</FormLabel>
                                  <FormControl>
                                      <Input placeholder="Enter your first name" type="text" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Last Name</FormLabel>
                                  <FormControl>
                                      <Input placeholder="Enter your last name" type="text" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="username"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your username" type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="name@example.com" type="email" {...field} />
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
                                    <Input placeholder="Enter your password" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="passwordConfirm"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your password" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                          )}
                        />
                        <div className="flex flex-col gap-4 items-center">
                          <Button type="submit">Sign Up</Button>
                          <Link href="/public/signin" className="text-sm">Already have an account? Sign In</Link>
                        </div>
                        
                    </form>
                </Form>
            </div>
        </div>
    </div>
  )
}

const AlertSignUp = (success: boolean) => {
  return (
    <div className="flex flex-col gap-4 px-5 py-5 self-center shadow-2xl rounded-lg w-full sm:w-1/2">
      <p className="text-md font-semibold">{success ? "Sign Up Successful!" : "Sign Up Failed!"}</p>
      <Link href="/signin">Sign In</Link>
    </div>
  )
}

export default SignUp