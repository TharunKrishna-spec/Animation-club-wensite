import { Department, PastEvent, UpcomingEvent, Lead } from '../types';

export const departments: Department[] = [
  {
    id: 'camera',
    name: 'Camera',
    description: 'Capturing moments, telling stories through the lens.',
    longDescription: 'The Camera Department is the backbone of our visual storytelling. We handle everything from cinematography and photography for club events to creating stunning visual effects and motion graphics. Our members are trained in professional camera operation, lighting techniques, and post-production editing.',
    bannerImage: 'https://picsum.photos/1200/400?random=1',
    teamPhotos: ['https://picsum.photos/600/400?random=2', 'https://picsum.photos/600/400?random=3', 'https://picsum.photos/600/400?random=4'],
    projects: [
      { id: 1, title: 'Campus Tour Hyperlapse', description: 'A fast-paced hyperlapse video showcasing the VITC campus.', mediaUrl: 'https://picsum.photos/800/600?random=31', mediaType: 'image' },
      { id: 2, title: 'Event Coverage: Animathon 2023', description: 'Official aftermovie for our flagship event.', mediaUrl: 'https://picsum.photos/800/600?random=32', mediaType: 'image' },
    ],
  },
  {
    id: '2d-animation',
    name: '2D Animation',
    description: 'Bringing drawings to life with classic animation techniques.',
    longDescription: 'In the 2D Animation department, we cherish the art of traditional and digital frame-by-frame animation. We explore character design, storyboarding, and creating fluid motion. From charming cartoons to expressive motion comics, our artists push the boundaries of 2D storytelling.',
    bannerImage: 'https://picsum.photos/1200/400?random=5',
    teamPhotos: ['https://picsum.photos/600/400?random=6', 'https://picsum.photos/600/400?random=7', 'https://picsum.photos/600/400?random=8'],
    projects: [
      { id: 1, title: 'The Lost Star', description: 'A short, hand-drawn animated film about a star finding its way home.', mediaUrl: 'https://picsum.photos/800/600?random=33', mediaType: 'image' },
      { id: 2, title: 'Club Mascot Expressions', description: 'A series of animated stickers for our club mascot.', mediaUrl: 'https://picsum.photos/800/600?random=34', mediaType: 'image' },
    ],
  },
  {
    id: '3d-animation',
    name: '3D Animation',
    description: 'Crafting immersive worlds and characters in three dimensions.',
    longDescription: 'The 3D Animation department dives into the world of computer-generated imagery. Members learn modeling, texturing, rigging, and animating 3D assets. We create everything from realistic product visualizations to fantastical character animations for short films and games.',
    bannerImage: 'https://picsum.photos/1200/400?random=9',
    teamPhotos: ['https://picsum.photos/600/400?random=10', 'https://picsum.photos/600/400?random=11', 'https://picsum.photos/600/400?random=12'],
    projects: [
      { id: 1, title: 'Cyberpunk Alley', description: 'A detailed 3D environment scene rendered in Blender.', mediaUrl: 'https://picsum.photos/800/600?random=35', mediaType: 'image' },
      { id: 2, title: 'Mechanical Walker', description: 'A fully rigged and animated 3D robot model.', mediaUrl: 'https://picsum.photos/800/600?random=36', mediaType: 'image' },
    ],
  },
  {
    id: 'event-management',
    name: 'Event Management',
    description: 'Organizing workshops, competitions, and unforgettable experiences.',
    longDescription: 'The Event Management team is the driving force behind our club\'s activities. They plan and execute workshops, guest lectures, animation competitions, and social gatherings. This department ensures everything runs smoothly, creating a vibrant and engaging community for all members.',
    bannerImage: 'https://picsum.photos/1200/400?random=13',
    teamPhotos: ['https://picsum.photos/600/400?random=14', 'https://picsum.photos/600/400?random=15', 'https://picsum.photos/600/400?random=16'],
    projects: [
       { id: 1, title: 'Animathon 2023 Planning', description: 'Successful execution of our largest 24-hour event.', mediaUrl: 'https://picsum.photos/800/600?random=37', mediaType: 'image' },
       { id: 2, title: 'Industry Connect Series', description: 'Organized a series of talks with industry professionals.', mediaUrl: 'https://picsum.photos/800/600?random=38', mediaType: 'image' },
    ],
  },
];

