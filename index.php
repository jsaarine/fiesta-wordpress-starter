<?php /* Template Name: Index */

namespace Fiesta;

get_header();

?>

<main id="main-content" tabindex="-1">
	<?php while(have_posts()) : the_post(); ?>

		<div class="c-article">
			<?php the_content(); ?>
		</div>

	<?php endwhile; ?>
</main>

<?php get_footer(); ?>
