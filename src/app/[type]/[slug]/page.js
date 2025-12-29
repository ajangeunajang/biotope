'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState, Suspense, use } from 'react';
import { fetchDocs } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function ProjectDetail({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { type, slug } = resolvedParams;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProject() {
      try {
        setLoading(true);
        // Sanity에서 프로젝트 데이터 가져오기
        const projects = await fetchDocs(type);

        // URL 디코딩된 slug
        const decodedSlug = decodeURIComponent(slug);

        // 제목으로 직접 매칭 (slug 필드 지원 + 제목 fallback)
        const foundProject = projects.find((p) => {
          // slug 필드가 있으면 우선 사용
          if (p.slug?.current && p.slug.current === decodedSlug) {
            return true;
          }
          // slug 필드가 없거나 매칭 실패 시 제목으로 매칭
          return p.title === decodedSlug;
        });

        if (foundProject) {
          setProject(foundProject);
        } else {
          router.push('/');
        }
      } catch (err) {
        console.error(err);
        router.push('/');
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [type, slug, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-xl flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-black border-t-transparent animate-spin"></div>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="h-screen bg-black text-white">

      {/* Header - Fixed */}
      <header className="fixed top-0 left-0 w-1/4 h-full z-50 p-4 lg:p-8 flex flex-col justify-between items-start">
        <div className="flex flex-col text-sm origin-left scale-x-[0.6] w-3/2 text-xl lg:text-3xl">
          <h1 className="text-4xl lg:text-6xl">
            {project.title}
          </h1>
          <h2 className="text-4xl lg:text-5xl mt-2">
            {project.host}
          </h2>
          <p className="mt-6 text-[#C1FF00]">{project.year}</p>
          {/* Keywords */}
          {project.keywords && project.keywords.length > 0 && (
            <div className="flex flex-wrap gap-3 text-base sm:text-xl mt-2">
              {project.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="bg-[#C1FF00] text-black px-2"
                >
                  {keyword}
                </span>
              ))}
            </div>
          )}
          

          <pre className="whitespace-pre-wrap break-words text-2xl lg:text-3xl leading-tight mt-20">
            {project.description}
          </pre>

          {/* Info Details */}
          <div className="text-base sm:text-xl mt-40 flex flex-col gap-2 text-[#C1FF00]">
            {project.scope && project.scope.length > 0 && (
              <div className="flex gap-2">
                <div className='border-t w-30'>Scope</div>
                <div className='border-t min-w-[20rem]'>
                  {project.scope.map((scopeItem, index) => (
                    <div
                      key={index}
                      className=""
                    >
                      {scopeItem}
                    </div>
                  ))}</div>
              </div>
            )}
            <div className="flex gap-2">
                <div className='border-t w-30'>Client</div>          
              <div className='border-t min-w-[20rem]'>
                {project.client || 'Personal Project'}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => router.back()}
          className="hover:invert transition-all hover:-rotate-90 transform duration-300"
        >
          <svg width="79" height="79" viewBox="0 0 79 79" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.92 0H61.92V3.6H21.67C17.78 3.6 15.19 6.18999 15.19 10.08C15.19 11.66 15.98 13.39 17.13 14.54L78.48 75.96L75.96 78.48L14.54 17.06C13.46 15.98 11.66 15.19 10.08 15.19C6.19 15.19 3.60001 17.78 3.60001 21.67V61.92H0V16.92L16.92 0Z" fill="#C1FF00" />
          </svg>
        </button>
      </header>

      {/* Gallery */}
      <main className="fixed top-0 right-0 w-3/4 h-full p-8">
        {project.images && project.images.length > 0 && (
          <section className="w-full h-full rounded-4xl lg:rounded-[100px] overflow-hidden bg-gray-700">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              className="w-full h-full"
            >
              {project.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-full flex items-center justify-center rounded-4xl lg:rounded-[100px] overflow-hidden">
                    <Image
                      src={urlFor(image).width(1200).quality(90).url()}
                      alt={`${project.title} - 이미지 ${index + 1}`}
                      fill
                      className="object-contain"
                      priority={index === 0}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        )}

        {/* Demo Link */}
        {project.demo && (
          <section className="mt-12 text-center">
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-black text-white rounded-full hover:opacity-80 transition-opacity"
            >
              View Demo →
            </a>
          </section>
        )}
      </main>
    </div>
  );
}

export default function Page({ params }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
          <div className="text-xl flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-black border-t-transparent animate-spin"></div>
            <span>Loading...</span>
          </div>
        </div>
      }
    >
      <ProjectDetail params={params} />
    </Suspense>
  );
}
