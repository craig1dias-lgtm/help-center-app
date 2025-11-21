import React from 'react';
import { useProxyAwareLinks } from '../utils/linkHelpers';

/**
 * Higher-order component that injects link utilities into the wrapped component
 * Useful for components with many links
 * 
 * @param {React.Component} Component - The component to wrap
 * @returns {React.Component} - The wrapped component with linkUtils prop
 */
export default function withProxyLinks(Component) {
  return function WrappedComponent(props) {
    const linkUtils = useProxyAwareLinks();
    return <Component {...props} linkUtils={linkUtils} />;
  };
}
