<?php get_header()?>

<main id="main-content">
	<article class="c-article-view">
		<h1 class="container"><?= the_title() ?></h1>
		<?php

		while ( have_posts() ) :
			the_post();

			$blocks = parse_blocks(get_post()->post_content);

			foreach($blocks as $block) {
				$content = render_block($block);
					if(is_text_block($block['blockName'])) {
						$content = '<div class="text-block container g-article">'.$content.'</div>';
					}
					
					echo apply_filters('the_content', $content);
			} ?>

		<?php
		endwhile;
		?>
	</article>
</main>

<?php get_footer()?>