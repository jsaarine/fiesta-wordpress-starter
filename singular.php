<?php

namespace Fiesta;

get_header();

?>

<main id="main-content">
	<?php while(have_posts()) : the_post(); ?>

		<article class="c-article">
			<?php if(!has_block('fiesta/hero')) : ?>
				<h1 class="has-text-align-center"><?php the_title() ?></h1>
			<?php endif; ?>
			<?php the_content() ?>
		</article>

	<?php endwhile; ?>
</main>

<?php get_footer();
