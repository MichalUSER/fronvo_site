// ******************** //
// Interfaces for the updateProfileData event file.
// ******************** //

import type { FronvoError } from 'interfaces/socket/all';

export interface UpdateProfileDataParams {
    username?: string;
    bio?: string;
    avatar?: string;
}

export interface UpdateProfileDataResult extends FronvoError {}