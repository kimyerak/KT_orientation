'use client'

import { useState } from 'react';
import Link from "next/link";
import BackToHomeButton from "@/components/BackToHomeButton";
import FavoriteItem from "@/components/FavoriteItem";
import CategoryButton from "@/components/CategoryButton";
import CategoryStats from "@/components/CategoryStats";

export default function Favorites() {
  const [selectedCategory, setSelectedCategory] = useState('음식');

  const favorites = {
    음식: [
      { id: 1, name: '피자', emoji: '🍕', reason: '치즈가 맛있어요' },
      { id: 2, name: '라면', emoji: '🍜', reason: '간편하고 맛있어요' },
      { id: 3, name: '초밥', emoji: '🍣', reason: '신선하고 건강해요' },
      { id: 4, name: '햄버거', emoji: '🍔', reason: '든든하고 만족감이 커요' }
    ],
    영화: [
      { id: 5, name: '어벤져스', emoji: '🦸‍♂️', reason: '액션이 멋있어요' },
      { id: 6, name: '인터스텔라', emoji: '🚀', reason: 'SF가 흥미로워요' },
      { id: 7, name: '토이 스토리', emoji: '🧸', reason: '감동적이에요' },
      { id: 8, name: '겨울왕국', emoji: '❄️', reason: '노래가 좋아요' }
    ],
    취미: [
      { id: 9, name: '코딩', emoji: '💻', reason: '새로운 것을 만들 수 있어요' },
      { id: 10, name: '독서', emoji: '📚', reason: '지식을 쌓을 수 있어요' },
      { id: 11, name: '게임', emoji: '🎮', reason: '재미있고 스트레스 해소돼요' },
      { id: 12, name: '산책', emoji: '🚶‍♂️', reason: '건강하고 생각 정리돼요' }
    ],
    음악: [
      { id: 13, name: 'K-POP', emoji: '🎵', reason: '에너지가 넘쳐요' },
      { id: 14, name: '클래식', emoji: '🎼', reason: '마음이 평화로워져요' },
      { id: 15, name: '재즈', emoji: '🎷', reason: '분위기가 좋아요' },
      { id: 16, name: '팝', emoji: '🎤', reason: '따라 부르기 쉬워요' }
    ]
  };

  const categories = Object.keys(favorites);
  const currentItems = favorites[selectedCategory];

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 relative">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          좋아하는 것들
        </h1>

        {/* 카테고리 선택 */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <CategoryButton
              key={category}
              category={category}
              isActive={selectedCategory === category}
              onClick={setSelectedCategory}
            />
          ))}
        </div>

        {/* 선택된 카테고리의 아이템들 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {currentItems.map((item) => (
            <FavoriteItem
              key={item.id}
              id={item.id}
              name={item.name}
              emoji={item.emoji}
              reason={item.reason}
            />
          ))}
        </div>

        {/* 통계 */}
        <CategoryStats favorites={favorites} />

        <BackToHomeButton variant="purple" />
      </div>
    </div>
  );
} 