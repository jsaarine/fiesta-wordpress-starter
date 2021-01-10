<?php

namespace Fiesta;

get_header();

?>

<main id="main-content" tabindex="-1">
	<?php while(have_posts()) : the_post(); ?>

		<article>
			<?php
				get_template_part('template-parts/hero');
			?>

			<div class="c-article">
				<?php the_content() ?>
			</div>
		</article>

		<?php get_template_part('template-parts/share'); ?>

	<?php endwhile; ?>
</main>

<?php get_footer();
