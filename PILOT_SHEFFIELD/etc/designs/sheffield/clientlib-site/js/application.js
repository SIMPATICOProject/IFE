"use strict";

// Create global namespace to put stuff

var SCC = SCC || {};

// Initialiser

SCC.initialiser = {

  addFile: function() { // show a notice
    $('a.scc_add-file').click(function(e) {
      e.preventDefault();
      $(this).closest('fieldset').find('div.scc_form-group:first').clone().prependTo($(this).parent());
    });
  },

  showNotice: function() { // show a notice
    $('a.scc_show-notice').click(function(e) {
      e.preventDefault();
      $(this).parent().next('div.scc_notice').removeClass('scc_hide');
    });
  },

  contactQuestion: function() { // control the contact form
    $('div.scc_contact-content').on('click','a.scc_ask-question',function(e) {
      e.preventDefault();
      $(this).closest('div.scc_contact-content').addClass('scc_hide');
      $(this).closest('div.scc_contact').find('div.scc_contact-form').removeClass('scc_hide');
    });

    $('div.scc_contact-form header').on('click','a.scc_hide',function(e) {
      e.preventDefault();
      $(this).closest('div.scc_contact-form').addClass('scc_hide');
      $(this).closest('div.scc_contact').find('div.scc_contact-content').removeClass('scc_hide');
    });

    $('div.scc_contact-form-success').on('click','a.scc_hide',function(e) {
      e.preventDefault();
      $(this).closest('div.scc_contact-form-success').addClass('scc_hide');
      $(this).closest('div.scc_contact').find('div.scc_contact-content').removeClass('scc_hide');
    });

    // this bottom function should be removed. it was just for testing to show the success message
    $('div.scc_contact-form').on('click','button',function(e) {
      e.preventDefault();
      $(this).closest('div.scc_contact-form').addClass('scc_hide');
      $(this).closest('div.scc_contact').find('div.scc_contact-form-success').removeClass('scc_hide');
    });
  },

  scrollToPosition: function() { // smooth scrolling
    $('body').on('click','.scc_scroll',function(e) {
      e.preventDefault();
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 250);
      }
    });
  },

  findRoadworks: function() { // to reveal the roadworks tables
    $('button.scc_roadworks-finder').click(function(e) {
      e.preventDefault();
      $(this).closest('form').find('div.scc_roadworks-info').addClass('scc_show');
    });
  }, 

  findRecyclingCentres: function() { // to reveal the roadworks tables
    $('button.scc_recycling-centres-finder').click(function(e) {
      e.preventDefault();
      $(this).closest('form').find('div.scc_recycling-centres-info').addClass('scc_show');
    });
  }, 

  findBinDays: function() { // to reveal the Bin day tables
    $('button.scc_bin-day-finder').click(function(e) {
      e.preventDefault();
      $(this).closest('form').find('div.scc_bin-day-info').addClass('scc_show');
    });
  }, 

  findAddress: function() { // to reveal the address list
    $('button.scc_address-finder').click(function(e) {
      e.preventDefault();
      $('p.scc_chosen-address').remove();
      $('div.scc_address-manual').removeClass('scc_show');
      $(this).closest('div.scc_form-group').find('div.scc_address-list').addClass('scc_show');
    });
  }, 

  chooseAddress: function() { // choose an address
    $('div.scc_address-list').on('click','label',function(e) {
      e.preventDefault();
      var chosenAddress = $(this).find('span').text();
      $('div.scc_address-list').removeClass('scc_show');
      $('div.scc_address-list').before('<p class="scc_chosen-address"><b>Address selected:</b> '+chosenAddress+'</p>');
    });
  },

  manualAddress: function() { // manually add an address
    $('a.scc_address-manual').click(function(e) {
      e.preventDefault();
      $('p.scc_chosen-address').remove();
      $('div.scc_address-list').removeClass('scc_show');
      $('div.scc_address-manual').addClass('scc_show');
      $('div.scc_address-manual > div:first-child input').focus();
    });
  }, 

  pageWidgets: function() { // found on the right hand side of the dom on large desktops
    $('div.scc_main').after('<div class="scc_page-widgets"><ul><li><a href="#" class="scc_icon-share"><span>Share</span></a><li><li><a href="#" class="scc_icon-bookmark"><span>Bookmark</span></a><li><li><a href="#" class="scc_icon-speech"><span>Translate</span></a><li><li><a href="#" class="scc_icon-printer"><span>Print</span></a><li></ul></div>');
  },
