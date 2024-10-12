import React, { useState } from 'react';
import Link from "next/link";
import { BrainCircuit, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClientHeaderMenu } from './ClientHeaderMenu'; // Import client component
import AuthButton from "@/components/header-auth"; // Import AuthButton for auth handling
import { ThemeSwitcher } from "@/components/theme-switcher"; // Import ThemeSwitcher


export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link className="flex items-center space-x-2" href="/">
            <BrainCircuit className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">Moshi Notes</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            {['Features', 'How It Works', 'Pricing'].map((item) => (
              <Link
                key={item}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {/* Auth Buttons */}
            <AuthButton />
            {/* Theme Switcher */}
            <ThemeSwitcher />
          </div>

          {/* Mobile Menu */}
          <ClientHeaderMenu />
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Moshi Notes. All rights reserved.</p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Terms of Service
        </Link>
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Privacy
        </Link>
      </nav>
    </footer>
  );
}
