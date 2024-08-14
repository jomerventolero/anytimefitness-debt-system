import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { pb, updateProfile } from "@/api/auth/pocketbase"
import { useRouter } from "next/navigation"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  first_name: z.string().min(2, { message: "First name must be at least 2 characters" }).max(50, { message: "First name must be less than 50 characters" }),
  last_name: z.string().min(2, { message: "Last name must be at least 2 characters" }).max(50, { message: "Last name must be less than 50 characters" }),
  username: z.string().min(2, { message: "Username must be at least 2 characters" }).max(50, { message: "Username must be less than 50 characters" }),
})

export function ProfileDialog() {


  const router = useRouter();

  const onSubmit = async () => {
    const record = await updateProfile(form.getValues());
    if (record?.status == 200) {
      alert("Profile updated successfully");
      router.push("/dashboard/profile");
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                          <FormField
                            control={form.control}
                            name="first_name"
                            render={({ field }) => (
                                <FormItem>
                                  <FormLabel>First Name</FormLabel>
                                  <FormControl>
                                      <Input placeholder={pb.authStore.model?.firstName} type="text" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="last_name"
                            render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Last Name</FormLabel>
                                  <FormControl>
                                      <Input placeholder={pb.authStore.model?.lastName} type="text" {...field} />
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
                                    <Input placeholder={pb.authStore.model?.username} type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                          )}
                        />
                        <Button type="submit">Save changes</Button>
                    </form>
                </Form>
      </DialogContent>
    </Dialog>
  )
}
