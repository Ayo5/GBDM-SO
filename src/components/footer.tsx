import React from 'react';

const footerNavigation = [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
];

function classNames(...classes: (string | undefined)[]): string {
    return classes.filter(Boolean).join(' ');
}

export default function Footer() {
    return (
        <footer className="">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="flex justify-center space-x-4 py-4">
                    {footerNavigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                                'text-white/50 hover:text-white transition duration-300',
                                'rounded-md px-3 py-2 text-sm font-medium',
                            )}
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}