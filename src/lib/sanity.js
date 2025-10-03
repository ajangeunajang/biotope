import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

// Sanity 클라이언트 설정
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03';

const config = {
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production', // CDN 사용 여부
};

// 클라이언트 생성
export const client = createClient(config);

// 이미지 URL 빌더 설정
const builder = imageUrlBuilder(client);

// 이미지 URL 생성 함수
export function urlFor(source) {
  return builder.image(source);
}

// 데이터 페칭 함수들
export async function fetchDocs(type) {
  const doc = await client.fetch(`*[_type == "${type}"]`);
  return doc;
}

// 특정 조건으로 데이터 페칭
export async function fetchDocsWithFilter(type, filter = '') {
  const query = `*[_type == "${type}"${filter}]`;
  const docs = await client.fetch(query);
  return docs;
}

// 단일 문서 가져오기
export async function fetchDoc(type, slug) {
  const doc = await client.fetch(
    `*[_type == "${type}" && slug.current == "${slug}"][0]`
  );
  return doc;
}

export default client;
