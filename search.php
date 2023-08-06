<?php

namespace Fiesta;

get_header();

?>

<main id="main-content">
	<article class="c-article">
		<h1 class="has-text-align-center"><?= __('Search results') ?></h1>
		<div class="c-search-results">
			<?php get_search_form(['header' => false]); ?>
			<ul>
				<?php while(have_posts()) : the_post(); ?>
					<li>
						<h2><a href="<?php the_permalink() ?>"><?php the_title() ?></a></h2>
						<?php
							// $excerpt = wp_trim_excerpt($post->post_content);
							$excerpt = wp_strip_all_tags(wp_trim_excerpt($post->post_content));
						?>
						<p><?= substr($excerpt, 0, 200).'...'; ?></p>
					</li>
				<?php endwhile; ?>
			</ul>
			<?php if(!have_posts()) : ?>
				<p>No results were found with the keyword '<?= get_search_query(); ?>'.</p>
			<?php endif; ?>
		</div>
	</article>
</main>

<?php get_footer();
