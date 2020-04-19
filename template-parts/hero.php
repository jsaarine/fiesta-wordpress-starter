<div class="c-hero">
	<?php while (have_posts()) : the_post(); ?>

	<div class="content">
		<h1><?= the_title() ?></h1>
		<?php the_content(); ?>
	</div>
	<?= the_post_thumbnail() ?>

	<?php endwhile; ?>
</div>