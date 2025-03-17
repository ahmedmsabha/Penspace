import { Post } from "@/lib/types/model-types";
import Image from "next/image";
import Link from "next/link";

type Props = Partial<Post>;

export const PostCard = ({
  id,
  title,
  thumbnail,
  content,
  createdAt,
  slug,
}: Props) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform transform hover:scale-105 hover:shadow-xl">
      <div className="relative h-60">
        <Image
          src={thumbnail ?? "/no-image.png"}
          alt={title ?? "Post thumbnail"}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold mt-4 break-words text-center text-gray-800">
          {title}
        </h3>
        <p className="mt-2 text-gray-500 text-sm text-center">
          {new Date(createdAt ?? "").toLocaleDateString()}
        </p>
        <p className="mt-4 text-gray-700 break-words flex-grow">
          {content?.slice(0, 100)}...
        </p>
        <Link
          className="text-indigo-600 hover:text-indigo-800 hover:underline mt-auto text-right block"
          href={`/blog/${slug}/${id}`}
        >
          Read more
        </Link>
      </div>
    </div>
  );
};
