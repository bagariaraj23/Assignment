"use client";

import Heading from "./Heading";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
}
const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No results found",
  subtitle = "Click on the upload button to Upload your details",
}) => {
  return (
    <div
      className="
    h-[60vh]
    flex
    flex-col
    gap-2
    justify-center
    items-center
    "
    >
      <Heading center title={title} subtitle={subtitle} />
    </div>
  );
};

export default EmptyState;
