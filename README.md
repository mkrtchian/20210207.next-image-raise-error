# next/image causes error while unrelated test to it. #21935

Code for [a discussion #21935](https://github.com/vercel/next.js/discussions/21935)

## The post

When I am writing a test for a page that uses `next/image`, I met an error.
My page is not completely related in `next/image` and the test code is also not but it raises.
This must be a bug of `next/image` but I have no confidence.
How should I handle this error?

The code is as follows. I started the project from the example `with-typescript-eslint-jest` and is stored in [my repository](https://github.com/kaznak/20210207.next-image-raise-error).

The page, `pages/counter.tsx`, is the following:

```
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
        <button onClick={() => setCounter(c => c + 1)}>+</button>
      </div>
      {/* following `Image` components raise an error. */}
      <Image src="/vercel.svg" alt="Vercel Logo" width="128" height="34" />
    </>
  )
}

export default Counter
```

And the test code, `test/pages/counter.test.tsx `, is following:

```
import { screen, render, fireEvent, act } from '@testing-library/react'
import { Counter } from '../../pages/counter'

describe('Counter', () => {
  it('Initial Value is 0', () => {
    render(<Counter />)
    expect(screen.getByText('0', { selector: 'p' }))
  })

  it('Pressing `+` button increments the counter.', () => {
    render(<Counter />)
    expect(screen.getByText('0', { selector: 'p' }))
    act(() => {
      fireEvent.click(screen.getByText('+', { selector: 'button' }))
    })
    expect(screen.getByText('1', { selector: 'p' }))
  })
})
```

The existence of `<Image src="/vercel.svg" alt="Vercel Logo" width="128" height="34" />` in `pages/counter.tsx` raises the following error:

```
% yarn test
yarn run v1.22.10
$ jest
jest-haste-map: Watchman crawl failed. Retrying once with node crawler.
  Usually this happens when watchman isn't running. Create an empty `.watchmanconfig` file in your project's root folder or initialize a git or hg repository in your project.
  Error: Watchman error: resolve_projpath: path `/home/kaznak/20210207.next-image-raise-error`: open: /home/kaznak/20210207.next-image-raise-error: Operation not permitted. Make sure watchman is running for this project. See https://facebook.github.io/watchman/docs/troubleshooting.
 PASS  test/pages/index.test.tsx
 PASS  test/pages/counter.test.tsx
  ● Console

    console.error
      Warning: An update to Image inside a test was not wrapped in act(...).

      When testing, code that causes React state updates should be wrapped into act(...):

      act(() => {
        /* fire events that update state */
      });
      /* assert on the output */

      This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act
          at Image (/home/kaznak/20210207.next-image-raise-error/node_modules/next/client/image.tsx:189:3)
          at Counter (/home/kaznak/20210207.next-image-raise-error/pages/counter.tsx:6:31)

      at printWarning (node_modules/react-dom/cjs/react-dom.development.js:67:30)
      at error (node_modules/react-dom/cjs/react-dom.development.js:43:5)
      at warnIfNotCurrentlyActingUpdatesInDEV (node_modules/react-dom/cjs/react-dom.development.js:24064:9)
      at dispatchAction (node_modules/react-dom/cjs/react-dom.development.js:16135:9)
      at node_modules/next/client/use-intersection.tsx:53:1
      at node_modules/next/client/request-idle-callback.ts:26:9
      at Timeout.callback [as _onTimeout] (node_modules/jsdom/lib/jsdom/browser/Window.js:643:19)

    console.error
      Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
          at Image (/home/kaznak/20210207.next-image-raise-error/node_modules/next/client/image.tsx:189:3)
          at Counter (/home/kaznak/20210207.next-image-raise-error/pages/counter.tsx:6:31)

      at printWarning (node_modules/react-dom/cjs/react-dom.development.js:67:30)
      at error (node_modules/react-dom/cjs/react-dom.development.js:43:5)
      at warnAboutUpdateOnUnmountedFiberInDEV (node_modules/react-dom/cjs/react-dom.development.js:23914:9)
      at scheduleUpdateOnFiber (node_modules/react-dom/cjs/react-dom.development.js:21840:5)
      at dispatchAction (node_modules/react-dom/cjs/react-dom.development.js:16139:5)
      at node_modules/next/client/use-intersection.tsx:53:1
      at node_modules/next/client/request-idle-callback.ts:26:9
      at Timeout.callback [as _onTimeout] (node_modules/jsdom/lib/jsdom/browser/Window.js:643:19)

    console.error
      Warning: An update to Image inside a test was not wrapped in act(...).

      When testing, code that causes React state updates should be wrapped into act(...):

      act(() => {
        /* fire events that update state */
      });
      /* assert on the output */

      This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act
          at Image (/home/kaznak/20210207.next-image-raise-error/node_modules/next/client/image.tsx:189:3)
          at Counter (/home/kaznak/20210207.next-image-raise-error/pages/counter.tsx:6:31)

      at printWarning (node_modules/react-dom/cjs/react-dom.development.js:67:30)
      at error (node_modules/react-dom/cjs/react-dom.development.js:43:5)
      at warnIfNotCurrentlyActingUpdatesInDEV (node_modules/react-dom/cjs/react-dom.development.js:24064:9)
      at dispatchAction (node_modules/react-dom/cjs/react-dom.development.js:16135:9)
      at node_modules/next/client/use-intersection.tsx:53:1
      at node_modules/next/client/request-idle-callback.ts:26:9
      at Timeout.callback [as _onTimeout] (node_modules/jsdom/lib/jsdom/browser/Window.js:643:19)


Test Suites: 2 passed, 2 total
Tests:       4 passed, 4 total
Snapshots:   1 passed, 1 total
Time:        3.559s
Ran all test suites.
✨  Done in 5.68s.
```

## Related

- Derived from [Next.js example with typescript eslint jest](https://github.com/vercel/next.js/tree/canary/examples/with-typescript-eslint-jest)
- [Test Utilities @ reactjs.org](https://reactjs.org/docs/test-utils.html)
