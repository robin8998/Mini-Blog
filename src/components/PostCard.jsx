import React from 'react';
import { Link } from 'react-router-dom';
import databaseService from "../appwrite/config";
import parse from "html-react-parser"

function PostCard({ $id, title, featuredImage, author, content }) {
  // Truncate content for preview if available
  const previewContent = content ? content.substring(0, 100) + (content.length > 100 ? '...' : '') : '';
  const parsedPreviewContent = parse(previewContent)
  console.log(featuredImage)
  console.log(content)
  return (
    <Link to={`/post/${$id}`} className="block h-full">
      <div className="w-full h-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative w-full pb-[60%] overflow-hidden">
          <img 
            src={databaseService.filePreview(featuredImage)} 
            alt={title}
            className="absolute top-0 left-0 w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
            }}
          />
        </div>
        <div className="p-5">
          <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{title}</h2>
          {parsedPreviewContent && (
            <div className="text-gray-600 line-clamp-3 mb-3">{parsedPreviewContent}</div>
          )}
          {author && (
            <div className="flex items-center mt-4">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-bold">
                {author.name ? author.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {author.name || 'Unknown Author'}
              </span>
            </div>
          )}
          <div className="mt-4 text-blue-600 text-sm font-medium">Read more →</div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;