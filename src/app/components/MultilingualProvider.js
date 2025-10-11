'use client';

import { useEffect, useRef } from 'react';

export default function MultilingualProvider({ children }) {
  const mlInstanceRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loadMultilingual = async () => {
        try {
          // multilingual.js 로드
          const MultiLingual = await import('multilingual.js');

          // 초기 텍스트 요소들에 multilingual 적용
          const applyMultilingual = () => {
            const textElements = document.querySelectorAll(
              'p, h1, h2, h3, h4, h5, h6, div, span'
            );

            // 기존 인스턴스가 있다면 제거
            if (mlInstanceRef.current) {
              mlInstanceRef.current.destroy?.();
            }

            // 새로운 인스턴스 생성
            mlInstanceRef.current = new MultiLingual.default({
              containers: textElements,
              configuration: [
                'en',
                'num',
                'punct',
                'ko',
                { className: 'ml-blank', charset: ' ' },
              ],
            });

            console.log(
              'Multilingual 적용 완료 - 요소 수:',
              textElements.length
            );
          };

          // 초기 적용
          applyMultilingual();

          // MutationObserver 설정 - DOM 변화 감지
          observerRef.current = new MutationObserver((mutations) => {
            let shouldReapply = false;

            mutations.forEach((mutation) => {
              // 새로운 노드가 추가되었을 때
              if (
                mutation.type === 'childList' &&
                mutation.addedNodes.length > 0
              ) {
                mutation.addedNodes.forEach((node) => {
                  if (node.nodeType === Node.ELEMENT_NODE) {
                    // 텍스트를 포함하는 요소인지 확인
                    const hasTextContent =
                      node.textContent && node.textContent.trim().length > 0;
                    const isTextElement = [
                      'P',
                      'H1',
                      'H2',
                      'H3',
                      'H4',
                      'H5',
                      'H6',
                      'DIV',
                      'SPAN',
                    ].includes(node.tagName);
                    const containsTextElements =
                      node.querySelector &&
                      node.querySelector(
                        'p, h1, h2, h3, h4, h5, h6, div, span'
                      );

                    if (
                      hasTextContent &&
                      (isTextElement || containsTextElements)
                    ) {
                      shouldReapply = true;
                    }
                  }
                });
              }
            });

            // 디바운스 적용 (성능 최적화)
            if (shouldReapply) {
              clearTimeout(window.multilingualTimeout);
              window.multilingualTimeout = setTimeout(() => {
                applyMultilingual();
              }, 100);
            }
          });

          // 전체 문서 관찰 시작
          observerRef.current.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: false,
            attributes: false,
          });
        } catch (error) {
          console.error('multilingual.js 로드 중 오류:', error);
        }
      };

      // DOM이 로드된 후 실행
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadMultilingual);
      } else {
        loadMultilingual();
      }
    }

    // 클린업 함수
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (mlInstanceRef.current) {
        mlInstanceRef.current.destroy?.();
      }
      if (window.multilingualTimeout) {
        clearTimeout(window.multilingualTimeout);
      }
    };
  }, []);

  return <>{children}</>;
}
