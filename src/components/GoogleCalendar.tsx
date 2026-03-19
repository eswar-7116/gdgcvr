import React from "react";

interface GoogleCalendarProps {
  className?: string;
  height?: string | number;
}

const GoogleCalendar: React.FC<GoogleCalendarProps> = ({
  className = "",
  height = 700,
}) => {
  const calendarId =
    "8ff8064280985d5aa1af9c531d31ef89d5b023c62e1bd9322c1bcef2530996ce@group.calendar.google.com";
  const encodedId = encodeURIComponent(calendarId);
  const calendarUrl = `https://calendar.google.com/calendar/embed?src=${encodedId}&ctz=Asia%2FKolkata`;

  return (
    <div
      className={`w-full rounded-2xl overflow-hidden border border-neutral-200 shadow-sm ${className}`}
      style={{ height: typeof height === "number" ? `${height}px` : height }}
    >
      <iframe
        src={calendarUrl}
        style={{ border: 0 }}
        width="100%"
        height={height}
        frameBorder="0"
        scrolling="no"
        title="GDG CVR Event Calendar"
        suppressHydrationWarning
      />
    </div>
  );
};

export default GoogleCalendar;
