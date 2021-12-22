<?php

namespace Fiesta;

get_header();

?>

<main id="main-content">
	<?php while(have_posts()) : the_post(); ?>

		<?php
			get_template_part('template-parts/page-header');
		?>

		<article class="c-article">
			<?php the_content() ?>
		</article>

		<?php get_template_part('template-parts/share'); ?>

	<?php endwhile; ?>
</main>

<?php get_footer();
