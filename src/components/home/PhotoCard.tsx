import { Photo } from "../../types/photo.type";

const PhotoCard = ({ photo }: { photo: Photo }) => {
  return (
    <div className="flex flex-col bg-sky-100 p-2 m-2 w-60 h-60 items-center justify-center">
      <img src={photo.thumbnailUrl} alt="photo" />
      <h3 className="text-center text-sm mt-2">{photo.title}</h3>
    </div>
  );
};

export default PhotoCard;
