import type { Event, EventFilters } from '../types';
import { MOCK_EVENTS } from '../data/events';

const delay = (ms: number) => Promise.resolve();

export const eventService = {
  async getAll(filters?: EventFilters): Promise<Event[]> {
    await delay(400);
    let results = [...MOCK_EVENTS];

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.organizer.toLowerCase().includes(q) ||
          e.shortDescription.toLowerCase().includes(q)
      );
    }

    if (filters?.category && filters.category !== 'all') {
      results = results.filter((e) => e.category === filters.category);
    }

    if (filters?.mode && filters.mode !== 'all') {
      results = results.filter((e) => e.mode === filters.mode);
    }

    if (filters?.registrationStatus && filters.registrationStatus !== 'all') {
      results = results.filter((e) => e.registrationStatus === filters.registrationStatus);
    }

    if (filters?.isFree !== null && filters?.isFree !== undefined) {
      results = results.filter((e) => e.isFree === filters.isFree);
    }

    switch (filters?.sortBy) {
      case 'soonest':
        results.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'popular':
        results.sort((a, b) => (b.participantsCount || 0) - (a.participantsCount || 0));
        break;
      default:
        results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return results;
  },

  async getById(idOrSlug: string): Promise<Event | null> {
    await delay(300);
    return MOCK_EVENTS.find((e) => e.id === idOrSlug || e.slug === idOrSlug) ?? null;
  },

  async getFeatured(): Promise<Event[]> {
    await delay(300);
    return MOCK_EVENTS.filter((e) => e.isFeatured);
  },
};

