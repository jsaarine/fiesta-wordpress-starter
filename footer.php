
<footer class="c-footer">
	<?php dynamic_sidebar('footer'); ?>
</footer>

<script>
	app.ready(function() {
		cookieConsent({
			text: "<?= __('This website uses cookies to improve user experience, to analyze site usage and to personalize advertising.') ?>",
			linkText: "<?= __('Read more about cookies') ?>",
			linkUrl: "<?= get_privacy_policy_url() ?>",
			consentButtonText: "<?= __('Accept all cookies') ?>",
			settingsButtonText: "<?= __('Manage cookie settings') ?>",
			declineButtonText: "<?= __('Accept necessary cookies only') ?>",
			scripts: {
				analytics: [
					// Analytics script
					// 'console.log("Analytics script added");',
					// GTM event
					// 'dataLayer.push({"event": "cookie_consent_analytics"});'
				],
				marketing: [
					//  Marketing script
					// 'console.log("Marketing script added");',
					// GTM event
					// 'dataLayer.push({"event": "cookie_consent_marketing"});'
				]
			},
			// Add settings to show cookie settings dialog
			settings: {
				title: "<?= __('Cookie settings') ?>",
				text: "<?= __('Choose which types of cookies you would like to accept.') ?>",
				button: "<?= __('Save settings') ?>",
				cookieTypes: {
					required: "<?= __('Required') ?>",
					analytics: "<?= __('Analytics') ?>",
					marketing: "<?= __('Marketing') ?>"
				}
			}
		});
	});
 </script>

<?php wp_footer(); ?>
