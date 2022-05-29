<?php

namespace Fiesta;

get_header();

?>

<main id="main-content">
	<article class="c-article">
		<h1 class="wp-block-post-title"><?= __('Search results') ?></h1>
		<div class="c-search-results">
			<ul>
				<?php while(have_posts()) : the_post(); ?>
					<li>
						<h2><a href="<?php the_permalink() ?>"><?php the_title() ?></a></h2>
						<?php the_excerpt() ?>
					</li>
				<?php endwhile; ?>
			</ul>
			<?php if(!have_posts()) : ?>
				<p style="text-align: center;">No results were found with the keyword '<?= get_search_query(); ?>'.</p>
			<?php endif; ?>
		</div>
	</article>
</main>

<?php get_footer();
