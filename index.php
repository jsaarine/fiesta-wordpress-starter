<?php /* Template Name: Index */

get_header();
?>

<main id="main-content">
	<?php get_template_part('template-parts/hero'); ?>
	<div class="container" style="max-width: 800px; margin-bottom: 100px;">

		<?php
		$posts = new WP_Query(array(
			'post_type' => 'post'
		));
		
		if($posts->have_posts()) : while ( $posts->have_posts() ) : $posts->the_post(); ?>

			<h2 style="margin-bottom: 1em;"><?= get_the_title() ?></h2>
			<?php the_excerpt() ?>
			<a href="<?= the_permalink() ?>" class="c-button" style="margin-top: 1em;">Read more</a>
		<?php
		endwhile; endif;
		?>
	</div>
</main>

<?php //get_template_part( 'template-parts/footer-menus-widgets' ); ?>

<?php
get_footer();
