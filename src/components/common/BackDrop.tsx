import { PropsWithChildren } from "react";

const BackDrop = ({ children }: PropsWithChildren) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-20 flex justify-center items-center bg-backdrop">
      {children}
    </div>
  );
};

export default BackDrop;
