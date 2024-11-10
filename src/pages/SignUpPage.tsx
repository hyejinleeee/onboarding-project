import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "../providers/toast.context";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

const SignUpPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = { id, password, nickname };
    try {
      const response = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/register",
        formData
      );
      toast.on({ label: response.data.message });
      navigate("/log-in");
    } catch (error) {
      toast.on({ label: "회원가입 실패" });
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-center items-center rounded-2xl w-[390px] h-[600px] p-10 shadow-2xl">
        <h1 className="text-2xl font-bold text-gray-700 mb-5">회원가입</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-7">
          <Input
            label="아이디"
            type="text"
            value={id}
            setValue={setId}
            placeholder="아이디를 입력하세요"
            validationMessage={
              id.length >= 4
                ? ""
                : "아이디는 최소 4글자 이상,영문이어야 합니다."
            }
            state={id.length >= 4 ? "filled" : "default"}
            required
          />
          <Input
            label="닉네임"
            type="text"
            value={nickname}
            setValue={setNickname}
            placeholder="닉네임을 입력하세요"
            validationMessage={
              nickname.length >= 4
                ? ""
                : "닉네임은 최소 4글자 이상,영문이어야 합니다."
            }
            state={nickname.length >= 4 ? "filled" : "default"}
            required
          />
          <Input
            label="비밀번호"
            type="password"
            value={password}
            setValue={setPassword}
            placeholder="비밀번호를 입력하세요"
            validationMessage={
              password.length >= 4
                ? ""
                : "비밀번호는 최소 4글자 이상,영문이어야 합니다."
            }
            state={password.length >= 4 ? "filled" : "default"}
            required
          />
          <div className="flex flex-col mt-2 gap-3">
            <Button type="submit">가입하기</Button>
            <Button type="button" to="/log-in">
              로그인 하기
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
