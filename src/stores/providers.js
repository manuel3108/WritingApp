import { readable, writable } from 'svelte/store';
import * as googleApi from '../components/providers/google/Api.svelte'

export const name = writable(null);
export const api = writable(null);
export const apiLoaded = writable(null);
export const list = readable([
    {displayName: "Google", name: "google", api: googleApi}
]);
