<?php
// cpt/register-projects.php

// 1. Register CPT
function thstave_register_projects_cpt() {
  register_post_type('project', [
    'labels' => [
      'name' => 'Projects',
      'singular_name' => 'Project'
    ],
    'public' => true,
    'has_archive' => true,
    'show_in_rest' => true,
    'supports' => ['title', 'thumbnail'], // no editor, no blocks
    'menu_icon' => 'dashicons-portfolio',
    'rewrite' => ['slug' => 'projects'],
  ]);
}
add_action('init', 'thstave_register_projects_cpt');

// 2. Register Meta Fields (for API and saving)
function thstave_register_project_meta() {
  register_post_meta('project', '_project_name', [
    'show_in_rest' => true,
    'single' => true,
    'type' => 'string',
    'sanitize_callback' => 'sanitize_text_field',
  ]);

  register_post_meta('project', '_project_description', [
    'show_in_rest' => true,
    'single' => true,
    'type' => 'string',
    'sanitize_callback' => 'sanitize_textarea_field',
  ]);
}
add_action('init', 'thstave_register_project_meta');

// 3. Add the Meta Box (visible inside Edit Project screen)
function thstave_add_project_meta_box() {
  add_meta_box(
    'thstave_project_details',
    'Project Details',
    'thstave_render_project_meta_box',
    'project',
    'normal',
    'default'
  );
}
add_action('add_meta_boxes', 'thstave_add_project_meta_box');

// 4. Render Meta Box Fields
function thstave_render_project_meta_box($post) {
  $project_name = get_post_meta($post->ID, '_project_name', true);
  $project_description = get_post_meta($post->ID, '_project_description', true);

  ?>
  <p>
    <label for="project_name">Name:</label><br />
    <input type="text" id="project_name" name="project_name" value="<?php echo esc_attr($project_name); ?>" style="width: 100%;" />
  </p>
  <p>
    <label for="project_description">Description:</label><br />
    <textarea id="project_description" name="project_description" rows="5" style="width: 100%;"><?php echo esc_textarea($project_description); ?></textarea>
  </p>
  <?php
}

// 5. Save Meta Box Data
function thstave_save_project_meta_box($post_id) {
  if (array_key_exists('project_name', $_POST)) {
    update_post_meta($post_id, '_project_name', sanitize_text_field($_POST['project_name']));
  }
  if (array_key_exists('project_description', $_POST)) {
    update_post_meta($post_id, '_project_description', sanitize_textarea_field($_POST['project_description']));
  }
}
add_action('save_post_project', 'thstave_save_project_meta_box');
