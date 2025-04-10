<?php get_header(); ?>
<main>
  <div class="container mx-auto px-4 py-12">
    <?php
      if ( have_posts() ) :
        while ( have_posts() ) : the_post();
          the_content();
        endwhile;
      endif;
    ?>
  </div>
</main>
<?php get_footer(); ?>
