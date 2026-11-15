import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { connectDB, disconnectDB } from '../config/db.js';
import User from '../models/User.js';
import Society from '../models/Society.js';
import Event from '../models/Event.js';
import JoinRequest from '../models/JoinRequest.js';
import RSVP from '../models/RSVP.js';
import Announcement from '../models/Announcement.js';

export const initialSocieties = [
  {
    name: 'Software Engineering Society',
    slug: 'software-engineering-society',
    shortName: 'SES',
    category: 'tech',
    description:
      'The Software Engineering Society is an initiative aimed at bridging the gap between industry and academia in the field of software engineering. The society was created with the goal of providing students with practical exposure to real-world software development practices, tools, and methodologies.',
    memberCount: 120,
    coverImage: '/societies/campus-06.jpeg',
    gallery: [
      '/societies/campus-06.jpeg',
      '/societies/campus-01.webp',
      '/societies/campus-11.jpeg',
      '/societies/campus-16.jpeg',
      '/societies/campus-21.jpeg',
    ],
    color: '#3b82f6',
  },
  {
    name: 'FAST English Club',
    slug: 'fast-english-club',
    shortName: 'FEC',
    category: 'literary',
    description:
      'The club is a community of individuals who share a common goal: to improve their English language skills. We believe that learning English should be fun, engaging, and accessible for everyone.',
    memberCount: 85,
    coverImage: '/societies/campus-02.jpeg',
    gallery: [
      '/societies/campus-02.jpeg',
      '/societies/campus-05.jpeg',
      '/societies/campus-17.jpeg',
      '/societies/campus-27.webp',
      '/societies/campus-28.jpeg',
    ],
    color: '#8b5cf6',
  },
  {
    name: 'FAST Adventure Club',
    slug: 'fast-adventure-club',
    shortName: 'FAC',
    category: 'sports',
    description:
      'FAST Adventure Club is a symbol of adventure fulfillment at FAST CFD Campus. We organize trekking expeditions, camping trips, and outdoor adventures that push students beyond their comfort zones and build lasting friendships.',
    memberCount: 95,
    coverImage: '/societies/campus-18.jpeg',
    gallery: [
      '/societies/campus-18.jpeg',
      '/societies/campus-19.jpeg',
      '/societies/campus-26.webp',
      '/societies/campus-10.webp',
      '/societies/campus-25.jpeg',
    ],
    color: '#059669',
  },
  {
    name: 'Decentralized Asset Trading Society',
    slug: 'decentralized-asset-trading-society',
    shortName: 'DATS',
    category: 'finance',
    description:
      'The Decentralized Asset Trading Society (DATS) is a student-run organization established at FAST-NUCES CFD Campus in 2022. The primary objective of DATS is to provide students with knowledge and hands-on experience in cryptocurrency, blockchain technology, and decentralized finance.',
    founded: 2022,
    memberCount: 60,
    coverImage: '/societies/campus-22.jpeg',
    gallery: [
      '/societies/campus-22.jpeg',
      '/societies/campus-09.webp',
      '/societies/campus-15.jpeg',
      '/societies/campus-06.jpeg',
      '/societies/campus-20.jpeg',
    ],
    color: '#f59e0b',
  },
  {
    name: 'FAST Videography Society',
    slug: 'fast-videography-society',
    shortName: 'FVS',
    category: 'media',
    description:
      'FVS specializes in creating high-quality video content and providing coverage for various university events. The society is dedicated to teaching the art of videography to its members, with a focus on cinematography, editing, and storytelling.',
    memberCount: 70,
    coverImage: '/societies/campus-23.jpeg',
    gallery: [
      '/societies/campus-23.jpeg',
      '/societies/campus-13.jpeg',
      '/societies/campus-14.jpeg',
      '/societies/campus-24.jpeg',
      '/societies/campus-07.jpeg',
    ],
    color: '#ef4444',
  },
  {
    name: 'DRAMOCRATS',
    slug: 'dramocrats',
    shortName: 'Dramocrats',
    category: 'arts',
    description:
      'Dramocrats society was launched in March 2016 with the aim to get the platform for students to explore their inner personas in acting, dancing, script writing, mime, stand-up comedy, and the performing arts.',
    founded: 2016,
    memberCount: 55,
    coverImage: '/societies/campus-24.jpeg',
    gallery: [
      '/societies/campus-24.jpeg',
      '/societies/campus-14.jpeg',
      '/societies/campus-23.jpeg',
      '/societies/campus-20.jpeg',
      '/societies/campus-02.jpeg',
    ],
    color: '#dc2626',
  },
  {
    name: 'BOL-FAST Debating Society',
    slug: 'bol-fast-debating-society',
    shortName: 'BOL-FDS',
    category: 'literary',
    description:
      'BOL FAST Debating Society is one of the most successful, prestigious, and active societies of CFD Campus. BOL FAST Debating Society was formed in the year 2012 and since then it has been at the forefront of parliamentary debating and public speaking.',
    founded: 2012,
    memberCount: 100,
    coverImage: '/societies/campus-03.jpeg',
    gallery: [
      '/societies/campus-03.jpeg',
      '/societies/campus-17.jpeg',
      '/societies/campus-28.jpeg',
      '/societies/campus-29.jpeg',
      '/societies/campus-01.webp',
    ],
    color: '#7c3aed',
  },
  {
    name: 'Symphonics-FAST Music Society',
    slug: 'symphonics-fast-music-society',
    shortName: 'Symphonics',
    category: 'arts',
    description:
      'Fast Symphonics Society is the amalgamation of vocalists and musicians amongst the student body of the campus. The society has a versatile group of students all having distinct musical skills, from classical instruments to modern vocals.',
    memberCount: 45,
    coverImage: '/societies/campus-14.jpeg',
    gallery: [
      '/societies/campus-14.jpeg',
      '/societies/campus-24.jpeg',
      '/societies/campus-23.jpeg',
      '/societies/campus-20.jpeg',
      '/societies/campus-13.jpeg',
    ],
    color: '#ec4899',
  },
  {
    name: 'IEEE Student Branch',
    slug: 'ieee-student-branch',
    shortName: 'IEEE',
    category: 'professional',
    description:
      "IEEE is the world's largest professional association. IEEE Student Branch (SB) strives to help students of their field. IEEE SB also aids students in bringing innovation to the industry through technical workshops, paper presentations, and networking events.",
    memberCount: 110,
    coverImage: '/societies/campus-07.jpeg',
    gallery: [
      '/societies/campus-07.jpeg',
      '/societies/campus-11.jpeg',
      '/societies/campus-16.jpeg',
      '/societies/campus-04.jpeg',
      '/societies/campus-06.jpeg',
    ],
    color: '#0ea5e9',
  },
  {
    name: 'Sports Guild Society',
    slug: 'sports-guild-society',
    shortName: 'SGS',
    category: 'sports',
    description:
      'Sports Guild Society was founded in 2012, holds the liabilities of all the sports events like Futsal, Cricket, Volleyball, Badminton, Basketball, Table Tennis, Carrom, Chess, Snooker and Ludo across campus.',
    founded: 2012,
    memberCount: 150,
    coverImage: '/societies/campus-08.webp',
    gallery: [
      '/societies/campus-08.webp',
      '/societies/campus-10.webp',
      '/societies/campus-25.jpeg',
      '/societies/campus-19.jpeg',
      '/societies/campus-18.jpeg',
    ],
    color: '#16a34a',
  },
  {
    name: 'Silent Steps',
    slug: 'silent-steps',
    shortName: 'Silent Steps',
    category: 'community',
    description:
      'Silent Steps is a social welfare society working under the umbrella of FAST-NUCES CFD since 2015. Since its inception, the society has done several welfare projects focusing on education, healthcare, and community development.',
    founded: 2015,
    memberCount: 75,
    coverImage: '/societies/campus-29.jpeg',
    gallery: [
      '/societies/campus-29.jpeg',
      '/societies/campus-28.jpeg',
      '/societies/campus-27.webp',
      '/societies/campus-05.jpeg',
      '/societies/campus-03.jpeg',
    ],
    color: '#14b8a6',
  },
  {
    name: 'Sukhan – FAST Literary Society',
    slug: 'sukhan-fast-literary-society',
    shortName: 'Sukhan-FLS',
    category: 'literary',
    description:
      'Sukhan Fast Literary Society is one of the earliest societies of FAST-NUCES Chiniot-Faisalabad Campus. The word "Sukhan" means "Discussion." Generally used in the context of literary discussions, poetry, and Urdu prose.',
    memberCount: 65,
    coverImage: '/societies/campus-17.jpeg',
    gallery: [
      '/societies/campus-17.jpeg',
      '/societies/campus-02.jpeg',
      '/societies/campus-03.jpeg',
      '/societies/campus-28.jpeg',
      '/societies/campus-29.jpeg',
    ],
    color: '#a855f7',
  },
  {
    name: 'FAST Goonj Society',
    slug: 'fast-goonj-society',
    shortName: 'Goonj',
    category: 'community',
    description:
      'FAST Goonj Society aims to provide a forum for those who want to serve humanity under the guidance of religion. We believe that Quran and Sunnah are the foundation for building a just and compassionate society.',
    memberCount: 80,
    coverImage: '/societies/campus-28.jpeg',
    gallery: [
      '/societies/campus-28.jpeg',
      '/societies/campus-29.jpeg',
      '/societies/campus-27.webp',
      '/societies/campus-05.jpeg',
      '/societies/campus-20.jpeg',
    ],
    color: '#10b981',
  },
  {
    name: 'ACM Student Chapter',
    slug: 'acm-student-chapter',
    shortName: 'ACM',
    category: 'professional',
    description:
      "The world's largest educational and scientific computing society, fostering knowledge, collaboration and innovation. ACM unites professionals, researchers, educators, and students to inspire dialogue and ideas that address the field's challenges.",
    memberCount: 90,
    coverImage: '/societies/campus-11.jpeg',
    gallery: [
      '/societies/campus-11.jpeg',
      '/societies/campus-07.jpeg',
      '/societies/campus-16.jpeg',
      '/societies/campus-04.jpeg',
      '/societies/campus-06.jpeg',
    ],
    color: '#2563eb',
  },
  {
    name: 'Google Developer Student Club',
    slug: 'google-developer-student-club',
    shortName: 'GDSC',
    category: 'tech',
    description:
      'Google Developer Students Clubs (GDSC) is a technical society and community powered by Google, Inc. We host workshops on Google technologies, organize hackathons, and build projects that solve real-world problems.',
    memberCount: 130,
    coverImage: '/societies/campus-16.jpeg',
    gallery: [
      '/societies/campus-16.jpeg',
      '/societies/campus-04.jpeg',
      '/societies/campus-11.jpeg',
      '/societies/campus-06.jpeg',
      '/societies/campus-07.jpeg',
    ],
    color: '#4285f4',
  },
  {
    name: 'FAST Photography Society',
    slug: 'fast-photography-society',
    shortName: 'FPS',
    category: 'media',
    description:
      'FAST Photography Society organizes activities like workshops, seminars, competitions based on the basic domain of media such as films, photography, videography. The society keeps on organizing different events and activities throughout the year.',
    memberCount: 55,
    coverImage: '/societies/campus-13.jpeg',
    gallery: [
      '/societies/campus-13.jpeg',
      '/societies/campus-23.jpeg',
      '/societies/campus-14.jpeg',
      '/societies/campus-24.jpeg',
      '/societies/campus-18.jpeg',
    ],
    color: '#f97316',
  },
  {
    name: 'FAST Club of App Development & Programming',
    slug: 'fast-club-of-app-development',
    shortName: 'FCAP',
    category: 'tech',
    description:
      'FAST Club of App and Development is a computing society that aims to polish the technical skills of the students with the help of workshops, seminars and programming competitions. FCAP bridges the gap between classroom learning and practical development.',
    memberCount: 100,
    coverImage: '/societies/campus-04.jpeg',
    gallery: [
      '/societies/campus-04.jpeg',
      '/societies/campus-16.jpeg',
      '/societies/campus-06.jpeg',
      '/societies/campus-11.jpeg',
      '/societies/campus-21.jpeg',
    ],
    color: '#6366f1',
  },
  {
    name: 'FAST Design Studios',
    slug: 'fast-design-studios',
    shortName: 'FDS',
    category: 'design',
    description:
      'FAST Design Studio is a graphic design & motion arts society of FAST-NU CFD. We provide an opportunity to the students of FAST to polish their designing skills and showcase their creative work through competitions and exhibitions.',
    memberCount: 50,
    coverImage: '/societies/campus-12.jpeg',
    gallery: [
      '/societies/campus-12.jpeg',
      '/societies/campus-13.jpeg',
      '/societies/campus-23.jpeg',
      '/societies/campus-24.jpeg',
      '/societies/campus-14.jpeg',
    ],
    color: '#e11d48',
  },
];

