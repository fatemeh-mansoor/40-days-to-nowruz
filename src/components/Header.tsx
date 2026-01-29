import { getDaysUntilNowruz, getNowruzDate } from '../utils/dateUtils';

interface HeaderProps {
  title: string;
  subtitle: string;
  description: string;
  daysRemainingText: string;
  springEquinoxText: string;
}

/**
 * Application header with title and countdown
 */
export function Header({ title, subtitle, description, daysRemainingText, springEquinoxText }: HeaderProps) {
  const daysRemaining = getDaysUntilNowruz();
  const nowruzDate = getNowruzDate();

  // Format the date and time
  const dateOptions: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
  };
  const timeOptions: Intl.DateTimeFormatOptions = { 
    hour: '2-digit', 
    minute: '2-digit',
    timeZoneName: 'short'
  };

  const formattedDate = nowruzDate.toLocaleDateString(undefined, dateOptions);
  const formattedTime = nowruzDate.toLocaleTimeString(undefined, timeOptions);

  return (
    <header className="text-center mb-8">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
        {title}
      </h1>
      <p className="text-xl md:text-2xl text-green-600 font-semibold mb-4">
        {daysRemaining} {daysRemainingText}
      </p>
      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
        {description}
      </p>
      
      <div className="text-sm text-gray-600 text-center">
        <div className="font-medium">{springEquinoxText}:</div>
        <div>{formattedDate}</div>
        <div className="font-mono">{formattedTime}</div>
      </div>
    </header>
  );
}
