"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { formUrlQuery } from "@/lib/utils";
import { useTransition } from "react";
import { Loader } from "lucide-react";

type PaginationProps = {
  page: number | string;
  totalePages: number;
  urlParamName?: string;
};

const Pagination = ({ page, totalePages, urlParamName }: PaginationProps) => {
  const router = useRouter();
  const searhcParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleClick = (btnType: string) => {
    startTransition(async () => {
      const pageValue =
        btnType === "next" ? Number(page) + 1 : Number(page) - 1;
      const newUrl = formUrlQuery({
        params: searhcParams.toString(),
        key: urlParamName || "page",
        value: pageValue.toString(),
      });
      router.push(newUrl);
    });
  };

  return (
    <div className="flex gap-2">
      <Button
        size="lg"
        variant="outline"
        className="w-28"
        disabled={Number(page) <= 1 || isPending}
        onClick={() => handleClick("prev")}
      >
        {isPending ? <Loader className="w-4 h-4 animate-spin" /> : "Previous"}
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="w-28"
        disabled={Number(page) >= totalePages || isPending}
        onClick={() => handleClick("next")}
      >
        {isPending ? <Loader className="w-4 h-4 animate-spin" /> : "Next"}
      </Button>
    </div>
  );
};

export default Pagination;
