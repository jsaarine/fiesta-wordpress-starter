<?php

namespace Fiesta;

?>

<div class="c-page-header">
	<div class="text">
		<div>
			<h1><?= is_404() ? __('Page not found') : the_title() ?></h1>
			<?php if($description) : ?>
				<p><?= $description ?></p>
			<?php endif; ?>
		</div>
	</div>
</div>
