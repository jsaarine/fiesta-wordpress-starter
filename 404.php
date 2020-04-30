<?php get_header()?>

<main id="main-content">
	<div class="c-article-view">
		<h1>Page not found</h1>
		<?php

		/* Start the Loop */
		while ( have_posts() ) :
			the_post();

			?>
			
			<?php the_content() ?>

		<?php
		endwhile; // End of the loop.
		?>
	</div>
</main>

<?php get_footer()?>