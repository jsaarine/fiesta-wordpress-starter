<?php
	namespace Fiesta;
?>

<div class="c-share">
	<p><?= __('Share'); ?></p>
	<?php
		global $wp;
		$share_url = home_url($wp->request);
	?>
	<div>
		<a class="facebook" href="https://www.facebook.com/sharer/sharer.php?u=<?= $share_url; ?>" aria-label="Jaa Facebookissa" target="_blank" rel="noopener noreferrer">
			<svg width="12" height="20" viewBox="0 0 12 20" xmlns="http://www.w3.org/2000/svg"><path d="M3.696 20v-8.945H.5V7.5h3.196V4.7c0-3.044 1.983-4.7 4.879-4.7A28.6 28.6 0 0111.5.14v3.18H9.492c-1.575 0-1.88.703-1.88 1.73V7.5h3.555l-.488 3.555H7.612V20" fill="#522dd7" fill-rule="nonzero"/></svg>
		</a>
		<a class="twitter" href="https://twitter.com/share?url=<?= $share_url; ?>&text=<?= the_title(); ?>" aria-label="Jaa Twitterissä" target="_blank" rel="noopener noreferrer">
			<svg width="20" height="18" viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg"><path d="M17.944 4.926c.013.178.013.356.013.533 0 5.42-4.124 11.663-11.663 11.663-2.322 0-4.48-.673-6.294-1.84.33.038.647.05.99.05 1.916 0 3.68-.647 5.089-1.75a4.106 4.106 0 01-3.833-2.843c.254.038.508.063.774.063.368 0 .736-.05 1.079-.14A4.1 4.1 0 01.812 6.64v-.051c.546.304 1.18.495 1.853.52A4.096 4.096 0 01.838 3.695c0-.761.203-1.459.558-2.068a11.651 11.651 0 008.452 4.29 4.627 4.627 0 01-.102-.94 4.097 4.097 0 014.1-4.099 4.09 4.09 0 012.994 1.295 8.07 8.07 0 002.602-.99 4.088 4.088 0 01-1.802 2.259A8.217 8.217 0 0020 2.807a8.811 8.811 0 01-2.056 2.12z" fill="#522dd7" fill-rule="nonzero"/></svg>
		</a>
		<a class="linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=<?= $share_url; ?>" aria-label="Jaa LinkedInissä" target="_blank" rel="noopener noreferrer">
			<svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="M4.029 17.75H.297V6.066H4.03V17.75zM2.161 4.473C.968 4.473 0 3.512 0 2.352 0 1.192.968.25 2.161.25s2.161.941 2.161 2.102c0 1.16-.968 2.12-2.16 2.12zM17.996 17.75h-3.724v-5.688c0-1.355-.028-3.093-1.94-3.093-1.94 0-2.237 1.472-2.237 2.996v5.785H6.367V6.066h3.579V7.66h.052c.498-.918 1.715-1.887 3.531-1.887 3.776 0 4.471 2.418 4.471 5.559v6.418h-.004z" fill="#522dd7" fill-rule="nonzero"/></svg>
		</a>
		<a class="whatsapp" href="https://api.whatsapp.com/send?text=<?= $share_url; ?>" aria-label="Jaa WhatsApissa" target="_blank" rel="noopener noreferrer">
			<svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="M15.304 2.793C13.621 1.153 11.379.25 8.996.25 4.078.25.076 4.14.076 8.922c0 1.527.41 3.02 1.19 4.336L0 17.75l4.729-1.207a9.094 9.094 0 004.263 1.055h.004c4.914 0 9.004-3.891 9.004-8.672 0-2.317-1.012-4.492-2.696-6.133zM8.996 16.137a7.562 7.562 0 01-3.777-1.004l-.269-.156-2.804.714.747-2.66-.177-.273a7.037 7.037 0 01-1.133-3.836C1.583 4.949 4.91 1.715 9 1.715c1.98 0 3.841.75 5.24 2.113C15.636 5.191 16.496 7 16.492 8.926c0 3.976-3.41 7.21-7.497 7.21zm4.066-5.399c-.22-.11-1.318-.633-1.523-.703-.205-.074-.353-.11-.502.11-.149.218-.575.703-.707.851-.129.145-.261.164-.482.055-1.31-.637-2.17-1.137-3.034-2.578-.229-.383.23-.356.655-1.184.073-.144.036-.27-.02-.379-.056-.11-.502-1.176-.687-1.61-.18-.421-.366-.362-.502-.37-.129-.008-.277-.008-.426-.008a.837.837 0 00-.595.27c-.205.218-.78.742-.78 1.808s.8 2.098.909 2.242c.112.145 1.57 2.332 3.809 3.274 1.414.593 1.969.644 2.676.543.43-.063 1.318-.524 1.502-1.032.185-.507.185-.941.129-1.03-.052-.099-.201-.153-.422-.259z" fill="#522dd7" fill-rule="nonzero"/></svg>
		</a>
	</div>
</div>