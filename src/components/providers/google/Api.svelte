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
					api.client.load('drive', 'v2', () => {
						resolve();
					});
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

	export function downloadDocument(id) {
		return new Promise((resolve, reject) => {
			api.client.drive.files.get({
				fileId: id,
				alt: 'media',
			}).then((response) => {
				resolve(response.body);
			}).catch((response) => {
				reject(response.result.error);
			});
		});
	}

	export function uploadFile(fileId, content) {
		const boundary = '-------314159265358979323846';
		const delimiter = `\r\n--${boundary}\r\n`;
		const closeDelim = `\r\n--${boundary}--`;

		const contentType = 'application/writing-app';
		// Updating the metadata is optional and you can instead use the value from drive.files.get.
		const base64Data = btoa(content);
		const multipartRequestBody = `${delimiter}Content-Type: application/json\r\n\r\n${delimiter}Content-Type: ${contentType}\r\nContent-Transfer-Encoding: base64\r\n\r\n${base64Data}${closeDelim}`;

		return api.client.request({
			path: `/upload/drive/v2/files/${fileId}`,
			method: 'PUT',
			params: {
				uploadType: 'multipart',
				alt: 'json',
			},
			headers: {
				'Content-Type': `multipart/mixed; boundary="${boundary}"`,
			},
			body: multipartRequestBody,
		}).then((resp) => {
			console.log('uploaded content', resp.result);
		});
	}

	export function createFile(folderId) {
		return new Promise((resolve, reject) => {
			return api.client.request({
				path: `/drive/v3/files`,
				method: 'POST',
				body: {
					name: 'test name3'
				}
			}).then((resp) => {
				console.log('created file', resp.result.id);
				resolve(resp.result.id)
			});
		});
	}
</script>