// ******************** //
// Interfaces for the findCommunities event file.
// ******************** //

import type { FronvoError } from 'interfaces/socket/all';

export interface FindCommunitiesParams {
    name: string;
    maxResults?: string;
}

export interface FindCommunitiesResult extends FronvoError {
    findResults: string[];
}
