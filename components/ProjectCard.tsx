import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description?: string;
  imageSrc: string;
  imageAlt: string;
  link: string;
}

export default function ProjectCard({
  title,
  description,
  imageSrc,
  imageAlt,
  link,
}: ProjectCardProps) {
  return (
    <div className="border border-black inset-border duration-300 ease-in-out hover:bg-blue-500 hover:text-white">
      <Link href={link} target="_blank" rel="noopener noreferrer" className="block">
        <div className="flex flex-col">
          <div className="border-b border-black p-6 flex justify-center items-center bg-slate-600-transparent">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={300}
              height={300}
              className="object-contain max-h-[200px] w-auto"
            />
          </div>
          <div className="p-6">
            <h3 className="text-h3 font-semibold font-space-mono mb-2">{title}</h3>
            {description && (
              <p className="text-body">{description}</p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

