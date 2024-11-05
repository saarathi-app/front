import Image from "next/image";

export function PlaceholderImage({
  width = 80,
  height = 80,
  className,
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}
      style={{ width, height }}
    >
      <svg
        className="w-12 h-12 text-gray-300"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </div>
  );
} 