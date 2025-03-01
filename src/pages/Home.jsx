import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import databaseService from '../appwrite/config';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    databaseService.getAllPosts([])
      .then((postsData) => {
        if (postsData) {
          setPosts(postsData.documents);
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full py-16">
        <Container>
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-10 w-40 bg-gray-200 rounded-md mb-4"></div>
              <div className="h-4 w-64 bg-gray-200 rounded-md"></div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (posts.length > 0) {
    return (
      <div className="w-full py-8 bg-gray-50 min-h-screen">
        <Container>
          <h1 className="text-3xl font-bold mb-8 text-center md:text-left text-gray-800">
            Latest Posts
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {posts.map((post) => (
              <div key={post.$id} className="w-full">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-16 bg-gray-50 min-h-screen">
      <Container>
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Welcome to the Blog
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl">
            Log in to discover a world of interesting posts and share your own thoughts.
          </p>
          <Link 
            to="/login" 
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95"
          >
            Login Now
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default Home;  