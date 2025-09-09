

Monday, October 21st 2024

# Next.js 15

Posted by

[![Delba de Oliveira](https://nextjs.org/_next/image?url=%2Fstatic%2Fteam%2Fdelba.jpg&w=64&q=75)

Delba de Oliveira@delba_oliveira

](https://twitter.com/delba_oliveira)[![Jimmy Lai](https://nextjs.org/_next/image?url=%2Fstatic%2Fteam%2Fjimmy.jpg&w=64&q=75)

Jimmy Lai@feedthejim

](https://twitter.com/feedthejim)[![Rich Haines](https://nextjs.org/_next/image?url=%2Fstatic%2Fteam%2Frich.jpg&w=64&q=75)

Rich Haines@studio_hungry

](https://twitter.com/studio_hungry)

Next.js 15 is officially stable and ready for production. This release builds on the updates from both [RC1](https://nextjs.org/blog/next-15-rc) and [RC2](https://nextjs.org/blog/next-15-rc2). We've focused heavily on stability while adding some exciting updates we think you'll love. Try Next.js 15 today:

terminal

```
# Use the new automated upgrade CLInpx @next/codemod@canary upgrade latest # ...or upgrade manuallynpm install next@latest react@rc react-dom@rc
```

We're also excited to share more about what's coming next at [Next.js Conf](https://nextjs.org/conf) this Thursday, October 24th.

Here's what is new in Next.js 15:

- [**`@next/codemod` CLI:**](https://nextjs.org/blog/next-15#smooth-upgrades-with-nextcodemod-cli) Easily upgrade to the latest Next.js and React versions.
- [**Async Request APIs (Breaking):**](https://nextjs.org/blog/next-15#async-request-apis-breaking-change) Incremental step towards a simplified rendering and caching model.
- [**Caching Semantics (Breaking):**](https://nextjs.org/blog/next-15#caching-semantics) `fetch` requests, `GET` Route Handlers, and client navigations are no longer cached by default.
- [**React 19 Support:**](https://nextjs.org/blog/next-15#react-19) Support for React 19, React Compiler (Experimental), and hydration error improvements.
- [**Turbopack Dev (Stable):**](https://nextjs.org/blog/next-15#turbopack-dev) Performance and stability improvements.
- [**Static Indicator:**](https://nextjs.org/blog/next-15#static-route-indicator) New visual indicator shows static routes during development.
- [**`unstable_after` API (Experimental):**](https://nextjs.org/blog/next-15#executing-code-after-a-response-with-unstable_after-experimental) Execute code after a response finishes streaming.
- [**`instrumentation.js` API (Stable):**](https://nextjs.org/blog/next-15#instrumentationjs-stable) New API for server lifecycle observability.
- [**Enhanced Forms (`next/form`):**](https://nextjs.org/blog/next-15#form-component) Enhance HTML forms with client-side navigation.
- [**`next.config`:**](https://nextjs.org/blog/next-15#support-for-nextconfigts) TypeScript support for `next.config.ts`.
- [**Self-hosting Improvements:**](https://nextjs.org/blog/next-15#improvements-for-self-hosting) More control over `Cache-Control` headers.
- [**Server Actions Security:**](https://nextjs.org/blog/next-15#enhanced-security-for-server-actions) Unguessable endpoints and removal of unused actions.
- [**Bundling External Packages (Stable):**](https://nextjs.org/blog/next-15#optimizing-bundling-of-external-packages-stable) New config options for App and Pages Router.
- [**ESLint 9 Support:**](https://nextjs.org/blog/next-15#eslint-9-support) Added support for ESLint 9.
- [**Development and Build Performance:**](https://nextjs.org/blog/next-15#development-and-build-improvements) Improved build times and Faster Fast Refresh.

## [Smooth upgrades with `@next/codemod` CLI](https://nextjs.org/blog/next-15#smooth-upgrades-with-nextcodemod-cli)

We include codemods (automated code transformations) with every major Next.js release to help automate upgrading breaking changes.

To make upgrades even smoother, we've released an enhanced codemod CLI:

Terminal

```
npx @next/codemod@canary upgrade latest
```

This tool helps you upgrade your codebase to the latest stable or prerelease versions. The CLI will update your dependencies, show available codemods, and guide you through applying them.

The `canary` tag uses the latest version of the codemod while the latest specifies the Next.js version. We recommend using the canary version of the codemod even if you are upgrading to the latest Next.js version, as we plan to continue adding improvements to the tool based on your feedback.

Learn more about [Next.js codemod CLI](https://nextjs.org/docs/app/building-your-application/upgrading/codemods).

## [Async Request APIs (Breaking Change)](https://nextjs.org/blog/next-15#async-request-apis-breaking-change)

In traditional Server-Side Rendering, the server waits for a request before rendering any content. However, not all components depend on request-specific data, so it's unnecessary to wait for the request to render them. Ideally, the server would prepare as much as possible before a request arrives. To enable this, and set the stage for future optimizations, we need to know when to wait for the request.

Therefore, we are transitioning APIs that rely on request-specific data—such as `headers`, `cookies`, `params`, and `searchParams`—to be **asynchronous**.

```
import { cookies } from 'next/headers'; export async function AdminPanel() {  const cookieStore = await cookies();  const token = cookieStore.get('token');   // ...}
```

This is a **breaking change** and affects the following APIs:

- `cookies`
- `headers`
- `draftMode`
- `params` in `layout.js`, `page.js`, `route.js`, `default.js`, `generateMetadata`, and `generateViewport`
- `searchParams` in `page.js`

For an easier migration, these APIs can temporarily be accessed synchronously, but will show warnings in development and production until the next major version. A [codemod](https://nextjs.org/docs/app/building-your-application/upgrading/codemods) is available to automate the migration:

Terminal

```
npx @next/codemod@canary next-async-request-api .
```

For cases where the codemod can't fully migrate your code, please read the [upgrade guide](https://nextjs.org/docs/app/building-your-application/upgrading/version-15). We have also provided an [example](https://github.com/leerob/next-saas-starter/pull/62) of how to migrate a Next.js application to the new APIs.

## [Caching Semantics](https://nextjs.org/blog/next-15#caching-semantics)

Next.js App Router launched with opinionated caching defaults. These were designed to provide the most performant option by default with the ability to opt out when required.

Based on your feedback, we re-evaluated our [caching heuristics](https://x.com/feedthejim/status/1785242054773145636) and how they would interact with projects like Partial Prerendering (PPR) and with third party libraries using `fetch`.

With Next.js 15, we're changing the caching default for `GET` Route Handlers and the Client Router Cache from cached by default to uncached by default. If you want to retain the previous behavior, you can continue to opt-into caching.

We're continuing to improve caching in Next.js in the coming months and we'll share more details soon.

### [`GET` Route Handlers are no longer cached by default](https://nextjs.org/blog/next-15#get-route-handlers-are-no-longer-cached-by-default)

In Next 14, Route Handlers that used the `GET` HTTP method were cached by default unless they used a dynamic function or dynamic config option. In Next.js 15, `GET` functions are **not cached by default**.

You can still opt into caching using a static route config option such as `export dynamic = 'force-static'`.

Special Route Handlers like [`sitemap.ts`](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap), [`opengraph-image.tsx`](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image), and [`icon.tsx`](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons), and other [metadata files](https://nextjs.org/docs/app/api-reference/file-conventions/metadata) remain static by default unless they use dynamic functions or dynamic config options.

### [Client Router Cache no longer caches Page components by default](https://nextjs.org/blog/next-15#client-router-cache-no-longer-caches-page-components-by-default)

In Next.js 14.2.0, we introduced an experimental [`staleTimes`](https://nextjs.org/docs/app/api-reference/next-config-js/staleTimes) flag to allow custom configuration of the [Router Cache](https://nextjs.org/docs/app/building-your-application/caching#client-side-router-cache).

In Next.js 15, this flag still remains accessible, but we are changing the default behavior to have a `staleTime` of `0` for Page segments. This means that as you navigate around your app, the client will always reflect the latest data from the Page component(s) that become active as part of the navigation. However, there are still important behaviors that remain unchanged:

- Shared layout data won't be refetched from the server to continue to support [partial rendering](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#4-partial-rendering).
- Back/forward navigation will still restore from cache to ensure the browser can restore scroll position.
- [`loading.js`](https://nextjs.org/docs/app/api-reference/file-conventions/loading) will remain cached for 5 minutes (or the value of the `staleTimes.static` configuration).

You can opt into the previous Client Router Cache behavior by setting the following configuration:

next.config.ts

```
const nextConfig = {  experimental: {    staleTimes: {      dynamic: 30,    },  },}; export default nextConfig;
```

## [React 19](https://nextjs.org/blog/next-15#react-19)

As part of the Next.js 15 release, we've made the decision to align with the upcoming release of React 19.

In version 15, the App Router uses React 19 RC, and we've also introduced backwards compatibility for React 18 with the Pages Router based on community feedback. If you're using the Pages Router, this allows you to upgrade to React 19 when ready.

Although React 19 is still in the RC phase, our extensive testing across real-world applications and our close work with the React team have given us confidence in its stability. The core breaking changes have been well-tested and won't affect existing App Router users. Therefore, we've decided to release Next.js 15 as stable now, so your projects are fully prepared for React 19 GA.

To ensure the transition is as smooth as possible, we've provided [codemods and automated tools](https://nextjs.org/blog/next-15#smooth-upgrades-with-codemod-cli) to help ease the migration process.

Read the [Next.js 15 upgrade guide](https://nextjs.org/docs/app/building-your-application/upgrading/version-15), the [React 19 upgrade guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide), and watch the [React Conf Keynote](https://www.youtube.com/live/T8TZQ6k4SLE?t=1788) to learn more.

### [Pages Router on React 18](https://nextjs.org/blog/next-15#pages-router-on-react-18)

Next.js 15 maintains backward compatibility for the Pages Router with React 18, allowing users to continue using React 18 while benefiting from improvements in Next.js 15.

Since the first Release Candidate (RC1), we've shifted our focus to include support for React 18 based on community feedback. This flexibility enables you to adopt Next.js 15 while using the Pages Router with React 18, giving you greater control over your upgrade path.

> **Note:** While it is possible to run the Pages Router on React 18 and the App Router on React 19 in the same application, we don't recommend this setup. Doing so could result in unpredictable behavior and typings inconsistencies, as the underlying APIs and rendering logic between the two versions may not fully align.

### [React Compiler (Experimental)](https://nextjs.org/blog/next-15#react-compiler-experimental)

The [React Compiler](https://react.dev/learn/react-compiler) is a new experimental compiler created by the React team at Meta. The compiler understands your code at a deep level through its understanding of plain JavaScript semantics and the [Rules of React](https://react.dev/reference/rules), which allows it to add automatic optimizations to your code. The compiler reduces the amount of manual memoization developers have to do through APIs such as `useMemo` and `useCallback` - making code simpler, easier to maintain, and less error prone.

With Next.js 15, we've added support for the [React Compiler](https://react.dev/learn/react-compiler). Learn more about the React Compiler, and the [available Next.js config options](https://react.dev/learn/react-compiler#usage-with-nextjs).

> **Note:** The React Compiler is currently only available as a Babel plugin, which will result in slower development and build times.

### [Hydration error improvements](https://nextjs.org/blog/next-15#hydration-error-improvements)

Next.js 14.1 [made improvements](https://nextjs.org/blog/next-14-1#improved-error-messages-and-fast-refresh) to error messages and hydration errors. Next.js 15 continues to build on those by adding an improved hydration error view. Hydration errors now display the source code of the error with suggestions on how to address the issue.

For example, this was a previous hydration error message in Next.js 14.1:

![Hydration error message in Next.js 14.1](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fstatic%2Fblog%2Fnext-15-rc%2Fhydration-error-before-dark.png&w=2048&q=75)

Next.js 15 has improved this to:

![Hydration error message improved in Next.js 15](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fstatic%2Fblog%2Fnext-15-rc%2Fhydration-error-after-dark.png&w=1920&q=75)

## [Turbopack Dev](https://nextjs.org/blog/next-15#turbopack-dev)

We are happy to announce that `next dev --turbo` is now **stable and ready** to speed up your development experience. We've been using it to iterate on [vercel.com](https://vercel.com/), [nextjs.org](https://nextjs.org/), [v0](https://v0.app/), and all of our other applications with great results.

For example, with `vercel.com`, a large Next.js app, we've seen:

- Up to **76.7% faster** local server startup.
- Up to **96.3% faster** code updates with Fast Refresh.
- Up to **45.8% faster** initial route compile without caching (Turbopack does not have disk caching yet).

You can learn more about Turbopack Dev in our new [blog post](https://nextjs.org/blog/turbopack-for-development-stable).

## [Static Route Indicator](https://nextjs.org/blog/next-15#static-route-indicator)

Next.js now displays a Static Route Indicator during development to help you identify which routes are static or dynamic. This visual cue makes it easier to optimize performance by understanding how your pages are rendered.

![](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fstatic%2Fblog%2Fnext-15-rc2%2Fstatic-route-dark.png&w=3840&q=75)

You can also use the [next build](https://nextjs.org/docs/app/api-reference/cli/next#next-build-options) output to view the rendering strategy for all routes.

This update is part of our ongoing efforts to enhance observability in Next.js, making it easier for developers to monitor, debug, and optimize their applications. We're also working on dedicated developer tools, with more details to come soon.

Learn more about the [Static Route Indicator](https://nextjs.org/docs/app/api-reference/next-config-js/devIndicators#appisrstatus-static-indicator), which can be disabled.

## [Executing code after a response with `unstable_after` (Experimental)](https://nextjs.org/blog/next-15#executing-code-after-a-response-with-unstable_after-experimental)

When processing a user request, the server typically performs tasks directly related to computing the response. However, you may need to perform tasks such as logging, analytics, and other external system synchronization.

Since these tasks are not directly related to the response, the user should not have to wait for them to complete. Deferring the work after responding to the user poses a challenge because serverless functions stop computation immediately after the response is closed.

`after()` is a new experimental API that solves this problem by allowing you to schedule work to be processed after the response has finished streaming, enabling secondary tasks to run without blocking the primary response.

To use it, add `experimental.after` to `next.config.js`:

next.config.ts

```
const nextConfig = {  experimental: {    after: true,  },}; export default nextConfig;
```

Then, import the function in Server Components, Server Actions, Route Handlers, or Middleware.

```
import { unstable_after as after } from 'next/server';import { log } from '@/app/utils'; export default function Layout({ children }) {  // Secondary task  after(() => {    log();  });   // Primary task  return <>{children}</>;}
```

Learn more about [`unstable_after`](https://nextjs.org/docs/app/api-reference/functions/unstable_after).

## [`instrumentation.js` (Stable)](https://nextjs.org/blog/next-15#instrumentationjs-stable)

The `instrumentation` file, with the `register()` API, allows users to tap into the Next.js server lifecycle to monitor performance, track the source of errors, and deeply integrate with observability libraries like [OpenTelemetry](https://opentelemetry.io/).

This feature is now **stable** and the `experimental.instrumentationHook` config option can be removed.

In addition, we've collaborated with [Sentry](https://sentry.io/) on designing a new `onRequestError` hook that can be used to:

- Capture important context about all errors thrown on the server, including:
    - Router: Pages Router or App Router
    - Server context: Server Component, Server Action, Route Handler, or Middleware
- Report the errors to your favorite observability provider.

```
export async function onRequestError(err, request, context) {  await fetch('https://...', {    method: 'POST',    body: JSON.stringify({ message: err.message, request, context }),    headers: { 'Content-Type': 'application/json' },  });} export async function register() {  // init your favorite observability provider SDK}
```

Learn more about the `onRequestError` [function](https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation#onrequesterror-optional).

## [`<Form>` Component](https://nextjs.org/blog/next-15#form-component)

The new `<Form>` component extends the HTML `<form>` element with [prefetching](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#2-prefetching), [client-side navigation](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#5-soft-navigation), and progressive enhancement.

It is useful for forms that navigate to a new page, such as a search form that leads to a results page.

app/page.jsx

```
import Form from 'next/form'; export default function Page() {  return (    <Form action="/search">      <input name="query" />      <button type="submit">Submit</button>    </Form>  );}
```

The `<Form>` component comes with:

- **Prefetching**: When the form is in view, the [layout](https://nextjs.org/docs/app/api-reference/file-conventions/layout) and [loading](https://nextjs.org/docs/app/api-reference/file-conventions/loading) UI are prefetched, making navigation fast.
- **Client-side Navigation:** On submission, shared layouts and client-side state are preserved.
- **Progressive Enhancement**: If JavaScript hasn't loaded yet, the form still works via full-page navigation.

Previously, achieving these features required a lot of manual boilerplate. For example:

Learn more about the [`<Form>` Component](https://nextjs.org/docs/app/api-reference/components/form).

## [Support for `next.config.ts`](https://nextjs.org/blog/next-15#support-for-nextconfigts)

Next.js now supports the TypeScript `next.config.ts` file type and provides a `NextConfig` type for autocomplete and type-safe options:

next.config.ts

```
import type { NextConfig } from 'next'; const nextConfig: NextConfig = {  /* config options here */}; export default nextConfig;
```

Learn more about [TypeScript support](https://nextjs.org/docs/app/building-your-application/configuring/typescript#type-checking-nextconfigts) in Next.js.

## [Improvements for self-hosting](https://nextjs.org/blog/next-15#improvements-for-self-hosting)

When self-hosting applications, you may need more control over `Cache-Control` directives.

One common case is controlling the `stale-while-revalidate` period sent for ISR pages. We've implemented two improvements:

1. You can now configure the [`expireTime`](https://nextjs.org/docs/app/api-reference/next-config-js/expireTime) value in `next.config`. This was previously the `experimental.swrDelta` option.
2. Updated the default value to one year, ensuring most CDNs can fully apply the `stale-while-revalidate` semantics as intended.

We also no longer override custom `Cache-Control` values with our default values, allowing full control and ensuring compatibility with any CDN setup.

Finally, we've improved image optimization when self-hosting. Previously, we recommended you install `sharp` for optimizing images on your Next.js server. This recommendation was sometimes missed. With Next.js 15, you no longer need to manually install `sharp` — Next.js will use `sharp` automatically when using `next start` or running with [standalone output mode](https://nextjs.org/docs/app/api-reference/next-config-js/output).

To learn more, see our new [demo and tutorial video](https://x.com/leeerob/status/1843796169173995544) on self-hosting Next.js.

## [Enhanced Security for Server Actions](https://nextjs.org/blog/next-15#enhanced-security-for-server-actions)

[Server Actions](https://react.dev/reference/rsc/server-actions) are server-side functions that can be called from the client. They are defined by adding the `'use server'` directive at the top of a file and exporting an async function.

Even if a Server Action or utility function is not imported elsewhere in your code, it's still a publicly accessible HTTP endpoint. While this behavior is technically correct, it can lead to unintentional exposure of such functions.

To improve security, we've introduced the following enhancements:

- **Dead code elimination:** Unused Server Actions won't have their IDs exposed to the client-side JavaScript bundle, reducing bundle size and improving performance.
- **Secure action IDs:** Next.js now creates unguessable, non-deterministic IDs to allow the client to reference and call the Server Action. These IDs are periodically recalculated between builds for enhanced security.

```
// app/actions.js'use server'; // This action **is** used in our application, so Next.js// will create a secure ID to allow the client to reference// and call the Server Action.export async function updateUserAction(formData) {} // This action **is not** used in our application, so Next.js// will automatically remove this code during `next build`// and will not create a public endpoint.export async function deleteUserAction(formData) {}
```

You should still treat Server Actions as public HTTP endpoints. Learn more about [securing Server Actions](https://nextjs.org/blog/security-nextjs-server-components-actions#write).

## [Optimizing bundling of external packages (Stable)](https://nextjs.org/blog/next-15#optimizing-bundling-of-external-packages-stable)

Bundling external packages can improve the cold start performance of your application. In the **App Router**, external packages are bundled by default, and you can opt-out specific packages using the new [`serverExternalPackages`](https://nextjs.org/docs/app/api-reference/next-config-js/serverExternalPackages) config option.

In the **Pages Router**, external packages are not bundled by default, but you can provide a list of packages to bundle using the existing [`transpilePackages`](https://nextjs.org/docs/pages/api-reference/next-config-js/transpilePackages) option. With this configuration option, you need to specify each package.

To unify configuration between App and Pages Router, we're introducing a new option, [`bundlePagesRouterDependencies`](https://nextjs.org/docs/pages/api-reference/next-config-js/bundlePagesRouterDependencies) to match the default automatic bundling of the App Router. You can then use [`serverExternalPackages`](https://nextjs.org/docs/app/api-reference/next-config-js/serverExternalPackages) to opt-out specific packages, if needed.

next.config.ts

```
const nextConfig = {  // Automatically bundle external packages in the Pages Router:  bundlePagesRouterDependencies: true,  // Opt specific packages out of bundling for both App and Pages Router:  serverExternalPackages: ['package-name'],}; export default nextConfig;
```

Learn more about [optimizing external packages](https://nextjs.org/docs/app/building-your-application/optimizing/package-bundling).

## [ESLint 9 Support](https://nextjs.org/blog/next-15#eslint-9-support)

Next.js 15 also introduces support for [ESLint 9](https://eslint.org/blog/2024/04/eslint-v9.0.0-released), following the end-of-life for ESLint 8 on October 5, 2024.

To ensure a smooth transition, Next.js remain backwards compatible, meaning you can continue using either ESLint 8 or 9.

If you upgrade to ESLint 9, and we detect that you haven't yet adopted [the new config format](https://eslint.org/blog/2024/04/eslint-v9.0.0-released/#flat-config-is-now-the-default-and-has-some-changes), Next.js will automatically apply the `ESLINT_USE_FLAT_CONFIG=false` escape hatch to ease migration.

Additionally, deprecated options like `—ext` and `—ignore-path` will be removed when running `next lint`. Please note that ESLint will eventually disallow these older configurations in ESLint 10, so we recommend starting your migration soon.

For more details on these changes, check out the [migration guide](https://eslint.org/docs/latest/use/migrate-to-9.0.0).

As part of this update, we've also upgraded `eslint-plugin-react-hooks` to `v5.0.0`, which introduces new rules for React Hooks usage. You can review all changes in the [changelog for eslint-plugin-react-hooks@5.0.0](https://github.com/facebook/react/releases/tag/eslint-plugin-react-hooks%405.0.0).

## [Development and Build Improvements](https://nextjs.org/blog/next-15#development-and-build-improvements)

### [Server Components HMR](https://nextjs.org/blog/next-15#server-components-hmr)

During development, Server components are re-executed when saved. This means, any `fetch` requests to your API endpoints or third-party services are also called.

To improve local development performance and reduce potential costs for billed API calls, we now ensure Hot Module Replacement (HMR) can re-use `fetch` responses from previous renders.

Learn more about the [Server Components HMR Cache](https://nextjs.org/docs/app/api-reference/next-config-js/serverComponentsHmrCache).

### [Faster Static Generation for the App Router](https://nextjs.org/blog/next-15#faster-static-generation-for-the-app-router)

We've optimized static generation to improve build times, especially for pages with slow network requests.

Previously, our static optimization process rendered pages twice—once to generate data for client-side navigation and a second time to render the HTML for the initial page visit. Now, we reuse the first render, cutting out the second pass, reducing workload and build times.

Additionally, static generation workers now share the `fetch` cache across pages. If a `fetch` call doesn't opt out of caching, its results are reused by other pages handled by the same worker. This reduces the number of requests for the same data.

### [Advanced Static Generation Control (Experimental)](https://nextjs.org/blog/next-15#advanced-static-generation-control-experimental)

We've added experimental support for more control over the static generation process for advanced use cases that would benefit from greater control.

We recommend sticking to the current defaults unless you have specific requirements as these options can lead to increased resource usage and potential out-of-memory errors due to increased concurrency.

next.config.ts

```
const nextConfig = {  experimental: {    // how many times Next.js will retry failed page generation attempts    // before failing the build    staticGenerationRetryCount: 1    // how many pages will be processed per worker    staticGenerationMaxConcurrency: 8    // the minimum number of pages before spinning up a new export worker    staticGenerationMinPagesPerWorker: 25  },} export default nextConfig;
```

Learn more about the [Static Generation options](https://nextjs.org/docs/app/api-reference/next-config-js/staticGeneration).

## [Other Changes](https://nextjs.org/blog/next-15#other-changes)

- **[Breaking]** next/image: Removed `squoosh` in favor of `sharp` as an optional dependency ([PR](https://github.com/vercel/next.js/pull/63321))
- **[Breaking]** next/image: Changed default `Content-Disposition` to `attachment` ([PR](https://github.com/vercel/next.js/pull/65631))
- **[Breaking]** next/image: Error when `src` has leading or trailing spaces ([PR](https://github.com/vercel/next.js/pull/65637))
- **[Breaking]** Middleware: Apply `react-server` condition to limit unrecommended React API imports ([PR](https://github.com/vercel/next.js/pull/65424))
- **[Breaking]** next/font: Removed support for external `@next/font` package ([PR](https://github.com/vercel/next.js/pull/65601))
- **[Breaking]** next/font: Removed `font-family` hashing ([PR](https://github.com/vercel/next.js/pull/53608))
- **[Breaking]** Caching: `force-dynamic` will now set a `no-store` default to the fetch cache ([PR](https://github.com/vercel/next.js/pull/64145))
- **[Breaking]** Config: Enable `swcMinify` ([PR](https://github.com/vercel/next.js/pull/65579)), `missingSuspenseWithCSRBailout` ([PR](https://github.com/vercel/next.js/pull/65688)), and `outputFileTracing` ([PR](https://github.com/vercel/next.js/pull/65579)) behavior by default and remove deprecated options
- **[Breaking]** Remove auto-instrumentation for Speed Insights (must now use the dedicated [@vercel/speed-insights](https://www.npmjs.com/package/@vercel/speed-insights) package) ([PR](https://github.com/vercel/next.js/pull/64199))
- **[Breaking]** Remove `.xml` extension for dynamic sitemap routes and align sitemap URLs between development and production ([PR](https://github.com/vercel/next.js/pull/65507))
- **[Breaking]** We've deprecated exporting `export const runtime = "experimental-edge"` in the App Router. Users should now switch to `export const runtime = "edge"`. We've added a [codemod](https://nextjs.org/docs/app/building-your-application/upgrading/codemods#app-dir-runtime-config-experimental-edge) to perform this ([PR](https://github.com/vercel/next.js/pull/70480))
- **[Breaking]** Calling `revalidateTag` and `revalidatePath` during render will now throw an error ([PR](https://github.com/vercel/next.js/pull/71093))
- **[Breaking]** The `instrumentation.js` and `middleware.js` files will now use the vendored React packages ([PR](https://github.com/vercel/next.js/pull/69619))
- **[Breaking]** The minimum required Node.js version has been updated to 18.18.0 ([PR](https://github.com/vercel/next.js/pull/67274))
- **[Breaking]** `next/dynamic`: the deprecated `suspense` prop has been removed and when the component is used in the App Router, it won't insert an empty Suspense boundary anymore ([PR](https://github.com/vercel/next.js/pull/67014))
- **[Breaking]** When resolving modules on the Edge Runtime, the `worker` module condition will not be applied ([PR](https://github.com/vercel/next.js/pull/66808))
- **[Breaking]** Disallow using `ssr: false` option with `next/dynamic` in Server Components ([PR](https://github.com/vercel/next.js/pull/70378))
- **[Improvement]** Metadata: Updated environment variable fallbacks for `metadataBase` when hosted on Vercel ([PR](https://github.com/vercel/next.js/pull/65089))
- **[Improvement]** Fix tree-shaking with mixed namespace and named imports from `optimizePackageImports` ([PR](https://github.com/vercel/next.js/pull/64894))
- **[Improvement]** Parallel Routes: Provide unmatched catch-all routes with all known params ([PR](https://github.com/vercel/next.js/pull/65063))
- **[Improvement]** Config `bundlePagesExternals` is now stable and renamed to `bundlePagesRouterDependencies`
- **[Improvement]** Config `serverComponentsExternalPackages` is now stable and renamed to `serverExternalPackages`
- **[Improvement]** create-next-app: New projects ignore all `.env` files by default ([PR](https://github.com/vercel/next.js/pull/61920))
- **[Improvement]** The `outputFileTracingRoot`, `outputFileTracingIncludes` and `outputFileTracingExcludes` have been upgraded from experimental and are now stable ([PR](https://github.com/vercel/next.js/pull/68464))
- **[Improvement]** Avoid merging global CSS files with CSS module files deeper in the tree ([PR](https://github.com/vercel/next.js/pull/67373))
- **[Improvement]** The cache handler can be specified via the `NEXT_CACHE_HANDLER_PATH` environment variable ([PR](https://github.com/vercel/next.js/pull/70537/))
- **[Improvement]** The Pages Router now supports both React 18 and React 19 ([PR](https://github.com/vercel/next.js/pull/69484))
- **[Improvement]** The Error Overlay now displays a button to copy the Node.js Inspector URL if the inspector is enabled ([PR](https://github.com/vercel/next.js/pull/69357))
- **[Improvement]** Client prefetches on the App Router now use the `priority` attribute ([PR](https://github.com/vercel/next.js/pull/67356))
- **[Improvement]** Next.js now provides an `unstable_rethrow` function to rethrow Next.js internal errors in the App Router ([PR](https://github.com/vercel/next.js/pull/65831))
- **[Improvement]** `unstable_after` can now be used in static pages ([PR](https://github.com/vercel/next.js/pull/71231))
- **[Improvement]** If a `next/dynamic` component is used during SSR, the chunk will be prefetched ([PR](https://github.com/vercel/next.js/pull/65486))
- **[Improvement]** The `esmExternals` option is now supported on the App Router ([PR](https://github.com/vercel/next.js/pull/65041))
- **[Improvement]** The `experimental.allowDevelopmentBuild` option can be used to allow `NODE_ENV=development` with `next build` for debugging purposes ([PR](https://github.com/vercel/next.js/pull/65463))
- **[Improvement]** The Server Action transforms are now disabled in the Pages Router ([PR](https://github.com/vercel/next.js/pull/71028))
- **[Improvement]** Build workers will now stop the build from hanging when they exit ([PR](https://github.com/vercel/next.js/pull/70997))
- **[Improvement]** When redirecting from a Server Action, revalidations will now apply correctly ([PR](https://github.com/vercel/next.js/pull/70715))
- **[Improvement]** Dynamic params are now handled correctly for parallel routes on the Edge Runtime ([PR](https://github.com/vercel/next.js/pull/70667))
- **[Improvement]** Static pages will now respect staleTime after initial load ([PR](https://github.com/vercel/next.js/pull/70640))
- **[Improvement]** `vercel/og` updated with a memory leak fix ([PR](https://github.com/vercel/next.js/pull/70214))
- **[Improvement]** Patch timings updated to allow usage of packages like `msw` for APIs mocking ([PR](https://github.com/vercel/next.js/pull/68193))
- **[Improvement]** Prerendered pages should use static staleTime ([PR](https://github.com/vercel/next.js/pull/67868))

To learn more, check out the [upgrade guide](https://nextjs.org/docs/app/building-your-application/upgrading/version-15).

## [Contributors](https://nextjs.org/blog/next-15#contributors)



January 22, 2025

# Tailwind CSS v4.0

![](https://tailwindcss.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fadamwathan.f69b0b90.jpg&w=96&q=75)

Adam Wathan

[@adamwathan](https://twitter.com/adamwathan)

![Tailwind CSS v4.0](https://tailwindcss.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcard.22502194.jpg&w=3840&q=75)

Holy shit it's actually done — we just tagged Tailwind CSS v4.0.

Tailwind CSS v4.0 is an all-new version of the framework optimized for performance and flexibility, with a reimagined configuration and customization experience, and taking full advantage of the latest advancements the web platform has to offer.

- [New high-performance engine](https://tailwindcss.com/blog/tailwindcss-v4#new-high-performance-engine) — where full builds are up to 5x faster, and incremental builds are over 100x faster — and measured in microseconds.
- [Designed for the modern web](https://tailwindcss.com/blog/tailwindcss-v4#designed-for-the-modern-web) — built on cutting-edge CSS features like cascade layers, registered custom properties with `@property`, and `color-mix()`.
- [Simplified installation](https://tailwindcss.com/blog/tailwindcss-v4#simplified-installation) — fewer dependencies, zero configuration, and just a single line of code in your CSS file.
- [First-party Vite plugin](https://tailwindcss.com/blog/tailwindcss-v4#first-party-vite-plugin) — tight integration for maximum performance and minimum configuration.
- [Automatic content detection](https://tailwindcss.com/blog/tailwindcss-v4#automatic-content-detection) — all of your template files are discovered automatically, with no configuration required.
- [Built-in import support](https://tailwindcss.com/blog/tailwindcss-v4#built-in-import-support) — no additional tooling necessary to bundle multiple CSS files.
- [CSS-first configuration](https://tailwindcss.com/blog/tailwindcss-v4#css-first-configuration) — a reimagined developer experience where you customize and extend the framework directly in CSS instead of a JavaScript configuration file.
- [CSS theme variables](https://tailwindcss.com/blog/tailwindcss-v4#css-theme-variables) — all of your design tokens exposed as native CSS variables so you can access them anywhere.
- [Dynamic utility values and variants](https://tailwindcss.com/blog/tailwindcss-v4#dynamic-utility-values-and-variants) — stop guessing what values exist in your spacing scale, or extending your configuration for things like basic data attributes.
- [Modernized P3 color palette](https://tailwindcss.com/blog/tailwindcss-v4#modernized-p3-color-palette) — a redesigned, more vivid color palette that takes full advantage of modern display technology.
- [Container queries](https://tailwindcss.com/blog/tailwindcss-v4#container-queries) — first-class APIs for styling elements based on their container size, no plugins required.
- [New 3D transform utilities](https://tailwindcss.com/blog/tailwindcss-v4#new-3d-transform-utilities) — transform elements in 3D space directly in your HTML.
- [Expanded gradient APIs](https://tailwindcss.com/blog/tailwindcss-v4#expanded-gradient-apis) — radial and conic gradients, interpolation modes, and more.
- [@starting-style support](https://tailwindcss.com/blog/tailwindcss-v4#starting-style-support) — a new variant you can use to create enter and exit transitions, without the need for JavaScript.
- [not-* variant](https://tailwindcss.com/blog/tailwindcss-v4#not-variant) — style an element only when it doesn't match another variant, custom selector, or media or feature query.
- [Even more new utilities and variants](https://tailwindcss.com/blog/tailwindcss-v4#even-more-new-utilities-and-variants) — including support for `color-scheme`, `field-sizing`, complex shadows, `inert`, and more.

Start using Tailwind CSS v4.0 today by [installing it in a new project](https://tailwindcss.com/docs/installation), or playing with it directly in the browser on [Tailwind Play](https://play.tailwindcss.com/).

For existing projects, we've published a comprehensive [upgrade guide](https://tailwindcss.com/docs/upgrade-guide) and built an [automated upgrade tool](https://tailwindcss.com/docs/upgrade-guide#using-the-upgrade-tool) to get you on the latest version as quickly and painlessly as possible.

---

## [New high-performance engine](https://tailwindcss.com/blog/tailwindcss-v4#new-high-performance-engine)

Tailwind CSS v4.0 is a ground-up rewrite of the framework, taking everything we've learned about the architecture over the years and optimizing it to be as fast as possible.

When benchmarking it on our own projects, we've found full rebuilds to be over 3.5x faster, and incremental builds to be over 8x faster.

Here are the median build times we saw when we benchmarked Tailwind CSS v4.0 against [Catalyst](https://tailwindui.com/templates/catalyst):

||v3.4|v4.0|Improvement|
|---|---|---|---|
|Full build|378ms|100ms|3.78x|
|Incremental rebuild with new CSS|44ms|5ms|8.8x|
|Incremental rebuild with no new CSS|35ms|192µs|182x|

The most impressive improvement is on incremental builds that don't actually need to compile any new CSS — these builds are over 100x faster and complete in _microseconds_. And the longer you work on a project, the more of these builds you run into because you're just using classes you've already used before, like `flex`, `col-span-2`, or `font-bold`.

---

## [Designed for the modern web](https://tailwindcss.com/blog/tailwindcss-v4#designed-for-the-modern-web)

The platform has evolved a lot since we released Tailwind CSS v3.0, and v4.0 takes full advantage of many of these improvements.

CSS

```
@layer theme, base, components, utilities;@layer utilities {  .mx-6 {    margin-inline: calc(var(--spacing) * 6);  }  .bg-blue-500\/50 {    background-color: color-mix(in oklab, var(--color-blue-500) 50%, transparent);  }}@property --tw-gradient-from {  syntax: "<color>";  inherits: false;  initial-value: #0000;}
```

We're leveraging modern CSS features like:

- **Native cascade layers** — giving us more control than ever over how different style rules interact with each other.
- **Registered custom properties** — making it possible to do things like animate gradients, and significantly improving performance on large pages.
- **color-mix()** — which lets us adjust the opacity of any color value, including CSS variables and `currentColor`.
- **Logical properties** — simplifying RTL support and reducing the size of your generated CSS.

Many of these features have even simplified Tailwind internally, reducing the surface area for bugs and making the framework easier for us to maintain.

---

## [Simplified installation](https://tailwindcss.com/blog/tailwindcss-v4#simplified-installation)

We've streamlined the setup process a ton in v4.0, reducing the number of steps and removing a lot of boilerplate.

1. Install Tailwind CSS

```
npm i tailwindcss @tailwindcss/postcss;
```

2. Add the PostCSS plugin

```
export default {  plugins: ["@tailwindcss/postcss"],};
```

3. Import Tailwind in your CSS

```
@import "tailwindcss";
```

With the improvements we've made to this process for v4.0, Tailwind feels more light-weight than ever:

- **Just one-line of CSS** — no more `@tailwind` directives, just add `@import "tailwindcss"` and start building.
- **Zero configuration** — you can start using the framework without configuring anything, not even the paths to your template files.
- **No external plugins required** — we bundle `@import` rules for you out of the box, and use [Lightning CSS](https://lightningcss.dev/) under the hood for vendor prefixing and modern syntax transforms.

Sure you only go through this once per project, but it adds up when you're starting and abandoning a different side-project every weekend.

## [First-party Vite plugin](https://tailwindcss.com/blog/tailwindcss-v4#first-party-vite-plugin)

If you're a Vite user, you can now integrate Tailwind using [`@tailwindcss/vite`](https://tailwindcss.com/docs/installation/using-vite) instead of PostCSS:

vite.config.ts

```
import { defineConfig } from "vite";import tailwindcss from "@tailwindcss/vite";export default defineConfig({  plugins: [    tailwindcss(),  ],});
```

Tailwind CSS v4.0 is incredibly fast when used as a PostCSS plugin, but you'll get even better performance using the Vite plugin.

## [Automatic content detection](https://tailwindcss.com/blog/tailwindcss-v4#automatic-content-detection)

You know how you always had to configure that annoying `content` array in Tailwind CSS v3? In v4.0, we came up with a bunch of heuristics for detecting all of that stuff automatically so you don’t have to configure it at all.

For example, we automatically ignore anything in your `.gitignore` file to avoid scanning dependencies or generated files that aren’t under version control:

.gitignore

```
/node_modules/coverage/.next//build
```

We also automatically ignore all binary extensions like images, videos, .zip files, and more.

And if you ever need to explicitly add a source that's excluded by default, you can always add it with the `@source` directive, right in your CSS file:

CSS

```
@import "tailwindcss";@source "../node_modules/@my-company/ui-lib";
```

The `@source` directive uses the same heuristics under the hood, so it will exclude binary file types for example as well, without you having to specify all of the extensions to scan explicitly.

Learn more about in our new documentation on [detecting classes in source files](https://tailwindcss.com/docs/detecting-classes-in-source-files).

---

## [Built-in import support](https://tailwindcss.com/blog/tailwindcss-v4#built-in-import-support)

Before v4.0, if you wanted to inline other CSS files using `@import` you'd have to configure another plugin like `postcss-import` to handle it for you.

Now we handle this out of the box, so you don't need any other tools:

postcss.config.js

```
export default {  plugins: [    "postcss-import",    "@tailwindcss/postcss",  ],};
```

Our import system is purpose-built for Tailwind CSS, so we've also been able to make it even faster by tightly integrating it with our engine.

---

## [CSS-first configuration](https://tailwindcss.com/blog/tailwindcss-v4#css-first-configuration)

One of the biggest changes in Tailwind CSS v4.0 is the shift from configuring your project in JavaScript to configuring it in CSS.

Instead of a `tailwind.config.js` file, you can configure all of your customizations directly in the CSS file where you import Tailwind, giving you one less file to worry about in your project:

CSS

```
@import "tailwindcss";@theme {  --font-display: "Satoshi", "sans-serif";  --breakpoint-3xl: 1920px;  --color-avocado-100: oklch(0.99 0 0);  --color-avocado-200: oklch(0.98 0.04 113.22);  --color-avocado-300: oklch(0.94 0.11 115.03);  --color-avocado-400: oklch(0.92 0.19 114.08);  --color-avocado-500: oklch(0.84 0.18 117.33);  --color-avocado-600: oklch(0.53 0.12 118.34);  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);  --ease-snappy: cubic-bezier(0.2, 0, 0, 1);  /* ... */}
```

The new CSS-first configuration lets you do just about everything you could do in your `tailwind.config.js` file, including configuring your design tokens, defining custom utilities and variants, and more.

To learn more about how it all works, read the new [theme variables](https://tailwindcss.com/docs/theme) documentation.

---

## [CSS theme variables](https://tailwindcss.com/blog/tailwindcss-v4#css-theme-variables)

Tailwind CSS v4.0 takes all of your design tokens and makes them available as CSS variables by default, so you can reference any value you need at run-time using just CSS.

Using the example `@theme` from earlier, all of these values will be added to your CSS to as regular custom properties:

Generated CSS

```
:root {  --font-display: "Satoshi", "sans-serif";  --breakpoint-3xl: 1920px;  --color-avocado-100: oklch(0.99 0 0);  --color-avocado-200: oklch(0.98 0.04 113.22);  --color-avocado-300: oklch(0.94 0.11 115.03);  --color-avocado-400: oklch(0.92 0.19 114.08);  --color-avocado-500: oklch(0.84 0.18 117.33);  --color-avocado-600: oklch(0.53 0.12 118.34);  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);  --ease-snappy: cubic-bezier(0.2, 0, 0, 1);  /* ... */}
```

This makes it easy to reuse these values as inline styles or pass them to libraries like [Motion](https://motion.dev/docs/react-animation#css-variables) to animate them.

---

## [Dynamic utility values and variants](https://tailwindcss.com/blog/tailwindcss-v4#dynamic-utility-values-and-variants)

We've simplified the way many utilities and variants work in v4.0 by effectively allowing them to accept certain types of arbitrary values, _without_ the need for any configuration or dropping down to the arbitrary value syntax.

For example, in Tailwind CSS v4.0 you can create grids of any size out of the box:

HTML

```
<div class="grid grid-cols-15">  <!-- ... --></div>
```

You can also target custom boolean data attributes without needing to define them:

HTML

```
<div data-current class="opacity-75 data-current:opacity-100">  <!-- ... --></div>
```

Even spacing utilities like `px-*`, `mt-*`, `w-*`, `h-*`, and more are now dynamically derived from a single spacing scale variable and accept any value out of the box:

Generated CSS

```
@layer theme {  :root {    --spacing: 0.25rem;  }}@layer utilities {  .mt-8 {    margin-top: calc(var(--spacing) * 8);  }  .w-17 {    width: calc(var(--spacing) * 17);  }  .pr-29 {    padding-right: calc(var(--spacing) * 29);  }}
```

The upgrade tool we released alongside v4.0 will even simplify most of these utilities for you automatically if it notices you using an arbitrary value that's no longer needed.

---

## [Modernized P3 color palette](https://tailwindcss.com/blog/tailwindcss-v4#modernized-p3-color-palette)

We've upgraded the entire default color palette from `rgb` to `oklch`, taking advantage of the wider gamut to make the colors more vivid in places where we were previously limited by the sRGB color space.

We've tried to keep the balance between all the colors the same as it was in v3, so even though we've refreshed things across the board, it shouldn't feel like a breaking change when upgrading your existing projects.

---

## [Container queries](https://tailwindcss.com/blog/tailwindcss-v4#container-queries)

We've brought container query support into core for v4.0, so you don't need the `@tailwindcss/container-queries` plugin anymore:

HTML

```
<div class="@container">  <div class="grid grid-cols-1 @sm:grid-cols-3 @lg:grid-cols-4">    <!-- ... -->  </div></div>
```

We've also added support for max-width container queries using the new `@max-*` variant:

HTML

```
<div class="@container">  <div class="grid grid-cols-3 @max-md:grid-cols-1">    <!-- ... -->  </div></div>
```

Like our regular breakpoint variants, you can also stack `@min-*` and `@max-*` variants to define container query ranges:

HTML

```
<div class="@container">  <div class="flex @min-md:@max-xl:hidden">    <!-- ... -->  </div></div>
```

Learn more in our all-new [container queries](https://tailwindcss.com/docs/responsive-design#container-queries) documentation.

---

## [New 3D transform utilities](https://tailwindcss.com/blog/tailwindcss-v4#new-3d-transform-utilities)

We've finally added APIs for doing 3D transforms, like `rotate-x-*`, `rotate-y-*`, `scale-z-*`, `translate-z-*`, and tons more.

![](https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80)

Mar 16, 2020

![](https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80)Michael Foster

Boost your conversion rate

```
<div class="perspective-distant">  <article class="rotate-x-51 rotate-z-43 transform-3d ...">    <!-- ... -->  </article></div>
```

Check out the updated [`transform-style`](https://tailwindcss.com/docs/transform-style), [`rotate`](https://tailwindcss.com/docs/rotate), [`perspective`](https://tailwindcss.com/docs/perspective), and [`perspective-origin`](https://tailwindcss.com/docs/perspective-origin) documentation to get started.

---

## [Expanded gradient APIs](https://tailwindcss.com/blog/tailwindcss-v4#expanded-gradient-apis)

We've added a ton of new gradient features in v4.0, so you can pull off even fancier effects without having to write any custom CSS.

### [Linear gradient angles](https://tailwindcss.com/blog/tailwindcss-v4#linear-gradient-angles)

Linear gradients now support angles as values, so you can use utilities like `bg-linear-45` to create a gradient on a 45 degree angle:

```
<div class="bg-linear-45 from-indigo-500 via-purple-500 to-pink-500"></div>
```

You may notice we've renamed `bg-gradient-*` to `bg-linear-*` too — you'll see why shortly!

### [Gradient interpolation modifiers](https://tailwindcss.com/blog/tailwindcss-v4#gradient-interpolation-modifiers)

We've added the ability to control the color interpolation mode for gradients using a modifier, so a class like `bg-linear-to-r/srgb` interpolates using sRGB, and `bg-linear-to-r/oklch` interpolates using OKLCH:

```
<div class="bg-linear-to-r/srgb from-indigo-500 to-teal-400">...</div><div class="bg-linear-to-r/oklch from-indigo-500 to-teal-400">...</div>
```

Using polar color spaces like OKLCH or HSL can lead to much more vivid gradients when the `from-*` and `to-*` colors are far apart on the color wheel. We're using OKLAB by default in v4.0 but you can always interpolate using a different color space by adding one of these modifiers.

### [Conic and radial gradients](https://tailwindcss.com/blog/tailwindcss-v4#conic-and-radial-gradients)

We've added new `bg-conic-*` and `bg-radial-*` utilities for creating conic and radial gradients:

```
<div class="size-24 rounded-full bg-conic/[in_hsl_longer_hue] from-red-600 to-red-600"></div><div class="size-24 rounded-full bg-radial-[at_25%_25%] from-white to-zinc-900 to-75%"></div>
```

These new utilities work alongside the existing `from-*`, `via-*`, and `to-*` utilities to let you create conic and radial gradients the same way you create linear gradients, and include modifiers for setting the color interpolation method and arbitrary value support for controlling details like the gradient position.

---

## [@starting-style support](https://tailwindcss.com/blog/tailwindcss-v4#starting-style-support)

The new `starting` variant adds support for the new CSS [`@starting-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style) feature, making it possible to transition element properties when an element is first displayed:

```
<div>  <button popovertarget="my-popover">Check for updates</button>  <div popover id="my-popover" class="transition-discrete starting:open:opacity-0 ...">    <!-- ... -->  </div></div>
```

With `@starting-style`, you can finally animate elements as they appear on the page without the need for any JavaScript at all. [Browser support](https://caniuse.com/mdn-css_at-rules_starting-style) probably isn't quite there yet for most teams, but we're getting close!

---

## [not-* variant](https://tailwindcss.com/blog/tailwindcss-v4#not-variant)

We've added a new `not-*` variant which finally adds support for the CSS `:not()` pseudo-class:

HTML

```
<div class="not-hover:opacity-75">  <!-- ... --></div>
```

CSS

```
.not-hover\:opacity-75:not(*:hover) {  opacity: 75%;}@media not (hover: hover) {  .not-hover\:opacity-75 {    opacity: 75%;  }}
```

It does double duty and also lets you negate media queries and `@supports` queries:

HTML

```
<div class="not-supports-hanging-punctuation:px-4">  <!-- ... --></div>
```

CSS

```
.not-supports-hanging-punctuation\:px-4 {  @supports not (hanging-punctuation: var(--tw)) {    padding-inline: calc(var(--spacing) * 4);  }}
```

Check out the new [`not-*` documentation](https://tailwindcss.com/docs/hover-focus-and-other-states#not) to learn more.

---

## [Even more new utilities and variants](https://tailwindcss.com/blog/tailwindcss-v4#even-more-new-utilities-and-variants)

We've added a ton of other new utilities and variants to v4.0 too, including:

- **New [`inset-shadow-*`](https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow) and [`inset-ring-*`](https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring) utilities** — making it possible to stack up to four layers of box shadows on a single element.
- **New [`field-sizing`](https://tailwindcss.com/docs/field-sizing) utilities** — for auto-resizing textareas without writing a single line of JavaScript.
- **New [`color-scheme`](https://tailwindcss.com/docs/color-scheme) utilities** — so you can finally get rid of those ugly light scrollbars in dark mode.
- **New [`font-stretch`](https://tailwindcss.com/docs/font-stretch) utilities** — for carefully tweaking variable fonts that support different widths.
- **New [`inert`](https://tailwindcss.com/docs/hover-focus-and-other-states#styling-inert-elements) variant** — for styling non-interactive elements marked with the `inert` attribute.
- **New [`nth-*`](https://tailwindcss.com/docs/hover-focus-and-other-states#first-last-odd-and-even) variants** — for doing really clever things you'll eventually regret.
- **New [`in-*`](https://tailwindcss.com/docs/hover-focus-and-other-states#implicit-groups) variant** — which is a lot like `group-*`, but without the need for the `group` class.
- **Support for [`:popover-open`](https://tailwindcss.com/docs/hover-focus-and-other-states#openclosed-state)** — using the existing `open` variant to also target open popovers.
- **New [descendant variant](https://tailwindcss.com/docs/hover-focus-and-other-states#styling-all-descendants)** — for styling all descendant elements, for better or for worse.

Check out the relevant documentation for all of these features to learn more.