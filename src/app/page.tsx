import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Home() {
  return (
      <div className="homepage-background">
          <Navbar/>
            <main className="flex flex-col items-center justify-center h-screen bg-white/80 mx-16 rounded-2xl ">
                <h1 className="text-6xl font-bold text-center text-white">
                    Welcome to the Next.js Tailwind CSS Starter!
                </h1>
                <p className="mt-3 text-2xl text-center text-white">
                    Get started by editing{" "}
                    <code className="p-3 font-mono text-lg bg-gray-900 rounded-md">
                        pages/index.tsx
                    </code>
                </p>
            </main>

          <Footer/>
      </div>
  );
}
