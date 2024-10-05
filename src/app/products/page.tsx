import MaxWidthWrapper from "../../components/MaxWidthWrapper"
import ProductReel from "../../components/ProductReel"
import { PRODUCT_CATEGORIES } from "../../config"

type Param = string | string[] | undefined

interface PageProps {
  searchParams: {[key: string]: Param}
}

const parse = (param: Param) => {
  return typeof param === "string" ? param : undefined
}

const Page = ({searchParams}: PageProps) => {
  const sort = parse(searchParams.sort)
  const category = parse(searchParams.category)

  const label = PRODUCT_CATEGORIES.find(({value}) => value === category)?.label

  return (
    <MaxWidthWrapper>
      <ProductReel 
      title={label ?? "Browse High-quality Assets"}
      query={{
        category,
        limit: 40,
        // @ts-ignore
        sort: sort === "asc" || sort === "desc" ? sort : "undefined",
      }}
      />
    </MaxWidthWrapper>
  )
}

export default Page