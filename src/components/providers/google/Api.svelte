<script context="module">
    import loadjs from 'loadjs';
    import { name, givenName, email, proilePictureUrl } from '../../../stores/user'

    var api = null;

    export function load() {
		return new Promise((resolve) => {
			if (api != null) {
				// GoogleApi already initialized
				resolve(api);
			} else {
				// GoogleApi not initialized
				loadjs('https://apis.google.com/js/platform.js?onload=$$onClientLoad', () => {
                    api = gapi;
					this.loadClient().then(() => {
						resolve(api);
					});
				});
			}
		});
	}

	export function loadClient() {
		return new Promise((resolve) => {
			api.load('client:auth2', () => {
				api.client.init({
					clientId: "1006714616831-jhaaavr7mf1cnt9hfa57gtnc48nqa7lq.apps.googleusercontent.com",
					discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
					scope: 'https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar.readonly',
				}).then(() => {
					resolve();
				});
			});
		});
	}

	export function isLoggedIn() {
		return api.auth2.getAuthInstance().isSignedIn.get();
	}

	export function login() {
		return new Promise((resolve) => {
			if(!isLoggedIn(api)) {
				api.auth2.getAuthInstance().signIn().then(() => {
					resolve();
				});
			} else {
				resolve();
			}
		})
	}

	export function saveUserProfile() {
		return new Promise((resolve) => {
			const profile = api.auth2.getAuthInstance().currentUser.get().getBasicProfile();

			name.set(profile.getName());
			givenName.set(profile.getGivenName());
			proilePictureUrl.set(profile.getImageUrl());
			email.set(profile.getEmail());

			resolve();
		})
	}
</script>