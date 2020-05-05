
<footer class="c-footer">
	<?php dynamic_sidebar('footer'); ?>
</footer>

<script>
	app.ready(function() {
		cookieConsent({
			text: "This website uses cookies.",
			linkText: "Read more about cookies",
			linkUrl: "<?= get_privacy_policy_url() ?>",
			buttonText: "I accept"
		});
	});
 </script>

<?php wp_footer(); ?>
