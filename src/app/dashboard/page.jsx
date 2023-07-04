"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import useSWR from "swr";

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    `/api/posts?username=${session?.data?.user.name}`,
    fetcher
  );

  const handlePost = async (e) => {
    e.preventDefault();

    if (!session) {
      console.log("You are not authenticated!");
      return;
    }

    const title = e.target[0].value;
    const description = e.target[1].value;
    const image = e.target[2].value;
    const content = e.target[3].value;
    const username = session.data.user.name;

    try {
      await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          image,
          content,
          username,
        }),
      });
      mutate();
      e.target.reset();
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    session.status === "loading" && <p>Loading...</p>;
    session.status === "unauthenticated" && router.push("/dashboard/login");
  }, [session]);

  return (
    <div>
      <h1 className="mb-4">Dashboard</h1>
      <div className="flex gap-2">
        <div className="w-[60%]">
          {data &&
            data.map((post) => (
              <div
                key={post._id}
                className="pb-6 col-span-4 rounded mb-2 flex items-center gap-4"
              >
                <img
                  src={post.image}
                  className="w-[300px] rounded"
                  alt={data.title}
                />
                <div>
                  <h2 className="uppercase mb-2">{post.title}</h2>
                  <p>{post.description}</p>
                  <button
                    className="btn"
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
        <div className="w-[40%]">
          <h1>Add new post</h1>
          <br />
          <form onSubmit={handlePost} className="flex flex-col gap-2">
            <input required type="text" placeholder="Title" className="input" />
            <input
              required
              type="description"
              placeholder="Description"
              className="input"
            />
            <input
              required
              type="text"
              placeholder="Image URL"
              className="input"
            />
            <textarea
              required
              placeholder="Content"
              className="input"
            ></textarea>
            <button type="submit" className="btn">
              Create POST
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
