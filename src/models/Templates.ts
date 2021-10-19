import { Schema, model } from 'mongoose';

interface ITemplate {
  _id: Schema.Types.ObjectId;
  imgSrc: string;
}

const TemplateSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  imgSrc: { type: String, required: true },
});

export const Templates = model<ITemplate>('templates', TemplateSchema);

export default {};
