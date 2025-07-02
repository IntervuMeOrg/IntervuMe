export type UserProfile = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    bio: string;
    skills: string[];
    education: {
        degree: string;
        institution: string;
        year: string;
    }[];
    experience: { position: string; company: string; duration: string }[];
};