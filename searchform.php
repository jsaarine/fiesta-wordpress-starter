<?php

namespace Fiesta;

?>

<form class="search-form" role="search" method="get" action="/">
	<label>
		<span class="screen-reader-text"><?php _e('Search for'); ?>:</span>
		<input type="search" class="search-field" placeholder="<?php _e('Search the site') ?>..." value="" name="s">
	</label>
	<button type="submit" class="search-submit" aria-label="<?php _e('Search') ?>">
		<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m19.726 17.291-3.894-3.894a.937.937 0 0 0-.664-.273h-.636a8.084 8.084 0 0 0 1.718-5A8.123 8.123 0 0 0 8.126 0 8.123 8.123 0 0 0 .002 8.124a8.123 8.123 0 0 0 8.124 8.124c1.886 0 3.62-.64 5-1.718v.636c0 .25.097.489.273.665l3.894 3.894a.933.933 0 0 0 1.324 0l1.105-1.106a.942.942 0 0 0 .004-1.328Zm-11.6-4.167c-2.762 0-5-2.234-5-5 0-2.761 2.235-5 5-5 2.761 0 5 2.235 5 5 0 2.762-2.235 5-5 5Z" fill="#fff"/></svg>
	</button>
</form>
