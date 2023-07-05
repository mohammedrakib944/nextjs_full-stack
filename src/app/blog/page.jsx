import React from "react";
import { notFound } from "next/navigation";
import { clientURL } from "@/utils/sceret";
import Link from "next/link";
import { headers } from "next/headers";

// Put this function anywhere
async function getData(host, protocol) {
  const res = await fetch(`${protocol}://${host}/api/posts`, {
    // next: {revalidate: 10}
    cache: "no-store",
    // cache: "force-cache",
  });

  if (!res.ok) {
    return notFound();
  }

  return res.json();
}

export const metadata = {
  title: "Blog",
  description: "Rakibuzzaman",
};

const page = async () => {
  const host = headers().get("host");
  const refer = headers().get("referer");
  const protocol = refer.split(":")[0];

  const data = await getData(host, protocol);

  return (
    <div className="mt-10">
      {data?.map((post) => (
        <div
          key={post._id}
          className="pb-6 rounded mb-2 flex items-center gap-4"
        >
          <img
            src={post.image}
            className="w-[300px] rounded"
            alt={data.title}
          />
          <div>
            <h2 className="uppercase mb-2">{post.title}</h2>
            <p>{post.description}</p>
            <Link href={`/blog/${post._id}`}>
              <button className="btn mt-2">Read More</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default page;
