var patchTextarea = function() {
  var textarea = $(this);
  textarea.addClass('patched');

  var textareaClone = textarea.clone();
  textarea.after(textareaClone);

  var editor = ace.edit(textareaClone[0]);
  editor.setFontSize(13);
  editor.setTheme('ace/theme/chrome');
  editor.getSession().setMode('ace/mode/markdown');
  editor.renderer.setScrollMargin(3, 3, 5, 5)
  editor.renderer.setShowGutter(false);
  editor.setOptions({
    minLines: 3,
    maxLines: Infinity
  });

  editor.on('change', function() {
    textarea.val(editor.getSession().getValue());
  });

  $(editor.container).on('keydown', function(evt) {
    if (evt.keyCode === 13) {
      editor.insert('\n');
      return false;
    }
  });
};

$(document).on('click', '.edit_description, .rendered_description',
    function() {
  $(this).parent().parent().find('textarea.editor.description').not(
    '.patched').each(patchTextarea);
});
