import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';

export default defineConfig({
  name: 'webBiotope',
  title: 'Web Biotope',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ydfncl2v',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [
      {
        title: 'Project',
        name: 'project',
        type: 'document',
        fields: [
          {
            title: 'Title',
            name: 'title',
            type: 'string',
            description: '프로젝트의 이름을 입력하세요.',
            validation: (Rule) => Rule.required(),
          },
          {
            title: 'Description',
            name: 'description',
            type: 'text',
            description: '프로젝트에 대한 간단한 설명을 입력하세요.',
          },
          {
            title: 'Image',
            name: 'image',
            type: 'image',
            description: '프로젝트 대표 이미지를 업로드하세요.',
            options: {
              hotspot: true,
            },
          },
          {
            title: 'Keywords',
            name: 'keywords',
            type: 'array',
            of: [{ type: 'string' }],
            description: '프로젝트에 사용된 기술을 입력하세요.',
            options: {
              layout: 'tags',
            },
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
            media: 'image',
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
