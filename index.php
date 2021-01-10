<?php /* Template Name: Index */

namespace Fiesta;

get_header();

?>

<main id="main-content" tabindex="-1">
	<?php while (have_posts()) : the_post(); ?>

		<?php
			get_template_part('template-parts/hero');
		?>

		<div class="container" style="padding: 0; max-width: var(--container); margin-bottom: 80px;">
			<div class="c-article">
				<?php the_content(); ?>
			</div>
		</div>

	<?php endwhile; ?>
</main>

<?php get_footer(); ?>
