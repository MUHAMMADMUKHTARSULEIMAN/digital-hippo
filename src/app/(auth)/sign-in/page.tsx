"use client";

import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AuthCredentialsValidator, TAuthCredentialsValidator } from "@/lib/validators/account-credentials-validator";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import {toast} from "sonner";
import { ZodError } from "zod";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isSeller = searchParams.get("as") === "seller"
  const origin = searchParams.get("origin")

  const continueAsSeller = () => {
    router.push("?as=seller")
  };

  const continueAsBuyer = () => {
    router.replace("/sign-in", undefined)
  };

  const {register, handleSubmit, formState: {errors}} = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator)
  });

  const {mutate: signIn, isLoading} = trpc.auth.signIn.useMutation({
    onSuccess: () => {
      toast.success("Signed in successfully.")

      if(origin) {
        router.push(`/${origin}`);
        return;
      }

      if(isSeller) {
        router.push("/sell");
        return;
      }

      router.push("/");
      router.refresh();
    },
    onError: (error) => {
      if(error.data?.code === "UNAUTHORIZED") {
        toast.error("Invalid email or password.")
      }
    }
  })

  const onSubmit = ({email, password,}: TAuthCredentialsValidator) => {
    // Send data to server
    signIn({email, password})
  }
  return (
    <>
      <div className=" container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-20 w-20"/>
            <h1 className="text-2xl font-bold">Sign in to your {isSeller ? "seller" : ""} account</h1>
            <div className="grid gap-6">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                  <div className="grid gap-1 py-2">
                    <Label className="justify-self-start" htmlFor="email">Email</Label>
                    <Input
                    {...register("email")}
                    placeholder="name@example.com"
                    className={cn({"focus-visible:ring-destructive": errors.email})}
                    />
                    {errors?.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                  <div className="grid gap-1 py-2">
                    <Label className="justify-self-start" htmlFor="password">Password</Label>
                    <Input
                    {...register("password")}
                    type="password"
                    placeholder="****"
                    className={cn({"focus-visible:ring-destructive": errors.password})}
                    />
                    {errors?.password && (
                      <p className="text-sm text-destructive">{errors.password.message}</p>
                    )}
                  </div>
                  <Button>Sign in</Button>
                </div>
              </form>
              <div className="justify-self-center pl-4">
                <p className="text-sm">
                  Don&apos;t have an account?
                  {" "}
                  <Link href={"/sign-up"} className={buttonVariants({variant: "link", className: "pl-0"})}>
                    Sign up &rarr;
                  </Link>
                </p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <span className="w-full border-t"/>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">OR</span>
                </div>
              </div>
              {isSeller ? (
                <Button disabled={isLoading} onClick={continueAsBuyer} variant="secondary" className="mb-8">Continue as buyer</Button>
              ) : (
                <Button disabled={isLoading} onClick={continueAsSeller} variant="secondary" className="mb-8">Continue as seller</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page;