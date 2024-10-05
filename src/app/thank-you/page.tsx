import { getPayloadClient } from "@/get-payload";
import { getServerSideUser } from "@/lib/payload-utils";
import { Product, ProductFile } from "@/payload-types";
import { cookies } from "next/headers";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { PRODUCT_CATEGORIES } from "@/config";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import PaymentStatus from "@/components/PaymentStatus";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const Page = async ({searchParams}: PageProps) => {
  const orderId = searchParams.orderId

  const {user} = await getServerSideUser(cookies())

  const payload = await getPayloadClient()

  const {docs: orders} = await payload.find({
    collection: "orders",
    depth: 2,
    where: {
      id: {
        equals: orderId
      }
    }
  })

  const [order] = orders

  const products = order.products as Product[]

  const orderTotal = products.reduce((total, product) => {
    return total + product.price
  }, 0)

  const fee = 1

  if(!order) return notFound()

  //  @ts-ignore
  const orderUserId = typeof order.user === "string" ? order.user : order.user.id

  if(orderUserId !== user?.id) {
    return redirect(`/sign-in?origin=thank-you?orderId=${order.id}`)
  }
  return (
    <main className="relative lg:min-h-full">
      <div className="hidden h-80 overflow-hidden lg:block lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr12`">
        <Image src="/checkout-thank-you.jpg" fill alt="Thank You" className="h-full w-full object-cover object-center"/>
      </div>
      <div>
        <div
        className="mx-auto max-w-2xl px-4 py-16
        sm:px-6 sm:py-24
        md:block
        lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32
        xl:gap-x-24"
        >
          <div className="lg:col-start-2">
            <p className="text-sm font-medium text-primary">Order Successful</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-accent-foreground sm:text-5xl">Thanks for Ordering</h1>
            {order._isPaid as boolean ? <p className="mt-2 text-base text-muted-foreground">
              Your order was processed and your assets are available for download. we&apos;ve sent your receipt and order details to {typeof order.user !== "string" && <span className="font-medium text-accent-foreground">order.user.email</span>}. 
            </p> : <p className="mt-2 text-base text-muted-foreground">
              Your order is being processed. Hang tight; we&apos;ll send you confirmation very soon.
            </p>}
            <div className="mt-16 text-sm font-medium">
              <div className="text-muted-foreground">Order Number:</div>
              <div className="mt-2 text-accent-foreground">{order.id}</div>
              <ul className="mt-6 divide-y divide-muted border-t text-sm font-medium text-muted-foreground">
                {(order.products as Product[]).map((product) => {
                  const label = PRODUCT_CATEGORIES.find(({value}) => value === product.category)?.label
                  const downloadUrl = (product.product_files as ProductFile).url as string
                  const {image} = product.images[0]

                  return (
                    <li key={product.id} className="flex space-x-6 py-6">
                      <div className="relative h-24 w-24">
                        {typeof image !== "string" &&
                        image.url &&
                        <Image fill src={image.url} alt={`${product.name} Image`} className="flex-none rounded-md object-cover object-center bg-muted"/>}
                      </div>
                      <div className="flex-auto flex flex-col justify-between">
                        <div className="space-y-1">
                          <h3 className="text-accent-foreground">{product.name}</h3>
                          <p className="my-1">Category: {label}</p>
                        </div>
                        {order._isPaid as boolean &&
                          <a
                          href={downloadUrl}
                          download={product.name}
                          className="text-primary-200 hover:underline "
                          >
                            Download Asset
                          </a>
                        }
                      </div>
                      <p className="flex-none font-medium text-accent-foreground">
                        {formatPrice(product.price)}
                      </p>
                    </li>
                  )
                })}
              </ul>
              <div className="space-y-6 border-t pt-6 font-medium text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p className="text-accent-foreground">{formatPrice(orderTotal)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Transaction Fee</p>
                  <p className="text-accent-foreground">{formatPrice(fee)}</p>
                </div>
                <div className="flex items-center justify-between border-t pt-6 text-accent-foreground">
                  <p className="text-base">Total</p>
                  <p className="text-base">{formatPrice(orderTotal + fee)}</p>
                </div>
              </div>
              {/* Payment Status Component */}
              {/* @ts-ignore */}
              <PaymentStatus orderEmail={order.user.email} orderId={order.id} isPaid={order._isPaid}/>
              <div className="mt-16 py-6 border-t text-right">
                <Link href="/products" className={buttonVariants({variant: "link"})}>Continue Shopping &rarr;</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Page;