export const initialEvents = [
  {
    title: 'Orientation Week 2026',
    slug: 'orientation-week-2026',
    societySlug: null,
    date: new Date('2026-09-15'),
    time: '09:00 AM',
    location: 'Main Auditorium',
    coverImage: '/societies/campus-20.jpeg',
    description:
      'Welcome the new batch of students with campus tours, society booths, and introductory sessions from every active society on campus.',
    rsvpCount: 340,
    status: 'completed',
  },
  {
    title: 'Inter-University Cricket Tournament',
    slug: 'inter-university-cricket-tournament',
    societySlug: 'sports-guild-society',
    date: new Date('2026-11-20'),
    time: '08:30 AM',
    location: 'Campus Cricket Ground',
    coverImage: '/societies/campus-08.webp',
    description:
      'Annual cricket tournament featuring teams from universities across Punjab. Three-day event with knockout rounds and a grand final.',
    rsvpCount: 180,
    status: 'upcoming',
  },
  {
    title: 'DevFest Hackathon 2026',
    slug: 'hackathon-devfest-2026',
    societySlug: 'google-developer-student-club',
    date: new Date('2026-12-01'),
    time: '10:00 AM',
    location: 'CS Lab Complex',
    coverImage: '/societies/campus-16.jpeg',
    description:
      '24-hour hackathon powered by Google technologies. Build, pitch, and win prizes for innovative solutions to real-world problems.',
    rsvpCount: 95,
    status: 'upcoming',
  },
  {
    title: 'Symphonics Musical Night',
    slug: 'symphonics-night-2026',
    societySlug: 'symphonics-fast-music-society',
    date: new Date('2026-12-10'),
    time: '06:00 PM',
    location: 'Open Air Theatre',
    coverImage: '/societies/campus-14.jpeg',
    description:
      'An evening of live music performances featuring classical instruments, modern vocals, and collaborative jam sessions.',
    rsvpCount: 210,
    status: 'upcoming',
  },
  {
    title: 'Winter Trek to Naran Valley',
    slug: 'adventure-club-winter-trek',
    societySlug: 'fast-adventure-club',
    date: new Date('2026-12-20'),
    time: '05:00 AM',
    location: 'Departure: Main Gate',
    coverImage: '/societies/campus-18.jpeg',
    description:
      '3-day winter trekking expedition to Naran Valley. Includes camping, bonfires, and mountain photography sessions.',
    rsvpCount: 42,
    status: 'upcoming',
  },
  {
    title: 'Fall Parliamentary Debate Championship',
    slug: 'debate-championship-fall',
    societySlug: 'bol-fast-debating-society',
    date: new Date('2026-11-25'),
    time: '02:00 PM',
    location: 'Seminar Hall',
    coverImage: '/societies/campus-03.jpeg',
    description:
      'Competitive parliamentary-style debate tournament with teams from across the country. Cash prizes for top 3 teams.',
    rsvpCount: 75,
    status: 'upcoming',
  },
  {
    title: 'Lens & Light — Annual Photo Exhibition',
    slug: 'photography-exhibition',
    societySlug: 'fast-photography-society',
    date: new Date('2026-11-28'),
    time: '11:00 AM',
    location: 'Gallery Block C',
    coverImage: '/societies/campus-13.jpeg',
    description:
      'Showcasing the best student photography from the past year. Categories: Portrait, Landscape, Street, and Abstract.',
    rsvpCount: 120,
    status: 'upcoming',
  },
  {
    title: 'Stage Play: "Behind the Curtain"',
    slug: 'dramocrats-stage-play',
    societySlug: 'dramocrats',
    date: new Date('2026-12-05'),
    time: '04:00 PM',
    location: 'Main Auditorium',
    coverImage: '/societies/campus-24.jpeg',
    description:
      'Original stage play written and performed entirely by FAST students. A dramatic exploration of campus life and ambition.',
    rsvpCount: 165,
    status: 'upcoming',
  },
];

