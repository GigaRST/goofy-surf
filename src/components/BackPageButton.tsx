import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const BackPageButton = () => {
  const router = useRouter();

  return (
    <button className="cursor-pointer flex" onClick={() => router.back()}>
      <ArrowLeftCircleIcon width={40} className="-ml-1" />
    </button>
  );
};

export default BackPageButton;
