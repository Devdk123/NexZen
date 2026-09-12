import type { Hackathon, HackathonFilters } from '../types';
import { MOCK_HACKATHONS } from '../data/hackathons';

const delay = (ms: number) => Promise.resolve();
const SAVED_KEY = 'nexzen_saved_hackathons';

export const hackathonService = {
  /**
   * Get all hackathons with optional filters.
   * TODO: Replace with: GET /api/hackathons?filters
   */
  async getAll(filters?: HackathonFilters): Promise<Hackathon[]> {
    await delay(400);
    let results = [...MOCK_HACKATHONS];

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        (h) =>
          h.name.toLowerCase().includes(q) ||
          h.organizer.toLowerCase().includes(q) ||
          h.shortDescription.toLowerCase().includes(q) ||
          h.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (filters?.domains && filters.domains.length > 0) {
      results = results.filter((h) =>
        filters.domains!.some((d) => h.domains.includes(d))
      );
    }

    if (filters?.mode && filters.mode !== 'all') {
      results = results.filter((h) => h.mode === filters.mode);
    }

    if (filters?.difficulty && filters.difficulty !== 'all') {
      results = results.filter((h) => h.difficulty === filters.difficulty);
    }

    if (filters?.registrationStatus && filters.registrationStatus !== 'all') {
      results = results.filter((h) => h.registrationStatus === filters.registrationStatus);
    }

    // Sort
    switch (filters?.sortBy) {
      case 'newest':
        results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'deadline':
        results.sort((a, b) => new Date(a.registrationDeadline).getTime() - new Date(b.registrationDeadline).getTime());
        break;
      case 'prize':
        results.sort((a, b) => {
          const pa = parseInt(a.prizePool.replace(/[^\d]/g, '')) || 0;
          const pb = parseInt(b.prizePool.replace(/[^\d]/g, '')) || 0;
          return pb - pa;
        });
        break;
      case 'popular':
        results.sort((a, b) => (b.participantsCount || 0) - (a.participantsCount || 0));
        break;
      default:
        results.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return results;
  },

  /**
   * Get a single hackathon by ID or slug.
   * TODO: Replace with: GET /api/hackathons/:idOrSlug
   */
  async getById(idOrSlug: string): Promise<Hackathon | null> {
    await delay(300);
    return MOCK_HACKATHONS.find((h) => h.id === idOrSlug || h.slug === idOrSlug) ?? null;
  },

  /**
   * Get featured hackathons.
   * TODO: Replace with: GET /api/hackathons?featured=true
   */
  async getFeatured(): Promise<Hackathon[]> {
    await delay(300);
    return MOCK_HACKATHONS.filter((h) => h.isFeatured);
  },

  // ─── Saved / Bookmarks ────────────────────────────────
  getSavedIds(): string[] {
    try {
      const stored = localStorage.getItem(SAVED_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  saveHackathon(id: string): void {
    const ids = this.getSavedIds();
    if (!ids.includes(id)) {
      localStorage.setItem(SAVED_KEY, JSON.stringify([...ids, id]));
    }
  },

  unsaveHackathon(id: string): void {
    const ids = this.getSavedIds().filter((i) => i !== id);
    localStorage.setItem(SAVED_KEY, JSON.stringify(ids));
  },

  isSaved(id: string): boolean {
    return this.getSavedIds().includes(id);
  },

  async getSavedHackathons(): Promise<Hackathon[]> {
    const ids = this.getSavedIds();
    return MOCK_HACKATHONS.filter((h) => ids.includes(h.id));
  },
};

