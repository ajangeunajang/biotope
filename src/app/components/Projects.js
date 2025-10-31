'use client';
import { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { fetchDocs } from '@/lib/sanity';

export default function Projects() {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        // Sanity에서 'project' 타입 데이터 가져오기
        const data = await fetchDocs('project');
        setProjectsData(data);
      } catch (error) {
        console.error('프로젝트 데이터 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  if (loading) {
    return (
      <div className="fixed top-0 right-0 w-2/3 h-full flex items-center justify-center">
        <div className="text-white text-xl flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin"></div>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (!projectsData || projectsData.length === 0) {
    return (
      <div className="fixed top-0 right-0 w-full h-full overflow-visible">
        <div className="blur-sm sm:blur-xl fixed top-0 right-0 w-2/3 h-auto text-center py-4 pb-[35vh] mx-4 text-white overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="w-full h-auto grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 lg:gap-4 gap-2 ">
            <div className="group w-full h-[40vw] lg:h-80 transform overflow-hidden lg:rounded-[50px] rounded-4xl bg-gray-500 text-base sm:text-xl bg-cover bg-center relative brightness-90 hover:brightness-100 cursor-pointer">
              <div className="absolute w-full h-full bg-black/50 group-hover:bg-black/0 transition-bg duration-200">
                <h3 className="scale-x-[0.6] group-hover:opacity-0 transition-opacity duration-300">
                  Project Title
                </h3>
                <div className="scale-x-[0.6] group-hover:opacity-0 transition-opacity duration-300">
                  2025
                </div>
                <div className="scale-x-[0.6] flex gap-4 justify-center group-hover:opacity-0 transition-opacity duration-300">
                  VR Web
                </div>
              </div>
            </div>
            {/* cards */}
            <div className="group w-full h-[40vw] lg:h-80 transform overflow-hidden lg:rounded-[50px] rounded-4xl bg-gray-500 text-base sm:text-xl bg-cover bg-center relative brightness-90 hover:brightness-100 cursor-pointer">
              <div className="absolute w-full h-full bg-black/50 group-hover:bg-black/0 transition-bg duration-200">
                <h3 className="scale-x-[0.6] group-hover:opacity-0 transition-opacity duration-300">
                  Project Title
                </h3>
                <div className="scale-x-[0.6] group-hover:opacity-0 transition-opacity duration-300">
                  2025
                </div>
                <div className="scale-x-[0.6] flex gap-4 justify-center group-hover:opacity-0 transition-opacity duration-300">
                  VR Web
                </div>
              </div>
            </div>
            <div className="group w-full h-[40vw] lg:h-80 transform overflow-hidden lg:rounded-[50px] rounded-4xl bg-gray-500 text-base sm:text-xl bg-cover bg-center relative brightness-90 hover:brightness-100 cursor-pointer">
              <div className="absolute w-full h-full bg-black/50 group-hover:bg-black/0 transition-bg duration-200">
                <h3 className="scale-x-[0.6] group-hover:opacity-0 transition-opacity duration-300">
                  Project Title
                </h3>
                <div className="scale-x-[0.6] group-hover:opacity-0 transition-opacity duration-300">
                  2025
                </div>
                <div className="scale-x-[0.6] flex gap-4 justify-center group-hover:opacity-0 transition-opacity duration-300">
                  VR Web
                </div>
              </div>
            </div>
            <div className="group w-full h-[40vw] lg:h-80 transform overflow-hidden lg:rounded-[50px] rounded-4xl bg-gray-500 text-base sm:text-xl bg-cover bg-center relative brightness-90 hover:brightness-100 cursor-pointer">
              <div className="absolute w-full h-full bg-black/50 group-hover:bg-black/0 transition-bg duration-200">
                <h3 className="scale-x-[0.6] group-hover:opacity-0 transition-opacity duration-300">
                  Project Title
                </h3>
                <div className="scale-x-[0.6] group-hover:opacity-0 transition-opacity duration-300">
                  2025
                </div>
                <div className="scale-x-[0.6] flex gap-4 justify-center group-hover:opacity-0 transition-opacity duration-300">
                  VR Web
                </div>
              </div>
            </div>
            <div className="group w-full h-[40vw] lg:h-80 transform overflow-hidden lg:rounded-[50px] rounded-4xl bg-gray-500 text-base sm:text-xl bg-cover bg-center relative brightness-90 hover:brightness-100 cursor-pointer">
              <div className="absolute w-full h-full bg-black/50 group-hover:bg-black/0 transition-bg duration-200">
                <h3 className="scale-x-[0.6] group-hover:opacity-0 transition-opacity duration-300">
                  Project Title
                </h3>
                <div className="scale-x-[0.6] group-hover:opacity-0 transition-opacity duration-300">
                  2025
                </div>
                <div className="scale-x-[0.6] flex gap-4 justify-center group-hover:opacity-0 transition-opacity duration-300">
                  VR Web
                </div>
              </div>
            </div>
            <div className="group w-full h-[40vw] lg:h-80 transform overflow-hidden lg:rounded-[50px] rounded-4xl bg-gray-500 text-base sm:text-xl bg-cover bg-center relative brightness-90 hover:brightness-100 cursor-pointer">
              <div className="absolute w-full h-full bg-black/50 group-hover:bg-black/0 transition-bg duration-200">
                <h3 className="scale-x-[0.6] group-hover:opacity-0 transition-opacity duration-300">
                  Project Title
                </h3>
                <div className="scale-x-[0.6] group-hover:opacity-0 transition-opacity duration-300">
                  2025
                </div>
                <div className="scale-x-[0.6] flex gap-4 justify-center group-hover:opacity-0 transition-opacity duration-300">
                  VR Web
                </div>
              </div>
            </div>
            <div className="group w-full h-[40vw] lg:h-80 transform overflow-hidden lg:rounded-[50px] rounded-4xl bg-gray-500 text-base sm:text-xl bg-cover bg-center relative brightness-90 hover:brightness-100 cursor-pointer">
              <div className="absolute w-full h-full bg-black/50 group-hover:bg-black/0 transition-bg duration-200">
                <h3 className="scale-x-[0.6] group-hover:opacity-0 transition-opacity duration-300">
                  Project Title
                </h3>
                <div className="scale-x-[0.6] group-hover:opacity-0 transition-opacity duration-300">
                  2025
                </div>
                <div className="scale-x-[0.6] flex gap-4 justify-center group-hover:opacity-0 transition-opacity duration-300">
                  VR Web
                </div>
              </div>
            </div>
            <div className="group w-full h-[40vw] lg:h-80 transform overflow-hidden lg:rounded-[50px] rounded-4xl bg-gray-500 text-base sm:text-xl bg-cover bg-center relative brightness-90 hover:brightness-100 cursor-pointer">
              <div className="absolute w-full h-full bg-black/50 group-hover:bg-black/0 transition-bg duration-200">
                <h3 className="scale-x-[0.6] group-hover:opacity-0 transition-opacity duration-300">
                  Project Title
                </h3>
                <div className="scale-x-[0.6] group-hover:opacity-0 transition-opacity duration-300">
                  2025
                </div>
                <div className="scale-x-[0.6] flex gap-4 justify-center group-hover:opacity-0 transition-opacity duration-300">
                  VR Web
                </div>
              </div>
            </div>
            <div className="group w-full h-[40vw] lg:h-80 transform overflow-hidden lg:rounded-[50px] rounded-4xl bg-gray-500 text-base sm:text-xl bg-cover bg-center relative brightness-90 hover:brightness-100 cursor-pointer">
              <div className="absolute w-full h-full bg-black/50 group-hover:bg-black/0 transition-bg duration-200">
                <h3 className="scale-x-[0.6] group-hover:opacity-0 transition-opacity duration-300">
                  Project Title
                </h3>
                <div className="scale-x-[0.6] group-hover:opacity-0 transition-opacity duration-300">
                  2025
                </div>
                <div className="scale-x-[0.6] flex gap-4 justify-center group-hover:opacity-0 transition-opacity duration-300">
                  VR Web
                </div>
              </div>
            </div>

            <div className="group w-full h-[40vw] lg:h-80 transform overflow-hidden lg:rounded-[50px] rounded-4xl bg-gray-500 text-base sm:text-xl bg-cover bg-center relative brightness-90 hover:brightness-100 cursor-pointer">
              <div className="absolute w-full h-full bg-black/50 group-hover:bg-black/0 transition-bg duration-200">
                <h3 className="scale-x-[0.6] group-hover:opacity-0 transition-opacity duration-300">
                  Project Title
                </h3>
                <div className="scale-x-[0.6] group-hover:opacity-0 transition-opacity duration-300">
                  2025
                </div>
                <div className="scale-x-[0.6] flex gap-4 justify-center group-hover:opacity-0 transition-opacity duration-300">
                  VR Web
                </div>
              </div>
            </div>
            <div className="group w-full h-[40vw] lg:h-80 transform overflow-hidden lg:rounded-[50px] rounded-4xl bg-gray-500 text-base sm:text-xl bg-cover bg-center relative brightness-90 hover:brightness-100 cursor-pointer">
              <div className="absolute w-full h-full bg-black/50 group-hover:bg-black/0 transition-bg duration-200">
                <h3 className="scale-x-[0.6] group-hover:opacity-0 transition-opacity duration-300">
                  Project Title
                </h3>
                <div className="scale-x-[0.6] group-hover:opacity-0 transition-opacity duration-300">
                  2025
                </div>
                <div className="scale-x-[0.6] flex gap-4 justify-center group-hover:opacity-0 transition-opacity duration-300">
                  VR Web
                </div>
              </div>
            </div>
            <div className="group w-full h-[40vw] lg:h-80 transform overflow-hidden lg:rounded-[50px] rounded-4xl bg-gray-500 text-base sm:text-xl bg-cover bg-center relative brightness-90 hover:brightness-100 cursor-pointer">
              <div className="absolute w-full h-full bg-black/50 group-hover:bg-black/0 transition-bg duration-200">
                <h3 className="scale-x-[0.6] group-hover:opacity-0 transition-opacity duration-300">
                  Project Title
                </h3>
                <div className="scale-x-[0.6] group-hover:opacity-0 transition-opacity duration-300">
                  2025
                </div>
                <div className="scale-x-[0.6] flex gap-4 justify-center group-hover:opacity-0 transition-opacity duration-300">
                  VR Web
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-2/3 h-full text-gray-300 text-base sm:text-2xl text-center items-center justify-center flex">
          <div>Coming Soon </div>
        </div>
      </div>
    );
  }
  return (
    <div className="fixed top-0 right-0 w-2/3 h-full text-center py-4 pb-[35vh] mx-4 text-white overflow-y-scroll overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="w-full h-auto grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 lg:gap-4 gap-2 ">
        {projectsData.map((project) => (
          <ProjectCard key={project._id} project={project} type="project" />
        ))}
      </div>
    </div>
  );
}
