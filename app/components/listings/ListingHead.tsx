"use client";

import { SafeUser } from "@/app/types";
import Image from "next/image";

interface ListingHeadProps {
  title: string;
  imageSrc: string[];
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  imageSrc,
}) => {

  return (
    <>
      <div
        className="
        w-full
        h-[60vh]
        overflow-hidden
        rounded-xl
        relative
        "
      >
        <Image
          alt="Image"
          src={imageSrc[0]}
          fill
          className="object-cover w-full"
        />
      </div>
    </>
  );
};

export default ListingHead;
