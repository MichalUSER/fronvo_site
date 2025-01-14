// ******************** //
// Reusable functions for the app profile panel.
// ******************** //

import { userPosts } from 'stores/app/profile';
import { fetchPosts } from 'utilities/app/main';

export async function loadProfilePosts(targetProfile: string): Promise<void> {
    // Initial to 10 posts loaded
    userPosts.set((await fetchPosts(targetProfile, '0', '10'))?.reverse());
}
