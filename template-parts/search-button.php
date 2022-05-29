<?php

namespace Fiesta;

?>

<button class="search-button <?= $args['class'] ?>" data-search-button aria-expanded="false">
	<span class="open" data-label="<?= __('Search') ?>">
		<svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m13 12 4 4" stroke="#fff" stroke-width="2" stroke-linecap="square"/><circle cx="9" cy="7" r="6" stroke="#fff" stroke-width="2"/></svg>
	</span>
	<span class="close" data-label="<?= __('Close search'); ?>">
		<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g fill="#FFF" fill-rule="nonzero"><path d="M.93 18.03 18.029.93l1.9 1.9-17.1 17.1z"/><path d="m2.83.93 17.1 17.1-1.9 1.9L.93 2.83z"/></g></svg>
	</span>
</button>
