<script>
	export let content;
	export let text;

	let fileName;

	function change(e) {
		if (this.files && this.files[0]) {
			fileName = this.files[0].name;
			  
			let fileReader = new FileReader();
			fileReader.addEventListener("load", function(e) {
				content = e.target.result;
			}); 
			fileReader.readAsDataURL( this.files[0] );
        }
	}
</script>

<div class="file has-name is-fullwidth">
	<label class="file-label">
		<input class="file-input" type="file" on:change={change}>
		<span class="file-cta">
			<span class="file-icon">
				<i class="fas fa-upload"></i>
			</span>
			<span class="file-label">
				{text}
			</span>
		</span>
		<span class="file-name">
			{fileName}
		</span>
	</label>
</div>