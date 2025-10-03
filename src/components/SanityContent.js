'use client';
import { client } from '../lib/sanity';
import { useEffect, useState } from 'react';

export default function SanityContent({ type = 'post' }) {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await client.fetch(`*[_type == "${type}"]`);
        setContent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [type]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류: {error}</div>;
  if (!content.length) return <div>콘텐츠가 없습니다.</div>;

  return (
    <div className="sanity-content">
      {content.map((item, index) => (
        <div key={item._id || index} className="content-item">
          <h2>{item.title || item.name || '제목 없음'}</h2>
          {item.description && <p>{item.description}</p>}
          {item.content && (
            <div dangerouslySetInnerHTML={{ __html: item.content }} />
          )}
        </div>
      ))}
    </div>
  );
}
