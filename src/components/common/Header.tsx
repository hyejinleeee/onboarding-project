import { Link, useLocation } from "react-router-dom";
import useAuthStore from "../../store/auth.store";
import { useToast } from "../../providers/toast.context";
import { ImHome3 } from "react-icons/im";

const Header = () => {
  const location = useLocation();
  const pathWithoutSlash = location.pathname.substring(1) || "Home";
  const accessToken = useAuthStore((state) => state.accessToken);
  const toast = useToast();
  const handleToast: any = () => {
    toast.on({ label: `${pathWithoutSlash}` });
  };
  return (
    <div className="bg-amber-100 h-20 flex justify-around items-center mb-16">
      <Link to="/">
        <ImHome3 className="w-6 h-6" />
      </Link>
      <h1 onClick={handleToast}>{pathWithoutSlash} page 입니다</h1>
      <div>
        {accessToken ? (
          <Link to="my">마이페이지</Link>
        ) : (
          <div className="flex gap-4">
            <Link to="sign-up">회원가입</Link> | <Link to="log-in">로그인</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
