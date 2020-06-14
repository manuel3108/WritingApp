<script>
	import Navaid from 'navaid';
	import { onDestroy } from 'svelte';
	import Index from './routes/index.svelte'
	import ProvidersGoogleLogin from './routes/providers/google/login.svelte'
	import ProvidersGoogleNew from './routes/providers/google/new.svelte'
	import ProvidersGoogleOpen from './routes/providers/google/open.svelte'
	import ProvidersIndex from './routes/providers/index.svelte'
	import WritingIndex from './routes/writing/index.svelte'
	let Route;
	let params=undefined
	let uri = location.pathname;

	function track(obj) {
		uri = obj.state || obj.uri || location.pathname;
		if (window.ga) ga.send('pageview', { dp:uri });
	}

	addEventListener('replacestate', track);
	addEventListener('pushstate', track);
	addEventListener('popstate', track);

	const router = Navaid('/')
		.on('/', () => {params = undefined; Route = Index;})
		.on('/providers/google/login', () => {params = undefined; Route = ProvidersGoogleLogin;})
		.on('/providers/google/new', () => {params = undefined; Route = ProvidersGoogleNew;})
		.on('/providers/google/open', () => {params = undefined; Route = ProvidersGoogleOpen;})
		.on('/providers/', () => {params = undefined; Route = ProvidersIndex;})
		.on('/writing/', () => {params = undefined; Route = WritingIndex;})
		.listen();
	onDestroy(router.unlisten);
</script>

{#if params === undefined}
	<svelte:component this={Route}/>
{:else}
	<svelte:component this={Route} {params} />
{/if}