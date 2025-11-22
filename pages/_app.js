import '../styles/globals.css';
import { ErrorBoundary } from 'react-error-boundary';
import { ProxyProvider } from '../components/ProxyContext';
import Head from 'next/head';

function ErrorFallback({ error }) {
  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
      <p className="text-gray-700 mb-4">{error.message || 'An error occurred while rendering this page.'}</p>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => window.location.reload()}
      >
        Reload page
      </button>
    </div>
  );
}

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ProxyProvider>
        <Head>
          {/* Force styles to load with absolute URLs when needed */}
          <base href={process.env.NEXT_PUBLIC_HOST || '/'} />
          
          {/* Ensure styles are properly loaded */}
          <link rel="stylesheet" href="/_next/static/css/app.css" />
        </Head>
      <Component {...pageProps} />
      </ProxyProvider>
    </ErrorBoundary>
  );
}

export default MyApp;