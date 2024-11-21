```bash
//running app
git clone git@github.com:brunoSnoww/currency_converter.git
cd currency_converter
npm i 
npm run dev

//lint and tests
npm run lint // runs linter
npm run test // runs tests
// make sure there is some app to allow cors
```

The application's structure is inspired by the followinf article: https://reactrouter.com/en/main/guides/data-libs. Therefore all data fetching on the app is made inside the loader function on the route definition, which also can cache any loader function since we pass the queryClient object to it: 

```typescript
export const router = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Navigate to={`${defaultCurrency}`} replace />, // Redirects to /USD if accessing root path
        },
        {
          path: "/:currency",
          element: <CurrencyExchangeTable />,
          loader: tickerLoader({ queryClient }),
          errorElement: <CurrencyErrorBoundary />,
        },
      ],
    },
  ]);
```
One note is that the above code uses 'createBrowserRouter' to build the routes, which uses the history data strucutre from the browser. If we were to embed such application in an iframe that prevents the programmer from accessing the browser's history object (due to web security principles such as the Same-Origin Policy (SOP) and browser-specific restrictions ) , we could use the 'createMemoryRoute' instead, which would use an in-memory data strucute for the history object instead of the browser one.

The above structure makes it easier to decouple UI logic from data fetching logic, where the connector of both is made by the useLoaderData hook, and with Suspense (from react) and Await (from react router) components, we can get rid of loading states. 

```typescript
export const CurrencyExchangeTable = () => {
  const { data, isEmptyState } = useLoaderData() as {
    data: CurrencyExchangeData[];
    isEmptyState: boolean;
  };
  return (
    <React.Suspense>
        <Await resolve={data}>
          {(data) => <UI ...data />}
        </Await>
    </React.Suspense>
```

And since we pass the queryClient inside the closure, we can cache all data as we want according to the query definitons:
```typescript
const getTickerQuery = (currency: Currency) => ({
  queryKey: ["ticker", `${currency}`],
  queryFn: () => getSdk().getTicker(currency),
  staleTime: 1000 * 60 * 5,
  refetchOnWindowFocus: true,
  suspense: true,
});
```









