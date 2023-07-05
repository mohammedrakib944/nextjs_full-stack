import { notFound } from "next/navigation";
import { clientURL } from "@/utils/sceret";

// Put this function anywhere
async function getData(id = null) {
  const res = await fetch(`${clientURL}/api/posts/${id}`, {
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
  const post = await getData(params.id);
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
