"use client";

import {
  FacebookIcon,
  LinkedinIcon,
  Share2Icon,
  TwitterIcon,
} from "lucide-react";
import { toast } from "sonner";

type Props = {
  title: string;
};

export function ShareButtons({ title }: Props) {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: "Twitter",
      icon: TwitterIcon,
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: "text-[#1DA1F2] hover:bg-[#1DA1F2]/10",
    },
    {
      name: "Facebook",
      icon: FacebookIcon,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "text-[#4267B2] hover:bg-[#4267B2]/10",
    },
    {
      name: "LinkedIn",
      icon: LinkedinIcon,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "text-[#0077B5] hover:bg-[#0077B5]/10",
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard!");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="flex items-center gap-2">
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2 rounded-full transition-colors ${link.color}`}
          title={`Share on ${link.name}`}
        >
          <link.icon className="w-5 h-5" />
        </a>
      ))}
      <button
        onClick={copyToClipboard}
        className="p-2 rounded-full text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        title="Copy link"
      >
        <Share2Icon className="w-5 h-5" />
      </button>
    </div>
  );
}
