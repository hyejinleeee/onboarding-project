import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/auth.store";
import { IoCamera, IoPersonOutline } from "react-icons/io5";
import Button from "../components/common/Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useModal } from "../providers/modal.context";
import { useToast } from "../providers/toast.context";
import { useState } from "react";
import Input from "../components/common/Input";
import { fetchUserData, updateProfile } from "../apis/auth.api";
import Spinner from "../components/common/Spinner";
import { QUERY_KEYS } from "../constants/queryKeys";

const MyPage = () => {
  const navigate = useNavigate();
  const accessToken = useAuthStore((state) => state.accessToken);
  const removeAccessToken = useAuthStore((state) => state.removeAccessToken);
  const modal = useModal();
  const toast = useToast();
  const [editMode, setEditMode] = useState(false);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string>("");
  const queryClient = useQueryClient();

  const {
    data: user,
    isPending,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.USER],
    queryFn: () => fetchUserData(accessToken!),
    enabled: !!accessToken,
  });

  const handleUpdateProfile = () => {
    modal.open({
      label: "프로필 변경 하시겠습니까?",
      onConfirm: () => {
        setNickname(user.nickname);
        setEditMode(true);
        setPreviewUrl(user.avatar);
        modal.close();
      },
      onCancel: () => modal.close(),
      confirmButtonContent: { children: "변경하기" },
      cancelButtonContent: { children: "취소하기" },
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      setImgFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      if (!accessToken) return;

      const response = await updateProfile(formData, accessToken);
      return response;
    },
    onSuccess: () => {
      setEditMode(false);
      queryClient.invalidateQueries({ queryKey: ["me"] });
      toast.on({ label: "프로필이 업데이트되었습니다." });
    },
    onError: () => {
      toast.on({ label: "프로필 업데이트에 실패했습니다." });
    },
  });

  const handleSubmit = () => {
    if (imgFile && imgFile.size > 2 * 1024 * 1024) {
      toast.on({ label: "업로드할 파일의 크기는 2MB 이하여야 합니다." });
      return;
    }
    const formData = new FormData();
    if (imgFile) formData.append("avatar", imgFile);
    formData.append("nickname", nickname);

    mutation.mutate(formData);
  };

  const handleLogout = () => {
    modal.open({
      label: "로그아웃 하시겠습니까?",
      onConfirm: () => {
        removeAccessToken();
        modal.close();
        navigate("/");
        toast.on({ label: "로그아웃 되었습니다." });
      },
      onCancel: () => modal.close(),
      confirmButtonContent: { children: "로그아웃 하기" },
      cancelButtonContent: { children: "유지하기" },
    });
  };

  if (isPending)
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  if (error) return <div>에러</div>;

  return (
    <div className="flex justify-center">
      {editMode ? (
        <div className="flex gap-5 p-14 border border-black rounded-lg">
          <div className="flex justify-center items-start">
            {previewUrl ? (
              <div>
                <img
                  src={previewUrl}
                  alt="Avatar"
                  className="w-20 h-20 rounded-full"
                />
                <IoCamera
                  onClick={() => document.getElementById("file-input")?.click()}
                  className="cursor-pointer"
                />
                <input
                  type="file"
                  id="file-input"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                <IoPersonOutline className="w-1/2 h-1/2" />
                <IoCamera
                  onClick={() => document.getElementById("file-input")?.click()}
                  className="cursor-pointer"
                />
                <input
                  type="file"
                  id="file-input"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <p className="text-xl">id: {user?.id}</p>
            <Input
              type="text"
              value={nickname}
              setValue={setNickname}
              required
            />
            <div className="flex gap-2 mt-5">
              <Button onClick={() => setEditMode(false)} size="sm">
                취소
              </Button>
              <Button onClick={handleSubmit} size="sm" variant="outline">
                완료
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-5 p-14 border border-black rounded-lg">
          <div className="flex justify-center items-start">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="Avatar"
                className="w-20 h-20 rounded-full"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                <IoPersonOutline className="w-1/2 h-1/2" />
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <p className="text-xl">id: {user?.id}</p>
            <p className="text-xl">nickname: {user?.nickname}</p>
            <div className="flex gap-2 mt-5">
              <Button onClick={handleUpdateProfile} size="sm">
                프로필 변경
              </Button>
              <Button onClick={handleLogout} size="sm" variant="outline">
                로그아웃
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;
