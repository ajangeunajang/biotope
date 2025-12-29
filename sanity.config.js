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
    visionTool(), // Vision 탭
  ],

  schema: {
    types: [
      {
        title: 'About',
        name: 'about',
        type: 'document',
        singleton: true,
        fields: [
          {
            title: 'Contact *',
            name: 'contact',
            type: 'array',
            of: [
              {
                type: 'object',
                fields: [
                  {
                    title: 'Label',
                    name: 'label',
                    type: 'string',
                    description: 'ex) w, t, m',
                    validation: (Rule) => Rule.required(),
                  },
                  {
                    title: 'Value',
                    name: 'value',
                    type: 'string',
                    description: '연락 정보 ex)info@biotope-lab.com',
                    validation: (Rule) => Rule.required(),
                  },
                ],
                preview: {
                  select: {
                    label: 'label',
                    value: 'value',
                  },
                  prepare(selection) {
                    const { label, value } = selection;
                    return {
                      title: `${label}: ${value}`,
                    };
                  },
                },
              },
            ],
            description: '연락처',
            validation: (Rule) => Rule.required().min(1),
          },
          {
            title: 'Description Ko *',
            name: 'descriptionKo',
            type: 'text',
            description: '소개 국문',
            validation: (Rule) => Rule.required(),
          },
          {
            title: 'Description En *',
            name: 'descriptionEn',
            type: 'text',
            description: '소개 영문',
            validation: (Rule) => Rule.required(),
          },
        ],

        preview: {
          select: {
            title: 'contactInfo',
            subtitle: 'description',
          },
          prepare(selection) {
            const { title, subtitle } = selection;
            const firstContact = title && title[0];
            return {
              title: firstContact
                ? `${firstContact.label}: ${firstContact.value}`
                : 'About',
              subtitle: subtitle || 'No description',
            };
          },
        },
      },
      {
        title: 'Project',
        name: 'project',
        type: 'document',
        fields: [
          {
            title: 'Thumbnail *',
            name: 'thumbnail',
            type: 'image',
            description: '대표 이미지를 업로드하세요 (150KB 이하)',
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
            description: '프로젝트의 제목을 입력하세요',
            validation: (Rule) => Rule.required(),
          },
          {
            title: 'Host *',
            name: 'host',
            type: 'string',
            description: '주최를 입력하세요',
            validation: (Rule) => Rule.required(),
          },
          // url 생성 - Project 스키마에 slug 필드 필요
          {
            title: 'Title(En)',
            name: 'slug',
            type: 'slug',
            description: '한글 제목일 경우, 영문 제목을 추가해주세요',
            options: {
              source: 'title',
              slugify: (input) =>
                input
                  .toLowerCase()
                  .replace(/\s+/g, '-')
                  .replace(/[^\w\-]+/g, '')
                  .replace(/\-\-+/g, '-')
                  .replace(/^-+/, '')
                  .replace(/-+$/, ''),
            },
          },
          {
            title: 'Year *',
            name: 'year',
            type: 'number',
            description: '연도를 입력하세요.',
            placeholder: '2025',
            validation: (Rule) => Rule.required().min(1900).max(2100),
          },
          {
            title: 'Keywords *',
            name: 'keywords',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'ex) VR/AR, Web, Kiosk',
            options: {
              layout: 'tags',
            },
          },
          {
            title: 'Scope *',
            name: 'scope',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'ex) Programming, Design, Research, Editing',
            options: {
              layout: 'tags',
            },
          },
          {
            title: 'Description *',
            name: 'description',
            type: 'text',
            description: '프로젝트에 대한 설명을 입력하세요',
          },
          {
            title: 'Gallery *',
            name: 'images',
            type: 'array',
            of: [{ type: 'image' }],
            description:
              'JPEG 또는 WebP/AVIF 이미지를 권장합니다 (최대 2000px, 1MB 이하)',
            options: {
              layout: 'gallery',
            },
          },
          {
            title: 'Client',
            name: 'client',
            type: 'string',
            description: '클라이언트를 입력하세요',
          },
          {
            title: 'Demo',
            name: 'demo',
            type: 'url',
            description: '데모 사이트 주소를 입력하세요',
          },
          // {
          //   title: 'Featured',
          //   name: 'featured',
          //   type: 'boolean',
          //   description: '대표 프로젝트로 설정하시겠습니까?',
          //   initialValue: false,
          // },
        ],
        preview: {
          select: {
            title: 'title',
            subtitle: 'description',
            media: 'thumbnail',
          },
          prepare(selection) {
            const { title, subtitle, featured } = selection;
            return Object.assign({}, selection, {
              title: `${featured ? '⭐ ' : ''}${title}`,
            });
          },
        },
      },
      {
        title: 'Lab',
        name: 'lab',
        type: 'document',
        fields: [
          {
            title: 'Thumbnail *',
            name: 'thumbnail',
            type: 'image',
            description: '대표 이미지를 업로드하세요 (150KB 이하)',
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
            description: '프로젝트의 제목을 입력하세요',
            validation: (Rule) => Rule.required(),
          },
          {
            title: 'Title(En)',
            name: 'slug',
            type: 'slug',
            description: '한글 제목일 경우, 영문 제목을 추가해주세요',
            options: {
              source: 'title',
              slugify: (input) =>
                input
                  .toLowerCase()
                  .replace(/\s+/g, '-')
                  .replace(/[^\w\-]+/g, '')
                  .replace(/\-\-+/g, '-')
                  .replace(/^-+/, '')
                  .replace(/-+$/, ''),
            },
          },
          {
            title: 'Year *',
            name: 'year',
            type: 'number',
            description: '연도를 입력하세요',
            placeholder: '2025',
            validation: (Rule) => Rule.required().min(1900).max(2100),
          },
          {
            title: 'Keywords *',
            name: 'keywords',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'ex) Experiment, Research, Prototype',
            options: {
              layout: 'tags',
            },
          },

          {
            title: 'Description *',
            name: 'description',
            type: 'text',
            description: '프로젝트에 대한 설명을 입력하세요',
          },
          {
            title: 'Gallery *',
            name: 'images',
            type: 'array',
            of: [{ type: 'image' }],
            description:
              'JPEG 또는 WebP/AVIF 이미지를 권장합니다 (최대 2000px, 1MB 이하)',
            options: {
              layout: 'gallery',
            },
          },

          {
            title: 'Demo',
            name: 'demo',
            type: 'url',
            description: '데모 사이트 주소를 입력하세요',
          },
          // {
          //   title: 'Featured',
          //   name: 'featured',
          //   type: 'boolean',
          //   description: '대표 Lab 프로젝트로 설정하시겠습니까?',
          //   initialValue: false,
          // },
        ],
        preview: {
          select: {
            title: 'title',
            subtitle: 'description',
            media: 'thumbnail',
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
