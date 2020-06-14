import { writable } from 'svelte/store';

export const documentId = writable(localStorage.getItem("documentId"));
documentId.subscribe(value => {
    localStorage.setItem("documentId", value);
});

export const strokes = writable([]);
