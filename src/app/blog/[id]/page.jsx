import { notFound } from "next/navigation";
import { clientURL } from "@/utils/sceret";
import { headers } from "next/headers";

async function getData(id = null, host, protocol) {
  const res = await fetch(`${protocol}://${host}/api/posts/${id}`, {
    // next: {revalidate: 10}
    cache: "no-store",
    // cache: "force-cache",
  });

  if (!res.ok) {
    return notFound();
    // return [];
  }

  return res.json();
}

// Daynamic metadeta
export async function generateMetadata({ params }) {
  const host = headers().get("host");
  const refer = headers().get("referer");
  const protocol = refer.split(":")[0];
  const post = await getData(params.id, host, protocol);
  return { title: post.title, description: post.description };
}

const page = async ({ params }) => {
  const data = await getData(params?.id);
  return (
    <div>
      <img src={data?.image} alt={data?.title} />
      <h1 className="uppercase mt-4">{data?.title}</h1>
      <h3 className="mt-4">{data?.description}</h3>
      <p className="mt-6">{data?.content}</p>
    </div>
  );
};

export default page;
