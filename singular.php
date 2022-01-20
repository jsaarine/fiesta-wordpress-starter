<?php

namespace Fiesta;

get_header();

?>

<main id="main-content">
	<?php while(have_posts()) : the_post(); ?>

		<article class="c-article">
			<h1 class="wp-block-post-title"><?php the_title() ?></h1>
			<?php the_content() ?>
		</article>

		<?php get_template_part('template-parts/share'); ?>

	<?php endwhile; ?>
</main>

<?php get_footer();
