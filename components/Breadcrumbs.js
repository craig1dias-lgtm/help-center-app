import React from 'react';
import ProxyLink from './ProxyLink';

const Breadcrumbs = ({ items }) => {
  return (
    <nav className="text-sm mb-6">
      <ol className="flex flex-wrap items-center space-x-2">
        <li>
          <ProxyLink href="/" className="text-primary-600 hover:underline">
            Home
          </ProxyLink>
        </li>
        
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li className="text-gray-400">
              <span aria-hidden="true">/</span>
            </li>
            <li>
              {index === items.length - 1 ? (
                <span className="text-gray-600">{item.label}</span>
              ) : (
                <ProxyLink href={item.href} className="text-primary-600 hover:underline">
                  {item.label}
                </ProxyLink>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
