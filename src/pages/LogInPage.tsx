import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/auth.store";
import { useToast } from "../providers/toast.context";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

const LogInPage = () => {
  const [formData, setFormData] = useState({ id: "", password: "" });
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/login?expiresIn=20m",
        formData
      );
      if (response.data.success) {
        const { accessToken } = response.data;
        setAccessToken(accessToken);
        navigate("/");
        toast.on({ label: "로그인 되었습니다." });
      } else {
        toast.on({ label: "로그인 실패" });
      }
    } catch (error) {
      toast.on({ label: "로그인 오류 발생" });
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-center items-center rounded-2xl w-[390px] h-[500px] p-10 shadow-2xl">
        <h1 className="text-2xl font-bold text-gray-700 mb-5">로그인</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="아이디"
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="아이디를 입력하세요"
            state={formData.id.length >= 4 ? "filled" : "default"}
            required
          />

          <Input
            label="비밀번호"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요"
            state={formData.password.length >= 4 ? "filled" : "default"}
            required
          />
          <div className="flex flex-col mt-8 gap-3">
            <Button type="submit">로그인</Button>
            <Button type="button" to="/sign-up">
              회원가입 하기
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogInPage;
