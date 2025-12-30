'use client';
import { useRouter } from 'next/navigation';
import { urlFor } from '@/lib/sanity';

export default function ProjectCard({ project, type = 'project' }) {
  const router = useRouter();

  const handleClick = () => {
    // URL 안전한 방식으로 slug 생성 - 한글도 지원
    const slug = project.slug?.current || encodeURIComponent(project.title);
    router.push(`/${type}/${slug}`);
  };

  // 썸네일이 없을 때 랜덤 이미지 선택 (프로젝트별로 일관성 유지)
  const getRandomThumb = (projectTitle) => {
    // 프로젝트 제목을 기반으로 간단한 해시 생성
    let hash = 0;
    for (let i = 0; i < projectTitle.length; i++) {
      hash = projectTitle.charCodeAt(i) + ((hash << 5) - hash);
    }
    // 1~5 사이의 숫자로 변환
    const imageNumber = (Math.abs(hash) % 5) + 1;
    return `/thumb/${imageNumber}.webp`;
  };

  const thumbnailUrl = project.thumbnail
    ? urlFor(project.thumbnail).width(800).quality(80).url()
    : getRandomThumb(project.title);

  return (
    <div
      className="group w-full h-[40vw] lg:h-80 transform overflow-hidden lg:rounded-[50px] rounded-4xl bg-gray-500 text-base sm:text-xl bg-cover bg-center relative brightness-90 hover:brightness-100 cursor-pointer"
      style={{
        backgroundImage: `url('${thumbnailUrl}')`,
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
      <div className="absolute w-full h-full bg-black/50 group-hover:bg-black/0 transition-bg duration-200 leading-tight">
      <h3 className="scale-x-[0.6] group-hover:opacity-0 transition-opacity duration-300 mt-1">
          {project.host}
        </h3>
        <h3 className="scale-x-[0.6] group-hover:opacity-0 transition-opacity duration-300">
          {project.title}
        </h3>
        {/* <div className="scale-x-[0.6] group-hover:opacity-0 transition-opacity duration-300">
          {project.year}
        </div> */}
        <div className="scale-x-[0.6] flex flex-wrap gap-4 justify-center group-hover:opacity-0 transition-opacity duration-300">
          {project.keywords && project.keywords.length > 0
            ? project.keywords.map((keyword, index) => (
                <span key={index}>{keyword}</span>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
