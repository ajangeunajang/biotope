'use client';
import ProjectCard from './ProjectCard';

const projectsData = [
  {
    id: 1,
    title: '완도 해양문화 치유센터',
    slug: 'project1title',
    year: '2025',
    image: 'https://thumb.mt.co.kr/06/2023/03/2023031410061938175_1.jpg',
    keywords: ['keyword1', 'keyword2', 'keywords3'],
    description:
      '프로젝트 1에 대한 상세한 설명입니다. 이 프로젝트의 목적과 특징을 설명합니다.',
    client: '클라이언트명 1',
    bookingLink: 'https://example.com/booking1',
  },
  {
    id: 2,
    title: 'Project2 Title',
    slug: 'project2title',
    year: '2025',
    image: 'https://storage.heypop.kr/assets/2024/01/15161906/main-4.jpg',
    keywords: ['keyword1', 'keyword2', 'keywords3'],
    description:
      '프로젝트 2에 대한 상세한 설명입니다. 이 프로젝트의 목적과 특징을 설명합니다.',
    client: '클라이언트명 2',
    bookingLink: 'https://example.com/booking2',
  },
  {
    id: 3,
    title: 'Project3 Title',
    slug: 'project3title',
    year: '2025',
    image:
      'https://design.co.kr/wp-content/uploads/2024/11/02-%EB%B3%B5%EC%82%AC-832x555.jpg',
    keywords: ['keyword1', 'keyword2', 'keywords3'],
    description:
      '프로젝트 3에 대한 상세한 설명입니다. 이 프로젝트의 목적과 특징을 설명합니다.',
    client: '클라이언트명 3',
    bookingLink: 'https://example.com/booking3',
  },
  {
    id: 4,
    title: 'Project4 Title',
    slug: 'project4title',
    year: '2025',
    image:
      'https://i.pinimg.com/1200x/4c/35/e4/4c35e4b596146b6b9cbb927fa0accf11.jpg',
    keywords: ['keyword1', 'keyword2', 'keywords3'],
    description:
      '프로젝트 4에 대한 상세한 설명입니다. 이 프로젝트의 목적과 특징을 설명합니다.',
    client: '클라이언트명 4',
    bookingLink: 'https://example.com/booking4',
  },
  {
    id: 5,
    title: 'Project5 Title',
    slug: 'project5title',
    year: '2025',
    image: 'https://img.youtube.com/vi/wXLKOPJB13E/maxresdefault.jpg',
    keywords: ['keyword1', 'keyword2', 'keywords3'],
    description:
      '프로젝트 5에 대한 상세한 설명입니다. 이 프로젝트의 목적과 특징을 설명합니다.',
    client: '클라이언트명 5',
    bookingLink: 'https://example.com/booking5',
  },
  {
    id: 6,
    title: 'Project6 Title',
    slug: 'project6title',
    year: '2025',
    image:
      'https://i.pinimg.com/1200x/4d/7b/2c/4d7b2ca901879f838abbd73df4064c17.jpg',
    keywords: ['keyword1', 'keyword2', 'keywords3'],
    description:
      '프로젝트 6에 대한 상세한 설명입니다. 이 프로젝트의 목적과 특징을 설명합니다.',
    client: '클라이언트명 6',
    bookingLink: 'https://example.com/booking6',
  },
  {
    id: 7,
    title: 'Project7 Title',
    slug: 'project7title',
    year: '2025',
    image: 'https://thumb.mt.co.kr/06/2023/03/2023031410061938175_1.jpg',
    keywords: ['keyword1', 'keyword2', 'keywords3'],
    description:
      '프로젝트 7에 대한 상세한 설명입니다. 이 프로젝트의 목적과 특징을 설명합니다.',
    client: '클라이언트명 7',
    bookingLink: 'https://example.com/booking7',
  },
  {
    id: 8,
    title: 'Project8 Title',
    slug: 'project8title',
    year: '2025',
    image:
      'https://i.pinimg.com/1200x/4c/35/e4/4c35e4b596146b6b9cbb927fa0accf11.jpg',
    keywords: ['keyword1', 'keyword2', 'keywords3'],
    description:
      '프로젝트 8에 대한 상세한 설명입니다. 이 프로젝트의 목적과 특징을 설명합니다.',
    client: '클라이언트명 8',
    bookingLink: 'https://example.com/booking8',
  },
  {
    id: 9,
    title: 'Project9 Title',
    slug: 'project9title',
    year: '2025',
    image:
      'https://design.co.kr/wp-content/uploads/2024/11/02-%EB%B3%B5%EC%82%AC-832x555.jpg',
    keywords: ['keyword1', 'keyword2', 'keywords3'],
    description:
      '프로젝트 9에 대한 상세한 설명입니다. 이 프로젝트의 목적과 특징을 설명합니다.',
    client: '클라이언트명 9',
    bookingLink: 'https://example.com/booking9',
  },
];

// 메인 Projects 컴포넌트
export default function Projects() {
  return (
    <div className="fixed top-0 right-0 w-2/3 h-full text-center py-4 mx-4 text-white grid grid-cols-1 lg:grid-cols-2 lg:gap-4 gap-2 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {projectsData.map((project) => (
        <ProjectCard key={project.id} project={project} type="projects" />
      ))}
    </div>
  );
}
