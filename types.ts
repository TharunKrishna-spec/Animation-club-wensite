export interface Project {
  id: number;
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
}

export interface Department {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  bannerImage: string;
  teamPhotos: string[];
  projects: Project[];
}

export interface PastEvent {
  id: number;
  title: string;
  description: string;
  images: string[];
}

export interface UpcomingEvent {
  id: number;
  title: string;
  date: string;
  details: { icon: string; text: string }[];
}

export interface Lead {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
  achievements: string[];
  socials: {
    instagram: string;
    linkedin: string;
  };
}

export interface User {
  name: string;
  email: string;
  picture: string;
  given_name?: string;
  family_name?: string;
}