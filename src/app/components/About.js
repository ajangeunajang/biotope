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
      <div className="fixed top-0 right-0 w-2/3 h-full flex items-center justify-center">
        <div className="text-white text-xl flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin"></div>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (!aboutData) {
    return (
      <div className="fixed top-0 right-0 w-2/3 h-3/4 m-4 pl-12 pr-4 py-10 text-white flex items-center justify-center">
        <div>Coming Soon</div>
      </div>
    );
  }

  return (
    <div>
      <div className="fixed top-0 right-0 w-2/3 h-3/4 m-4 lg:pl-12 pl-8 pr-4 lg:py-10 py-4 text-white lg:flex items-start overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex-1 w-full pb-10 lg:h-full">
          <table className="origin-left scale-x-[0.6] w-3/2 text-xl lg:text-3xl">
            <tbody>
              {aboutData.contact?.map((contact, index) => (
                <tr key={index} className="leading-tight">
                  <td className="lg:min-w-32 min-w-20 align-top">
                    {contact.label}
                  </td>
                  <td className="">{contact.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex-1 h-auto pb-10 sm:pb-0 overflow-x-hidden">
          <p className="origin-left scale-x-[0.6] w-3/2 text-xl lg:text-3xl">
            {aboutData.descriptionKo}
          </p>
          <p className="origin-left scale-x-[0.6] w-3/2 text-xl lg:text-3xl">
            {aboutData.descriptionEn}
          </p>
        </div>
      </div>
    </div>
  );
}
