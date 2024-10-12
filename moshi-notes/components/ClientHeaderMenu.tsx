'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Use correct import path for Button
import Link from 'next/link';

export function ClientHeaderMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <div className="md:hidden">
        <Button variant="ghost" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {['Features', 'How It Works', 'Pricing'].map((item) => (
              <Link
                key={item}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-400"
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {item}
              </Link>
            ))}
            <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white">Get Started</Button>
          </div>
        </div>
      )}
    </>
  );
}
