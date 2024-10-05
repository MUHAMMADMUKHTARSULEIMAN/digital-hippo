"use client";

import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
// import refresh from "payload/dist/auth/operations/refresh";
import { useEffect } from "react";

interface PaymentStatusProps {
  orderEmail: string
  orderId: string
  isPaid: boolean
}

const PaymentStatus = ({orderEmail, orderId, isPaid}: PaymentStatusProps) => {
  const {data} = trpc.payment.pollOrderStatus.useQuery({orderId}, {
    enabled: isPaid === false,
    // @ts-ignore
    refetchInterval: (data) => (data?.isPaid ? false : 1000)
  })

  const router = useRouter()

  useEffect(() => {
    // @ts-ignore
    if(data?.isPaid) router.refresh()
      // @ts-ignore
  }, [data?.isPaid, router])

  return (
    <div className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-ring">
      <div>
        <p className="font-medium text-accent-foreground">Shipping To</p>
        <p>{orderEmail}</p>
      </div>
      <div>
        <p className="font-medium text-accent-foreground">Payment Status</p>
        <p>{isPaid ? "Payment Verified" : "Pending Verification"}</p>
      </div>
    </div>
  )
}

export default PaymentStatus;