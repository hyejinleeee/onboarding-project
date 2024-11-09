import axios from "axios";
import { PhotoData } from "../types/photo.type";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/photos",
  timeout: 1000,
});

export const fetchPhotos = async (page: number): Promise<PhotoData> => {
  const response = await instance.get(`?_start=${page * 9}&_limit=9`);
  return { photos: response.data, hasMore: response.data.length === 9 };
};
