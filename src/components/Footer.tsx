"use client";

import { usePathname } from "next/navigation"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { Icons } from "./Icons"
import Link from "next/link";

const Footer = () => {
  const pathsToMinimize = ["/sign-up", "/sign-in","/verify-email",]
  const pathname = usePathname()

  return (
    <footer className="bg-background flex-grow-0">
      <MaxWidthWrapper>
        <div className="border-t">
          {!pathsToMinimize.includes(pathname) && (
            <div className="pb-8 pt-16">
              <div className="flex justify-center">
                <Icons.logo className="h-12 w-auto"/>
              </div>
            </div>
          )}
          {!pathsToMinimize.includes(pathname) && (
            <div>
              <div className="relative flex items-center px-6 py-6 sm:py-8 lg:mt-0">
                <div className="absolute inset-0 overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-muted bg-gradient-to-br bg-opacity-90" aria-hidden="true"/>
                </div>
                <div className="relative mx-auto text-center max-w-sm">
                  <h3 className="font-semibold text-accent-foreground">Become a Seller</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    If you&apos;d like to sell high-quality digital products, you can do so in minutes!
                  </p>
                  <Link href={"/sign-in?as=seller"}></Link>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="py-10 md:flex md:items-center md:justify-between">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} All Rights Reserved</p>
          </div>
          <div className="mt-4 flex items-center justify-center md:mt-0">
            <div className="flex space-x-8">
              <Link href={"#"} className="text-sm text-muted-foreground hover:text-ring">Terms of Service</Link>
              <Link href={"#"} className="text-sm text-muted-foreground hover:text-ring">Privacy Policy</Link>
              <Link href={"#"} className="text-sm text-muted-foreground hover:text-ring">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}

export default Footer