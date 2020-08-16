<div class="c-hero <?= get_query_var('hero_classes') ?>">
	<div class="content">
		<div>
			<h1><?= is_404() ? __('Page not found') : the_title() ?></h1>
			<p><?= get_post_meta(get_the_ID(), "description", true) ?></p>
			<?php if(is_front_page()) : ?>
			<p><a href="https://github.com/jsaarine/fiesta-wordpress-starter">GitHub</a> v<?= wp_get_theme()->get('Version') ?></p>
			<?php endif; ?>
		</div>
	</div>
	<?= the_post_thumbnail('hero', array('loading' => false)) ?>
</div>
