# targetLinkOffset

This plugin addresses an issue that arises when `position: fixed;` headers are combined with target links (e.g. `<a href="#section2">`). We all know what happens next. If your header is 100px tall, the content you've navigated to will have the top 100px hidden by the header. This plugin deals with that issue.

## Usage

Include jQuery and instantiate the plugin

```html
<script src="path/to/jquery.min.js"></script>
<script src="path/to/jquery.targetLinkOffset.min.js"></script>
<script>
    jQuery(document).ready(function($) {
        $.targetLinkOffset({
            offset: $('#masthead').outerHeight(),
            buffer: 22
        });
    });
</script>

## Options

```javascript
offset: 100, // This option is absolutely necessary. This should be the calculated height of your header
buffer: 25, // This is some extra space under your header so the content isn't flush with the header's bottom
linkSelector: "a[href^='#']", // Specify a different selector for target links
boundEvent: "click.targetLinkOffset", // If you don't want bind this to click events
animate: false, // Animation, disabled by default
animationSpeed: 800 // You guessed it.