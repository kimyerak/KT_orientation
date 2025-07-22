export default function ProfileCard({ 
  title = "📞 연락 정보",
  email = "example@email.com",
  phone = "010-1234-5678", 
  location = "서울, 대한민국",
  socialLinks = {
    linkedin: "#",
    github: "#", 
    twitter: "#"
  },
  showSocial = true,
  className = ""
}) {
  return (
    <div className={`bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 
      hover:shadow-xl transition-all duration-300 hover:scale-102 
      animate-fade-in group ${className}`}>
      <h2 className="text-2xl font-semibold mb-6 text-gray-700 dark:text-gray-200">
        {title}
      </h2>
      
      <div className="space-y-4">
        {email && (
          <div className="flex items-center group/item hover:translate-x-2 transition-transform duration-200">
            <span className="text-2xl mr-4 group-hover/item:animate-bounce">📧</span>
            <div>
              <p className="font-medium text-gray-700 dark:text-gray-200">이메일</p>
              <p className="text-blue-600 dark:text-blue-400 hover:underline transition-all">
                {email}
              </p>
            </div>
          </div>
        )}
        
        {phone && (
          <div className="flex items-center group/item hover:translate-x-2 transition-transform duration-200">
            <span className="text-2xl mr-4 group-hover/item:animate-bounce">📱</span>
            <div>
              <p className="font-medium text-gray-700 dark:text-gray-200">전화번호</p>
              <p className="text-gray-600 dark:text-gray-300">{phone}</p>
            </div>
          </div>
        )}
        
        {location && (
          <div className="flex items-center group/item hover:translate-x-2 transition-transform duration-200">
            <span className="text-2xl mr-4 group-hover/item:animate-bounce">📍</span>
            <div>
              <p className="font-medium text-gray-700 dark:text-gray-200">위치</p>
              <p className="text-gray-600 dark:text-gray-300">{location}</p>
            </div>
          </div>
        )}
      </div>

      {showSocial && (socialLinks.linkedin || socialLinks.github || socialLinks.twitter) && (
        <>
          <hr className="my-6 border-gray-200 dark:border-gray-600" />

          <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
            🌐 소셜 미디어
          </h3>
          
          <div className="flex space-x-4">
            {socialLinks.linkedin && (
              <a 
                href={socialLinks.linkedin} 
                className="text-blue-600 hover:text-blue-800 transition-all duration-200 
                  hover:scale-110 hover:-translate-y-1 flex items-center space-x-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-2xl animate-bounce-subtle">💼</span> 
                <span className="hover:underline">LinkedIn</span>
              </a>
            )}
            {socialLinks.github && (
              <a 
                href={socialLinks.github} 
                className="text-gray-800 hover:text-black transition-all duration-200 
                  hover:scale-110 hover:-translate-y-1 flex items-center space-x-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-2xl animate-bounce-subtle">🐙</span>
                <span className="hover:underline">GitHub</span>
              </a>
            )}
            {socialLinks.twitter && (
              <a 
                href={socialLinks.twitter} 
                className="text-blue-400 hover:text-blue-600 transition-all duration-200 
                  hover:scale-110 hover:-translate-y-1 flex items-center space-x-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-2xl animate-bounce-subtle">🐦</span>
                <span className="hover:underline">Twitter</span>
              </a>
            )}
          </div>
        </>
      )}
    </div>
  );
} 