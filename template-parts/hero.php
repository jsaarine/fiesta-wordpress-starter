<div class="c-hero <?= get_query_var('hero_classes') ?>">
	<div class="content">
		<h1><?= is_404() ? __('Page not found') : the_title() ?></h1>
		<p><?= get_post_meta(get_the_ID(), "description", true) ?></p>
		<?php if(is_front_page()) : ?>
		<p><a href="https://github.com/jsaarine/fiesta-wordpress-starter">GitHub</a> v1.0.0</p>
		<?php endif; ?>
	</div>
	<?= the_post_thumbnail() ?>
</div>