import axios from "axios";
import { PhotoData } from "../types/photo.type";

const BASE_URL = import.meta.env.VITE_PHOTO_BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});

export const fetchPhotos = async (page: number): Promise<PhotoData> => {
  const response = await instance.get(`/photos?_start=${page * 9}&_limit=9`);

  return { photos: response.data, hasMore: response.data.length === 9 };
};
