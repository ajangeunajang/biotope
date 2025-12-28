'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState, Suspense, use } from 'react';
import { fetchDocs } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity';

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
      <div className="min-h-screen flex items-center justify-center bg-[#C1FF00]">
        <div className="text-xl flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-black border-t-transparent animate-spin"></div>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="min-h-screen bg-[#C1FF00] text-black">
      {/* Header - Fixed */}
      <header className="fixed top-0 left-0 w-full z-50 p-4 lg:p-8 flex justify-between items-start">
        <button
          onClick={() => router.push('/')}
          className="text-xl hover:opacity-70 transition-opacity"
        >
          <svg width="79" height="79" viewBox="0 0 79 79" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.92 0H61.92V3.6H21.67C17.78 3.6 15.19 6.18999 15.19 10.08C15.19 11.66 15.98 13.39 17.13 14.54L78.48 75.96L75.96 78.48L14.54 17.06C13.46 15.98 11.66 15.19 10.08 15.19C6.19 15.19 3.60001 17.78 3.60001 21.67V61.92H0V16.92L16.92 0Z" fill="black" />
          </svg>

        </button>
        <div className="text-right">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            {project.title}
          </h1>
          <p className="text-sm">{project.year}</p>
          <p className="text-sm">{project.client || 'Personal Project'}</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-24">
        {/* Title Section */}
        <section className="mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            {project.title}
          </h1>
          <p className="text-lg lg:text-xl max-w-3xl">{project.description}</p>
        </section>

        {/* Keywords */}
        {project.keywords && project.keywords.length > 0 && (
          <section className="mb-12">
            <div className="flex flex-wrap gap-2">
              {project.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-black text-white rounded-full text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Gallery */}
        {project.images && project.images.length > 0 && (
          <section className="grid gap-6">
            {project.images.map((image, index) => (
              <div
                key={index}
                className="relative w-full h-[300px] lg:h-[600px] rounded-2xl overflow-hidden"
              >
                <Image
                  src={urlFor(image).width(1200).quality(90).url()}
                  alt={`${project.title} - 이미지 ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
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
        <div className="min-h-screen flex items-center justify-center bg-[#C1FF00]">
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
