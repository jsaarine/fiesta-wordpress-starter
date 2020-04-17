
<footer class="c-footer">
	<?php dynamic_sidebar('footer'); ?>
</footer>

<script src="<?= get_stylesheet_directory_uri() ?>/js/script.js"></script>
<script>
	app.ready(function() {
		cookieConsent({
			text: "This website uses cookies.",
			linkText: "Read more",
			linkUrl: "<?= get_privacy_policy_url() ?>",
			buttonText: "I understand"
		});
	});
 </script>

<?php wp_footer(); ?>
