import { writable } from 'svelte/store';

export const name = writable('Name');
export const givenName = writable('GivenName');
export const email = writable('email');
export const proilePictureUrl = writable(undefined);