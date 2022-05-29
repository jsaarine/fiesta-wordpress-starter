<?php

namespace Fiesta;

?>

<form class="search-form" role="search" method="get" action="/">
	<label>
		<span class="screen-reader-text"><?= __('Search for') ?>:</span>
		<input type="search" class="search-field" placeholder="<?= _('Enter your search') ?>..." value="" name="s">
	</label>
	<button type="submit" class="search-submit" aria-label="<?= _('Search') ?>">
		<svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m13 12 4 4" stroke="#522dd7" stroke-width="2" stroke-linecap="square"/><circle cx="9" cy="7" r="6" stroke="#522dd7" stroke-width="2"/></svg>
	</button>
</form>
