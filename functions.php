
<?php

function stave_enqueue_global_styles() {
  wp_enqueue_style(
    'stave-theme',
    get_template_directory_uri() . '/assets/css/theme.css',
    [],
    filemtime(get_template_directory() . '/assets/css/theme.css')
  );
}
add_action('wp_enqueue_scripts', 'stave_enqueue_global_styles');
add_action('enqueue_block_editor_assets', 'stave_enqueue_global_styles');


function stave_theme_setup() {
  // Enables support for wide and full-width blocks
  add_theme_support('align-full');

  // Optional: remove core block patterns if you want full control
  remove_theme_support('core-block-patterns');
}
add_action('after_setup_theme', 'stave_theme_setup');


// Include blocks
require_once get_template_directory() . '/register-blocks.php';

// Register Custom Post Types
foreach (glob(get_template_directory() . '/cpt/*.php') as $cpt_file) {
  require_once $cpt_file;
}

add_theme_support('post-thumbnails');

// Add editor theme
add_theme_support('editor-styles');
add_editor_style('editor-style.css');

?>


