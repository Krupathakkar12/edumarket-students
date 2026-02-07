
interface BookListing {
    id: string;
    sellerId: string;
    sellerName: string;
    sellerEmail: string;
    sellerPhone?: string;
    sellerUPI?: string;
    title: string;
    author: string;
    subject: string;
    condition: 'New' | 'Like New' | 'Good' | 'Fair';
    price: number;
    description: string;
    images: string[]; // Base64 encoded images
    createdAt: string;
    sold: boolean;
}

const LISTINGS_KEY = 'edumarket_listings';

export const marketplaceService = {
    createListing: (listingData: Omit<BookListing, 'id' | 'createdAt' | 'sold'>): { success: boolean; error?: string } => {
        try {
            const listings: BookListing[] = JSON.parse(localStorage.getItem(LISTINGS_KEY) || '[]');

            const newListing: BookListing = {
                ...listingData,
                id: crypto.randomUUID(),
                createdAt: new Date().toISOString(),
                sold: false
            };

            listings.push(newListing);
            localStorage.setItem(LISTINGS_KEY, JSON.stringify(listings));

            return { success: true };
        } catch (error) {
            return { success: false, error: 'Failed to create listing' };
        }
    },

    getAllListings: (): BookListing[] => {
        try {
            const listings: BookListing[] = JSON.parse(localStorage.getItem(LISTINGS_KEY) || '[]');
            // Return only unsold listings newest first
            return listings.filter(l => !l.sold).sort((a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
        } catch {
            return [];
        }
    },

    getUserListings: (userId: string): BookListing[] => {
        try {
            const listings: BookListing[] = JSON.parse(localStorage.getItem(LISTINGS_KEY) || '[]');
            return listings
                .filter(l => l.sellerId === userId)
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        } catch {
            return [];
        }
    },

    updateListing: (id: string, updates: Partial<BookListing>): { success: boolean; error?: string } => {
        try {
            const listings: BookListing[] = JSON.parse(localStorage.getItem(LISTINGS_KEY) || '[]');
            const index = listings.findIndex(l => l.id === id);

            if (index === -1) {
                return { success: false, error: 'Listing not found' };
            }

            listings[index] = { ...listings[index], ...updates };
            localStorage.setItem(LISTINGS_KEY, JSON.stringify(listings));

            return { success: true };
        } catch (error) {
            return { success: false, error: 'Failed to update listing' };
        }
    },

    deleteListing: (id: string): { success: boolean; error?: string } => {
        try {
            const listings: BookListing[] = JSON.parse(localStorage.getItem(LISTINGS_KEY) || '[]');
            const filtered = listings.filter(l => l.id !== id);
            localStorage.setItem(LISTINGS_KEY, JSON.stringify(filtered));

            return { success: true };
        } catch (error) {
            return { success: false, error: 'Failed to delete listing' };
        }
    },

    markAsSold: (id: string): { success: boolean; error?: string } => {
        return marketplaceService.updateListing(id, { sold: true });
    },

    searchListings: (query: string): BookListing[] => {
        const listings = marketplaceService.getAllListings();
        const lowerQuery = query.toLowerCase();

        return listings.filter(listing =>
            listing.title.toLowerCase().includes(lowerQuery) ||
            listing.author.toLowerCase().includes(lowerQuery) ||
            listing.subject.toLowerCase().includes(lowerQuery) ||
            listing.description.toLowerCase().includes(lowerQuery)
        );
    }
};

export type { BookListing };
