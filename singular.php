<?php get_header()?>

<main id="main-content">
	<?php while(have_posts()) : the_post(); ?>

	<?php get_template_part('template-parts/hero'); ?>

	<article class="c-article">
		<?php the_content() ?>
	</article>

	<?php endwhile; ?>
</main>

<?php get_footer()?>