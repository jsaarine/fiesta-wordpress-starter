<?php

namespace Fiesta;

get_header(); ?>

<main id="main-content">
	<div class="c-article" style="text-align: center; margin-bottom: 5em;">
		<h1><?= __('Page not found') ?></h1>
		<p><?= __('The page you were looking for was not found.'); ?> <a href="<?= get_home_url(); ?>"><?= __('Go to home page'); ?></a></p>
	</div>
</main>

<?php get_footer();
