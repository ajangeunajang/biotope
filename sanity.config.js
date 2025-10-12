import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';

export default defineConfig({
  name: 'webBiotope',
  title: 'Web Biotope',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ydfncl2v',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    structureTool({
      name: 'studio',
      title: '관리자 페이지',
    }),
    visionTool(), // Vision 탭 숨김
  ],

  schema: {
    types: [
      {
        title: 'Project',
        name: 'project',
        type: 'document',
        fields: [
          {
            title: 'Thumbnail *',
            name: 'thumbnail',
            type: 'image',
            description: '프로젝트 대표 이미지를 업로드하세요. (150KB 이하)',
            options: {
              hotspot: true,
            },
            validation: (Rule) =>
              Rule.required('썸네일 이미지는 필수입니다.').custom((image) => {
                if (image.asset && image.asset.size > 150000) {
                  return '이미지 크기는 150KB 이하여야 합니다.';
                }
                return true;
              }),
          },
          {
            title: 'Title *',
            name: 'title',
            type: 'string',
            description: '프로젝트의 이름을 입력하세요.',
            validation: (Rule) => Rule.required(),
          },
          {
            title: 'Year *',
            name: 'year',
            type: 'number',
            description: '프로젝트 완성 연도를 입력하세요.',
            validation: (Rule) => Rule.required().min(1900).max(2100),
          },
          {
            title: 'Keywords *',
            name: 'keywords',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'ex) Interactive, AI, VR/AR, Web',
            options: {
              layout: 'tags',
            },
          },
          {
            title: 'Description *',
            name: 'description',
            type: 'text',
            description: '프로젝트에 대한 간단한 설명을 입력하세요.',
          },

          {
            title: 'Gallery *',
            name: 'images',
            type: 'array',
            of: [{ type: 'image' }],
            description:
              'JPEG 또는 WebP/AVIF 이미지를 권장합니다(최대 2000px, 1MB 이하)',
            options: {
              layout: 'gallery',
            },
          },
          {
            title: 'Client',
            name: 'client',
            type: 'string',
            description: '프로젝트의 클라이언트를 입력하세요.',
          },
          {
            title: 'Demo',
            name: 'demo',
            type: 'url',
            description: '프로젝트 데모 사이트 주소를 입력하세요.',
          },
          {
            title: 'Featured',
            name: 'featured',
            type: 'boolean',
            description: '대표 프로젝트로 설정하시겠습니까?',
            initialValue: false,
          },
        ],
        preview: {
          select: {
            title: 'title',
            subtitle: 'description',
            media: 'thumbnail',
            featured: 'featured',
          },
          prepare(selection) {
            const { title, subtitle, featured } = selection;
            return Object.assign({}, selection, {
              title: `${featured ? '⭐ ' : ''}${title}`,
            });
          },
        },
      },
    ],
  },
});
