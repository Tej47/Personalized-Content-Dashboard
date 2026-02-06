// Used to convert the category in user's preference to Genre ID for TMDB Api

export const CATEGORY_TO_GENRE: Record<string, string> = {
    technology: "878",    // Science Fiction
    business: "99",       // Documentary 
    sports: "10770",      // TV Movie
    entertainment: "35",  // Comedy
    health: "18",         // Drama
    science: "878",       // Science Fiction
    general: ""           // No filter
};