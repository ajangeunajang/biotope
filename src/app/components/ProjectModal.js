'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { fetchDocs, urlFor } from '@/lib/sanity';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ProjectModal() {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [cardRect, setCardRect] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);

  useEffect(() => {
    const checkUrl = () => {
      const currentPath = window.location.pathname;
      const match = currentPath.match(/^\/(project|lab)\/(.+)$/);

      if (match) {
        const [, type, slug] = match;
        setIsOpen(true);

        // history.state에서 카드 위치 정보 가져오기
        if (window.history.state?.cardRect) {
          setCardRect(window.history.state.cardRect);
        } else {
          setCardRect(null);
        }

        // history.state에서 썸네일 URL 가져오기
        if (window.history.state?.thumbnailUrl) {
          setThumbnailUrl(window.history.state.thumbnailUrl);
        } else {
          setThumbnailUrl(null);
        }

        // history.state에 프로젝트 데이터가 있으면 사용, 없으면 로드
        if (window.history.state?.project) {
          setProject(window.history.state.project);
          setLoading(false);
        } else {
          loadProject(type, slug);
        }
      } else {
        setIsOpen(false);
        setProject(null);
        setCardRect(null);
        setThumbnailUrl(null);
      }
    };

    // 초기 체크
    checkUrl();

    // popstate 이벤트 리스닝 (뒤로가기/앞으로가기)
    window.addEventListener('popstate', checkUrl);

    return () => {
      window.removeEventListener('popstate', checkUrl);
    };
  }, []);

  const loadProject = async (type, slug) => {
    try {
      setLoading(true);
      const projects = await fetchDocs(type);
      const decodedSlug = decodeURIComponent(slug);

      const foundProject = projects.find((p) => {
        if (p.slug?.current && p.slug.current === decodedSlug) {
          return true;
        }
        return p.title === decodedSlug;
      });

      if (foundProject) {
        setProject(foundProject);
      } else {
        handleClose();
      }
    } catch (err) {
      console.error(err);
      handleClose();
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    // 프로젝트 리스트 페이지로 라우팅 (직접 링크로 들어온 사람도 대응)
    const currentPath = window.location.pathname;
    const match = currentPath.match(/^\/(project|lab)\/.+$/);

    // 현재 타입에 맞는 리스트 페이지로 이동
    let targetPage = 'projects';
    if (match) {
      targetPage = match[1] === 'project' ? 'projects' : 'lab';
    }

    window.history.pushState({}, '', `/?page=${targetPage}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* 배경 오버레이 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 filter backdrop-blur-sm z-[100] select-none"
            onClick={handleClose}
          />

          {/* 모달 컨테이너 - 썸네일 배경으로 0.5초 동안 확장 */}
          <motion.div
            initial={
              cardRect
                ? {
                    top: cardRect.top,
                    left: cardRect.left,
                    width: cardRect.width,
                    height: cardRect.height,
                    borderRadius: "50px",
                  }
                : {
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100vh",
                    borderRadius: "0px",
                  }
            }
            animate={{
              top: 0,
              left: 0,
              width: "100%",
              height: "100vh",
              borderRadius: "0px",
            }}
            exit={{ y: "100%" }}
            transition={{
              top: { duration: 0.4, ease: [0.85, 0, 0.15, 1] },
              left: { duration: 0.4, ease: [0.85, 0, 0.15, 1] },
              width: { duration: 0.4, ease: [0.85, 0, 0.15, 1] },
              height: { duration: 0.4, ease: [0.85, 0, 0.15, 1] },
              borderRadius: { delay: 0.4, duration: 0.2 },
            }}
            style={{
              backgroundImage: thumbnailUrl ? `url('${thumbnailUrl}')` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="fixed z-[101] overflow-hidden"
          >
            {/* 썸네일 위 검정 투명 레이어 backdrop blur */}
            {thumbnailUrl && (
              <motion.div
                // initial={{ opacity: 1 }}
                // animate={{ opacity: 0 }}
                // transition={{ delay: 0.4, duration: 0.3 }}
                className="absolute inset-0 bg-black/50 filter backdrop-blur-md select-none"
              />
            )}

            {/* 검은색 배경 + 내용 - 0.35초 후 fade in */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                delay: cardRect ? 0.35 : 0,
                duration: 0.5,
                ease: [0.85, 0, 0.15, 1],
              }}
              className="h-full w-full bg-black text-white overflow-auto relative z-10"
            >
              {loading ? (
                <div className="h-full flex items-center justify-center animate-pulse">
                  <div className="text-xl flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin"></div>
                    <span>Loading...</span>
                  </div>
                </div>
              ) : project ? (
                <>
                  {/* LEFT 1/4 - Fixed */}
                  <section className="overflow-scroll overflow-x-hidden w-full lg:w-1/4 h-full z-50 p-4 lg:p-8 lg:pr-0 flex flex-col gap-4 lg:gap-20 justify-start items-start">
                    {/* Mobile Gallery */}
                    <div className="lg:hidden w-full aspect-16/9">
                      {project.images && project.images.length > 0 ? (
                        <section className="w-full h-full rounded-4xl lg:rounded-[100px] overflow-hidden bg-[#3D3D3D]">
                          <Swiper
                            modules={[Navigation, Pagination]}
                            spaceBetween={30}
                            slidesPerView={1}
                            pagination={{ clickable: true }}
                            className="w-full h-full"
                            style={{ isolation: "auto" }}
                          >
                            {project.images.map((image, index) => (
                              <SwiperSlide key={index}>
                                <div className="relative w-full h-full flex items-center justify-center rounded-4xl lg:rounded-[100px] overflow-hidden">
                                  <Image
                                    src={urlFor(image)
                                      .width(1200)
                                      .quality(90)
                                      .url()}
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
                      ) : <div className="w-full h-full rounded-4xl lg:rounded-[100px] overflow-hidden bg-[#3D3D3D] animate-pulse" />
                      }
                    </div>

                    {/* Article */}
                    <article className="flex-1 lg:overflow-hidden flex flex-col justify-between origin-left scale-x-[0.6] w-[166%] text-xl lg:text-3xl">
                      <main className="flex flex-col overflow-hidden">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl">
                          {project.title}
                        </h1>
                        <h2 className="text-4xl sm:text-5xl lg:text-5xl sm:mt-2">
                          {project.host}
                        </h2>

                        <p className="sm:text-2xl sm:mt-6 text-[#C1FF00]">
                          {project.year}
                        </p>

                        {/* Keywords */}
                        {project.keywords && project.keywords.length > 0 && (
                          <div className="flex flex-wrap gap-3 text-base sm:text-xl mt-1 lg:mt-2">
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

                        {/* Link */}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="lg:mt-3 flex gap-4 text-[#C1FF00] hover:saturate-0 hover:brightness-300 transition-all duration-500"
                          >
                            <svg
                              width="23"
                              height="23"
                              viewBox="0 0 23 23"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11.0215 5.47852H4.9707C3.15532 5.47852 1.94531 6.68412 1.94531 8.49121V17.0967C1.94536 18.8234 3.05031 19.9974 4.73242 20.0986H13.5527C15.3598 20.0986 16.5654 18.8886 16.5654 17.0732V11.0225H18.501V22.0439H11.0215V22.0449H0V3.54297H11.0215V5.47852ZM22.6338 3.54785V11.9668L22.6221 11.9551H20.8145V4.77734C20.8145 4.35991 20.5363 4.08203 20.1191 4.08203C19.9338 4.08215 19.7139 4.17469 19.5518 4.33691L8.75293 15.1553L7.47852 13.8799L18.2891 3.07324C18.4396 2.91099 18.5438 2.67878 18.5439 2.50488C18.5439 2.08748 18.2657 1.80863 17.8486 1.80859H10.6768V0H19.0879L22.6338 3.54785Z"
                                fill="#C1FF00"
                              />
                            </svg>

                            <span className="text-base sm:text-xl">
                              Visit Link
                            </span>
                          </a>
                        )}

                        {/* Description */}
                        <div className="overflow-hidden w-full relative pl-40 lg:pl-0">
                          <pre className="h-full overflow-scroll whitespace-pre-wrap break-words sm:text-3xl leading-tight pt-16 pb-10">
                            {project.description}
                          </pre>

                          {/* fade */}
                          <div className="absolute top-0 right-0 w-full h-16 bg-gradient-to-b from-black via-black via-black/50 to-transparent pointer-events-none"></div>
                          <div className="absolute bottom-0 right-0 w-full h-10 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
                        </div>
                      </main>

                      {/* Details */}
                      <div className="ml-40 lg:ml-50 text-base sm:text-xl flex flex-col gap-2">
                        {project.scope && project.scope.length > 0 && (
                          <div className="flex gap-2">
                            <div className="border-t flex-1 max-w-30 min-w-20 lg:w-40">
                              Scope
                            </div>
                            <div className="border-t flex-1">
                              {project.scope.map((scopeItem, index) => (
                                <div key={index}>{scopeItem}</div>
                              ))}
                            </div>
                          </div>
                        )}
                        <div className="flex gap-2">
                          <div className="border-t flex-1 max-w-30 min-w-20 lg:w-40">
                            Client
                          </div>
                          <div className="border-t flex-1">
                            {project.client || "Personal Project"}
                          </div>
                        </div>
                      </div>
                    </article>

                    {/* back ui */}
                    <button
                      onClick={handleClose}
                      className="brightness-100 hover:brightness-300 saturate-100 hover:saturate-0 transition-all hover:-rotate-180 -rotate-90 transform duration-300 fixed left-4 lg:left-8 bottom-4 lg:bottom-8 scale-90 lg:scale-100 z-50"
                    >
                      <svg
                        width="79"
                        height="79"
                        viewBox="0 0 79 79"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.92 0H61.92V3.6H21.67C17.78 3.6 15.19 6.18999 15.19 10.08C15.19 11.66 15.98 13.39 17.13 14.54L78.48 75.96L75.96 78.48L14.54 17.06C13.46 15.98 11.66 15.19 10.08 15.19C6.19 15.19 3.60001 17.78 3.60001 21.67V61.92H0V16.92L16.92 0Z"
                          fill="#C1FF00"
                        />
                      </svg>
                    </button>
                  </section>

                  {/* RIGHT 3/4 - Gallery */}
                  <section className="hidden lg:block fixed top-0 right-0 w-3/4 h-full p-4 lg:p-8 pl-0">
                    {project.images && project.images.length > 0 ? (
                      <section className="w-full h-full rounded-4xl lg:rounded-[100px] overflow-hidden bg-[#3D3D3D]">
                        <Swiper
                          modules={[Navigation, Pagination]}
                          spaceBetween={30}
                          slidesPerView={1}
                          pagination={{ clickable: true }}
                          className="w-full h-full"
                          style={{ isolation: "auto" }}
                        >
                          {project.images.map((image, index) => (
                            <SwiperSlide key={index}>
                              <div className="relative w-full h-full flex items-center justify-center rounded-4xl lg:rounded-[100px] overflow-hidden">
                                <Image
                                  src={urlFor(image)
                                    .width(1200)
                                    .quality(90)
                                    .url()}
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
                    ) : (
                      <div className="w-full h-full rounded-4xl lg:rounded-[100px] overflow-hidden bg-[#3D3D3D] animate-pulse" />
                    )}
                  </section>
                </>
              ) : null}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
