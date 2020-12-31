<?php

namespace Fiesta;

$has_thumbnail = has_post_thumbnail();
$description = get_post_meta(get_the_ID(), "description", true);

?>

<div class="c-hero <?= $args['hero_classes'] ?><?= $has_thumbnail ? ' image' : 'plain' ?>">
	<?= the_post_thumbnail('hero', array('loading' => false)) ?>
	<div class="text">
		<div>
			<h1><?= is_404() ? __('Page not found') : the_title() ?></h1>
			<?php if($description) : ?>
				<p><?= $description ?></p>
			<?php endif; ?>
			<?php if(is_front_page()) : ?>
				<p><a href="https://github.com/jsaarine/fiesta-wordpress-starter">GitHub</a> v<?= wp_get_theme()->get('Version') ?></p>
			<?php endif; ?>
		</div>
	</div>
</div>
