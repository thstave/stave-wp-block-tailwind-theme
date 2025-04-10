
<?php
function tstave_theme_enqueue_styles() {
  // wp_enqueue_script('ourmainjs', get_theme_file_uri('/build/index.js'), array('wp-element', 'react-jsx-runtime'), '1.0', true);
  wp_enqueue_style('tailwind', get_template_directory_uri() . '/assets/css/tailwind.css', [], filemtime(get_template_directory() . '/assets/css/tailwind.css'));
}
add_action('wp_enqueue_scripts', 'tstave_theme_enqueue_styles');

// Include blocks
require_once get_template_directory() . '/register-blocks.php';

?>
