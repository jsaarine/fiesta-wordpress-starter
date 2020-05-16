<div class="c-hero <?= has_post_thumbnail() ? 'm-image' : "m-background" ?>">
	<div class="content">
		<h1><?= the_title() ?></h1>
		<p><?= get_post_meta(get_the_ID(), "description", true) ?></p>
		<?php if(is_front_page()) : ?>
		<p><a href="">GitHub</a> v1.0.0</p>
		<?php endif; ?>
	</div>
	<?= the_post_thumbnail() ?>
</div>