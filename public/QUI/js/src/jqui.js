(function() {
  var initOptions, quiInit;

  _.mixin(_.string.exports());

  $.fn.quiAboutBox = function(options) {
    var _this = this;
    if (options == null) {
      options = {};
    }
    return quiInit(this, function(el) {
      var $this, AboutBox, aboutBox;
      $this = $(el) || $(_this);
      AboutBox = require('qui/controls/aboutBox');
      aboutBox = new AboutBox(initOptions(_this, options));
      $this.data('quiAboutBox', aboutBox);
      $this.append(aboutBox.render());
      aboutBox.hide();
      return aboutBox;
    });
  };

  $.fn.quiAccordion = function(options) {
    var _this = this;
    if (options == null) {
      options = {};
    }
    return quiInit(this, function(el) {
      var $this, Accordion, accordion;
      $this = $(el) || $(_this);
      if ($this.is('ul')) {
        options.parent = $this;
      }
      Accordion = require('qui/controls/accordion');
      accordion = new Accordion(initOptions($this, options));
      $this.append(accordion.render());
      $this.data('quiAccordion', accordion);
      return accordion;
    });
  };

  $.fn.quiActionBar = function(options) {
    var _this = this;
    if (options == null) {
      options = {};
    }
    return quiInit(this, function(el) {
      var $this, ActionBar, actionBar;
      $this = $(el) || $(_this);
      ActionBar = require('qui/controls/actionBar');
      actionBar = new ActionBar(initOptions($this, options));
      $this.data('quiActionBar', actionBar);
      $this.append(actionBar.render());
      return actionBar;
    });
  };

  $.fn.quiAlert = function(options) {
    var _this = this;
    if (options == null) {
      options = {};
    }
    return quiInit(this, function(el) {
      var $this, Alert, alertCtrl;
      $this = $(el) || $(_this);
      Alert = require('qui/controls/alert');
      options.parent = $this;
      alertCtrl = new Alert(initOptions($this, options));
      $this.data('quiAlert', alertCtrl);
      $this.append(alertCtrl.render());
      alertCtrl.init();
      return alertCtrl;
    });
  };

  $.fn.quiAppHeader = function(options) {
    var _this = this;
    if (options == null) {
      options = {};
    }
    return quiInit(this, function(el) {
      var $this, AppHeader, appHeader;
      $this = $(el) || $(_this);
      AppHeader = require('qui/controls/appHeader');
      appHeader = new AppHeader(initOptions(_this, options));
      $this.data('quiAppHeader', appHeader);
      $this.append(appHeader.render());
      return appHeader;
    });
  };

  $.fn.quiBadge = function(options) {
    var _this = this;
    if (options == null) {
      options = {};
    }
    return quiInit(this, function(el) {
      var $this, Badge, badge;
      $this = $(el) || $(_this);
      Badge = require('qui/controls/badge');
      options.parent = $this;
      badge = new Badge(initOptions($this, options));
      $this.data('quiBadge', badge);
      $this.append(badge.render());
      badge.init();
      return badge;
    });
  };

  $.fn.quiButton = function(options) {
    var _this = this;
    if (options == null) {
      options = {};
    }
    return quiInit(this, function(el) {
      var $this, Button, button, items, opts;
      $this = $(el) || $(_this);
      $this.addClass('qui-button-outer-container');
      if ($this.is('button')) {
        options.parent = $this;
      } else {
        options.container = $this;
      }
      opts = initOptions($this, options);
      if ((opts.type != null) && opts.type === 'split') {
        Button = require('qui/controls/splitButton');
      } else if ((opts.type != null) && opts.type === 'dropdown') {
        Button = require('qui/controls/dropDownButton');
      } else {
        Button = require('qui/controls/button');
      }
      items = $this.find('ul > li');
      if (items.length > 0) {
        opts.menuItems = _(items).map(function(item) {
          return $(item).data();
        });
      }
      button = new Button(opts);
      $this.data('quiButton', button);
      $this.append(button.render());
      return button;
    });
  };

  $.fn.quiButtonSet = function(options) {
    var _this = this;
    if (options == null) {
      options = {};
    }
    return quiInit(this, function(el) {
      var $this, ButtonSet, buttonSet;
      $this = $(el) || $(_this);
      ButtonSet = require('qui/controls/buttonSet');
      buttonSet = new ButtonSet(initOptions($this, options));
      $this.data('quiButtonSet', buttonSet);
      $this.append(buttonSet.render());
      return buttonSet;
    });
  };

  $.fn.quiCalendar = function(options) {
    var _this = this;
    if (options == null) {
      options = {};
    }
    return quiInit(this, function(el) {
      var $this, Calendar, calendar;
      $this = $(el) || $(_this);
      Calendar = require('qui/controls/calendar');
      calendar = new Calendar(initOptions($this, options));
      $this.data('quiCalendar', calendar);
      $this.append(calendar.render());
      calendar.init();
      return calendar;
    });
  };

  $.fn.quiComboBox = function(options) {
    var _this = this;
    if (options == null) {
      options = {};
    }
    return quiInit(this, function(el) {
      var $this, ComboBox, comboBox;
      $this = $(el) || $(_this);
      ComboBox = require('qui/controls/comboBox');
      options.parent = $this;
      comboBox = new ComboBox(initOptions($this, options));
      $this.data('quiComboBox', comboBox);
      $this.append(comboBox.render());
      return comboBox;
    });
  };

  $.fn.quiDatePicker = function(options) {
    var _this = this;
    if (options == null) {
      options = {};
    }
    return quiInit(this, function(el) {
      var $this, DatePicker, datePicker;
      $this = $(el) || $(_this);
      DatePicker = require('qui/controls/datePicker');
      datePicker = new DatePicker(initOptions($this, options));
      $this.data('quiDatePicker', datePicker);
      $this.append(datePicker.render());
      datePicker.init();
      return datePicker;
    });
  };

  $.fn.quiDropDownList = function(options) {
    var _this = this;
    if (options == null) {
      options = {};
    }
    return quiInit(this, function(el) {
      var $this, DropDownList, dropDownList;
      $this = $(el) || $(_this);
      DropDownList = require('qui/controls/dropDownList');
      options.parent = $this;
      dropDownList = new DropDownList(initOptions($this, options));
      $this.data('quiDropDownList', dropDownList);
      $this.append(dropDownList.render());
      return dropDownList;
    });
  };

  $.fn.quiInsetPane = function(options) {
    var _this = this;
    if (options == null) {
      options = {};
    }
    return quiInit(this, function(el) {
      var $this, InsetPane, pane;
      $this = $(el) || $(_this);
      InsetPane = require('qui/controls/insetPane');
      options.parent = $this;
      pane = new InsetPane(initOptions($this, options));
      $this.data('quiInsetPane', pane);
      $this.append(pane.render());
      pane.init();
      return pane;
    });
  };

  $.fn.quiMenu = function(options) {
    var _this = this;
    if (options == null) {
      options = {};
    }
    return quiInit(this, function(el) {
      var $this, Menu, menu;
      $this = $(el) || $(_this);
      Menu = require('qui/controls/menu');
      menu = new Menu(initOptions($this, options));
      $this.data('quiMenu', menu);
      $this.append(menu.render());
      return menu;
    });
  };

  $.fn.quiModalDialog = function(options) {
    var _this = this;
    if (options == null) {
      options = {};
    }
    return quiInit(this, function(el) {
      var $this, Modal, modal, section;
      $this = $(el) || $(_this);
      Modal = require('qui/controls/modalDialog');
      modal = new Modal(initOptions($this, options));
      $this.data('quiModal', modal);
      section = $this.find('.qui-modal-content');
      if (section.length !== 0) {
        section.appendTo(modal.divContent);
        section.removeClass('qui-hidden');
      }
      $this.append(modal.render());
      return modal;
    });
  };

  $.fn.quiNavList = function(options) {
    var _this = this;
    if (options == null) {
      options = {};
    }
    return quiInit(this, function(el) {
      var $this, NavList, navList;
      $this = $(el) || $(_this);
      if ($this.is('ul')) {
        options.parent = $this;
      }
      NavList = require('qui/controls/navList');
      navList = new NavList(initOptions($this, options));
      $this.data('quiNavList', navList);
      $this.append(navList.render());
      navList.init();
      return navList;
    });
  };

  $.fn.quiNumericTextBox = function(options) {
    var _this = this;
    if (options == null) {
      options = {};
    }
    return quiInit(this, function(el) {
      var $this, NumericTextBox, numericTextBox;
      $this = $(el) || $(_this);
      NumericTextBox = require('qui/controls/numericTextBox');
      numericTextBox = new NumericTextBox(initOptions($this, options));
      $this.data('quiNumericTextBox', numericTextBox);
      $this.append(numericTextBox.render());
      numericTextBox.init();
      return numericTextBox;
    });
  };

  $.fn.quiPopover = function(options) {
    var _this = this;
    if (options == null) {
      options = {};
    }
    return quiInit(this, function(el) {
      var $this, Popover, popover;
      $this = $(el) || $(_this);
      Popover = require('qui/controls/popover');
      options.parent = _this;
      popover = new Popover(initOptions($this, options));
      $this.data('quiPopover', popover);
      return popover;
    });
  };

  $.fn.quiProcessBar = function(options) {
    var _this = this;
    if (options == null) {
      options = {};
    }
    return quiInit(this, function(el) {
      var $this, ProcessBar, processBar;
      $this = $(el) || $(_this);
      ProcessBar = require('qui/controls/processBar');
      processBar = new ProcessBar(initOptions($this, options));
      $this.append(processBar.render());
      $this.data('quiProcessBar', processBar);
      return processBar;
    });
  };

  $.fn.quiProgressBar = function(options) {
    var _this = this;
    return quiInit(this, function(el) {
      var $this, ProgressBar, progressBar;
      $this = $(el) || $(_this);
      ProgressBar = require('qui/controls/progressBar');
      progressBar = new ProgressBar(initOptions($this, options));
      $this.data('quiProgressBar', progressBar);
      $this.append(progressBar.render());
      return progressBar;
    });
  };

  $.fn.quiStartScreen = function(options) {
    var _this = this;
    return quiInit(this, function(el) {
      var $this, StartScreen, startScreen;
      $this = $(el) || $(_this);
      StartScreen = require('qui/controls/startScreen');
      startScreen = new StartScreen(initOptions($this, options));
      $this.data('quiStartScreen', startScreen);
      $this.append(startScreen.render());
      return startScreen;
    });
  };

  $.fn.quiSignIn = function(options) {
    var _this = this;
    if (options == null) {
      options = {};
    }
    return quiInit(this, function(el) {
      var $this, SignIn, signIn;
      $this = $(el) || $(_this);
      SignIn = require('qui/controls/signIn');
      signIn = new SignIn(initOptions($this, options));
      $this.data('quiSignIn', signIn);
      $this.append(signIn.render());
      return signIn;
    });
  };

  $.fn.quiSplitter = function(options) {
    var _this = this;
    if (options == null) {
      options = {};
    }
    return quiInit(this, function(el) {
      var $this, Splitter, splitter;
      $this = $(el) || $(_this);
      Splitter = require('qui/controls/splitter');
      options.parent = $this;
      splitter = new Splitter(initOptions($this, options));
      $this.data('quiSplitter', splitter);
      $this.append(splitter.render());
      splitter.init();
      return splitter;
    });
  };

  $.fn.quiTable = function(options) {
    var _this = this;
    if (options == null) {
      options = {};
    }
    return quiInit(this, function(el) {
      var $this, Table, table;
      $this = $(el) || $(_this);
      Table = require('qui/controls/table');
      options.parent = $this;
      table = new Table(initOptions($this, options));
      $this.append(table.render());
      $this.data('quiTable', table);
      return table;
    });
  };

  $.fn.quiTabStrip = function(options) {
    var _this = this;
    if (options == null) {
      options = {};
    }
    return quiInit(this, function(el) {
      var $i, $this, TabStrip, div, i, items, liItems, section, tabStrip, _i, _j, _len, _len1, _ref, _ref1;
      $this = $(el) || $(_this);
      TabStrip = require('qui/controls/tabStrip');
      tabStrip = new TabStrip(initOptions($this, options));
      $this.data('quiTabStrip', tabStrip);
      section = $this.find('.qui-tab-strip-content');
      if (section != null) {
        _ref = $(section).children('.qui-tab');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          div = _ref[_i];
          div = $(div);
          if (div.data('dropdown')) {
            liItems = div.find('li');
            items = [];
            for (_j = 0, _len1 = liItems.length; _j < _len1; _j++) {
              i = liItems[_j];
              $i = $(i);
              items.push({
                label: $i.data('label'),
                content: $i.html(),
                id: (_ref1 = $i.data('id')) != null ? _ref1 : new Date().getTime()
              });
            }
            tabStrip.add({
              label: div.data('tabLabel'),
              id: div.data('tabId'),
              dropDown: div.data('dropdown'),
              menuItems: items
            });
          } else {
            tabStrip.add({
              label: div.data('tabLabel'),
              content: div.html(),
              id: div.data('tabId')
            });
          }
        }
        section.remove();
      }
      $this.append(tabStrip.render());
      return tabStrip;
    });
  };

  $.fn.quiTextBox = function(options) {
    var _this = this;
    if (options == null) {
      options = {};
    }
    return quiInit(this, function(el) {
      var $this, TextBox, textBox;
      $this = $(el) || $(_this);
      TextBox = require('qui/controls/textBox');
      options.parent = $this;
      textBox = new TextBox(initOptions($this, options));
      $this.data('quiTextBox', textBox);
      $this.append(textBox.render());
      textBox.init();
      return textBox;
    });
  };

  $.fn.quiTimePicker = function(options) {
    var _this = this;
    if (options == null) {
      options = {};
    }
    return quiInit(this, function(el) {
      var $this, TimePicker, timePicker;
      $this = $(el) || $(_this);
      TimePicker = require('qui/controls/timePicker');
      timePicker = new TimePicker(initOptions($this, options));
      $this.data('quiTimePicker', timePicker);
      $this.append(timePicker.render());
      timePicker.init();
      return timePicker;
    });
  };

  $.fn.quiTitleBar = function(options) {
    var _this = this;
    if (options == null) {
      options = {};
    }
    return quiInit(this, function(el) {
      var $this, TitleBar, titleBar;
      $this = $(el) || $(_this);
      TitleBar = require('qui/controls/titleBar');
      titleBar = new TitleBar(initOptions($this, options));
      $this.data('quiTitleBar', titleBar);
      $this.append(titleBar.render());
      return titleBar;
    });
  };

  $.fn.quiTree = function(options) {
    var _this = this;
    if (options == null) {
      options = {};
    }
    return quiInit(this, function(el) {
      var $this, Tree, tree;
      $this = $(el) || $(_this);
      if ($this.is('ul')) {
        options.parent = $this;
      }
      Tree = require('qui/controls/tree');
      tree = new Tree(initOptions($this, options));
      $this.append(tree.render());
      $this.data('quiTree', tree);
      return tree;
    });
  };

  $.fn.quiInit = function(args) {
    this.find('[data-role="quiAlert"]').each(function() {
      return $(this).quiAlert();
    });
    this.find('[data-role="quiActionBar"]').each(function() {
      return $(this).quiActionBar();
    });
    this.find('[data-role="quiBadge"]').each(function() {
      return $(this).quiBadge();
    });
    this.find('[data-role="quiButton"]').each(function() {
      return $(this).quiButton();
    });
    this.find('[data-role="quiButtonSet"]').each(function() {
      return $(this).quiButtonSet();
    });
    this.find('[data-role="quiCalendar"]').each(function() {
      return $(this).quiCalendar();
    });
    this.find('[data-role="quiComboBox"]').each(function() {
      return $(this).quiComboBox();
    });
    this.find('[data-role="quiDatePicker"]').each(function() {
      return $(this).quiDatePicker();
    });
    this.find('[data-role="quiDropDownList"]').each(function() {
      return $(this).quiDropDownList();
    });
    this.find('[data-role="quiInsetPane"]').each(function() {
      return $(this).quiInsetPane();
    });
    this.find('[data-role="quiMenu"]').each(function() {
      return $(this).quiMenu();
    });
    this.find('[data-role="quiNavList"]').each(function() {
      return $(this).quiNavList();
    });
    this.find('[data-role="quiNumericTextBox"]').each(function() {
      return $(this).quiNumericTextBox();
    });
    this.find('[data-role="quiAccordion"]').each(function() {
      return $(this).quiAccordion();
    });
    this.find('[data-role="quiPopover"]').each(function() {
      return $(this).quiPopover();
    });
    this.find('[data-role="quiProgressBar"]').each(function() {
      return $(this).quiProgressBar();
    });
    this.find('[data-role="quiSplitter"]').each(function() {
      return $(this).quiSplitter();
    });
    this.find('[data-role="quiTabStrip"]').each(function() {
      return $(this).quiTabStrip();
    });
    this.find('[data-role="quiTable"]').each(function() {
      return $(this).quiTable();
    });
    this.find('[data-role="quiTextBox"]').each(function() {
      return $(this).quiTextBox();
    });
    this.find('[data-role="quiTimePicker"]').each(function() {
      return $(this).quiTimePicker();
    });
    this.find('[data-role="quiTree"]').each(function() {
      return $(this).quiTree();
    });
    return null;
  };

  initOptions = function(el, options) {
    return $.extend({}, el.data(), options);
  };

  quiInit = function(ctx, callback) {
    var el, instances, _i, _len;
    instances = [];
    for (_i = 0, _len = ctx.length; _i < _len; _i++) {
      el = ctx[_i];
      instances.push(callback(el));
    }
    if (instances.length === 1) {
      return instances[0];
    }
    return instances;
  };

}).call(this);
