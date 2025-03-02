import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import databaseService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    try {
      // If post is present - handle editing
      if (post) {
        const file = data.image[0] ? await databaseService.uploadFile(data.image[0]) : null;
        
        if (file) {
          await databaseService.deleteFile(post.featuredImage);
        }

        const dbPost = await databaseService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : undefined,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      } 
      // Handle new post creation
      else {
        const file = await databaseService.uploadFile(data.image[0]);

        if (file) {
          const fileId = file.$id;
          data.featuredImage = fileId;
          const dbPost = await databaseService.createPost({ 
            userId: userData.$id,
            ...data 
          });

          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form 
      onSubmit={handleSubmit(submit)} 
      className="bg-white rounded-xl shadow-lg p-6 md:p-8"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">
        {post ? "Edit Post" : "Create New Post"}
      </h2>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column */}
        <div className="w-full lg:w-2/3">
          <Input
            label="Title"
            placeholder="Enter post title"
            className="mb-6"
            {...register("title", { required: "Title is required" })}
          />
          
          <Input
            label="Slug"
            placeholder="post-url-slug"
            className="mb-6"
            {...register("slug", { required: "Slug is required" })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
            }}
          />
          
          <div className="mb-6">
            <RTE 
              label="Content" 
              name="content" 
              control={control} 
              defaultValue={getValues("content")} 
            />
          </div>
        </div>
        
        {/* Right Column */}
        <div className="w-full lg:w-1/3 bg-gray-50 p-6 rounded-lg">
          <div className="mb-6">
            <Input
              label="Featured Image"
              type="file"
              className="mb-2"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image", { required: !post })}
            />
            <p className="text-xs text-gray-500 mt-1">
              Supported formats: PNG, JPG, JPEG, GIF
            </p>
          </div>
          
          {post && (
            <div className="w-full mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Current Image:</p>
              <div className="border rounded-lg overflow-hidden">
                <img
                  src={databaseService.filePreview(post.featuredImage)}
                  alt={post.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          )}
          
          <div className="mb-6">
            <Select
              options={["active", "inactive"]}
              label="Status"
              className="w-full"
              {...register("status", { required: true })}
            />
          </div>
          
          <Button 
            type="submit" 
            bgColor={post ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"} 
            className="w-full py-3 text-white font-medium transition-all duration-200 shadow-md"
          >
            {post ? "Update Post" : "Publish Post"}
          </Button>
        </div>
      </div>
    </form>
  );
}