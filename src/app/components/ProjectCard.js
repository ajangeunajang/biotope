'use client';
import { useRouter } from 'next/navigation';
import { urlFor } from '@/lib/sanity';

export default function ProjectCard({ project, type = 'project' }) {
  const router = useRouter();

  const handleClick = () => {
    // Sanity에서 slug를 가져오거나 title 기반으로 생성
    const slug =
      project.slug?.current || project.title.toLowerCase().replace(/\s+/g, '');
    router.push(`/${type}/${slug}`);
  };

  return (
    <div
      className="group w-full h-50 lg:h-80 transform overflow-hidden lg:rounded-[50px] rounded-4xl bg-gray-500 text-xl bg-cover bg-center relative brightness-90 hover:brightness-100 cursor-pointer"
      style={{
        backgroundImage: `url('${urlFor(project.thumbnail).width(800).quality(80).url()}')`,
      }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`${project.title} 프로젝트 보기`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      <div className="absolute w-full h-full bg-black/50 group-hover:bg-black/0 transition-bg duration-200">
        <h3 className="scale-x-[0.6] group-hover:opacity-0 transition-opacity duration-300">
          {project.title}
        </h3>
        <div className="scale-x-[0.6] group-hover:opacity-0 transition-opacity duration-300">
          {project.year}
        </div>
        <div className="scale-x-[0.6] flex gap-4 justify-center group-hover:opacity-0 transition-opacity duration-300">
          {project.keywords && project.keywords.length > 0 ? (
            project.keywords.map((keyword, index) => (
              <span key={index}>{keyword}</span>
            ))
          ) : (
            <span>준비중</span>
          )}
        </div>
      </div>
    </div>
  );
}
