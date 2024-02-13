"use client";

import { SafeUser } from "@/app/types";
import Avatar from "../Avatar";

interface ListingInfoProps {
  user: SafeUser;
  description: string;
}
const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
}) => {

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>{user?.name}</div>
          <Avatar src={user?.image} />
        </div>
      </div>
      <hr/>
      <hr/>
      <div className="text-lg font-light text-neutral-500">
        {description}
      </div>
      <hr/>
    </div>
  );
};

export default ListingInfo;
