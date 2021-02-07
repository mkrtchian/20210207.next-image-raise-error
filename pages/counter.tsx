import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'

export const Counter = (): JSX.Element => {
  const [count, setCounter] = useState(0)
  const titleString = `${count}`
  return (
    <>
      <Head>
        <title>{titleString}</title>
      </Head>
      <div>
        <p>{titleString}</p>
        <button onClick={() => setCounter((c) => c + 1)}>+</button>
      </div>
      {/* following `Image` components raise an error. */}
      <Image src="/vercel.svg" alt="Vercel Logo" width="128" height="34" />
    </>
  )
}

export default Counter