export const seedDatabase = async (disconnectAtEnd = true) => {
  try {
    // 1. Seed Core Administrative Users
    console.log('[Seed] Seeding foundational users...');
    const adminUser = await User.create({
      fullName: 'University Super Admin',
      rollNo: '00A-0000',
      email: 'admin@cfd.nu.edu.pk',
      password: 'Password123!',
      department: 'BSCS',
      semester: '8th',
      role: 'admin',
    });

    const presidentUser = await User.create({
      fullName: 'Hamza Tariq (President)',
      rollNo: '22F-0101',
      email: 'president@cfd.nu.edu.pk',
      password: 'Password123!',
      department: 'BSSE',
      semester: '7th',
      role: 'president',
    });

    const studentUser = await User.create({
      fullName: 'Muhammad Ahmed',
      rollNo: '24F-0646',
      email: 'student@cfd.nu.edu.pk',
      password: 'Password123!',
      department: 'BSCS',
      semester: '1st',
      role: 'student',
    });

    // 2. Seed Societies
    console.log('[Seed] Seeding 18 chartered societies...');
    const createdSocieties = [];
    for (const soc of initialSocieties) {
      const isSES = soc.slug === 'software-engineering-society';
      const createdSoc = await Society.create({
        ...soc,
        president: isSES ? presidentUser._id : null,
        members: isSES ? [presidentUser._id, studentUser._id] : [],
      });
      createdSocieties.push(createdSoc);
    }

    // Update user memberships
    await User.findByIdAndUpdate(presidentUser._id, {
      $addToSet: { societies: createdSocieties[0]._id },
    });
    await User.findByIdAndUpdate(studentUser._id, {
      $addToSet: { societies: createdSocieties[0]._id },
    });

    // 3. Seed Events
    console.log('[Seed] Seeding campus fixtures and events...');
    for (const evt of initialEvents) {
      let societyId = null;
      if (evt.societySlug) {
        const foundSoc = createdSocieties.find((s) => s.slug === evt.societySlug);
        if (foundSoc) societyId = foundSoc._id;
      }

      await Event.create({
        title: evt.title,
        slug: evt.slug,
        society: societyId,
        date: evt.date,
        time: evt.time,
        location: evt.location,
        coverImage: evt.coverImage,
        description: evt.description,
        rsvpCount: evt.rsvpCount,
        status: evt.status,
        createdBy: adminUser._id,
      });
    }

    console.log('\n=========================================');
    console.log('✅ DATABASE SEEDING COMPLETED SUCCESSFULLY');
    console.log('=========================================');
    console.log('Seed Credentials for Testing:');
    console.log('  Admin:     admin@cfd.nu.edu.pk     / Password123!');
    console.log('  President: president@cfd.nu.edu.pk / Password123!');
    console.log('  Student:   student@cfd.nu.edu.pk   / Password123!');
    console.log('=========================================\n');
  } catch (err) {
    console.error(`[Seed] Seeding failed: ${err.message}`);
    throw err;
  } finally {
    if (disconnectAtEnd) {
      await disconnectDB();
    }
  }
};

// Execute if run directly via CLI
if (process.argv[1]?.endsWith('seedData.js')) {
  (async () => {
    await connectDB();
    await Promise.all([
      User.deleteMany({}),
      Society.deleteMany({}),
      Event.deleteMany({}),
      JoinRequest.deleteMany({}),
      RSVP.deleteMany({}),
      Announcement.deleteMany({}),
    ]);
    await seedDatabase(true);
  })();
}
