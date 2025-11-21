import React from 'react';
import Layout from '../components/Layout';

function Error({ statusCode }) {
  return (
    <Layout title={`Error ${statusCode || 'Unknown'} - MatchMint Help Center`}>
      <div className="container-custom py-16 text-center">
        <h1 className="text-4xl font-bold mb-4 text-primary-700">
          {statusCode
            ? `Error ${statusCode}`
            : 'An error occurred'}
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          {statusCode === 404
            ? "We couldn't find the page you were looking for."
            : "We're sorry, something went wrong on our end."}
        </p>
        <a href="/" className="btn-primary">
          Return to Home
        </a>
      </div>
    </Layout>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;