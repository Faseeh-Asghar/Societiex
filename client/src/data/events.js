/**
 * events.js — Mock event data for the public website.
 * In production, this will be fetched from the backend API.
 * Each event references a society by its slug ID.
 */

const events = [
  {
    id: 'orientation-week-2026',
    title: 'Orientation Week 2026',
    societyId: null,
    societyName: 'FAST-NUCES CFD',
    date: '2026-09-15',
    time: '09:00 AM',
    location: 'Main Auditorium',
    coverImage: '/societies/campus-20.jpeg',
    description:
      'Welcome the new batch of students with campus tours, society booths, and introductory sessions from every active society on campus.',
    rsvpCount: 340,
    status: 'completed',
  },
  {
    id: 'inter-university-cricket-tournament',
    title: 'Inter-University Cricket Tournament',
    societyId: 'sports-guild-society',
    societyName: 'Sports Guild Society',
    date: '2026-11-20',
    time: '08:30 AM',
    location: 'Campus Cricket Ground',
    coverImage: '/societies/campus-08.webp',
    description:
      'Annual cricket tournament featuring teams from universities across Punjab. Three-day event with knockout rounds and a grand final.',
    rsvpCount: 180,
    status: 'upcoming',
  },
  {
    id: 'hackathon-devfest-2026',
    title: 'DevFest Hackathon 2026',
    societyId: 'google-developer-student-club',
    societyName: 'Google Developer Student Club',
    date: '2026-12-01',
    time: '10:00 AM',
    location: 'CS Lab Complex',
    coverImage: '/societies/campus-16.jpeg',
    description:
      '24-hour hackathon powered by Google technologies. Build, pitch, and win prizes for innovative solutions to real-world problems.',
    rsvpCount: 95,
    status: 'upcoming',
  },
  {
    id: 'symphonics-night-2026',
    title: 'Symphonics Musical Night',
    societyId: 'symphonics-fast-music-society',
    societyName: 'Symphonics',
    date: '2026-12-10',
    time: '06:00 PM',
    location: 'Open Air Theatre',
    coverImage: '/societies/campus-14.jpeg',
    description:
      'An evening of live music performances featuring classical instruments, modern vocals, and collaborative jam sessions.',
    rsvpCount: 210,
    status: 'upcoming',
  },
  {
    id: 'adventure-club-winter-trek',
    title: 'Winter Trek to Naran Valley',
    societyId: 'fast-adventure-club',
    societyName: 'FAST Adventure Club',
    date: '2026-12-20',
    time: '05:00 AM',
    location: 'Departure: Main Gate',
    coverImage: '/societies/campus-18.jpeg',
    description:
      '3-day winter trekking expedition to Naran Valley. Includes camping, bonfires, and mountain photography sessions.',
    rsvpCount: 42,
    status: 'upcoming',
  },
  {
    id: 'debate-championship-fall',
    title: 'Fall Parliamentary Debate Championship',
    societyId: 'bol-fast-debating-society',
    societyName: 'BOL-FAST Debating Society',
    date: '2026-11-25',
    time: '02:00 PM',
    location: 'Seminar Hall',
    coverImage: '/societies/campus-03.jpeg',
    description:
      'Competitive parliamentary-style debate tournament with teams from across the country. Cash prizes for top 3 teams.',
    rsvpCount: 75,
    status: 'upcoming',
  },
  {
    id: 'photography-exhibition',
    title: 'Lens & Light — Annual Photo Exhibition',
    societyId: 'fast-photography-society',
    societyName: 'FAST Photography Society',
    date: '2026-11-28',
    time: '11:00 AM',
    location: 'Gallery Block C',
    coverImage: '/societies/campus-13.jpeg',
    description:
      'Showcasing the best student photography from the past year. Categories: Portrait, Landscape, Street, and Abstract.',
    rsvpCount: 120,
    status: 'upcoming',
  },
  {
    id: 'dramocrats-stage-play',
    title: 'Stage Play: "Behind the Curtain"',
    societyId: 'dramocrats',
    societyName: 'DRAMOCRATS',
    date: '2026-12-05',
    time: '04:00 PM',
    location: 'Main Auditorium',
    coverImage: '/societies/campus-24.jpeg',
    description:
      'Original stage play written and performed entirely by FAST students. A dramatic exploration of campus life and ambition.',
    rsvpCount: 165,
    status: 'upcoming',
  },
];

export default events;

/**
 * Helper: Get upcoming events sorted by date.
 */
export function getUpcomingEvents(limit = null) {
  const upcoming = events
    .filter((e) => e.status === 'upcoming')
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return limit ? upcoming.slice(0, limit) : upcoming;
}

/**
 * Helper: Get event by ID.
 */
export function getEventById(id) {
  return events.find((e) => e.id === id) || null;
}

/**
 * Helper: Get events for a specific society.
 */
export function getEventsBySociety(societyId) {
  return events.filter((e) => e.societyId === societyId);
}
