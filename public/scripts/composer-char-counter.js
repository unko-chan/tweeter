const MAXCHAR = 140;
$(document).ready(function () {
  $('textarea').on({
    input: function () {
      const counter = $(this).closest('form').find('output')
      const remainChar = MAXCHAR - $(this).val().length;
      
      counter.text(remainChar);

      if(remainChar < 0) {
        counter.addClass( "overlimit" )
      } else {
        counter.removeClass( "overlimit" )
      }

      //auto adjusts height of textarea
      this.style.height = 'auto';
      this.style.height = this.scrollHeight + 'px';
    },
  });
});