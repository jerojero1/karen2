
import React, { useState, useMemo } from 'react';

const App: React.FC = () => {
  const [currentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed (0 for January)
  
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
  const todayDate = isCurrentMonth ? today.getDate() : -1;

  const calendarData = useMemo(() => {
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 for Sunday, 1 for Monday, etc.
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days: (number | null)[] = [];
    
    // Add empty cells for days before the 1st of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  }, [year, month]);

  const monthName = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', { year: 'numeric', month: 'long' }).format(currentDate);
  const weekDays = ['日', '月', '火', '水', '木', '金', '土'];

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">{monthName}</h1>
          <p className="text-gray-500">{year}年</p>
        </div>
        
        <div className="grid grid-cols-7 gap-2 text-center text-sm font-semibold text-gray-500 mb-3">
          {weekDays.map((day, index) => (
            <div 
              key={day}
              className={`
                ${index === 0 ? 'text-red-500' : ''}
                ${index === 6 ? 'text-blue-500' : ''}
              `}
            >
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {calendarData.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="p-1"></div>;
            }

            const dayOfWeek = (index % 7);
            const isToday = day === todayDate;
            
            const dayClasses = `
              w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full text-base transition-colors duration-200
              ${isToday 
                ? 'bg-indigo-600 text-white font-bold shadow-md' 
                : 'hover:bg-indigo-100'
              }
              ${!isToday && dayOfWeek === 0 ? 'text-red-500' : ''}
              ${!isToday && dayOfWeek === 6 ? 'text-blue-500' : ''}
              ${!isToday ? 'text-gray-700' : ''}
            `;

            return (
              <div key={day} className="flex justify-center items-center">
                <div className={dayClasses}>
                  {day}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
