"use client";

import React from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { InstagramIcon } from "lucide-react";

const navigation = [
    { name: "Accueil", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Formation", href: "/formation" },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <Disclosure as="nav" className="top-0 z-50">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            {/* Bouton Menu Mobile */}
                            <div className="absolute inset-y-0 right-0 flex items-center sm:hidden z-50">
                                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-white/50 hover:text-white transition duration-300">
                                    <span className="sr-only">Open main menu</span>
                                    {!open ? (
                                        <Bars3Icon className="block size-6" />

                                    ) : (
                                        <XMarkIcon className="block size-6" />
                                    )}
                                </DisclosureButton>
                            </div>

                            {/* Logo et Menu Desktop */}
                            <div className="flex flex-1 items-center justify-between">
                                <div className="flex shrink-0 items-center">
                                    <Link href="/">
                                        <img alt="GBDM" src="/img.png" className="h-8 w-auto" />
                                    </Link>
                                </div>
                                <div className="hidden sm:block">
                                    <div className="flex space-x-6">
                                        {navigation.map((item) => (
                                            <Link key={item.name} href={item.href} passHref>
                                                <span
                                                    className={`px-3 py-2 text-lg font-medium rounded-md transition duration-300 ${
                                                        pathname === item.href ? "text-white" : "text-white/50 hover:text-white"
                                                    }`}
                                                >
                                                    {item.name}
                                                </span>
                                            </Link>
                                        ))}
                                        <Link href="https://www.instagram.com/gbdm.so/">
                                            <InstagramIcon className="mt-1 w-6 h-6 text-white/50 hover:text-white transition duration-300" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Menu Mobile avec overlay et animation */}
                    <div className={`fixed inset-0 bg-black/0 backdrop-blur-sm transition-all duration-300 sm:hidden ${open ? 'visible opacity-100' : 'invisible opacity-0'}`}>
                        <DisclosurePanel className="fixed right-0 top-0 h-full w-full bg-black transform transition-transform duration-300 ease-in-out sm:hidden">
                            <div className="flex min-h-screen flex-col items-center justify-center space-y-8 p-4">
                                {navigation.map((item) => (
                                    <Link key={item.name} href={item.href} passHref>
                                        <DisclosureButton
                                            className={`text-3xl font-medium transition duration-300 hover:scale-110 ${
                                                pathname === item.href ? "text-white" : "text-white/50 hover:text-white"
                                            }`}
                                        >
                                            {item.name}
                                        </DisclosureButton>
                                    </Link>
                                ))}
                                <Link href="https://www.instagram.com/gbdm.so/">
                                    <InstagramIcon className="w-8 h-8 text-white/50 hover:text-white transition duration-300 hover:scale-110" />
                                </Link>
                            </div>
                        </DisclosurePanel>
                    </div>
                </>
            )}
        </Disclosure>
    );
}