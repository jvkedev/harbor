import { Post } from "./post.model.js";
import type { CreatePostInput } from "./post.schema.js";

export async function createPost(authorId: string, input: CreatePostInput) {
  const post = await Post.create({
    title: input.title,
    body: input.body,
    country: input.country,
    author: authorId,
  });

  return {
    id: post.id,
    title: post.title,
    body: post.body,
    country: post.country,
    author: post.author,
    createAt: post.createdAt,
  };
}
