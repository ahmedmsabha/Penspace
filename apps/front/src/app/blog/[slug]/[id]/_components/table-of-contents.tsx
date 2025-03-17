"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Heading = {
  id: string;
  text: string;
  level: number;
};

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Find all headings in the article
    const articleHeadings = Array.from(
      document.querySelector("article")?.querySelectorAll("h2, h3, h4") ?? []
    );

    // Process headings
    const processedHeadings = articleHeadings.map((heading) => {
      // Add IDs to headings if they don't have one
      if (!heading.id) {
        heading.id =
          heading.textContent?.toLowerCase().replace(/\s+/g, "-") ?? "";
      }

      return {
        id: heading.id,
        text: heading.textContent ?? "",
        level: parseInt(heading.tagName[1]),
      };
    });

    setHeadings(processedHeadings);

    // Set up intersection observer for headings
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0% -66%",
      }
    );

    articleHeadings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
      <h4 className="font-medium text-slate-900 dark:text-white mb-4">
        Table of Contents
      </h4>
      <ul className="space-y-2.5">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{
              paddingLeft: `${(heading.level - 2) * 1}rem`,
            }}
          >
            <a
              href={`#${heading.id}`}
              className={cn(
                "block text-sm transition-colors",
                "hover:text-blue-600 dark:hover:text-blue-400",
                activeId === heading.id
                  ? "text-blue-600 dark:text-blue-400 font-medium"
                  : "text-slate-600 dark:text-slate-400"
              )}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(`#${heading.id}`)?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
