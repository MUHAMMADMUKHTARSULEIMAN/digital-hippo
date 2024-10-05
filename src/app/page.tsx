import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowDownToLine, CheckCircle, Sprout } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const perks = [
    {
      name: "Instant Delivery",
      icon: ArrowDownToLine,
      description: "Get your assets delivered to your email in seconds and download them right away.",
    },
    {
      name: "Guaranteed Quality",
      icon: CheckCircle,
      description: "Every asset on our platform is verified by our team to ensure that our quality standards are met. Not happy? We offer a 30-day refund guarantee.",
    },
    {
      name: "For the Planet",
      icon: Sprout,
      description: "We've pledged 1% of sales to the preservation and restoration of the planet.",
    },
  ]
  return (
    <>
      <MaxWidthWrapper className="">
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-6xl">Your marketplace for high-quality{" "}<span className="text-primary">digital assets</span>.</h1>
          <p className="mt-6 max-w-prose text-lg text-muted-foreground">
            Welcome to Digital Hippo. Every asset on our platform is verified by our team to ensure that our quality standards are met.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href={"/products"} className={buttonVariants()}>Browse Trending</Link>
            <Button variant="outline">Our Quality Promise &rarr;</Button>
          </div>
        </div>

        {/*To-do: List products */}
        <ProductReel query={{sort: "asc", limit: 4,}} href="/products" title="Brand New"/>
      </MaxWidthWrapper>

      <section className="border-t bg-accent">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg: gap-x-8 lg:gap-y-0" >
            {perks.map((perk) => (
              <div key={perk.name} className="text-center md:items-start md:flex md:text-left lg:block lg:text-center">
                <div className="flex md:flex-shrink-0 justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-900">
                    {<perk.icon className="w-1/3 h-1/3"/>}
                  </div>
                </div>
                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-primary-foreground">{perk.name}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{perk.description}</p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
