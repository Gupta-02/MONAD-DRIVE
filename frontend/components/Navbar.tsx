'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import WalletConnectButton from './WalletConnectButton';
import { AuroraText } from '@/registry/magicui/aurora-text';
import { ThemeToggle } from './ThemeToggle';

export default function Navbar() {
    const pathname = usePathname();

    const navLinks = [
        { name: 'Marketplace', href: '/' },
        { name: 'Orders', href: '/orders' },
        { name: 'My Garage', href: '/dashboard' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-secondary/90 backdrop-blur-xl border-b border-border-primary shadow-lg">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-teal-600 text-white rounded-xl flex items-center justify-center font-serif font-bold text-xl tracking-tighter group-hover:from-green-700 group-hover:to-teal-700 transition-all duration-300 shadow-lg shadow-green-500/25">
                            MD
                        </div>
                        <AuroraText className="font-bold text-xl tracking-tight font-serif">
                            MonaDrive
                        </AuroraText>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`text-sm font-medium transition-colors ${isActive
                                        ? 'text-text-primary'
                                        : 'text-text-secondary hover:text-text-primary'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <WalletConnectButton />
                    </div>
                </div>
            </div>
        </nav>
    );
}
