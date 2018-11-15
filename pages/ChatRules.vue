<template>
	<div>
		<v-header/>
		<div class="row m-2 justify-content-center">
			<div class="col-sm-10 bg-white my-4 rounded border p-4">
				<b class="d-block mb-3">You must follow the following rules:</b>

				<ul>
					<li>Be kind and respect the person you are talking over the chat</li>
					<li>No bullying, sexism, racism, homophobia or other hate-based chat</li>
					<li>Don’t spam words or use all-caps</li>
					<li>Don’t argue with people over chat</li>
					<li>No advertising or self-promotion</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import VHeader from '~/components/VHeader'

export default {
	components: {
		VHeader
	}
}
</script>

<style>

</style>
