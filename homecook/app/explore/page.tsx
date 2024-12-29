import { Suspense } from 'react'
import ExploreChefs from './components/ExploreChefs'
import Loading from './loading'

export default function ExplorePage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const search = typeof searchParams.search === 'string' ? searchParams.search : undefined

  return (
    <>
      <Suspense fallback={<Loading />}>
        <ExploreChefs initialSearch={search} />
      </Suspense>
    </>
  )
}

