import { ProductFiles } from "@/collections/ProductFile";
import AddToCartButton from "@/components/AddToCartButton";
import ImageSlider from "@/components/ImageSlider";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { PRODUCT_CATEGORIES } from "@/config";
import { getPayloadClient } from "@/get-payload";
import { formatPrice } from "@/lib/utils";
import { Check, ChevronRight, Shield, Subtitles } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    productId: string
  }
}

const Page = async ({params}: PageProps) => {
  const {productId} = params
  const payload = await getPayloadClient()

  const {docs: products} = await payload.find({
    collection: "products",
    limit: 1,
    where: {
      id: {
        equals: productId
      },
      approvedForSale: {
        equals: "approved"
      }
    }
  })

    const [product] = products

    const label = PRODUCT_CATEGORIES.find(({value}) => value === product.category)?.label


  if(!product) return notFound()

  const BREADCRUMBS = [
    {
      id: 1,
      name: "Home",
      href: "/",
    },
    {
      id: 2,
      name: "Products",
      href: "/products",
    },
  ]
  
  // @ts-ignore: TypeScript is a dumb, paranoid, overactive piece of shit
  const validUrls = product.images.map(({image}) => (typeof image === "string" ? image : image.url)).filter(Boolean) as string[]
  
  return (
    <MaxWidthWrapper className="bg-background">
      <div className="bg-background">
        <div
        className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8"
        >
          {/* Product Details */}
          <div className="lg:max-w-lg lg:self-end">
            <ol className="flex items-center space-x-2">
              {BREADCRUMBS.map((breadcrumb, i) => (
                <li key={breadcrumb.id}>
                  <div className="flex items-center text-sm">
                    <Link
                    href={breadcrumb.href}
                    className="font-medium text-sm text-muted-foreground hover:text-accent-foreground"
                    >
                      {breadcrumb.name}
                    </Link>

                    {i !== BREADCRUMBS.length - 1 &&
                    <div className="ml-3">
                      <ChevronRight className="h-4 w-4 text-muted-foreground"/>
                    </div>}
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-4">
              <h1 className="text-3xl font-bold tracking-tight text-accent-foreground sm:text-4xl">
                {/* @ts-ignore: TypeScript is a dumb, paranoid, overactive piece of shit */}
                {product.name}
                </h1>
            </div>
            <section className="mt-4">
              <div className="flex items-center">
                {/* @ts-ignore: TypeScript is a dumb, paranoid, overactive piece of shit */}
                <p className="font-medium text-accent-foreground">{formatPrice(product.price)}</p>
                <div className="pl-4 ml-4 border-l border-muted text-muted-foreground">
                  {label}
                </div>
              </div>
              <div className="mt-4 space-y-6">
                {/* @ts-ignore: TypeScript is a dumb, paranoid, overactive piece of shit */}
                <p className="text-base text-muted-foreground">{product.details}</p>
              </div>
              <div className="mt-6 flex items-center">
                <Check aria-hidden="true" className="h-4 w-4 flex-shrink-0 text-green-500" />
                <p className="text-xs text-muted-foreground ml-2">Eligible for Instant Delivery</p>
              </div>
            </section>
          </div>
          {/* Product Images */}
          <div className="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center">
            <div className="aspect-square rounded-lg">
              <ImageSlider urls={validUrls} />
            </div>
          </div>
          {/* Add to Cart Section */}
          <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
            <div>
              <div className="mt-10">
                {/* Add to Cart button */}
                {/* @ts-ignore: Make TypeScript rest */}
                <AddToCartButton product={product}/>
              </div>
              <div className="mt-6 text-center">
                <div className="group inline-flex text-sm font-medium">
                  <Shield aria-hidden="true" className="mr-2 h-5 w-5 flex-shrink-0 text-muted-foreground"/>
                  <span className="text-muted-foreground hover:text-accent-foreground">30-Day Return Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* @ts-ignore: TypeScript is a dumb, paranoid, overactive piece of shit */}
      <ProductReel href="/products" query={{category: product.category, limit: 4,}} title={`Similar ${label}`} subtitle={`Browse similar ${label}`}/>
    </MaxWidthWrapper>
  )
}

export default Page;