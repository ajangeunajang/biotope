'use client';

import { useEffect, useState } from 'react';
import { client } from '../../lib/sanity';

export default function About() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const query = `*[_type == "about"][0]`;
        const data = await client.fetch(query);
        setAboutData(data);
      } catch (error) {
        console.error('Error fetching about data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <div className="fixed top-0 right-0 w-2/3 h-3/4 rounded-[100px] m-4 pl-12 pr-4 py-10 text-white flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (!aboutData) {
    return (
      <div className="fixed top-0 right-0 w-2/3 h-3/4 rounded-[100px] m-4 pl-12 pr-4 py-10 text-white flex items-center justify-center">
        <div>About 데이터를 불러올 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div>
      <div className="fixed top-0 right-0 w-2/3 h-3/4 rounded-[100px] m-4 pl-12 pr-4 py-10 text-white flex items-start overflow-hidden">
        <div className="flex-1 w-full h-full">
          <table className="origin-left scale-x-[0.6] w-3/2">
            <tbody>
              {aboutData.contactInfo?.map((contact, index) => (
                <tr key={index} className="leading-tight">
                  <td className="min-w-32 align-top">{contact.label}</td>
                  <td className="">{contact.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex-1 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <p className="origin-left scale-x-[0.6] w-3/2">
            {aboutData.description}
          </p>
        </div>
      </div>
    </div>
  );
}
