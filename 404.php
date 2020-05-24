<?php get_header()?>

<main id="main-content">
	<?php get_template_part('template-parts/hero'); ?>
	<div class="c-article-view">
		<?php while(have_posts()) : the_post(); ?>

			<?php the_content() ?>

		<?php endwhile; ?>
	</div>
</main>

<?php get_footer()?>