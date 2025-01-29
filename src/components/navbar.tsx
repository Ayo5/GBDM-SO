"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
    { name: "Accueil", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Formation", href: "/formation" },
    { name: "Réservation", href: "/reservation" },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <Disclosure as="nav" className=" shadow-md sticky top-0 z-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">

                    {/* Bouton Menu Mobile */}
                    <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-white/50 hover:text-white transition duration-300 focus:ring-2 focus:ring-white focus:outline-none">
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="block size-6 group-data-open:hidden" />
                            <XMarkIcon className="hidden size-6 group-data-open:block" />
                        </DisclosureButton>
                    </div>

                    {/* Logo et Menu Desktop */}
                    <div className="flex flex-1 items-center justify-between">
                        <div className="flex shrink-0 items-center">
                            <img alt="GBDM" src="/img.png" className="h-8 w-auto" />
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu Mobile */}
            <DisclosurePanel className="sm:hidden text-center bg-[#0D0D0D]">
                <div className="space-y-1 px-4 pt-2 pb-3">
                    {navigation.map((item) => (
                        <Link key={item.name} href={item.href} passHref>
                            <DisclosureButton
                                className={`block rounded-md px-3 py-2 text-lg font-medium transition duration-300 ${
                                    pathname === item.href ? "text-white" : "text-white/50 hover:text-white"
                                }`}
                            >
                                {item.name}
                            </DisclosureButton>
                        </Link>
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
}
