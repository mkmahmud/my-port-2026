import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  category: string[];
  thumbnailUrl?: string;
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
  projectType?: string;
  projectTitle?: string;
  projectKeyWord?: string;
  projectFor?: string;
  overview?: string[] | string;
  features?: string[];
  challenges?: string[];
  solutions?: string[];
  developersRole?: string;
  duration?: string;
  Duration?: string;
  result?: string;
  Result?: string;
  gellaryImages?: string[];
  projectCategory?: string[];
  Technologies?: string[];
  liveSite?: string;
  projectID?: number | string;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, trim: true },
    slug: { type: String, unique: true, index: true, lowercase: true },
    description: { type: String },
    longDescription: { type: String },
    techStack: [{ type: String }],
    category: [{ type: String }],
    thumbnailUrl: { type: String },
    images: [{ type: String }],
    liveUrl: { type: String },
    githubUrl: { type: String },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    projectType: { type: String, default: 'project' },
    projectTitle: { type: String },
    projectKeyWord: { type: String },
    projectFor: { type: String },
    overview: { type: Schema.Types.Mixed },
    features: [{ type: String }],
    challenges: [{ type: String }],
    solutions: [{ type: String }],
    developersRole: { type: String },
    duration: { type: String },
    Duration: { type: String },
    result: { type: String },
    Result: { type: String },
    gellaryImages: [{ type: String }],
    projectCategory: [{ type: String }],
    Technologies: [{ type: String }],
    liveSite: { type: String },
    projectID: { type: Schema.Types.Mixed },
  },
  { timestamps: true, strict: false }
);

projectSchema.pre('save', async function () {
  if (!this.title && this.projectTitle) {
    this.title = this.projectTitle;
  }
  if (!this.description) {
    if (this.overview) {
      this.description = Array.isArray(this.overview) ? this.overview[0] : String(this.overview);
    } else {
      this.description = this.title || 'Project showcase';
    }
  }
  if (!this.slug) {
    const rawTitle = this.title || this.projectTitle || 'project';
    this.slug = rawTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
  if ((!this.techStack || this.techStack.length === 0) && this.Technologies) {
    this.techStack = this.Technologies;
  }
  if ((!this.category || this.category.length === 0) && this.projectCategory) {
    this.category = this.projectCategory;
  }
  if (!this.liveUrl && this.liveSite) {
    this.liveUrl = this.liveSite;
  }
  if ((!this.images || this.images.length === 0) && this.gellaryImages) {
    this.images = this.gellaryImages;
  }
});

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', projectSchema);

export default Project;
