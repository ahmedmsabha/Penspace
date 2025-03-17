import { fetchPostById } from "@/lib/actions/posts.action";
import Image from "next/image";
import { SanitizedContent } from "./_components/sanitized-content";
import { getSession } from "@/lib/session";
import Comments from "./_components/comments";
import { Like } from "./_components/likes";
import {
  CalendarIcon,
  ClockIcon,
  BookOpenIcon,
  ArrowLeftIcon,
} from "lucide-react";
import Link from "next/link";
import { TableOfContents } from "./_components/table-of-contents";
import { ShareButtons } from "./_components/share-buttons";
import { cn } from "@/lib/utils";
type Props = {
  params: Promise<{
    id: string;
  }>;
};

const PostPage = async ({ params }: Props) => {
  const postId = (await params).id;
  const post = await fetchPostById(+postId);
  const session = await getSession();

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Calculate reading time based on word count (average reading speed: 200 words/minute)
  const wordCount = post.content.split(/\s+/).length;
  const readingTimeMinutes = Math.ceil(wordCount / 200);
  const estimatedReadingTime = `${readingTimeMinutes} min read`;

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div className="h-full bg-blue-600 w-0 reading-progress-bar" />
      </div>

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:grid lg:grid-cols-[1fr_250px] xl:grid-cols-[1fr_300px] gap-8">
          <article className="max-w-3xl mx-auto lg:mx-0">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-8 group"
            >
              <ArrowLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Blog
            </Link>

            <header className="mb-10">
              <div className="space-y-1 mb-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 mt-6">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden relative">
                      {post.author.avatar ? (
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-slate-500 dark:text-slate-400">
                          {post.author.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {post.author.name}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="w-4 h-4" />
                          {formattedDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <ClockIcon className="w-4 h-4" />
                          {estimatedReadingTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpenIcon className="w-4 h-4" />
                          {wordCount.toLocaleString()} words
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Featured image */}
              <div className="relative w-full aspect-[16/9] mb-10 overflow-hidden rounded-xl shadow-md">
                <Image
                  src={post.thumbnail ?? "/no-image.png"}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover transition-transform hover:scale-105 duration-700"
                />
              </div>
            </header>

            <div className="prose prose-slate dark:prose-invert lg:prose-lg max-w-none">
              <SanitizedContent content={post.content} />
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800">
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag.id}
                      href={`/blog/tag/${tag.name}`}
                      className={cn(
                        "px-3 py-1 bg-slate-100 dark:bg-slate-800",
                        "text-slate-700 dark:text-slate-300 text-sm rounded-full",
                        "hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      )}
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <Like postId={Number(post.id)} user={session?.user} />
                <ShareButtons title={post.title} />
              </div>
            </div>

            <Comments user={session?.user} postId={Number(post.id)} />
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-8">
              <TableOfContents />

              <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <h4 className="font-medium text-slate-900 dark:text-white mb-4">
                  About the Author
                </h4>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden relative">
                    {post.author.avatar ? (
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-slate-500 dark:text-slate-400 text-lg">
                        {post.author.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {post.author.name}
                    </p>
                    {post.author.bio && (
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {post.author.bio}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default PostPage;

// Add this to your global CSS file
// .reading-progress-bar {
//   transition: width 0.2s ease;
// }
//
// document.addEventListener('scroll', () => {
//   const docElem = document.documentElement;
//   const docBody = document.body;
//   const scrollTop = docElem.scrollTop || docBody.scrollTop;
//   const scrollBottom = (docElem.scrollHeight || docBody.scrollHeight) - window.innerHeight;
//   const scrollPercent = scrollTop / scrollBottom * 100;
//   document.querySelector('.reading-progress-bar').style.width = scrollPercent + '%';
// });
