import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import databaseService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;
  
  useEffect(() => {
    if (slug) {
      setIsLoading(true);
      databaseService.getPost(slug)
        .then((post) => {
          if (post) setPost(post);
          else navigate("/");
        })
        .finally(() => setIsLoading(false));
    } else navigate("/");
  }, [slug, navigate]);
  
  const deletePost = () => {
    setIsLoading(true);
    databaseService.deletePost(post.$id).then((status) => {
      if (status) {
        databaseService.deleteFile(post.featuredImage);
        navigate("/");
      }
      setIsLoading(false);
    });
  };
  
  if (isLoading) return (
    <Container>
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-700">Loading post...</p>
      </div>
    </Container>
  );
  
  if (!post) return null;
  
  return (
    <div className="py-8 px-4 sm:px-6 md:px-8">
      <Container>
        <article className="max-w-4xl mx-auto">
          <div className="relative mb-8 overflow-hidden rounded-xl shadow-lg">
            <img
              src={databaseService.filePreview(post.featuredImage)}
              alt={post.title}
              className="w-full h-auto object-cover rounded-xl"
            />
            
            {isAuthor && (
              <div className="absolute right-4 top-4 flex space-x-3">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-500" className="shadow-md hover:bg-green-600 transition-colors">
                    Edit
                  </Button>
                </Link>
                <Button 
                  bgColor="bg-red-500" 
                  onClick={deletePost}
                  className="shadow-md hover:bg-red-600 transition-colors"
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
          
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{post.title}</h1>
            <div className="text-gray-600">
              {post.createdAt && (
                <time dateTime={new Date(post.createdAt).toISOString()}>
                  {new Date(post.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </time>
              )}
            </div>
          </header>
          
          <div className="prose prose-lg max-w-none browser-css">
            {parse(post.content)}
          </div>
        </article>
      </Container>
    </div>
  );
}