"use client";

import { trpc } from "@/trpc/client";
import { CheckCircle, CheckCircle2, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

interface VerifyEmailProps {
  token: string,
}


// const dotsArray = [".", "..", "..."]
// let i = 0;
// setTimeout(() => {
//   setInterval(() => {
//     if(i === 3) {
//       i = 0;
//     }
//     i++;
//     console.log(i)
//   }, 500);
// }, 2000)


const VerifyEmail = ({token}: VerifyEmailProps) => {
  // const timer = (): ReactNode => {
  //   // const start = Date.now();
  //   const dotsArray = [".", "..", "..."]
  //   let i = 0;
  //   let wayOut;

  //   setInterval(() => {
  //   // const timeElapsed = Date.now() - start;
  //     if(i === dotsArray.length) {
  //       i = 0;
  //     }
  //     i++;
  //     wayOut = <span>{dotsArray[i - 1]}</span>;
  //   }, 500)

  //   return wayOut;
  // }

  const {data, isLoading, isError} = trpc.auth.verifyEmail.useQuery({token,});

  if(isError) {
    return (
      <div className="flex flex-col h-full items-center justify-center gap-2">
        <XCircle className="h-20 w-20 text-destructive"/>
        <h3 className="font-semibold text-xl">There was an error.</h3>
        <p className="text-muted-foreground text-sm">The token is not valid. Please try again</p>
      </div>
    )
  }

  // @ts-ignore
  if(data?.success) {
    return (
      <div className="flex flex-col h-full items-center justify-center gap-2">
        <CheckCircle className="h-20 w-20 text-green-600"/>
        <h3 className="font-semibold text-xl">You&apos;re all set!</h3>
        <p className="text-muted-foreground text-sm">Thanks for verifying your email. Welcome to Digital Hippo.</p>
        <Link href={"/sign-in"} className={buttonVariants({className: "mb-4 mt-2"})}>Sign in</Link>
      </div>
    )
  }

  if(isLoading) {
    return (
      <div className="flex flex-col h-full items-center justify-center gap-2">
        <Loader2 className=" animate-spin h-20 w-20 text-zinc-300"/>
        <h3 className="font-semibold text-xl">
          Verifying...
          {/* <span className={i < 1 ? "hidden" : ""}>.</span>
          <span className={i < 2 ? "hidden" : ""}>.</span>
          <span className={i < 3 ? "hidden" : ""}>.</span> */}
        </h3>
        <p className="text-muted-foreground text-sm">This won&apos;t take long.</p>
      </div>
    )
  }
}

export default VerifyEmail;