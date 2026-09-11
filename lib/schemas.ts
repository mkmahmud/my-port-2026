import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name cannot exceed 100 characters"),
  email: z.string().email("Please provide a valid email address"),
  phone: z.string().optional(),
  service: z.string().optional(),
  budget: z.string().optional(),
  country: z.string().optional(),
  message: z.string().min(3, "Message must be at least 3 characters").max(2000, "Message cannot exceed 2000 characters")
});

export const projectQuerySchema = z.object({
  category: z.string({ error: "Category must be a valid string" }).optional()
});

export const projectSchema = z.object({
  _id: z.string({ error: "ID is required" }),
  title: z.string({ error: "Title is required" }),
  slug: z.string({ error: "Slug is required" }),
  description: z.string({ error: "Description is required" }),
  longDescription: z.string({ error: "Long description is required" }),
  techStack: z.array(z.string({ error: "Tech stack must contain strings" })),
  category: z.array(z.string({ error: "Category must contain strings" })),
  thumbnailUrl: z.string({ error: "Thumbnail URL is required" }),
  images: z.array(z.string({ error: "Images must contain strings" })),
  liveUrl: z.string({ error: "Invalid string for live URL" }).optional(),
  githubUrl: z.string({ error: "Invalid string for GitHub URL" }).optional(),
  featured: z.boolean({ error: "Featured must be a boolean" }),
  order: z.number({ error: "Order must be a number" }),
  createdAt: z.string({ error: "Created at date is required" }),
  updatedAt: z.string({ error: "Updated at date is required" })
});