export const pastEvents: PastEvent[] = [
  { id: 1, title: 'Animathon 2023', description: 'A 24-hour animation challenge where teams competed to create short animated films from scratch. It was a marathon of creativity, collaboration, and very little sleep!', images: ['https://picsum.photos/400/300?random=17', 'https://picsum.photos/400/300?random=18', 'https://picsum.photos/400/300?random=39'] },
  { id: 2, title: 'VFX Workshop', description: 'An intensive workshop where members learned the fundamentals of visual effects using Adobe After Effects, guided by industry experts.', images: ['https://picsum.photos/400/300?random=19', 'https://picsum.photos/400/300?random=20'] },
  { id: 3, title: 'Character Design Fest', description: 'A week-long festival celebrating character creation, featuring daily prompts, guest artist reviews, and a final showcase of all the amazing characters designed.', images: ['https://picsum.photos/400/300?random=21', 'https://picsum.photos/400/300?random=22', 'https://picsum.photos/400/300?random=40'] },
  { id: 4, title: 'Claymation Day', description: 'A fun, hands-on workshop on the art of stop-motion animation using clay. Members got to create their own short, quirky animations.', images: ['https://picsum.photos/400/300?random=23', 'https://picsum.photos/400/300?random=24'] },
  { id: 5, title: 'Industry Talk Series', description: 'An inspiring series of talks where professionals from studios like Pixar and DreamWorks shared their journey, insights, and advice with our members.', images: ['https://picsum.photos/400/300?random=25', 'https://picsum.photos/400/300?random=26'] },
];

export const upcomingEvents: UpcomingEvent[] = [
  { id: 1, title: 'Annual Showcase', date: 'Dec 15, 2024', details: [{ icon: '🏆', text: 'Awards Ceremony' }, { icon: '🎬', text: 'Film Screenings' }, { icon: '🤝', text: 'Networking' }] },
  { id: 2, title: 'Blender Bootcamp', date: 'Jan 10, 2025', details: [{ icon: '💻', text: '3D Modeling Intro' }, { icon: '🎨', text: 'Texturing Basics' }, { icon: '🏃‍♂️', text: 'Animation Principles' }] },
  { id: 3, title: 'Scriptwriting Seminar', date: 'Feb 05, 2025', details: [{ icon: '📖', text: 'Story Structure' }, { icon: '🗣️', text: 'Dialogue Crafting' }, { icon: '📝', text: 'Pitching Ideas' }] },
];

export const leads: Lead[] = [
  { id: 1, name: 'Alex Johnson', role: 'President', imageUrl: 'https://picsum.photos/400/400?random=27', achievements: ['Winner, National Animathon', 'Guest Speaker at Comic Con'], socials: { instagram: '#', linkedin: '#' } },
  { id: 2, name: 'Brenda Smith', role: 'Vice President', imageUrl: 'https://picsum.photos/400/400?random=28', achievements: ['Managed 10+ successful events', 'Secured industry partnerships'], socials: { instagram: '#', linkedin: '#' } },
  { id: 3, name: 'Charlie Brown', role: '3D Animation Head', imageUrl: 'https://picsum.photos/400/400?random=29', achievements: ['Short film featured in SIGGRAPH', 'Expert in photorealistic rendering'], socials: { instagram: '#', linkedin: '#' } },
  { id: 4, name: 'Diana Prince', role: '2D Animation Head', imageUrl: 'https://picsum.photos/400/400?random=30', achievements: ['Best Character Design Award 2023', 'Mentor for aspiring animators'], socials: { instagram: '#', linkedin: '#' } },
];
