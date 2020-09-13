<?php /* Template Name: Index */

get_header();
?>

<main id="main-content" tabindex="-1">
	<?php while (have_posts()) : the_post(); ?>

	<?php
		get_template_part('template-parts/hero', null, array(
			'hero_classes' => 'large'
		));
	?>

	<?php endwhile; ?>

	<div class="container" style="max-width: 800px; margin-bottom: 100px;">
		<?php
		$posts = new WP_Query(array(
			'post_type' => 'post'
		));
		
		while($posts->have_posts()) : $posts->the_post(); ?>

			<h2 style="margin-bottom: 1em;"><?= get_the_title() ?></h2>
			<?php the_excerpt() ?>
			<a href="<?= the_permalink() ?>" class="c-button" style="margin-top: 1em;"><?= __('Read more') ?></a>
		<?php endwhile; ?>
	</div>
</main>

<?php
get_footer();
