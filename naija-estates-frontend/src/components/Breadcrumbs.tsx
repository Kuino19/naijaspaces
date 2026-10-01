"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="w-full py-4 text-xs font-medium uppercase tracking-[0.2em]">
      <ol className="flex items-center flex-wrap gap-2 text-gray-400">
        <li>
          <Link href="/" className="hover:text-white transition-colors flex items-center gap-1.5">
            <Home className="w-3.5 h-3.5 text-gray-500" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <ChevronRight className="w-3.5 h-3.5 text-gray-600 shrink-0" />
            {item.href ? (
              <Link href={item.href} className="hover:text-white transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-white font-semibold line-clamp-1">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
