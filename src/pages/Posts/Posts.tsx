import { useEffect, useState } from "react";
import { getPosts } from "../../API/API";
import { FaThumbsUp, FaThumbsDown, FaEye } from "react-icons/fa";

const Posts = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getPosts()
      .then((response) => {
        setPosts(response.data.posts);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold mb-6 text-center">Posts</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4 border rounded-lg shadow-md bg-white hover:bg-gray-50 transition duration-200"
          >
            <h3 className="font-semibold text-2xl mb-2">{post.title}</h3>
            <p className="text-gray-600 mb-4">{post.body}</p>
            <div className="mb-4">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <FaThumbsUp className="text-green-500" />
                <span>{post.reactions.likes}</span>
                <FaThumbsDown className="text-red-500" />
                <span>{post.reactions.dislikes}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaEye className="text-blue-500" />
                <span>{post.views} views</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
