import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import databaseService from "../appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    databaseService.getAllPosts([])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full py-12 bg-gray-50 min-h-screen">
      <Container>
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">All Posts</h1>
          <div className="w-20 h-1 bg-blue-600 rounded"></div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="bg-white rounded-xl overflow-hidden shadow-md p-2">
                <div className="w-full h-48 bg-gray-200 animate-pulse rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 animate-pulse rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {posts.map((post) => (
              <div key={post.$id} className="h-full">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <svg 
              className="w-16 h-16 mx-auto text-gray-400 mb-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" 
              />
            </svg>
            <h2 className="text-2xl font-medium text-gray-700 mb-2">No Posts Found</h2>
            <p className="text-gray-500 max-w-md mx-auto">
              There are no posts available at the moment. Check back later or create a new post.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;