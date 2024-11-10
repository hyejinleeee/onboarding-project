import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchPhotos } from "../apis/photos.api";
import { Photo, PhotoData } from "../types/photo.type";
import PhotoCard from "../components/home/PhotoCard";
import Button from "../components/common/Button";
import Spinner from "../components/common/Spinner";
import { QUERY_KEYS } from "../constants/queryKeys";
const HomePage = () => {
  const [page, setPage] = useState<number>(0);

  const { isPending, isError, error, data, isFetching } = useQuery<PhotoData>({
    queryKey: [QUERY_KEYS.PHOTOS(page)],
    queryFn: () => fetchPhotos(page),
    placeholderData: keepPreviousData,
  });

  const handleNextPage = () => {
    if (data?.hasMore) setPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 0));
  };

  if (isPending)
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  if (isError)
    return (
      <div>
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );

  return (
    <div className="flex flex-col justify-center items-center ">
      <ul className="grid grid-cols-3 gap-4">
        {data?.photos.map((photo: Photo) => (
          <li key={photo.id}>
            <PhotoCard photo={photo} />
          </li>
        ))}
      </ul>
      <div className="flex gap-3 mb-3 mt-3 justify-center items-center">
        <Button onClick={handlePreviousPage} disabled={page === 0} size="sm">
          이전 페이지
        </Button>
        <span>- {page + 1} -</span>
        <Button onClick={handleNextPage} disabled={!data?.hasMore} size="sm">
          다음 페이지
        </Button>
      </div>
      {isFetching && <span> Loading...</span>}
    </div>
  );
};

export default HomePage;