// Is this needed?
  hideCookieInfo: function() { // found at the top of the dom
    $('div.scc_cookie-info a.scc_button').click(function(e) {
      e.preventDefault();
      //$('div.scc_cookie-info').slideUp();

      // update cookie...
    });
  },

  hideAnnouncement: function() { // homepage header announcement
    $('.scc_announcement').on('click','a.scc_hide',function(e) {
      e.preventDefault();
      $(this).parent().remove();

      // update cookie...
    });
  },

  hideNotice: function() { // general notices with a 'close' link
    $('.scc_notice').on('click','a.scc_hide',function(e) {
      e.preventDefault();
      $(this).parent().remove();

      // update cookie...
    });
  },

  mobileSearch: function() { // mobile search
    $('div.scc_header.scc_internal div.scc_site-search label').on('click','span.scc_button',function() {
      $(this).closest('div.scc_form-group').addClass('scc_search-open');
      $(this).closest('div.scc_form-group').append('<a href="#" class="scc_icon-times-after scc_hide">Close</a>');
      $('body').addClass('scc_site-search-bg');
    });

    $(document).on('click touchstart',function() {
      $('.scc_search-open').find('a.scc_hide').remove();
      $('.scc_search-open').removeClass('scc_search-open');
      $('body').removeClass('scc_site-search-bg');
    });

    $('div.scc_site-search div.scc_form-group').on('click','a.scc_hide',function(e) {
      e.preventDefault();
      $('.scc_search-open').removeClass('scc_search-open');
      $('body').removeClass('scc_site-search-bg');
      $(this).remove();
    });

    $('div.scc_site-search fieldset').on('click touchstart',function(e) {
      e.stopPropagation();
    });
  },

  searchSuggestions: function() { // main search suggestions - demo js to make the box appear
    $('input#scc_search').keyup(function() {
      $('div.scc_search-suggestions').addClass('scc_show');
    });

    $('input#scc_search').blur(function() {
      $('div.scc_search-suggestions').removeClass('scc_show');
    });
  },

  dynamicForms: function() { // used to reveal different forms on the same page
    $('div.scc_dynamic-forms div.scc_form').each(function(){
      $(this).addClass('scc_hide');
    });

    $('div.scc_dynamic-forms .scc_button-funnels').on('click','a.scc_button',function(e) {
      e.preventDefault();
      var formID = this.hash;

      $('div.scc_dynamic-forms .scc_button-funnels a.scc_button.scc_selected').removeClass('scc_selected');
      $(this).addClass('scc_selected');
      $('div.scc_dynamic-forms div.scc_form').addClass('scc_hide');
      $(this).closest('div.scc_dynamic-forms').find(formID).removeClass('scc_hide');
    });
  },

  dynamicRadio: function() { // show/hide the next fields depending which is checked
    $('label.scc_dynamic-radio').click(function() {
      var radio = $(this).prev('input:radio'),
          radioID = $(radio).attr('id'),
          dynamicFormGroups = $(this).closest('div.scc_form-group').next('div.scc_dynamic-form-groups');

      $(dynamicFormGroups).find('div.scc_form-group').addClass('scc_hide');
      $(dynamicFormGroups).find('div#'+radioID).removeClass('scc_hide');
    });
  },

  dynamicCheckbox: function() { // show/hide the next field depending if checked
    $('label.scc_dynamic-checkbox').click(function() {
      var checkbox = $(this).prev('input:checkbox'),
          formGroup = $(this).closest('div.scc_form-group').next('div.scc_form-group');

      if ($(checkbox).prop('checked')) {
        $(formGroup).addClass('scc_hide');
      } else {
        $(formGroup).removeClass('scc_hide');
      }
    });
  },

  dynamicInfo: function() { // content pages 
    $('.scc_dynamic-info').each(function() {
      $(this).find('a.scc_cta').addClass('scc_icon-chevron-down');
      $(this).find('div.scc_text').addClass('scc_hide');
    });

    $('.scc_dynamic-info').on('click','a.scc_cta',function(e) {
      e.preventDefault();
      $(this).toggleClass('scc_open');
      $(this).toggleClass('scc_icon-chevron-down scc_icon-chevron-up');
      $(this).closest('.scc_dynamic-info').find('div.scc_text').toggleClass('scc_hide');
    });
  },

  councilServices: function() { // homepage 
    $('.scc_council-services ul.scc_services').each(function() {
      var elems = $(this).find('li').length;
      if(elems > 8) {
        $(this).addClass('scc_hide');
        $(this).after('<p class="scc_show-services"><a href="#" class="scc_button scc_icon-plus-after">View more council services</a></p>');
      }
    });

    $('p.scc_show-services').on('click','a',function(e) {
      e.preventDefault();
      $(this).parent().prev('ul.scc_services').removeClass('scc_hide');
      $(this).parent().remove();
    });
  },

  serviceHubIntro: function() { // service hub page 
    $('div.scc_service-intro').each(function() {
      $(this).addClass('scc_hide');
      $(this).after('<p class="scc_show-intro"><a href="#" class="scc_icon-plus-after">Read more about this service</a></p>');
    });

    $('p.scc_show-intro').on('click','a',function(e) {
      e.preventDefault();
      $(this).parent().prev('div.scc_service-intro').removeClass('scc_hide');
      $(this).parent().remove();
    });
  },
    
  serviceInfo: function() { // service hub page 
    $('div.scc_service-info h3 a').each(function() {
      $(this).addClass('scc_icon-chevron-down');
    });
      
    $('div.scc_service-info-more h3 a').each(function() {
      $(this).addClass('scc_icon-chevron-down');
    });  

    $('div.scc_service-info ul.scc_row').each(function() {
      $(this).addClass('scc_hide');
    });
      
    $('div.scc_service-info-more ul.scc_row').each(function() {
      $(this).addClass('scc_hide');
    });  

    $('div.scc_service-info h3').unbind().on('click','a',function(e) {
      e.preventDefault();
      $(this).toggleClass('scc_hide');
      $(this).closest('div.scc_col').find('ul.scc_row').toggleClass('scc_hide');
      $(this).toggleClass('scc_icon-chevron-down scc_icon-chevron-up');
    });
      
    $('div.scc_service-info-more h3').unbind().on('click','a',function(e) {
      e.preventDefault();
      $(this).toggleClass('scc_hide');
      $(this).closest('div.scc_col').find('ul.scc_row').toggleClass('scc_hide');
      $(this).toggleClass('scc_icon-chevron-down scc_icon-chevron-up');
    });  
      
  },

  buttonFunnels: function() { // button funnels - usually service hub
    $('ul.scc_button-funnels').each(function() {
      var elems = $(this).find('li').length;
      if(elems > 4) {
        $(this).addClass('scc_hide-buttons');
        if(elems < 9) {
          $(this).addClass('scc_alt');
        }
        $(this).after('<p class="scc_show-buttons"><a href="#" class="scc_button scc_icon-plus-after">View more tasks</a></p>');
      }
    });

    $('p.scc_show-buttons').on('click','a',function(e) {
      e.preventDefault();
      $(this).parent().prev('ul.scc_button-funnels').removeClass('scc_hide-buttons');
      $(this).parent().remove();
    });
  },
};

// Call functions

$(document).ready(function() {
  var scci = SCC.initialiser;

  scci.addFile();
  scci.showNotice();
  scci.contactQuestion();
  scci.scrollToPosition();
  scci.findRoadworks();
  scci.findRecyclingCentres();
  scci.findBinDays();
  scci.findAddress();
  scci.chooseAddress();
  scci.manualAddress();
  //scci.pageWidgets();
  scci.hideCookieInfo();
  scci.hideAnnouncement();
  scci.hideNotice();
  scci.mobileSearch();
  // scci.searchSuggestions();
  scci.dynamicForms();
  scci.dynamicRadio();
  scci.dynamicCheckbox();
  scci.dynamicInfo();
  scci.councilServices();
  scci.serviceHubIntro();
  scci.serviceInfo();
  scci.buttonFunnels();
});

$(window).resize(function() {
  var scci = SCC.initialiser;

  // call functions if need to be run on resize
  // eg: scci.functionName();
});