import Image from "next/image";
import loadder from "@/assets/loader.gif";

const LoadingPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Image src={loadder} alt="loading..." height={150} width={150}></Image>
    </div>
  );
};

export default LoadingPage;
