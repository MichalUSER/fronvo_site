// ******************** //
// Interfaces for the register event file.
// ******************** //

import type { FronvoError } from 'interfaces/socket/all';

export interface RegisterParams {
    email: string;
    password: string;
}

export interface RegisterResult extends FronvoError {}
