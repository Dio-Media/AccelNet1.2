import React, { useState } from 'react';

// A reusable component for navigation links with dropdowns
function NavItem({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        className="mr-5 hover:text-gray-900 flex items-center"
      >
        {title}
        {/* Simple dropdown arrow */}
        <svg className="w-2.5 h-2.5 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20">
          <ul className="py-1">
            {children}
          </ul>
        </div>
      )}
    </li>
  );
}

// A reusable component for individual dropdown links
function DropdownLink({ href, children }) {
  return (
    <li>
      <a
        href={href}
        className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 whitespace-nowrap"
      >
        {children}
      </a>
    </li>
  );
}


export default function NavBar() {
  return (
    <header className="text-[#313639] body-font shadow-md sticky top-0 bg-white z-10">
      <div className="w-full flex justify-between items-center pl-5 pr-10 py-4">
        {/* Logo and Title */}
        <a href="/" className="flex title-font font-medium items-center text-gray-900">
          <img src="/logo.svg" alt="AccelNet Logo" className="w-12 mx-10" />
          <span className="ml-3 text-2xl font-semibold">AccelNet</span>
        </a>

        {/* Navigation Links */}
        <nav className="flex flex-wrap items-center text-base">
          <ul className="flex items-center space-x-4">
            {/* About Dropdown */}
            <NavItem title="About">
              <DropdownLink href="/about/vision">Vision and Mission</DropdownLink>
              <DropdownLink href="/about/background">Background</DropdownLink>
              <DropdownLink href="/about/program">Scientific Program</DropdownLink>
              <DropdownLink href="/about/structure">Structure</DropdownLink>
              <DropdownLink href="/about/participants">Participants</DropdownLink>
            </NavItem>

            {/* Working Groups Dropdown */}
            <NavItem title="Working Groups">
              <DropdownLink href="/wgs/wg1">WG1: BCI & Wearables</DropdownLink>
              <DropdownLink href="/wgs/wg2">WG2: Data & Tools</DropdownLink>
              <DropdownLink href="/wgs/wg3">WG3: Brain Models</DropdownLink>
              <DropdownLink href="/wgs/wg4">WG4: Science Communication</DropdownLink>
              <DropdownLink href="/wgs/wg5">WG5: Data Standards</DropdownLink>
            </NavItem>

            {/* Events & Activities Dropdown */}
            <NavItem title="Events & Activities">
              <DropdownLink href="/events/annual-meeting">Annual Meeting</DropdownLink>
              <DropdownLink href="/events/conferences">Conferences</DropdownLink>
              <DropdownLink href="/events/workshops">Workshops</DropdownLink>
              <DropdownLink href="/events/news">News</DropdownLink>
            </NavItem>

            {/* Resources Dropdown */}
            <NavItem title="Resources">
              <DropdownLink href="/resources/publications">Publications</DropdownLink>
              <DropdownLink href="/resources/multimedia">Multimedia</DropdownLink>
              <DropdownLink href="/resources/grants">Grants</DropdownLink>
              <DropdownLink href="/resources/mentorship">Mentorship Program</DropdownLink>
            </NavItem>
            
            {/* Single Link */}
             <li>
                <a href="/contact" className="mr-5 hover:text-gray-900">Contact</a>
             </li>
          </ul>
        </nav>

        {/* "Join Us!" Button */}
        <div>
          <a
            href="/join"
            className="inline-flex items-center bg-blue-500 text-white border-0 py-2 px-4 focus:outline-none hover:bg-blue-600 rounded-md text-base"
          >
            Join Us!
          </a>
        </div>
      </div>
    </header>
  );
}