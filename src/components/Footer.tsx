"use client";

import React from "react";

type FooterNavItem = {
  href: string;
  name: string;
};

type FooterNav = {
  label: string;
  items: FooterNavItem[];
};

const Footer: React.FC = () => {
  const footerNavs: FooterNav[] = [
    {
      label: "Resources",
      items: [
        { href: "javascript:void(0)", name: "Contact" },
        { href: "javascript:void(0)", name: "Support" },
        { href: "javascript:void(0)", name: "Documentation" },
        { href: "javascript:void(0)", name: "Pricing" },
      ],
    },
    {
      label: "About",
      items: [
        { href: "javascript:void(0)", name: "Terms" },
        { href: "javascript:void(0)", name: "License" },
        { href: "javascript:void(0)", name: "Privacy" },
        { href: "javascript:void(0)", name: "About Us" },
      ],
    },
    {
      label: "Explore",
      items: [
        { href: "javascript:void(0)", name: "Showcase" },
        { href: "javascript:void(0)", name: "Roadmap" },
        { href: "javascript:void(0)", name: "Languages" },
        { href: "javascript:void(0)", name: "Blog" },
      ],
    },
    {
      label: "Company",
      items: [
        { href: "javascript:void(0)", name: "Partners" },
        { href: "javascript:void(0)", name: "Team" },
        { href: "javascript:void(0)", name: "Careers" },
      ],
    },
  ];

  return (
    <footer className="pt-10">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="justify-between items-center gap-12 md:flex">
          <div className="flex-1 max-w-lg">
            <h3 className="text-2xl font-bold">
              Get our beautiful newsletter straight to your inbox.
            </h3>
          </div>
          <div className="flex-1 mt-6 md:mt-0">
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-x-3 md:justify-end">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-3 py-2 text-gray-500 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
              <button className="block w-auto py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="flex-1 mt-16 space-y-6 justify-between sm:flex md:space-y-0">
          {footerNavs.map((item, idx) => (
            <ul className="space-y-4 text-gray-600" key={idx}>
              <h4 className="text-gray-800 font-semibold sm:pb-2">{item.label}</h4>
              {item.items.map((el, id) => (
                <li key={id}>
                  <a href={el.href} className="hover:text-gray-800 duration-150">
                    {el.name}
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>
        <div className="mt-10 py-10 border-t items-center justify-between sm:flex">
          <p className="text-gray-600">© 2022 Float UI Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
