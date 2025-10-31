'use client';
import { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { fetchDocs } from '@/lib/sanity';

// const labData = [
//   {
//     id: 1,
//     title: 'Lab Project1 Title',
//     slug: 'labproject1title',
//     year: '2025',
//     image:
//       'https://i.pinimg.com/1200x/8b/51/5c/8b515c38e1211b57cd2a7bfde93cdcca.jpg',
//     keywords: ['keyword1', 'keyword2', 'keywords3'],
//     description:
//       '프로젝트 1에 대한 상세한 설명입니다. 이 프로젝트의 목적과 특징을 설명합니다.',
//     client: '클라이언트명 1',
//     bookingLink: 'https://example.com/booking1',
//   },
//   {
//     id: 2,
//     title: 'Lab Project2 Title',
//     slug: 'labproject2title',
//     year: '2025',
//     image:
//       'https://i.pinimg.com/1200x/55/a8/f0/55a8f099bd1cf0fcfe42b300fdcd6fdc.jpg',
//     keywords: ['keyword1', 'keyword2', 'keywords3'],
//     description:
//       '프로젝트 2에 대한 상세한 설명입니다. 이 프로젝트의 목적과 특징을 설명합니다.',
//     client: '클라이언트명 2',
//     bookingLink: 'https://example.com/booking2',
//   },
//   {
//     id: 3,
//     title: 'Project3 Title',
//     slug: 'project3title',
//     year: '2025',
//     image:
//       'https://i.pinimg.com/1200x/9b/94/c6/9b94c615eab5e041992f72c452ec99ae.jpg',
//     keywords: ['keyword1', 'keyword2', 'keywords3'],
//     description:
//       '프로젝트 3에 대한 상세한 설명입니다. 이 프로젝트의 목적과 특징을 설명합니다.',
//     client: '클라이언트명 3',
//     bookingLink: 'https://example.com/booking3',
//   },
//   {
//     id: 4,
//     title: 'Project4 Title',
//     slug: 'project4title',
//     year: '2025',
//     image:
//       'https://i.pinimg.com/736x/41/c1/9b/41c19b2f2c0961e9ac0666057f271267.jpg',
//     keywords: ['keyword1', 'keyword2', 'keywords3'],
//     description:
//       '프로젝트 4에 대한 상세한 설명입니다. 이 프로젝트의 목적과 특징을 설명합니다.',
//     client: '클라이언트명 4',
//     bookingLink: 'https://example.com/booking4',
//   },
//   {
//     id: 5,
//     title: 'Project5 Title',
//     slug: 'project5title',
//     year: '2025',
//     image:
//       'https://i.pinimg.com/1200x/dd/b9/a2/ddb9a24057d8fdffc3e1c25c1839fba8.jpg',
//     keywords: ['keyword1', 'keyword2', 'keywords3'],
//     description:
//       '프로젝트 5에 대한 상세한 설명입니다. 이 프로젝트의 목적과 특징을 설명합니다.',
//     client: '클라이언트명 5',
//     bookingLink: 'https://example.com/booking5',
//   },
//   {
//     id: 6,
//     title: 'Project6 Title',
//     slug: 'project6title',
//     year: '2025',
//     image:
//       'https://i.pinimg.com/1200x/9b/94/c6/9b94c615eab5e041992f72c452ec99ae.jpg',
//     keywords: ['keyword1', 'keyword2', 'keywords3'],
//     description:
//       '프로젝트 6에 대한 상세한 설명입니다. 이 프로젝트의 목적과 특징을 설명합니다.',
//     client: '클라이언트명 6',
//     bookingLink: 'https://example.com/booking6',
//   },
//   {
//     id: 7,
//     title: 'Project7 Title',
//     slug: 'project7title',
//     year: '2025',
//     image:
//       'https://i.pinimg.com/736x/41/c1/9b/41c19b2f2c0961e9ac0666057f271267.jpg',
//     keywords: ['keyword1', 'keyword2', 'keywords3'],
//     description:
//       '프로젝트 7에 대한 상세한 설명입니다. 이 프로젝트의 목적과 특징을 설명합니다.',
//     client: '클라이언트명 7',
//     bookingLink: 'https://example.com/booking7',
//   },
//   {
//     id: 8,
//     title: 'Project8 Title',
//     slug: 'project8title',
//     year: '2025',
//     image:
//       'https://i.pinimg.com/1200x/55/a8/f0/55a8f099bd1cf0fcfe42b300fdcd6fdc.jpg',
//     keywords: ['keyword1', 'keyword2', 'keywords3'],
//     description:
//       '프로젝트 8에 대한 상세한 설명입니다. 이 프로젝트의 목적과 특징을 설명합니다.',
//     client: '클라이언트명 8',
//     bookingLink: 'https://example.com/booking8',
//   },
//   {
//     id: 9,
//     title: 'Project9 Title',
//     slug: 'project9title',
//     year: '2025',
//     image:
//       'https://i.pinimg.com/1200x/8b/51/5c/8b515c38e1211b57cd2a7bfde93cdcca.jpg',
//     keywords: ['keyword1', 'keyword2', 'keywords3'],
//     description:
//       '프로젝트 9에 대한 상세한 설명입니다. 이 프로젝트의 목적과 특징을 설명합니다.',
//     client: '클라이언트명 9',
//     bookingLink: 'https://example.com/booking9',
//   },
// ];

// 메인 Lab 컴포넌트
export default function Lab() {
  const [labData, setLabData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLabs() {
      try {
        // Sanity에서 'lab' 타입 데이터 가져오기
        const data = await fetchDocs('lab');
        setLabData(data);
      } catch (error) {
        console.error('Lab 데이터 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    }

    loadLabs();
  }, []);

  if (loading) {
    return (
      <div className="fixed top-0 right-0 w-2/3 h-auto flex items-center justify-center">
        <div className="text-white text-xl flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin"></div>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 right-0 w-2/3 h-auto text-center py-4 mx-4 text-white grid grid-cols-1 lg:grid-cols-2 lg:gap-4 gap-2 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {labData.map((lab) => (
        <ProjectCard key={lab._id} project={lab} type="lab" />
      ))}
    </div>
  );
}
