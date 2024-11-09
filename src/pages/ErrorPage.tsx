import Button from "../components/common/Button";

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="mb-7">ErrorPage</h1>
      <Button to="/" size="lg">
        홈으로
      </Button>
    </div>
  );
};

export default ErrorPage;
