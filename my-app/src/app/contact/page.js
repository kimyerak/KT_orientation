'use client'

import { useState } from 'react';
import Link from "next/link";
import ProfileCard from "@/components/ProfileCard";
import BackToHomeButton from "@/components/BackToHomeButton";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 팀원 데이터
  const teamMembers = [
    {
      title: "👨‍💻 프로젝트 리더",
      email: "leader@myteam.com",
      phone: "010-1234-5678",
      location: "서울, 대한민국",
      socialLinks: {
        linkedin: "https://linkedin.com/in/leader",
        github: "https://github.com/teamleader",
        twitter: "https://twitter.com/leader"
      }
    },
    {
      title: "🎨 디자이너",
      email: "designer@myteam.com", 
      phone: "010-2345-6789",
      location: "부산, 대한민국",
      socialLinks: {
        linkedin: "https://linkedin.com/in/designer",
        github: "https://github.com/designer"
      }
    },
    {
      title: "⚡ 백엔드 개발자",
      email: "backend@myteam.com",
      phone: "010-3456-7890", 
      location: "대구, 대한민국",
      socialLinks: {
        github: "https://github.com/backend-dev",
        twitter: "https://twitter.com/backenddev"
      }
    },
    {
      title: "🌐 프론트엔드 개발자",
      email: "frontend@myteam.com",
      phone: "010-4567-8901",
      location: "인천, 대한민국",
      socialLinks: {
        linkedin: "https://linkedin.com/in/frontend",
        github: "https://github.com/frontend-dev"
      }
    }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 실제로는 서버로 데이터를 전송하겠지만, 여기서는 시뮬레이션
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800 relative">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          연락처
        </h1>

        {/* 팀원 연락처 */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800 dark:text-white">
            👥 팀원 연락처
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
            {teamMembers.map((member, index) => (
              <ProfileCard 
                key={index}
                title={member.title}
                email={member.email}
                phone={member.phone}
                location={member.location}
                socialLinks={member.socialLinks}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 내 연락 정보 */}
          <ProfileCard 
            title="📞 나의 연락 정보"
            email="my@email.com"
            phone="010-0000-0000"
            location="서울, 대한민국"
            socialLinks={{
              linkedin: "https://linkedin.com/in/myprofile",
              github: "https://github.com/myusername",
              twitter: "https://twitter.com/myhandle"
            }}
          />

          {/* 메시지 폼 */}
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700 dark:text-gray-200">
              💌 메시지 보내기
            </h2>
            
            {isSubmitted ? (
              <div className="text-center py-8">
                <span className="text-6xl">✅</span>
                <h3 className="text-xl font-semibold mt-4 text-green-600">
                  메시지가 전송되었습니다!
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  빠른 시일 내에 답변드리겠습니다.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    이름
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                    placeholder="이름을 입력하세요"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    이메일
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                    placeholder="이메일을 입력하세요"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    메시지
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                    placeholder="메시지를 입력하세요"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  메시지 전송
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-8">
          <BackToHomeButton variant="blue" />
        </div>
      </div>
    </div>
  );
} 