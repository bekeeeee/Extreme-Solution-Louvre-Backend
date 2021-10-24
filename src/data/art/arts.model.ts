import mongoose from "mongoose";

export interface IArt {
  id: string;
  name: string;
  artist: string;
  description: string;
  image: string;

  createdAt: Date;
}

export const artsModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});
const ArtImported = mongoose.model<IArt>("Art", artsModel);
export {ArtImported}
export type Art = typeof artsModel;
