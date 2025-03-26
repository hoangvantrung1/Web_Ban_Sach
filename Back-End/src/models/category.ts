import mongoose, { Schema, Document } from "mongoose";
import slugify from "slugify";

interface ICategory extends Document {
  name: string;
  description: string;
  slug: string;
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  slug: { type: String, required: true },
});


categorySchema.pre("save", function (next) {
  if (this.isNew) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

const Category = mongoose.model<ICategory>("Category", categorySchema);

export default Category;
