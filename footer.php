
<footer class="c-footer">
	<?php dynamic_sidebar('footer'); ?>
</footer>

<script>
	app.ready(function() {
		cookieConsent({
			text: "<?= __('This website uses cookies.') ?>",
			linkText: "<?= __('Read more about cookies') ?>",
			linkUrl: "<?= get_privacy_policy_url() ?>",
			consentText: "<?= __('I accept') ?>",
			declineText: "<?= __('I do not accept') ?>",
			scripts: [
				`console.log("Script added");`
			]
		});
	});
 </script>

<?php wp_footer(); ?>
