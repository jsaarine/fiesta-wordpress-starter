<?php get_header()?>

<main id="main-content">
	<?php while(have_posts()) : the_post(); ?>

	<?php get_template_part('template-parts/hero'); ?>

	<article class="c-article-view">

		<?php
			$blocks = parse_blocks(get_post()->post_content);

			foreach($blocks as $block) {
				$content = render_block($block);
					if(is_text_block($block['blockName'])) {
						$content = '<div class="text-block container">'.$content.'</div>';
					}
					
					echo apply_filters('the_content', $content);
			} ?>
		
	</article>

	<?php endwhile; ?>
</main>

<?php get_footer()?>