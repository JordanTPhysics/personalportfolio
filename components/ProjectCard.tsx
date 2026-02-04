import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description?: string;
  imageSrc: string;
  imageAlt: string;
  link: string;
  imageSize?: number;
}

export default function ProjectCard({
  title,
  description,
  imageSrc,
  imageAlt,
  link,
  imageSize = 400,
}: ProjectCardProps) {
  return (
    <div className="border border-black inset-border duration-300 ease-in-out hover:bg-blue-500 hover:text-white h-full flex flex-col">
      <Link href={link} target="_blank" rel="noopener noreferrer" className="h-full flex flex-col min-h-0">
        <div className="flex flex-col flex-1 min-h-0">
          <div className="border-b border-black flex justify-center items-center bg-slate-600-transparent shrink-0">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={imageSize}
              height={imageSize}
              className="object-contain w-auto"
            />
          </div>
          <div className="p-6 flex-1 min-h-0 flex flex-col">
            <h3 className="text-h3 font-semibold font-space-mono mb-2 shrink-0">{title}</h3>
            {description && (
              <p className="text-body text-bottom flex-1 min-h-0">{description}</p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

