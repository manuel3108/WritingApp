<script>
	import UserProfile from "./navigation/UserProfile.svelte";
	import ColorPicker from "./navigation/ColorPicker.svelte";
	import PenSize from "./navigation/PenSize.svelte";
	import DropDown from "./navigation/DropDown.svelte";
	import Icon from "./Icon.svelte";
	import { mdiPalette, mdiPencil, mdiContentSave, mdiAccountCircle } from "@mdi/js";
	import SaveDocument from "./navigation/SaveDocument.svelte";
</script>

<style>
	.navbar {
		background-color: #606060;
	}
</style>

<nav class="navbar" role="navigation" aria-label="main navigation">
	<div class="navbar-brand">
		<a class="navbar-item" href="https://bulma.io">
			<img
				src="https://bulma.io/images/bulma-logo.png"
				width="112"
				height="28" />
		</a>

		<a
			role="button"
			class="navbar-burger burger"
			aria-label="menu"
			aria-expanded="false"
			data-target="navbarBasicExample">
			<span aria-hidden="true" />
			<span aria-hidden="true" />
			<span aria-hidden="true" />
		</a>
	</div>

	<div id="navbarBasicExample" class="navbar-menu">
		<div class="navbar-start">
			<a class="navbar-item">Home</a>

			<a class="navbar-item">Documentation</a>

			<div class="navbar-item has-dropdown is-hoverable">
				<a class="navbar-link">More</a>

				<div class="navbar-dropdown">
					<a class="navbar-item">About</a>
					<a class="navbar-item">Jobs</a>
					<a class="navbar-item">Contact</a>
					<hr class="navbar-divider" />
					<a class="navbar-item">Report an issue</a>
				</div>
			</div>
		</div>

		<div class="navbar-end">
			<div class="navbar-item">
				<DropDown Component={ColorPicker}>
					<div>
						<Icon path={mdiPalette} />
					</div>
				</DropDown>
			</div>
			<div class="navbar-item">
				<DropDown Component={PenSize}>
					<div>
						<Icon path={mdiPencil} />
					</div>
				</DropDown>
			</div>
			<div class="navbar-item">
				<SaveDocument />
			</div>
			<div class="navbar-item">
				<DropDown Component={UserProfile}>
					<div>
						<Icon path={mdiAccountCircle} />
					</div>
				</DropDown>
				<!-- <div class="buttons">
					<a href="/providers" class="button is-primary">
						<strong>Sign in</strong>
					</a>
					<a href="/providers/signout" class="button is-light">Sign out</a>
				</div> -->
			</div>
		</div>
	</div>
</nav>
