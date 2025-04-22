<?php
/**
 * Dynamically registers all blocks in /blocks directory.
 * Uses React for frontend rendering.
 * Assumes styles are injected via JS (no separate .css files).
 */

function stave_register_all_blocks() {
  $theme_dir = get_template_directory();
  $theme_uri = get_template_directory_uri();
  $blocks_dir = $theme_dir . '/blocks/';
  $dist_dir   = $theme_dir . '/dist/';
  $dist_uri   = $theme_uri . '/dist/';

  foreach (glob($blocks_dir . '*', GLOB_ONLYDIR) as $block_path) {
    $block_name = basename($block_path);
    $block_json_path = $block_path . '/block.json';

    if (!file_exists($block_json_path)) {
      error_log("⚠️ No block.json found for: $block_name");
      continue;
    }

    $metadata = json_decode(file_get_contents($block_json_path), true);
    if (empty($metadata['name'])) {
      error_log("⚠️ Missing block name in block.json for: $block_name");
      continue;
    }


    foreach (['editorScript', 'script'] as $key) {
      if (!empty($metadata[$key])) {
        $handle = $metadata[$key];
        $js_path = $dist_dir . $handle . '.bundle.js';
        $js_uri  = $dist_uri . $handle . '.bundle.js';

        if (file_exists($js_path)) {
          $content = ($key == 'editorScript') ? 
          ['wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-block-editor'] :
          ['wp-element'];

          wp_register_script(
            $handle,
            $js_uri,
            $content,
            filemtime($js_path),
            true
          );
           error_log("✅ Registered script: $handle → $js_uri -> " . implode(" ", $content));
        } else {
          error_log("⚠️ JS not found for $handle at $js_path");
        }
      }
    }

    $render_php = $block_path . '/render.php';
    $render_callback = null;

    if (file_exists($render_php)) {
      $render_callback = include $render_php;
    } else {
      
      $render_callback = function($attributes) use ($block_name) {
        return sprintf(
          '<div data-block="%s" data-attributes="%s"></div>',
          esc_attr($block_name),
          esc_attr(base64_encode(wp_json_encode($attributes)))
        );
      };
    }
   
    error_log("relative_block_path: " . $metadata['name']);
    register_block_type($metadata['name'], [
      'editor_script'   => $metadata['editorScript'] ?? null,
      'script'          => $metadata['script'] ?? null,
      'render_callback' => $render_callback,
    ]);

  }
}

add_action('init', 'stave_register_all_blocks');
