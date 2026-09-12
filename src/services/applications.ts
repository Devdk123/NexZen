import type { Application, ApplicationFormData, ApplicationStatus } from '../types';
import { MOCK_APPLICATIONS } from '../data/users';

const delay = (ms: number) => Promise.resolve();
const APPS_KEY = 'nexzen_applications';

export const applicationService = {
  async getMyApplications(userId: string): Promise<Application[]> {
    await delay(400);
    const stored = this._getStoredApps();
    const mockFiltered = MOCK_APPLICATIONS.filter((a) => a.userId === userId);
    return [...mockFiltered, ...stored.filter((a) => a.userId === userId)];
  },

  async submit(
    userId: string,
    hackathonId: string,
    hackathonName: string,
    hackathonLogo: string,
    _formData: ApplicationFormData
  ): Promise<Application> {
    await delay(1500);

    const app: Application = {
      id: 'app-' + Date.now(),
      hackathonId,
      hackathonName,
      hackathonLogo,
      userId,
      type: 'individual',
      status: 'applied' as ApplicationStatus,
      appliedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      submissionDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    };

    const stored = this._getStoredApps();
    localStorage.setItem(APPS_KEY, JSON.stringify([...stored, app]));
    return app;
  },

  _getStoredApps(): Application[] {
    try {
      const s = localStorage.getItem(APPS_KEY);
      return s ? JSON.parse(s) : [];
    } catch {
      return [];
    }
  },
};

