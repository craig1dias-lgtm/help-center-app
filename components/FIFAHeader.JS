import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const FIFAHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className={`fifa-header-wrapper ${scrolled ? 'scrolled' : ''}`} id="fifa-header-section">
      <header className="fifa-header fifa-header--has-menu">
        {/* Logo */}
        <div className="fifa-header__heading">
          <Link href="/" className="fifa-header__heading-link">
            <div className="fifa-header__heading-logo-wrapper">
              <Image
                src="/images/matchmint-logo.png"
                alt="MatchMint"
                className="fifa-header__heading-logo"
                width={120}
                height={40}
                priority
              />
            </div>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="fifa-mobile-menu-toggle" onClick={toggleMobileMenu}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21M3 6H21M3 18H21" stroke="#1a103c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Navigation Menu */}
        <nav className="fifa-header__menu">
          <ul className={`fifa-list-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <li className="fifa-list-menu__item">
              <Link href="/collections/all" className="fifa-list-menu__item--link">
                FOOTBALL CARDS
              </Link>
            </li>
            <li className="fifa-list-menu__item">
              <Link href="/pages/support-page" className="fifa-list-menu__item--link">
                SUPPORT
              </Link>
            </li>
            <li className="fifa-list-menu__item">
              <Link href="/pages/guides" className="fifa-list-menu__item--link">
                GUIDES
              </Link>
            </li>
            <li className="fifa-list-menu__item">
              <Link href="/" className="fifa-list-menu__item--link fifa-list-menu__item--active">
                HELP CENTER
              </Link>
            </li>
          </ul>
        </nav>

        {/* Header Actions - Buy Card Button and Cart */}
        <div className="fifa-header__actions">
          {/* Buy Card Button */}
          <Link href="/collections/all" className="fifa-header__buy-button">
            Buy Card
          </Link>

          {/* Cart Icon */}
          <Link href="/cart" className="fifa-header__icon fifa-header__icon--cart">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 1.66666L2.5 5.83332V16.6667C2.5 17.1087 2.67559 17.5326 2.98816 17.8452C3.30072 18.1577 3.72464 18.3333 4.16667 18.3333H15.8333C16.2754 18.3333 16.6993 18.1577 17.0118 17.8452C17.3244 17.5326 17.5 17.1087 17.5 16.6667V5.83332L15 1.66666H5Z" stroke="#1a103c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2.5 5.83334H17.5" stroke="#1a103c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.3332 9.16666C13.3332 10.0507 12.982 10.8986 12.3569 11.5237C11.7318 12.1488 10.8839 12.5 9.99984 12.5C9.11578 12.5 8.26794 12.1488 7.64282 11.5237C7.0177 10.8986 6.6665 10.0507 6.6665 9.16666" stroke="#1a103c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </header>
      
      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fifa-mobile-menu-overlay">
          <ul className="fifa-mobile-menu">
            <li className="fifa-mobile-menu__item">
              <Link href="/collections/all" className="fifa-mobile-menu__link" onClick={toggleMobileMenu}>
                FOOTBALL CARDS
              </Link>
            </li>
            <li className="fifa-mobile-menu__item">
              <Link href="/pages/support-page" className="fifa-mobile-menu__link" onClick={toggleMobileMenu}>
                SUPPORT
              </Link>
            </li>
            <li className="fifa-mobile-menu__item">
              <Link href="/pages/guides" className="fifa-mobile-menu__link" onClick={toggleMobileMenu}>
                GUIDES
              </Link>
            </li>
            <li className="fifa-mobile-menu__item">
              <Link href="/" className="fifa-mobile-menu__link fifa-mobile-menu__link--active" onClick={toggleMobileMenu}>
                HELP CENTER
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FIFAHeader;
