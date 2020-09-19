<!DOCTYPE html>
<html <?php language_attributes(); ?>>
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta charset="<?php bloginfo('charset'); ?>">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
		<?php wp_head(); ?>
		<script>
			var app={queue:[],ready:function(a){this.isReady?a():this.queue.push(a)}};
		</script>
	</head>
	<body <?php body_class(); ?>>

		<?php
		wp_body_open();
		?>

		<header class="c-header" id="header">
			<div class="skip-link"><a href="#main-content"><?= __('Skip to content') ?></a></div>
			<div class="inner">
				<a href="/" class="logo" aria-label="<?= __('To home page') ?>"><svg width="93" height="29" viewBox="0 0 93 29" xmlns="http://www.w3.org/2000/svg"><path d="M7.403 28V12.8h3.648V9.342H7.403V7.328c0-2.166.836-3.154 2.356-3.154.646 0 1.368.152 2.052.456l.836-3.268c-.836-.342-2.09-.646-3.42-.646-4.408 0-6.194 2.812-6.194 6.688v1.938l-2.508.19V12.8h2.508V28h4.37zM17.58 6.074c1.558 0 2.698-1.026 2.698-2.47 0-1.482-1.14-2.508-2.698-2.508S14.88 2.122 14.88 3.604c0 1.444 1.14 2.47 2.698 2.47zM19.745 28V9.342h-4.37V28h4.37zm14.621.456c2.356 0 4.598-.836 6.384-2.014l-1.482-2.736c-1.368.874-2.736 1.368-4.332 1.368-3.002 0-5.13-1.9-5.51-5.282h11.856c.114-.456.19-1.216.19-2.052 0-5.206-2.66-8.854-7.714-8.854-4.37 0-8.588 3.724-8.588 9.804 0 6.156 4.028 9.766 9.196 9.766zm3.306-11.438h-8.284c.38-3.116 2.28-4.75 4.484-4.75 2.546 0 3.8 1.786 3.8 4.75zm14.242 11.438c4.712 0 7.258-2.584 7.258-5.776 0-3.496-2.812-4.712-5.358-5.662-2.014-.722-3.876-1.33-3.876-2.774 0-1.178.874-2.052 2.736-2.052 1.482 0 2.812.646 4.104 1.596l2.014-2.66c-1.52-1.178-3.61-2.242-6.194-2.242-4.18 0-6.802 2.318-6.802 5.586 0 3.116 2.774 4.522 5.244 5.434 1.976.76 3.99 1.444 3.99 3.002 0 1.292-.95 2.242-2.964 2.242-1.9 0-3.496-.798-5.168-2.09l-2.052 2.812c1.824 1.482 4.522 2.584 7.068 2.584zm18.802 0c1.482 0 2.774-.342 3.8-.684l-.76-3.23c-.532.228-1.292.418-1.938.418-1.786 0-2.622-1.064-2.622-3.268V12.8h4.75V9.342h-4.75V4.25h-3.648l-.532 5.092-2.888.19V12.8h2.66v8.892c0 4.028 1.596 6.764 5.928 6.764zm12.38 0c2.203 0 4.103-1.102 5.775-2.508h.114L89.327 28H92.9V16.942c0-5.206-2.28-8.056-6.954-8.056-2.964 0-5.586 1.14-7.638 2.432l1.596 2.926c1.634-.988 3.382-1.824 5.244-1.824 2.508 0 3.344 1.672 3.382 3.648-7.638.836-10.982 2.926-10.982 6.916 0 3.268 2.28 5.472 5.548 5.472zm1.367-3.42c-1.558 0-2.66-.722-2.66-2.394 0-1.862 1.672-3.192 6.726-3.838v4.18c-1.368 1.292-2.546 2.052-4.066 2.052z" fill="#FFF" fill-rule="nonzero"/></svg></a>
				<div class="nav-close" id="nav-close"></div>
				<nav class="c-navigation" id="navigation">
					<button class="nav-button" id="nav-button" aria-expanded="false" aria-haspopup="true" aria-controls="navigation">
						<span class="line"></span>
						<span class="line"></span>
						<span class="line"></span>
					</button>
					<?php wp_nav_menu([
						'menu' => 'main',
						'container' => '',
						'container_class' => '',
						'menu_class' => '',
						'link_before' => '<span>',
  						'link_after' => '</span>'
					])?>
				</nav>
			</div>
		</header>
