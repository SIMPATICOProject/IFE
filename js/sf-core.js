const baseUrl = "https://simpatico.hi-iberia.es:4570/simpatico/api";

document.addEventListener('DOMContentLoaded', pageLoaded);

function pageLoaded () {
  var button_session_feedback = $("#BS607AFICHA");
  button_session_feedback.unbind('click');
  button_session_feedback.removeAttr('href');
  button_session_feedback.click(function () {
    // Check with dialog show
    $.get(baseUrl + "/sf/selectform?id=1", function (data) { // TODO: Change "id" when available
      var modalChosen = data.modal;
      showFeedbackDialog(modalChosen);
    });
  });

  // Click function button close
  $(".button_cancel_session_feedback").click(function() {
    jQuery(".modal-session-feedback").dialog('close');
  });
  // Click function button send modal a
  $("#button_send_session_feedback_a").click(function() {
      // Get and check data
      var faceSeleccted = $("#face-radio-buttons-session-feedback .selected").attr('data-face');
      var slideValue = Number($("#sliderOutputSessionFeedback").html());
      var comment = $("#session-feedback-comments-text").val();
      if (faceSeleccted == undefined) {
          faceSeleccted="none";
      }
      postData =  {
          "face_selected": faceSeleccted,
          "slide_value":slideValue,
          "comment": comment,
          "modal_type": "a",
          "datatype":"session-feedback"
      };

      // Set default values
      $("#sliderOutputSessionFeedback").html("5");
      $("#slider_session_feedback").val("5");
      $("#face-radio-buttons-session-feedback .selected").removeClass("selected");
      $("#session-feedback-comments-text").val("");

      //console.log(postData);
      $.post(baseUrl + "/logs/insert", JSON.stringify(postData));

      // Close
      jQuery("#dialog_modal_session_feedback_a").dialog('close');
      // Open dialog
      jQuery("#dialog_session_feedback_sended").dialog({
          title: "Comentario enviado",
          height: 140,
          width: 250,
          resizable: false,
          modal: true,
          open: function(event, ui){
              setTimeout(function() {
                  jQuery('#dialog_session_feedback_sended').dialog('close');
              }, 3000);
          }
      });
      $(".ui-dialog-overlay").css("opacity", "0.7");
      jQuery("#dialog_session_feedback_sended").show();
  });

  // Click function button send modal b
  $("#button_send_session_feedback_b").click(function() {
      // Get and check data
      var simplifyTF = $("input[name=simplify]:checked", "#simplify-buttons").val(); // TF: true or false
      var slideValue = Number($("#sliderOutputSessionFeedbackSimp").html());
      var citizenTF = $("input[name=citizen]:checked", "#citizen-buttons").val(); // TF: true or false
      var comment = $("#session-feedback-comments-text-citizenpedia").val();

      postData =  {
          "simplify_useful": simplifyTF,
          "simplify_slide_value": slideValue,
          "citizenpedia_used": citizenTF,
          "citizenpedia_comment": comment,
          "modal_type": "b",
          "datatype":"session-feedback"
      };

      // Set default values
      $("#sliderOutputSessionFeedbackSimp").html("5");
      $("#slider_session_feedback_simplification").val("5");
      $("#session-feedback-comments-text-citizenpedia").val("");

      $.post(baseUrl + "/logs/insert", JSON.stringify(postData));

      // Close
      jQuery("#dialog_modal_session_feedback_b").dialog('close');
      // Open dialog
      jQuery("#dialog_session_feedback_sended").dialog({
          title: "Comentario enviado",
          height: 140,
          width: 250,
          resizable: false,
          modal: true,
          open: function(event, ui){
              setTimeout(function() {
                  jQuery('#dialog_session_feedback_sended').dialog('close');
              }, 3000);
          }
      });
      $(".ui-dialog-overlay").css("opacity", "0.7");
      jQuery("#dialog_session_feedback_sended").show();
  });

  // Click function button cancel
  // $("#button_cancel_session_feedback_text").click(function() {
  //     jQuery("#dialog_modal_session_feedback").dialog('close');
  //     jQuery("#dialog_session_feedback_sended").dialog('close');
  // });
}

function showFeedbackDialog (chosen) {// Title ui modal
  var title_modal_session_feedback = "¡Envíenos sus comentarios!";
  if (chosen == "a") {
    // Faces
    $('#face-radio-buttons-session-feedback label').click(function() {
        $(this).addClass('selected').siblings().removeClass('selected');
    });
    var modal_session_feedback = jQuery("#dialog_modal_session_feedback_a");

    modal_session_feedback.dialog({
        title: title_modal_session_feedback,
        width: 700,
        height: 550,
        resizable: false,
        modal: true
    });
    $(".ui-dialog-overlay").css("opacity", "0.7");
    modal_session_feedback.show();

  } else { // chosen == "b"

    var modal_session_feedback = jQuery("#dialog_modal_session_feedback_b");
    modal_session_feedback.dialog({
        title: title_modal_session_feedback,
        width: 700,
        height: 550,
        resizable: false,
        modal: true
    });

    $(".ui-dialog-overlay").css("opacity", "0.7");
    modal_session_feedback.show();
  }
}