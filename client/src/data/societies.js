/**
 * societies.js — Static dataset of all FAST-NUCES CFD campus societies.
 * Extracted from the official university website (cfd.nu.edu.pk/societies/).
 *
 * Each entry contains:
 *   - id: URL-safe slug for routing
 *   - name: Official society name
 *   - shortName: Abbreviated name / acronym
 *   - category: Classification for filtering
 *   - description: One-paragraph summary
 *   - founded: Year established (if known)
 *   - memberCount: Approximate active members
 *   - coverImage: Path to associated campus photo
 *   - color: Brand accent color for UI elements
 */

// Category constants for filtering
export const CATEGORIES = [
  { id: 'all', label: 'All Societies' },
  { id: 'tech', label: 'Tech' },
  { id: 'sports', label: 'Sports' },
  { id: 'media', label: 'Media' },
  { id: 'literary', label: 'Literary' },
  { id: 'arts', label: 'Performing Arts' },
  { id: 'community', label: 'Community' },
  { id: 'professional', label: 'Professional' },
  { id: 'finance', label: 'Finance' },
  { id: 'design', label: 'Design' },
];

const societies = [
  {
    id: 'software-engineering-society',
    name: 'Software Engineering Society',
    shortName: 'SES',
    category: 'tech',
    description:
      'The Software Engineering Society is an initiative aimed at bridging the gap between industry and academia in the field of software engineering. The society was created with the goal of providing students with practical exposure to real-world software development practices, tools, and methodologies.',
    founded: null,
    memberCount: 120,
    coverImage: '/societies/campus-06.jpeg',
    color: '#3b82f6',
  },
  {
    id: 'fast-english-club',
    name: 'FAST English Club',
    shortName: 'FEC',
    category: 'literary',
    description:
      'The club is a community of individuals who share a common goal: to improve their English language skills. We believe that learning English should be fun, engaging, and accessible for everyone.',
    founded: null,
    memberCount: 85,
    coverImage: '/societies/campus-02.jpeg',
    color: '#8b5cf6',
  },
  {
    id: 'fast-adventure-club',
    name: 'FAST Adventure Club',
    shortName: 'FAC',
    category: 'sports',
    description:
      'FAST Adventure Club is a symbol of adventure fulfillment at FAST CFD Campus. We organize trekking expeditions, camping trips, and outdoor adventures that push students beyond their comfort zones and build lasting friendships.',
    founded: null,
    memberCount: 95,
    coverImage: '/societies/campus-18.jpeg',
    color: '#059669',
  },
  {
    id: 'decentralized-asset-trading-society',
    name: 'Decentralized Asset Trading Society',
    shortName: 'DATS',
    category: 'finance',
    description:
      'The Decentralized Asset Trading Society (DATS) is a student-run organization established at FAST-NUCES CFD Campus in 2022. The primary objective of DATS is to provide students with knowledge and hands-on experience in cryptocurrency, blockchain technology, and decentralized finance.',
    founded: 2022,
    memberCount: 60,
    coverImage: '/societies/campus-22.jpeg',
    color: '#f59e0b',
  },
  {
    id: 'fast-videography-society',
    name: 'FAST Videography Society',
    shortName: 'FVS',
    category: 'media',
    description:
      'FVS specializes in creating high-quality video content and providing coverage for various university events. The society is dedicated to teaching the art of videography to its members, with a focus on cinematography, editing, and storytelling.',
    founded: null,
    memberCount: 70,
    coverImage: '/societies/campus-23.jpeg',
    color: '#ef4444',
  },
  {
    id: 'dramocrats',
    name: 'DRAMOCRATS',
    shortName: 'Dramocrats',
    category: 'arts',
    description:
      'Dramocrats society was launched in March 2016 with the aim to get the platform for students to explore their inner personas in acting, dancing, script writing, mime, stand-up comedy, and the performing arts.',
    founded: 2016,
    memberCount: 55,
    coverImage: '/societies/campus-24.jpeg',
    color: '#dc2626',
  },
  {
    id: 'bol-fast-debating-society',
    name: 'BOL-FAST Debating Society',
    shortName: 'BOL-FDS',
    category: 'literary',
    description:
      'BOL FAST Debating Society is one of the most successful, prestigious, and active societies of CFD Campus. BOL FAST Debating Society was formed in the year 2012 and since then it has been at the forefront of parliamentary debating and public speaking.',
    founded: 2012,
    memberCount: 100,
    coverImage: '/societies/campus-03.jpeg',
    color: '#7c3aed',
  },
  {
    id: 'symphonics-fast-music-society',
    name: 'Symphonics-FAST Music Society',
    shortName: 'Symphonics',
    category: 'arts',
    description:
      'Fast Symphonics Society is the amalgamation of vocalists and musicians amongst the student body of the campus. The society has a versatile group of students all having distinct musical skills, from classical instruments to modern vocals.',
    founded: null,
    memberCount: 45,
    coverImage: '/societies/campus-14.jpeg',
    color: '#ec4899',
  },
  {
    id: 'ieee-student-branch',
    name: 'IEEE Student Branch',
    shortName: 'IEEE',
    category: 'professional',
    description:
      "IEEE is the world's largest professional association. IEEE Student Branch (SB) strives to help students of their field. IEEE SB also aids students in bringing innovation to the industry through technical workshops, paper presentations, and networking events.",
    founded: null,
    memberCount: 110,
    coverImage: '/societies/campus-07.jpeg',
    color: '#0ea5e9',
  },
  {
    id: 'sports-guild-society',
    name: 'Sports Guild Society',
    shortName: 'SGS',
    category: 'sports',
    description:
      'Sports Guild Society was founded in 2012, holds the liabilities of all the sports events like Futsal, Cricket, Volleyball, Badminton, Basketball, Table Tennis, Carrom, Chess, Snooker and Ludo across campus.',
    founded: 2012,
    memberCount: 150,
    coverImage: '/societies/campus-08.webp',
    color: '#16a34a',
  },
  {
    id: 'silent-steps',
    name: 'Silent Steps',
    shortName: 'Silent Steps',
    category: 'community',
    description:
      'Silent Steps is a social welfare society working under the umbrella of FAST-NUCES CFD since 2015. Since its inception, the society has done several welfare projects focusing on education, healthcare, and community development.',
    founded: 2015,
    memberCount: 75,
    coverImage: '/societies/campus-29.jpeg',
    color: '#14b8a6',
  },
  {
    id: 'sukhan-fast-literary-society',
    name: 'Sukhan – FAST Literary Society',
    shortName: 'Sukhan-FLS',
    category: 'literary',
    description:
      'Sukhan Fast Literary Society is one of the earliest societies of FAST-NUCES Chiniot-Faisalabad Campus. The word "Sukhan" means "Discussion." Generally used in the context of literary discussions, poetry, and Urdu prose.',
    founded: null,
    memberCount: 65,
    coverImage: '/societies/campus-17.jpeg',
    color: '#a855f7',
  },
  {
    id: 'fast-goonj-society',
    name: 'FAST Goonj Society',
    shortName: 'Goonj',
    category: 'community',
    description:
      'FAST Goonj Society aims to provide a forum for those who want to serve humanity under the guidance of religion. We believe that Quran and Sunnah are the foundation for building a just and compassionate society.',
    founded: null,
    memberCount: 80,
    coverImage: '/societies/campus-28.jpeg',
    color: '#10b981',
  },
  {
    id: 'acm-student-chapter',
    name: 'ACM Student Chapter',
    shortName: 'ACM',
    category: 'professional',
    description:
      "The world's largest educational and scientific computing society, fostering knowledge, collaboration and innovation. ACM unites professionals, researchers, educators, and students to inspire dialogue and ideas that address the field's challenges.",
    founded: null,
    memberCount: 90,
    coverImage: '/societies/campus-11.jpeg',
    color: '#2563eb',
  },
  {
    id: 'google-developer-student-club',
    name: 'Google Developer Student Club',
    shortName: 'GDSC',
    category: 'tech',
    description:
      'Google Developer Students Clubs (GDSC) is a technical society and community powered by Google, Inc. We host workshops on Google technologies, organize hackathons, and build projects that solve real-world problems.',
    founded: null,
    memberCount: 130,
    coverImage: '/societies/campus-16.jpeg',
    color: '#4285f4',
  },
  {
    id: 'fast-photography-society',
    name: 'FAST Photography Society',
    shortName: 'FPS',
    category: 'media',
    description:
      'FAST Photography Society organizes activities like workshops, seminars, competitions based on the basic domain of media such as films, photography, videography. The society keeps on organizing different events and activities throughout the year.',
    founded: null,
    memberCount: 55,
    coverImage: '/societies/campus-13.jpeg',
    color: '#f97316',
  },
  {
    id: 'fast-club-of-app-development',
    name: 'FAST Club of App Development & Programming',
    shortName: 'FCAP',
    category: 'tech',
    description:
      'FAST Club of App and Development is a computing society that aims to polish the technical skills of the students with the help of workshops, seminars and programming competitions. FCAP bridges the gap between classroom learning and practical development.',
    founded: null,
    memberCount: 100,
    coverImage: '/societies/campus-04.jpeg',
    color: '#6366f1',
  },
  {
    id: 'fast-design-studios',
    name: 'FAST Design Studios',
    shortName: 'FDS',
    category: 'design',
    description:
      'FAST Design Studio is a graphic design & motion arts society of FAST-NU CFD. We provide an opportunity to the students of FAST to polish their designing skills and showcase their creative work through competitions and exhibitions.',
    founded: null,
    memberCount: 50,
    coverImage: '/societies/campus-12.jpeg',
    color: '#e11d48',
  },
];

export default societies;

/**
 * Helper: Get a single society by its slug ID.
 */
export function getSocietyById(id) {
  return societies.find((s) => s.id === id) || null;
}

/**
 * Helper: Filter societies by category.
 */
export function filterSocieties(categoryId, searchQuery = '') {
  let filtered = societies;

  if (categoryId && categoryId !== 'all') {
    filtered = filtered.filter((s) => s.category === categoryId);
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.shortName.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
    );
  }

  return filtered;
}
