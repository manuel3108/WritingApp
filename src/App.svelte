<script>
	import 'bulma/css/bulma.css'

	import Routes from './Routes'
	import Navigation from './components/Navigation.svelte'
	import Footer from './components/Footer.svelte'
    import Providers from './components/providers/Providers.svelte'
</script>

<Providers />
<div id="site">
	<div id="navigation">
		<Navigation />
	</div>

	<main id="page">
		<Routes />
	</main>

	<div id="footer">
	</div>
</div>

<style>
	#site {
		display: flex;
		flex-flow: column;
		height: 100%;
	}

	#navigation {
		flex: 0 1 auto;
	}

	#page {
		flex: 1 1 auto;
	}

	#footer {
		flex: 0 1 auto;
	}

	main {
		background-color: #909090;
	}
</style>

