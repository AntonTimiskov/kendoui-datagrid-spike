
(function(/*! Stitch !*/) {
  if (!this.require) {
    var modules = {}, cache = {}, require = function(name, root) {
      var path = expand(root, name), module = cache[path], fn;
      if (module) {
        return module.exports;
      } else if (fn = modules[path] || modules[path = expand(path, './index')]) {
        module = {id: path, exports: {}};
        try {
          cache[path] = module;
          fn(module.exports, function(name) {
            return require(name, dirname(path));
          }, module);
          return module.exports;
        } catch (err) {
          delete cache[path];
          throw err;
        }
      } else {
        throw 'module \'' + name + '\' not found';
      }
    }, expand = function(root, name) {
      var results = [], parts, part;
      if (/^\.\.?(\/|$)/.test(name)) {
        parts = [root, name].join('/').split('/');
      } else {
        parts = name.split('/');
      }
      for (var i = 0, length = parts.length; i < length; i++) {
        part = parts[i];
        if (part == '..') {
          results.pop();
        } else if (part != '.' && part != '') {
          results.push(part);
        }
      }
      return results.join('/');
    }, dirname = function(path) {
      return path.split('/').slice(0, -1).join('/');
    };
    this.require = function(name) {
      return require(name, '');
    }
    this.require.define = function(bundle) {
      for (var key in bundle)
        modules[key] = bundle[key];
    };
  }
  return this.require.define;
}).call(this)({"qui/controls/aboutBox": function(exports, require, module) {(function() {
  var AboutBox, AboutBoxView, DEFAULT_MODAL, EVENT_HIDE_ABOUTBOX, EVENT_SHOW_ABOUTBOX, View, ViewModel,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ViewModel = require('qui/viewModel');

  View = require('qui/view');

  EVENT_SHOW_ABOUTBOX = 'show';

  EVENT_HIDE_ABOUTBOX = 'hide';

  DEFAULT_MODAL = {
    backdrop: true,
    keyboard: true,
    show: false
  };

  /*
    arguments:
    applicationPatents
    licenses
    thirdParty
    modal
  */


  module.exports = AboutBox = (function(_super) {

    __extends(AboutBox, _super);

    AboutBox.prototype.defaults = {
      applicationName: "Product for Platform",
      applicationLogoPath: '',
      version: '0.0.0'
    };

    function AboutBox(args) {
      var setup,
        _this = this;
      AboutBox.__super__.constructor.call(this, args);
      if (this.options.foo != null) {
        this.foo = foo;
      }
      setup = function(callback) {
        var contactTab, licenseTab, tab, tabs, thirdPartyTab, _i, _len;
        callback();
        _this.setView(AboutBoxView, _this.options);
        _this.modal = function(options) {
          return _this.$el.modal(options || DEFAULT_MODAL);
        };
        _this.tabStrip = _this.$el.find('.qui-tab-strip').quiTabStrip();
        tabs = [
          {
            label: "About",
            content: _this.view.about(),
            id: 'about'
          }
        ];
        licenseTab = {
          label: "Licenses",
          content: _this.get('licenses') != null ? _this.view.applicationLicenses() : void 0,
          id: 'licenses'
        };
        thirdPartyTab = {
          label: "Legal Notices",
          content: _this.get('thirdParty') != null ? _this.view.legalNotices() : void 0,
          id: 'legal'
        };
        contactTab = {
          label: "Contact",
          content: _this.view.contact(),
          id: 'contact'
        };
        if (_this.get('licenses') != null) {
          tabs.push(licenseTab);
        }
        if (_this.get('thirdParty') != null) {
          tabs.push(thirdPartyTab);
        }
        tabs.push(contactTab);
        for (_i = 0, _len = tabs.length; _i < _len; _i++) {
          tab = tabs[_i];
          _this.tabStrip.add(tab);
        }
        _this.actionBar = _this.$('.action-bar-container').quiActionBar(_this.version() ? {
          label: "Version <span class='qui-application-version'>" + (_this.version()) + "</span>"
        } : void 0);
        _this.actionBar.addAction({
          label: 'Done',
          onClick: function() {
            return _this.hide();
          }
        });
        _this.applicationName.onChanged(function(e) {
          return _this.$el.find('div.qui-product-info > h4').html(e.newValue);
        });
        _this.applicationLogoPath.onChanged(function(e) {
          return _this.$el.find('.qui-product-logo img').attr('src', e.newValue);
        });
        _this.version.onChanged(function(e) {
          return _this.actionBar.label("Version <span class='qui-application-version'>" + e.newValue + "</span>");
        });
        _this.bind(EVENT_SHOW_ABOUTBOX, function() {
          return _this.show();
        });
        _this.bind(EVENT_HIDE_ABOUTBOX, function() {
          return _this.hide();
        });
        _this.$el.hide();
        _this.modal(_this.options.modal || DEFAULT_MODAL);
        _this.$el.find('table.qui_licenses').quiTable({
          scrollable: true
        });
        _this.$el.find('table.qui_legal').quiTable({
          scrollable: true
        });
        _this.$el.find('.qui-table-container').css('max-height', 280);
        return _this.$el.find('.qui-table-container .k-grid-content').css('max-height', 249);
      };
      setup(function() {
        var _legal, _licenses;
        if (!_(_this.options.thirdParty).isNull()) {
          _legal = _this.options.thirdParty;
          if (_(_legal).isString()) {
            $.get(_legal, function(data) {
              return _this.options.legal = data;
            });
          } else {
            _this.options.legal = _legal;
          }
        }
        if (!_(_this.options.licenses).isNull()) {
          _licenses = _this.options.licenses;
          if (_(_licenses).isString()) {
            return $.get(_licenses, data(function() {
              return _this.options.licenses = data;
            }));
          } else {
            return _this.options.licenses = _licenses;
          }
        }
      });
    }

    AboutBox.prototype.show = function() {
      return this.modal('show');
    };

    AboutBox.prototype.hide = function() {
      return this.modal('hide');
    };

    return AboutBox;

  })(ViewModel);

  AboutBoxView = (function(_super) {

    __extends(AboutBoxView, _super);

    function AboutBoxView() {
      return AboutBoxView.__super__.constructor.apply(this, arguments);
    }

    AboutBoxView.prototype.errorList = [];

    AboutBoxView.prototype.root = "<div class=\"modal fade qui-modal-dialog qui\" id=\"quiAboutBox\">\n  <div class=\"modal-body\">\n    <div class='qui-tab-strip'></div>\n    <div class='action-bar-container'></div>\n</div>";

    AboutBoxView.prototype.about = "<div id='about'>\n  <%= tmpl.getAppLogo() %>\n  <div class='qui-product-info'>\n    <h4><%= tmpl.applicationName %></h4>\n    <p class='copyright'>\n      &copy; 2012 Quest Software<br/>\n      ALL RIGHTS RESERVED\n    </p>\n    <p class='patents'>\n      Protected by U.S. Patents #<%= tmpl.applicationPatents %>. Additional patents pending.\n    </p>\n    <p class='legal'>\n      Quest, Quest Software, the Quest Software Logo, and Simplicity at Work are trademarks and registered trademarks of Quest Software. <br/>For a complete list of our trademarks, please see <a href='http://www.quest.com/legal/trademark-information.aspx' target='_blank'>www.quest.com/legal/trademark-information.aspx</a>. <br/>All other trademarks are property of their respective owners.\n    </p>\n  </div>\n</div>";

    AboutBoxView.prototype.getAppLogo = function() {
      if ((this.applicationLogoPath != null) && this.applicationLogoPath !== '') {
        return "<div class='qui-product-logo'><img src='" + this.applicationLogoPath + "'/></div>";
      }
    };

    AboutBoxView.prototype.applicationLicenses = "<div id='licenses'>\n  <h4>Quest Licenses</h4>\n  <table class='qui_licenses'>\n    <thead>\n      <tr>\n      <% _.each(tmpl.licenses.table.schema, function(item){ %>\n        <th data-field='<%= item.attribute %>'><%= item.header %></th>\n      <% }); %>\n      </tr>\n    </thead>\n    <tbody>\n    <% _.each(tmpl.licenses.table.data, function(item){ %>\n      <tr>\n      <% _.each(tmpl.licenses.table.schema, function(schema){ %>\n        <% if (item.error != null && item.error.column == schema.attribute) { %>\n          <% tmpl.errorCount += 1; tmpl.errorList.push(item.error); %>\n          <td> <span class='qui_error'>\n        <% } else { %>\n          <td>\n        <% } %>\n            <%= item[schema.attribute] %>\n        <% if (item.error != null && item.error.column == schema.attribute) { %>\n          <sup>*</sup>\n          </span>\n        <% } %>\n          </td>\n      <% }); %>\n      </tr>\n    <% }); %>\n    </tbody>\n  </table>\n  <%= tmpl.errors() %>\n</div>";

    AboutBoxView.prototype.errors = '<div class=\'qui_error_list\'>\n  <ul>\n    <%= tmpl.condenseErrors() %>\n  </ul>\n</div>';

    AboutBoxView.prototype.condenseErrors = function() {
      var errors;
      errors = _(_.pluck(this.errorList, 'message')).uniq();
      if (errors.length === 1) {
        return "<li class='qui_error'>* " + errors[0] + "</li>";
      }
    };

    AboutBoxView.prototype.legalNotices = "<div id='legal'>\n  <h4>Third Party Components</h4>\n  <table class='qui_legal'>\n    <thead>\n      <tr>\n       <th>Component</th>\n       <th>Legal Notice</th>\n      </tr>\n    </thead>\n    <tbody>\n      <% window.tmpl = tmpl; %>\n      <% _(tmpl.thirdParty.components).each( function(component) { %>\n        <tr>\n          <td><%= component.name %> <% if (component.version) { %> <%= component.version %> <% } %></td>\n          <td>\n            <% if (component.license.name) { %>\n              This component is governed by the <%= component.license.name %> license.<br/>\n            <% } %>\n            <% if (component.license.notice) { %>\n              <%= component.license.notice %><br/>\n            <% } %>\n            <% if (component.license.name) { %>\n              <a href='http://www.quest.com/legal/third-party-licenses.aspx' target='_blank'>Third party licenses</a>\n            <% } %>\n            <% if (component.source) { %>\n              <br/>\n              <a href='<%= component.source %>' target='_blank'>Source code</a>\n            <% } %>\n          </td>\n        </tr>\n      <% }); %>\n    </tbody>\n  </table>\n</div>";

    AboutBoxView.prototype.contact = "<div id='contact'>\n  <h4>Contact Us</h4>\n\n  <div>\n    <span class='qui_description'>Product Questions & Sales:</span>\n    <span class='qui_content'>(800) 306-9239</span>\n  </div>\n  \n  <div>\n    <span class='qui_description'>Technical Support:</span>\n    <span class='qui_content'>\n      <a href='http://support.quest.com/' target='_blank'>Quest Support</a>\n    </span>\n  </div>\n  \n  <div>\n    <span class='qui_description' id='qui_global_hq'>\n      Global Headquarters:<br/>\n      <a href='http://www.quest.com/company/contact-us.aspx' target='_blank'>Local Offices</a>\n      </span>\n    <span class='qui_content'>\n      Quest Software <br/>\n      5 Polaris Way <br/>\n      Aliso Viejo, CA 92656 <br/>\n      Phone: (949) 754-8000 <br/>\n      Fax: (949) 754-8999\n    </span>\n  </div>\n</div>";

    return AboutBoxView;

  })(View);

}).call(this);
}, "qui/controls/accordion": function(exports, require, module) {(function() {
  var Accordion, AccordionView, EVENT_SELECT, View, ViewModel,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ViewModel = require('qui/viewModel');

  View = require('qui/view');

  EVENT_SELECT = 'select';

  module.exports = Accordion = (function(_super) {

    __extends(Accordion, _super);

    Accordion.prototype.defaults = {
      dataSource: null,
      expandMode: 'multiple'
    };

    function Accordion(args) {
      var o, _kendo,
        _this = this;
      Accordion.__super__.constructor.call(this, args);
      this.setView(AccordionView, this.options);
      o = {};
      if (this.dataSource()) {
        o.dataSource = this.dataSource();
      }
      o.expandMode = this.expandMode();
      _kendo = this.$el.kendoPanelBar(o);
      this.kendo = _kendo.data('kendoPanelBar');
      this.$el.data('quiAccordion', this);
      this.kendo.wrapper.wrap('<div class="qui-accordion-container"></div>');
      this.kendo.wrapper.addClass('qui-accordion qui');
      if (!_.str.include(navigator.userAgent, 'MSIE')) {
        this.kendo.wrapper.parent().append('<svg class="qui-mask"></svg>');
      } else {
        this.kendo.wrapper.addClass('qui-mask-shadow');
      }
      this.initKendo(['append', 'collapse', 'enable', 'expand', 'insertAfter', 'insertBefore', 'reload', 'remove']);
      this.kendo.unbind('select');
      this.rebind(EVENT_SELECT, function(v) {
        var _base;
        return typeof (_base = _this.onSelect()) === "function" ? _base(v) : void 0;
      });
      this.kendo.bind("select", function(e) {
        var dataItem, i, index, item, len, menuElement, _i;
        item = $(e.item);
        if (_this.dataSource() != null) {
          menuElement = item.closest(".k-menu");
          dataItem = _this.options.dataSource;
          index = item.parentsUntil(menuElement, ".k-item").map(function() {
            return $(this).index();
          }).get().reverse();
          index.push(item.index());
          len = index.length;
          for (i = _i = 0; 0 <= len ? _i < len : _i > len; i = 0 <= len ? ++_i : --_i) {
            dataItem = dataItem[index[i]];
            if (i < len - 1) {
              dataItem = dataItem.items;
            }
          }
          return _this.trigger(EVENT_SELECT, dataItem);
        } else {
          return _this.trigger(EVENT_SELECT, item);
        }
      });
      if (this.width()) {
        this.$el.css('width', this.width());
        this.kendo.wrapper.parent().css('width', this.width());
      }
    }

    return Accordion;

  })(ViewModel);

  AccordionView = (function(_super) {

    __extends(AccordionView, _super);

    function AccordionView() {
      return AccordionView.__super__.constructor.apply(this, arguments);
    }

    AccordionView.prototype.root = '<div class=\'qui-accordion-container qui\'>\n</div>';

    return AccordionView;

  })(View);

}).call(this);
}, "qui/controls/actionBar": function(exports, require, module) {(function() {
  var ActionBar, ActionBarView, Button, View, ViewModel,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ViewModel = require('qui/viewModel');

  View = require('qui/view');

  Button = require('qui/controls/button');

  module.exports = ActionBar = (function(_super) {

    __extends(ActionBar, _super);

    ActionBar.prototype.defaults = {
      label: ''
    };

    function ActionBar(args) {
      var _this = this;
      ActionBar.__super__.constructor.call(this, args);
      this._buttons = [];
      this._actions = [];
      this.setView(ActionBarView, this.options);
      this.divActions = this.$('.qui-actions');
      this.divLabel = this.$('.qui-action-bar-label');
      this.label.onChanged(function(e) {
        return _this.divLabel.html(e.newValue);
      });
      this.enabled.onChanged(function(e) {
        var btn, _i, _len, _ref, _results;
        _ref = _this._buttons;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          btn = _ref[_i];
          _results.push(btn.enabled(e.newValue));
        }
        return _results;
      });
    }

    ActionBar.prototype.addAction = function(action) {
      this._actions.push(action);
      return this.syncActions();
    };

    ActionBar.prototype.getAction = function(actionId) {
      return _(this._buttons).find(function(btn) {
        return btn.options.actionId === actionId;
      });
    };

    ActionBar.prototype.syncActions = function() {
      var action, btn, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _results;
      this.divActions.html('');
      this._buttons = [];
      _ref = this._actions;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        action = _ref[_i];
        this._buttons.push(new Button($.extend({
          actionId: (_ref1 = action.actionId) != null ? _ref1 : action.actionId = '',
          label: (_ref2 = action.label) != null ? _ref2 : action.label = 'button',
          onClick: action.onClick,
          hoverOnly: (_ref3 = action.hoverOnly) != null ? _ref3 : action.hoverOnly = false,
          isDefault: (_ref4 = action.isDefault) != null ? _ref4 : action.isDefault = true,
          size: (_ref5 = action.size) != null ? _ref5 : action.size = 'medium'
        }, action)));
      }
      _ref6 = this._buttons;
      _results = [];
      for (_j = 0, _len1 = _ref6.length; _j < _len1; _j++) {
        btn = _ref6[_j];
        _results.push(this.divActions.append(btn.$el));
      }
      return _results;
    };

    ActionBar.prototype.clearActions = function() {
      this.divActions.html('');
      this._buttons = [];
      return this._actions = [];
    };

    return ActionBar;

  })(ViewModel);

  ActionBarView = (function(_super) {

    __extends(ActionBarView, _super);

    function ActionBarView() {
      return ActionBarView.__super__.constructor.apply(this, arguments);
    }

    ActionBarView.prototype.root = '<div class=\'modal-footer qui-action-bar qui\'>\n  <div class=\'qui-action-bar-label\'><%= tmpl.label %></div>\n  <div class=\'qui-actions\'></div>\n</div>';

    return ActionBarView;

  })(View);

}).call(this);
}, "qui/controls/alert": function(exports, require, module) {(function() {
  var Alert, AlertView, EVENT_CLOSE, EVENT_CLOSED, View, ViewModel,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ViewModel = require('qui/viewModel');

  View = require('qui/view');

  EVENT_CLOSE = "alert:close";

  EVENT_CLOSED = "alert:closed";

  module.exports = Alert = (function(_super) {

    __extends(Alert, _super);

    Alert.prototype.defaults = {
      closeButton: true,
      title: "Alert:",
      message: "",
      onClose: null,
      onClosed: null
    };

    function Alert(args) {
      Alert.__super__.constructor.call(this, args);
      this.setView(AlertView, this.options);
    }

    Alert.prototype.render = function() {
      this.$el = $(this.options.parent);
      return null;
    };

    Alert.prototype.init = function() {
      var _this = this;
      this.$el.addClass(this.view.cssClass());
      this.$el.children().wrap("<div class='qui-alert-user-content'></div>");
      this.$el.prepend(this.view.closeButtonHtml());
      this.$el.prepend(this.view.titleHtml());
      this.$el.alert();
      this.$el.bind('close', function() {
        return _this.trigger(EVENT_CLOSE);
      });
      this.$el.bind('closed', function() {
        return _this.trigger(EVENT_CLOSED);
      });
      this.bind(EVENT_CLOSE, function() {
        var _base;
        return typeof (_base = _this.onClose()) === "function" ? _base() : void 0;
      });
      return this.bind(EVENT_CLOSED, function() {
        var _base;
        return typeof (_base = _this.onClosed()) === "function" ? _base() : void 0;
      });
    };

    Alert.prototype.close = function() {
      return this.$el.alert('close');
    };

    return Alert;

  })(ViewModel);

  AlertView = (function(_super) {

    __extends(AlertView, _super);

    function AlertView() {
      return AlertView.__super__.constructor.apply(this, arguments);
    }

    AlertView.prototype.root = "";

    AlertView.prototype.cssClass = function() {
      var ret;
      ret = "qui-alert alert fade in";
      if (this.title != null) {
        ret += " alert-block";
      }
      return ret;
    };

    AlertView.prototype.closeButtonHtml = function() {
      if (this.closeButton === false) {
        return "";
      } else {
        return "<a class=\"close\" data-dismiss=\"alert\"><i class='icon-remove'></i></a>";
      }
    };

    AlertView.prototype.titleHtml = function() {
      if (this.title != null) {
        return "<span class='qui-alert-img' width='26' height='26'></span>\n<span class=\"qui-alert-title alert-heading\"> " + this.title + " </span>\n<span class=\"qui-alert-message\"> " + this.message + " </span>";
      } else {
        return '';
      }
    };

    return AlertView;

  })(View);

}).call(this);
}, "qui/controls/appHeader": function(exports, require, module) {(function() {
  var AboutBox, AppHeader, AppHeaderView, Button, View, ViewModel,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ViewModel = require('qui/viewModel');

  View = require('qui/view');

  AboutBox = require('./aboutBox');

  Button = require('./button');

  module.exports = AppHeader = (function(_super) {

    __extends(AppHeader, _super);

    AppHeader.prototype.defaults = {
      questLogoUrl: 'http://quest.com',
      productLogoUrl: '',
      productLogoPath: '',
      aboutBoxOptions: null,
      userName: 'user',
      controls: false,
      theme: 'blue'
    };

    function AppHeader(args) {
      var disable, enable, syncControls,
        _this = this;
      AppHeader.__super__.constructor.call(this, args);
      this.setView(AppHeaderView, this.options);
      $('body').css('padding-top', '60px');
      this.aboutBox = new AboutBox(this.aboutBoxOptions());
      this.user = this.$('.btnUser').quiButton({
        type: 'icon',
        size: 'small',
        icon: 'user',
        iconStyle: 'white',
        label: this.userName()
      });
      this.settings = this.$('.btnSettings').quiButton({
        type: 'icon',
        size: 'small',
        icon: 'cog',
        iconStyle: 'white'
      });
      this.help = this.$('.btnHelp').quiButton({
        type: 'icon',
        size: 'small',
        icon: 'question-sign',
        iconStyle: 'white',
        onClick: function() {
          return _this.trigger('aboutBox:show');
        }
      });
      this.productLogoPath.onChanged(function(e) {
        return _this.$el.find('img.product-logo').attr('src', e.newValue);
      });
      this.productLogoUrl.onChanged(function(e) {
        return _this.$el.find('a.brand').attr('href', e.newValue);
      });
      this.userName.onChanged(function(e) {
        return _this.user.label(e.newValue);
      });
      this.theme.onChanged(function(e) {
        return _this.$el.find('.navbar-inner').toggleClass("qui-navbar-" + e.oldValue + " qui-navbar-" + e.newValue);
      });
      this.bind('controls:hide', function() {
        return _this.$('.qui-controls').hide();
      });
      this.bind('controls:show', function() {
        return _this.$('.qui-controls').show();
      });
      enable = function(control) {
        var ctrl;
        ctrl = _this[control];
        ctrl.visible(true);
        return ctrl.$el.parent().parent().next().show();
      };
      disable = function(control) {
        var ctrl;
        ctrl = _this[control];
        ctrl.visible(false);
        return ctrl.$el.parent().parent().next(':not(.qui-divider-last)').hide();
      };
      syncControls = function(controls) {
        var ctrl, ctrls, k, last, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _results;
        ctrls = ['user', 'settings', 'help'];
        if (controls === true) {
          for (_i = 0, _len = ctrls.length; _i < _len; _i++) {
            ctrl = ctrls[_i];
            enable(ctrl);
          }
        }
        if (controls === false) {
          for (_j = 0, _len1 = ctrls.length; _j < _len1; _j++) {
            ctrl = ctrls[_j];
            disable(ctrl);
          }
        }
        if (_(controls).isObject()) {
          for (_k = 0, _len2 = ctrls.length; _k < _len2; _k++) {
            ctrl = ctrls[_k];
            disable(ctrl);
          }
          if (_(controls).keys().length === 3 && _(controls).all(function(val, key) {
            return val === true;
          }) === true) {
            for (_l = 0, _len3 = ctrls.length; _l < _len3; _l++) {
              ctrl = ctrls[_l];
              enable(ctrl);
            }
            return;
          }
          last = null;
          _results = [];
          for (_m = 0, _len4 = ctrls.length; _m < _len4; _m++) {
            k = ctrls[_m];
            if (controls[k] === true) {
              enable(k);
            }
            if (controls[k] === false) {
              _results.push(disable(k));
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        }
      };
      syncControls(this.controls());
      this.controls.onChanged(function(e) {
        return syncControls(e.newValue);
      });
      this.$el.find('#aboutBox').click(function() {
        return _this.trigger('aboutBox:show');
      });
      this.bind('aboutBox:show', function() {
        return _this.aboutBox.show();
      });
      /*
          Args:
              label: string
              onClick : optional
              menuItems: []
              
          appHeader.initUser({
            label: "John Bodington",
            onClick: function() {
            
            },
            menuItems: [
              {
                label: ""
                id: ""
                onClick: function
              },
            ]
          })
      */

      this.initUser = function(args) {
        var item, _i, _len, _ref, _results;
        if ((args.onClick != null) && (args.menuItems != null)) {
          if (typeof console !== "undefined" && console !== null) {
            console.log('appHeader.initUser cannot have both onClick and menuItems defined');
          }
          return;
        }
        if (args.label != null) {
          _this.user.label(args.label);
        }
        if ((args.onClick != null) && !(args.menuItems != null)) {
          return _this.user.onClick(args.onClick);
        } else {
          _this.user.onClick(null);
          _this.user.initDropdown({
            on: 'button'
          });
          _ref = args.menuItems;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            item = _ref[_i];
            _results.push(_this.user.menu.add(item));
          }
          return _results;
        }
      };
    }

    AppHeader.prototype.addControl = function(control) {
      var args, ctrl, divControls, el, options, wrap,
        _this = this;
      divControls = this.$el.find('.qui-controls > ul');
      wrap = function(el) {
        var divider, out;
        divider = $('<li class="divider-vertical qui-divider-small">');
        out = $('<li>');
        out.append(el);
        divControls.append(divider);
        return divControls.append(out);
      };
      if (control instanceof ViewModel) {
        wrap(control.render());
        return control;
      } else if (control instanceof jQuery) {
        return wrap(control);
      } else {
        args = control;
        if ($.fn[args.control] === void 0) {
          return;
        }
        options = args.options || {};
        el = $('<span>');
        ctrl = el[args.control](options);
        this[control] = ctrl;
        return wrap(ctrl.render());
      }
    };

    AppHeader.prototype.addButton = function(args) {
      var ctrl, defaults, el;
      defaults = {
        type: 'icon',
        size: 'small'
      };
      args = _.extend(defaults, args);
      el = $('<span>');
      ctrl = el.quiButton(args);
      return this.addControl(ctrl);
    };

    AppHeader.prototype.addDropDown = function(args) {
      var ctrl, defaults, el, item, _i, _len, _ref;
      defaults = {
        icon: '',
        label: ''
      };
      args = _.extend(defaults, args, {
        type: 'icon',
        size: 'small'
      });
      el = $('<span>');
      ctrl = el.quiButton(args);
      ctrl.initDropdown({
        on: 'button'
      });
      if (args.menuItems != null) {
        _ref = args.menuItems;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          ctrl.menu.add(item);
        }
      }
      return this.addControl(ctrl);
    };

    return AppHeader;

  })(ViewModel);

  AppHeaderView = (function(_super) {

    __extends(AppHeaderView, _super);

    function AppHeaderView() {
      return AppHeaderView.__super__.constructor.apply(this, arguments);
    }

    AppHeaderView.prototype.root = "<div class=\"qui-app-header qui navbar navbar-fixed-top qui-s\">\n  <div class=\"navbar-inner qui-app-header-inner qui-navbar-<%= tmpl.theme %>\">\n\n\n      <%= tmpl.standardControls() %>\n\n      <% if (tmpl.productLogoPath) { %>\n        <a <% if (tmpl.productLogoUrl) { %> href='<%= tmpl.productLogoUrl %>' <% };%>class='brand'>\n          <img class='product-logo' src='<%= tmpl.productLogoPath %>'/>\n        </a>\n      <% } %>\n\n\n    <div class='quest-logo pull-right'>\n      <a target='_blank' href='<%= tmpl.questLogoUrl %>'><span class='logo-holder'></span></a>\n    </div>\n\n  </div>\n</div>";

    AppHeaderView.prototype.standardControls = "<div class=\"nav-collapse pull-right qui-controls\">\n  <ul class=\"nav\">\n    <li><span class='btnUser'></span></li>\n    <li class='divider-vertical qui-divider-small'/>\n    <li><span class='btnSettings'></span></li>\n    <li class='divider-vertical qui-divider-small'/>\n    <li><span class='btnHelp'></span></li>\n  </ul>\n\n</div>";

    AppHeaderView.prototype.helpMenu = '<li class=\'dropdown\' id=\'helpMenu\'>\n  <span class=\'btnHelp\'></span>\n  <a data-toggle=\'dropdown\' class=\'dropdown\' href=\'#helpMenu\'>\n    <div class=\'icon-question-sign icon-white\'></div>\n    <b class=\'caret\'></b>\n  </a>\n  <ul class=\'dropdown-menu\'>\n    <li id=\'aboutBox\'><a href=\'#\'>About</a></li>\n  </ul>\n</li>';

    return AppHeaderView;

  })(View);

}).call(this);
}, "qui/controls/badge": function(exports, require, module) {(function() {
  var Badge, EVENT_CLICK, View, ViewModel,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ViewModel = require('qui/viewModel');

  View = require('qui/view');

  EVENT_CLICK = "click";

  module.exports = Badge = (function(_super) {

    __extends(Badge, _super);

    Badge.prototype.defaults = {
      type: 'default',
      value: 0,
      onClick: null
    };

    function Badge(args) {
      var _this = this;
      Badge.__super__.constructor.call(this, args);
      this.value.onChanged(function(e) {
        return _this.$el.html("" + (_this.value()));
      });
    }

    Badge.prototype.render = function() {
      this.$el = $(this.options.parent);
      this.$el.html("" + (this.value()));
      return null;
    };

    Badge.prototype.init = function() {
      var _this = this;
      this.$el.addClass("qui-badge badge");
      if (this.type() !== 'default') {
        this.$el.addClass("badge-" + (this.type()));
      }
      this.bind(EVENT_CLICK, function() {
        var _base;
        return typeof (_base = _this.onClick()) === "function" ? _base() : void 0;
      });
      return this.$el.click(function() {
        return _this.trigger(EVENT_CLICK);
      });
    };

    return Badge;

  })(ViewModel);

}).call(this);
}, "qui/controls/button": function(exports, require, module) {(function() {
  var Button, ButtonView, DropDownMixin, View, ViewModel,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ViewModel = require('qui/viewModel');

  View = require('qui/view');

  DropDownMixin = require('./dropDownMixin');

  module.exports = Button = (function(_super) {

    __extends(Button, _super);

    /*
        Button:
          type: [push, dropdown, split, icon] # {type: icon} requires @icon to be set, 
                defaults to 'trash'
          size: [mini, small, medium, large]
          label: string
          icon: string
          default: bool # true = blue, false = silver
          hoverOnly: bool # only show button chrome on hover, only on [SML] {type: push}
    */


    Button.prototype.defaults = {
      type: 'push',
      size: 'medium',
      label: '',
      icon: '',
      isDefault: true,
      hoverOnly: false,
      onClick: null
    };

    function Button(args) {
      var iconContainer, setIcon, _ref,
        _this = this;
      Button.__super__.constructor.call(this, args);
      this.setView(ButtonView, this.options);
      this.btnEl = this.$el;
      this.btnEl.bind('click', function(e) {
        return _this.trigger('click', e);
      });
      this.bind('click', function(e) {
        var _base;
        if (!_this.enabled()) {
          if (e != null) {
            e.preventDefault();
          }
          return false;
        }
        return typeof (_base = _this.onClick()) === "function" ? _base(e) : void 0;
      });
      iconContainer = this.btnEl.find('.qui-icon-container');
      setIcon = function(icon) {
        if (/\.(jpg|png|gif|jpeg)/.test(icon)) {
          return iconContainer.css('background', "url(" + icon + ")").addClass('icon-custom-image');
        } else {
          return iconContainer.addClass("icon-" + icon);
        }
      };
      if (this.icon() !== '') {
        setIcon(this.icon());
      }
      if ((_ref = this.options.container) != null ? _ref.is('.qui-button-outer-container') : void 0) {
        this._parent = this.options.container;
      } else {
        this._parent = this.options.parent;
      }
      if (this.hoverOnly()) {
        this.isDefault(false);
        this.btnEl.removeClass('qui-btn-blue');
        this.btnEl.addClass('qui-btn-silver');
      }
      if (this.type() === 'icon') {
        this.btnEl.removeClass('qui-btn-blue qui-btn-silver');
      }
      this.label.onChanged(function(e) {
        return _this.btnEl.find('.qui-button-label').html(e.newValue);
      });
      this.icon.onChanging(function(e) {
        if (_this.type() === 'icon' && !(e.newValue != null)) {
          throw "Cannot set icon to null";
        }
      });
      this.icon.onChanged(function(e) {
        iconContainer = _this.btnEl.find('.qui-icon-container');
        iconContainer.removeClass("icon-" + e.oldValue);
        if (e.newValue !== null) {
          return setIcon(e.newValue);
        }
      });
      this.type.onChanging(function(e) {
        if (e.oldValue === 'push' || e.oldValue === 'icon') {
          if (e.newValue === 'dropdown' || e.newValue === 'split') {
            e.cancel = true;
            throw "Cannot dynamically change type from " + e.oldValue + " to " + e.newValue + ".";
          }
        }
      });
      this.type.onChanged(function(e) {
        return _this.btnEl.toggleClass("qui-btn-" + e.oldValue + " qui-btn-" + e.newValue);
      });
      this.isDefault.onChanged(function(e) {
        if (_this.isDefault()) {
          _this.btnEl.addClass('qui-btn-blue');
          return _this.btnEl.removeClass('qui-btn-silver');
        } else {
          _this.btnEl.removeClass('qui-btn-blue');
          return _this.btnEl.addClass('qui-btn-silver');
        }
      });
      if (this.type() !== 'split') {
        this.enabled.onChanged(function(e) {
          if (e.newValue === true) {
            return _this.btnEl.removeClass('disabled');
          } else if (e.newValue === false) {
            return _this.btnEl.addClass('disabled');
          }
        });
      }
    }

    return Button;

  })(ViewModel);

  ViewModel.include(Button, new DropDownMixin());

  ButtonView = (function(_super) {

    __extends(ButtonView, _super);

    function ButtonView() {
      return ButtonView.__super__.constructor.apply(this, arguments);
    }

    ButtonView.prototype.root = "<button class='btn qui <%= tmpl.btnSize() %> <%= tmpl.btnType() %> <%= tmpl.btnDefault() %> <%= tmpl.btnHoverOnly() %> <%= tmpl.btnEnabledClass() %>' <%= tmpl.btnEnabledAttr() %>>\n  <span class='qui-btn-hover'>\n    <%= tmpl.btnIcon() %>\n    <%= tmpl.btnLabel() %>\n  </span>\n</button>";

    ButtonView.prototype.btnHoverOnly = function() {
      if (this.hoverOnly) {
        return "qui-btn-hover-only";
      }
    };

    ButtonView.prototype.btnDefault = function() {
      if (this.isDefault) {
        return 'qui-btn-blue';
      } else {
        return 'qui-btn-silver';
      }
    };

    ButtonView.prototype.btnSize = function() {
      if (!_(['mini', 'small', 'medium', 'large']).include(this.size)) {
        return;
      }
      return "qui-btn-" + this.size;
    };

    ButtonView.prototype.btnType = function() {
      if (!_(['push', 'dropdown', 'split', 'icon']).include(this.type)) {
        return;
      }
      return "qui-btn-" + this.type;
    };

    ButtonView.prototype.btnIcon = "<i class='qui-icon-container icon'></i>";

    ButtonView.prototype.btnLabel = "<span class='qui-button-label'>\n  <%= tmpl.label %>\n</span>";

    ButtonView.prototype.btnEnabledClass = function() {
      if (this.enabled === false) {
        return 'disabled';
      }
    };

    ButtonView.prototype.btnEnabledAttr = function() {
      return '';
    };

    return ButtonView;

  })(View);

}).call(this);
}, "qui/controls/buttonSet": function(exports, require, module) {(function() {
  var ButtonSet, ButtonSetView, Collection, InputButton, View, ViewModel,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ViewModel = require('qui/viewModel');

  View = require('qui/view');

  Collection = require('qui/core/mvc/collection');

  InputButton = require('qui/controls/inputButton');

  module.exports = ButtonSet = (function(_super) {

    __extends(ButtonSet, _super);

    ButtonSet.prototype.defaults = {
      horizontal: false,
      name: '',
      type: 'radio',
      selectedChanged: null,
      orientationChanged: null,
      typeChanged: null
    };

    function ButtonSet(args) {
      var addControlToView, itemsUl,
        _this = this;
      ButtonSet.__super__.constructor.call(this, args);
      this.setView(ButtonSetView, this.options);
      this.items = new Collection();
      itemsUl = this.$el.find('.qui-button-set');
      this.horizontal.onChanged(function() {
        itemsUl.toggleClass('qui-horizontal qui-vertical');
        return _this.trigger('orientationChanged', _this.horizontal() ? 'horizontal' : 'vertical');
      });
      this.type.onChanged(function(e) {
        _this.items.each(function(item) {
          return item.type(e.newValue);
        });
        return _this.trigger('typeChanged', e.newValue);
      });
      this.$el.find('input').change(function(e) {
        alert('hello');
        return _this.trigger('selectedChanged', e);
      });
      this.bind('selectedChanged', function(e) {
        var item, items, obj, _base, _i, _len;
        obj = {};
        items = _this.items.filter(function(item) {
          return item.$input.is(':checked');
        });
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          item = items[_i];
          obj[item.value()] = {
            label: item.label(),
            name: item.name(),
            value: item.value()
          };
        }
        return typeof (_base = _this.selectedChanged()) === "function" ? _base(obj) : void 0;
      });
      this.bind('orientationChanged', function(e) {
        var _base;
        return typeof (_base = _this.orientationChanged()) === "function" ? _base(e) : void 0;
      });
      this.bind('typeChanged', function(e) {
        var _base;
        return typeof (_base = _this.typeChanged()) === "function" ? _base(e) : void 0;
      });
      addControlToView = function(ctr) {
        var li;
        li = $('<li class="qui-button-set-control"/>');
        li.html(ctr.$el);
        itemsUl.append(li);
        return ctr.$el.find('input').change(function(e) {
          return _this.trigger('selectedChanged', e);
        });
      };
      this.add = function(opts) {
        var button;
        if (!((opts.label != null) && (opts.value != null))) {
          if (typeof console !== "undefined" && console !== null) {
            console.log('ButtonSet.add: Label and Value required');
          }
          return _this;
        }
        button = new InputButton({
          name: _this.name() || _this._cid,
          label: opts.label,
          value: opts.value,
          type: _this.type(),
          buttonSet: _this,
          targetId: opts.targetId || null
        });
        _this.items.add(button, opts);
        addControlToView(button);
        return _this;
      };
      this.clear = function() {
        this.items.reset();
        itemsUl.html('');
        return null;
      };
    }

    ButtonSet.prototype.items = null;

    ButtonSet.prototype.select = function(value) {
      var btn;
      btn = this.getButton(value);
      return btn.$el.find('input').click();
    };

    ButtonSet.prototype.getButton = function(value) {
      return this.items.find(function(item) {
        return item.value() === value;
      });
    };

    ButtonSet.prototype.getSelectedItems = function() {
      var items;
      items = this.items.filter(function(item) {
        return item.$input.is(':checked');
      });
      return _(items).map(function(item) {
        return item.value();
      });
    };

    return ButtonSet;

  })(ViewModel);

  ButtonSetView = (function(_super) {

    __extends(ButtonSetView, _super);

    function ButtonSetView() {
      return ButtonSetView.__super__.constructor.apply(this, arguments);
    }

    ButtonSetView.prototype.root = "<span class='qui qui-button-set-container'>\n  <ul class='qui-button-set <%= tmpl.ulOrientation() %>'></ul>\n</span>";

    ButtonSetView.prototype.ulOrientation = function() {
      if (this.horizontal) {
        return "qui-horizontal";
      } else {
        return "qui-vertical";
      }
    };

    return ButtonSetView;

  })(View);

}).call(this);
}, "qui/controls/calendar": function(exports, require, module) {(function() {
  var Calendar, CalendarView, View, ViewModel,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ViewModel = require('qui/viewModel');

  View = require('qui/view');

  module.exports = Calendar = (function(_super) {

    __extends(Calendar, _super);

    Calendar.prototype.defaults = {};

    function Calendar(args) {
      var _kendo;
      Calendar.__super__.constructor.call(this, args);
      this.setView(CalendarView, this.options);
      if (this.width()) {
        this.$el.css('width', this.width());
      }
      _kendo = this.$el.kendoCalendar(this.options);
      this.kendo = _kendo.data('kendoCalendar');
      this.$el.data('quiCalendar', this);
      this.initKendo(['max', 'min', 'navigate', 'navigateDown', 'navigateToFuture', 'navigateToPast', 'navigateUp', 'value']);
    }

    Calendar.prototype.init = function() {
      return typeof console !== "undefined" && console !== null ? console.log('Calendar.init() is deprecated. Please remove the reference') : void 0;
    };

    return Calendar;

  })(ViewModel);

  CalendarView = (function(_super) {

    __extends(CalendarView, _super);

    function CalendarView() {
      return CalendarView.__super__.constructor.apply(this, arguments);
    }

    CalendarView.prototype.root = '<div class=\'qui qui-calendar-container\'></div>';

    return CalendarView;

  })(View);

}).call(this);
}, "qui/controls/comboBox": function(exports, require, module) {(function() {
  var ComboBox, ComboBoxView, View, ViewModel,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ViewModel = require('qui/viewModel');

  View = require('qui/view');

  module.exports = ComboBox = (function(_super) {

    __extends(ComboBox, _super);

    function ComboBox(args) {
      ComboBox.__super__.constructor.call(this, args);
      this.setView(ComboBoxView, this.options);
      if (this.options.width) {
        this.$el.css('width', this.options.width);
      }
      this.$el.kendoComboBox(this.options);
      this.kendo = this.$el.data('kendoComboBox');
      if (this.options.width) {
        this.kendo.popup.element.css('width', this.options.width - 6);
      }
      this.initKendo(['close', 'dataItem', 'enable', 'refresh', 'search', 'select', 'suggest', 'text', 'toggle', 'value']);
      this.dataSource = this.kendo.dataSource;
      this.$el = this.$el.parent();
      this.kendo.wrapper.addClass('qui qui-combo-box');
      this.kendo.popup.element.addClass('qui qui-combo-box-popup');
    }

    ComboBox.prototype.init = function() {
      return typeof console !== "undefined" && console !== null ? console.log('ComboBox: function `init` deprecated.') : void 0;
    };

    ComboBox.prototype.render = function() {
      if ($(this.options.parent).is('select')) {
        this.$el = $(this.options.parent);
        return null;
      } else {
        this.$el = $(this.view.root());
        return this.$el;
      }
    };

    return ComboBox;

  })(ViewModel);

  ComboBoxView = (function(_super) {

    __extends(ComboBoxView, _super);

    function ComboBoxView() {
      return ComboBoxView.__super__.constructor.apply(this, arguments);
    }

    ComboBoxView.prototype.root = '<select class=\'qui qui-combo-box\'></select>';

    return ComboBoxView;

  })(View);

}).call(this);
}, "qui/controls/datePicker": function(exports, require, module) {(function() {
  var DatePicker, DatePickerView, View, ViewModel,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ViewModel = require('qui/viewModel');

  View = require('qui/view');

  module.exports = DatePicker = (function(_super) {

    __extends(DatePicker, _super);

    DatePicker.prototype.defaults = {
      format: "M/d/yyyy"
    };

    function DatePicker(args) {
      DatePicker.__super__.constructor.call(this, args);
      this.setView(DatePickerView, this.options);
    }

    DatePicker.prototype.init = function() {
      var inputs;
      if (this.width()) {
        this.$el.css('width', this.width());
      }
      this.$el.kendoDatePicker(this.options);
      this.kendo = this.$el.data('kendoDatePicker');
      $(this.kendo.dateView.popup.element).addClass('qui-date-picker-popup');
      this.initKendo(['close', 'enable', 'max', 'min', 'open', 'value']);
      inputs = this.$el.parent().parent().parent().find('.k-datepicker');
      if (inputs.length > 1) {
        return inputs.last().remove();
      }
    };

    return DatePicker;

  })(ViewModel);

  DatePickerView = (function(_super) {

    __extends(DatePickerView, _super);

    function DatePickerView() {
      return DatePickerView.__super__.constructor.apply(this, arguments);
    }

    DatePickerView.prototype.root = '<input class=\'qui qui-date-picker\'></input>';

    return DatePickerView;

  })(View);

}).call(this);
}, "qui/controls/dropDownButton": function(exports, require, module) {(function() {
  var Button, ButtonView, DropDownButton, View, ViewModel, qui,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ViewModel = require('qui/viewModel');

  View = require('qui/view');

  Button = require('./button');

  qui = require('qui');

  module.exports = DropDownButton = (function(_super) {

    __extends(DropDownButton, _super);

    function DropDownButton(args) {
      var item, _i, _len, _ref;
      DropDownButton.__super__.constructor.call(this, args);
      this.addProps({
        menuItems: []
      });
      this.setView(ButtonView, this.options);
      this.btnEl = this.$el.find('.btn');
      this.menu = new qui.controls.Menu;
      _ref = this.menuItems();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        this.menu.add(item);
      }
      this.$el.append(this.menu.ulMenu);
    }

    DropDownButton.prototype.render = function() {
      return this.$el;
    };

    return DropDownButton;

  })(Button);

  ButtonView = (function(_super) {

    __extends(ButtonView, _super);

    function ButtonView() {
      return ButtonView.__super__.constructor.apply(this, arguments);
    }

    ButtonView.prototype.root = "<span class='btn-group qui qui-dropdown-root <%= tmpl.btnType() %>'>\n  <%= tmpl.mainBtn() %>\n</span>";

    ButtonView.prototype.mainBtn = "<button class='btn <%= tmpl.btnStyle() %> <%= tmpl.btnEnabledClass() %> main-button dropdown-toggle' data-toggle='dropdown' <%= tmpl.btnEnabledAttr() %>>\n  <%= tmpl.btnIcon() %>\n  <%= tmpl.btnLabel() %>\n  <span class='caret'></span>\n</button>";

    ButtonView.prototype.btnStyle = "<%= tmpl.btnSize() %> <%= tmpl.btnDefault() %>";

    ButtonView.prototype.btnSize = function(size) {
      if (size == null) {
        size = this.size;
      }
      if (!_(['small', 'medium', 'large']).include(size)) {
        return;
      }
      return "qui-btn-" + size;
    };

    ButtonView.prototype.btnDefault = function() {
      if (this.isDefault) {
        return 'qui-btn-blue';
      } else {
        return 'qui-btn-silver';
      }
    };

    ButtonView.prototype.btnType = "qui-btn-dropDown";

    ButtonView.prototype.btnIcon = "<i class='icon qui-icon-container <%= tmpl.getIcon() %>'></i>";

    ButtonView.prototype.getIcon = function() {
      if (this.icon) {
        return "icon-" + this.icon;
      }
    };

    ButtonView.prototype.btnLabel = "<span class='qui-button-label'>\n  <%= tmpl.label %>\n</span>";

    ButtonView.prototype.btnEnabledClass = function() {
      if (this.enabled === false) {
        return 'disabled';
      }
    };

    ButtonView.prototype.btnEnabledAttr = function() {
      return '';
    };

    return ButtonView;

  })(View);

}).call(this);
}, "qui/controls/dropDownList": function(exports, require, module) {(function() {
  var DropDownList, DropDownListView, View, ViewModel,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ViewModel = require('qui/viewModel');

  View = require('qui/view');

  module.exports = DropDownList = (function(_super) {

    __extends(DropDownList, _super);

    DropDownList.prototype.defaults = {
      dataTextField: 'label',
      dataValueField: 'value',
      targetId: null
    };

    function DropDownList(args) {
      DropDownList.__super__.constructor.call(this, args);
      this.setView(DropDownListView, this.options);
      this.$el.kendoDropDownList(this.options);
      this.kendo = this.$el.data('kendoDropDownList');
      this.initKendo(['close', 'dataItem', 'enable', 'open', 'refresh', 'search', 'select', 'text', 'toggle', 'value']);
      this.dataSource = this.kendo.dataSource;
      this.$el = this.$el.parent();
      this.kendo.wrapper.addClass('qui qui-dropdownlist');
      this.kendo.popup.element.addClass('qui qui-dropdownlist-popup');
      if (this.width()) {
        this.$el.css('width', this.width());
      }
    }

    DropDownList.prototype.init = function() {
      return typeof console !== "undefined" && console !== null ? console.log('quiDropDownList.init() is deprecated. You no longer have to call this method') : void 0;
    };

    DropDownList.prototype.render = function() {
      if ($(this.options.parent).is('select')) {
        this.$el = $(this.options.parent);
        return null;
      } else {
        this.$el = $(this.view.root());
        return this.$el;
      }
    };

    return DropDownList;

  })(ViewModel);

  DropDownListView = (function(_super) {

    __extends(DropDownListView, _super);

    function DropDownListView() {
      return DropDownListView.__super__.constructor.apply(this, arguments);
    }

    DropDownListView.prototype.root = '<select <%= tmpl.getTargetId() %> class=\'qui qui-dropdownlist\'></select>';

    DropDownListView.prototype.getTargetId = function() {
      if (this.targetId != null) {
        return "id='" + this.targetId + "'";
      }
    };

    DropDownListView.prototype.renderItems = function() {
      var str;
      str = '';
      _(this.items).each(function(i) {
        if (i.label != null) {
          return str += "<option>" + i.label + "</option>";
        } else {
          return str += "<option>" + i + "</option>";
        }
      });
      return str;
    };

    return DropDownListView;

  })(View);

}).call(this);
}, "qui/controls/dropDownMixin": function(exports, require, module) {(function() {
  var DropDownMixin, Menu;

  Menu = require('qui/controls/menu');

  module.exports = DropDownMixin = (function() {

    function DropDownMixin() {}

    /*
      Initializes the dropDown functionality.
    
      options: 
        ul: jQuery object of the ul of items for the menu.
        holder: jQuery object where the menu should be appended to.
    */


    DropDownMixin.prototype.initDropdown = function(options, callback) {
      var Tab, i, id, item, items, tab, _i, _item, _j, _k, _len, _len1, _len2, _p, _ref, _ref1,
        _this = this;
      this.menu = new Menu();
      if (options.on === 'button') {
        if (_.include(['pill', 'link'], this.type())) {
          return;
        }
        if (options.ul != null) {
          items = $(options.ul).find('li');
        }
        if (items != null) {
          for (_i = 0, _len = items.length; _i < _len; _i++) {
            item = items[_i];
            this.menu.add($(item).data());
          }
        }
        if (options.ul != null) {
          $(options.ul).remove();
        }
        if (this.type() !== 'split') {
          this.$el.attr('data-toggle', 'dropdown');
          this.$el.addClass('dropdown-toggle');
        }
        if (this.$el.is('button')) {
          this.$el = this.$el.wrap("<span class='btn-group qui-dropdown-root qui-button-type-" + (this.type()) + "'>");
          this.$el.append('<span class="caret">');
          _p = this.$el.parent();
        } else {
          _p = $(options.holder).find('.qui-dropdown-root');
        }
        if (this.type() === 'split') {
          _p = this.$el;
        } else {
          this.$el = _p;
        }
        return $(_p).append(this.menu.ulMenu);
      } else if (options.on === 'tab') {
        Tab = require('qui/controls/tab');
        this.addContent = function(tab) {
          var t;
          t = new Tab(tab);
          _this.tabStrip.contentContainer.append("<div class='tab-pane' id='" + t.id + "'>" + (t.content()) + "</div>");
          return t;
        };
        if (options.ul != null) {
          items = $(options.ul).find('li');
          this.divContent.html('');
          for (_j = 0, _len1 = items.length; _j < _len1; _j++) {
            item = items[_j];
            i = $(item).data();
            i.id = "" + i.id + "_" + this._cid;
            i.href = "#" + i.id;
            i.toggle = 'tab';
            i.onClick = function() {
              return _this.tabStrip.select(i.id);
            };
            _item = $(item).wrap('<div>');
            this.menu.add(i);
            this.addContent({
              content: $(item).html(),
              id: i.id
            });
          }
        }
        _ref = options.menuItems;
        for (_k = 0, _len2 = _ref.length; _k < _len2; _k++) {
          item = _ref[_k];
          id = (_ref1 = item.id) != null ? _ref1 : (new Date()).getTime();
          tab = this.addContent({
            content: item.content,
            id: id
          });
          item.id = tab.id;
          item.href = "#" + item.id;
          item.toggle = 'tab';
          item.onClick = function(e) {
            return _this.tabStrip.select(_($(e.target).attr('href')).strRightBack('#'));
          };
          this.menu.add(item);
        }
        this.liTab.addClass('dropdown');
        this.liTab.find('a').attr('href', '#');
        this.liTab.find('a').attr('data-toggle', 'dropdown').addClass('dropdown-toggle');
        this.liTab.find('a').append("<b class='caret'></b>");
        return this.liTab.append(this.menu.ulMenu);
      }
    };

    return DropDownMixin;

  })();

}).call(this);
}, "qui/controls/index": function(exports, require, module) {(function() {

  module.exports = {
    AboutBox: require('./aboutBox'),
    Accordion: require('./accordion'),
    ActionBar: require('./actionBar'),
    Alert: require('./alert'),
    AppHeader: require('./appHeader'),
    Badge: require('./badge'),
    Button: require('./button'),
    ButtonSet: require('./buttonSet'),
    Calendar: require('./calendar'),
    ComboBox: require('./comboBox'),
    DatePicker: require('./datePicker'),
    DropDownList: require('./dropDownList'),
    InsetPane: require('./insetPane'),
    Menu: require('./menu'),
    ModalDialog: require('./modalDialog'),
    NavList: require('./navList'),
    NumericTextBox: require('./numericTextBox'),
    Popover: require('./popover'),
    ProcessBar: require('./processBar'),
    ProgressBar: require('./progressBar'),
    SignIn: require('./signIn'),
    Splitter: require('./splitter'),
    StartScreen: require('./startScreen'),
    Table: require('./table'),
    TabStrip: require('./tabStrip'),
    TextBox: require('./textBox'),
    TimePicker: require('./timePicker'),
    Tree: require('./tree')
  };

}).call(this);
}, "qui/controls/inputButton": function(exports, require, module) {(function() {
  var Collection, InputButton, InputButtonView, View, ViewModel,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ViewModel = require('qui/viewModel');

  View = require('qui/view');

  Collection = require('qui/core/mvc/collection');

  module.exports = InputButton = (function(_super) {

    __extends(InputButton, _super);

    InputButton.prototype.defaults = {
      horizontal: false,
      name: '',
      label: '',
      type: 'radio',
      value: null,
      targetId: null
    };

    function InputButton(args) {
      var _this = this;
      InputButton.__super__.constructor.call(this, args);
      this.setView(InputButtonView, this.options);
      this.$input = this.$el.find('.qui-input-button');
      this.type.onChanged(function(e) {
        var _type;
        _type = function(val) {
          return "qui-" + val + "-button-container";
        };
        _this.$el.removeClass(_type(e.oldValue));
        _this.$el.addClass(_type(e.newValue));
        return _this.$el.find('.qui-input-button')[0].type = e.newValue;
      });
    }

    return InputButton;

  })(ViewModel);

  InputButtonView = (function(_super) {

    __extends(InputButtonView, _super);

    function InputButtonView() {
      return InputButtonView.__super__.constructor.apply(this, arguments);
    }

    InputButtonView.prototype.root = "<span class='qui <%= tmpl.outerClass() %>'>\n  <label <%= tmpl.forId() %>>\n    <input <%= tmpl.inputId() %> <%= tmpl.inputAttributes() %>>\n    <span><%= tmpl.label %></span>\n  </label>\n</span>";

    InputButtonView.prototype.inputAttributes = "class='qui-input-button' type='<%= tmpl.type %>' name='<%= tmpl.name %>' value='<%= tmpl.value %>'";

    InputButtonView.prototype.forId = function() {
      if (this.targetId != null) {
        return "for='" + this.targetId + "'";
      }
    };

    InputButtonView.prototype.inputId = function() {
      if (this.targetId != null) {
        return "id='" + this.targetId + "'";
      }
    };

    InputButtonView.prototype.outerClass = "qui-<%= tmpl.type %>-button-container";

    return InputButtonView;

  })(View);

}).call(this);
}, "qui/controls/insetPane": function(exports, require, module) {(function() {
  var EVENT_COLLAPSE, EVENT_EXPAND, InsetPane, InsetPaneView, View, ViewModel,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ViewModel = require('qui/viewModel');

  View = require('qui/view');

  EVENT_EXPAND = "insetPane:expand";

  EVENT_COLLAPSE = "insetPane:collapse";

  module.exports = InsetPane = (function(_super) {

    __extends(InsetPane, _super);

    InsetPane.prototype.defaults = {
      title: "",
      collapsible: true,
      onCollapse: null,
      onExpand: null
    };

    function InsetPane(args) {
      InsetPane.__super__.constructor.call(this, args);
      this.setView(InsetPaneView, this.options);
    }

    InsetPane.prototype.render = function() {
      this.$el = $(this.options.parent);
      this.userContent = this.$el.contents();
      return null;
    };

    InsetPane.prototype.init = function() {
      var collapsibleContainer, hoverIn, hoverOut,
        _this = this;
      this.$el.addClass(this.view.cssClass());
      this.$el.append(this.view.inner());
      collapsibleContainer = this.$el.find('.qui-inset-pane-user-content');
      collapsibleContainer.append(this.userContent);
      collapsibleContainer.collapse({
        toggle: false
      });
      this.$el.find('.qui-inset-pane-title-container').click(function() {
        if (_this.options.collapsible) {
          _this.collapse('toggle');
          return _this.toggleCollapsibleIcon();
        }
      });
      if (this.options.collapsible) {
        this.$el.find('.qui-inset-left-gutter').addClass('qui-collapsible-hover');
      }
      hoverIn = function() {
        return _this.$el.find('.qui-caret').css({
          opacity: 1.0
        });
      };
      hoverOut = function() {
        return _this.$el.find('.qui-caret').css({
          opacity: .5
        });
      };
      hoverOut();
      this.$el.find('.qui-collapsible-hover').hover(hoverIn, hoverOut);
      this.bind(EVENT_COLLAPSE, function() {
        var _base;
        return typeof (_base = _this.onCollapse()) === "function" ? _base() : void 0;
      });
      this.bind(EVENT_EXPAND, function() {
        var _base;
        return typeof (_base = _this.onExpand()) === "function" ? _base() : void 0;
      });
      collapsibleContainer.on('hidden', function() {
        return _this.trigger(EVENT_COLLAPSE);
      });
      collapsibleContainer.on('shown', function() {
        return _this.trigger(EVENT_EXPAND);
      });
      return this.title.onChanged(function(e) {
        return _this.$el.find('.qui-inset-title').html(e.newValue);
      });
    };

    InsetPane.prototype.collapse = function(opts) {
      return this.$el.find('.qui-inset-pane-user-content').collapse(opts);
    };

    InsetPane.prototype.toggleCollapsibleIcon = function() {
      if (this.$el.find('.qui-caret').hasClass('k-arrow-down')) {
        this.$el.find('.qui-caret').removeClass('k-arrow-down');
        return this.$el.find('.qui-caret').addClass('k-plus');
      } else {
        this.$el.find('.qui-caret').removeClass('k-plus');
        return this.$el.find('.qui-caret').addClass('k-arrow-down');
      }
    };

    return InsetPane;

  })(ViewModel);

  InsetPaneView = (function(_super) {

    __extends(InsetPaneView, _super);

    function InsetPaneView() {
      return InsetPaneView.__super__.constructor.apply(this, arguments);
    }

    InsetPaneView.prototype.root = "";

    InsetPaneView.prototype.inner = function() {
      return "\n<div class='qui-inset-left-gutter'>\n  " + (this.caretHtml()) + "\n</div>\n<div class='" + (this.titleCssClass()) + "'>\n\n<p class='qui-inset-title qui-text-emboss qui-ellipsis'> " + this.title + " </p>\n</div>\n<div class=\"qui-inset-pane-user-content collapse in\">\n  <hr/>\n</div>";
    };

    InsetPaneView.prototype.cssClass = function() {
      return "qui-inset-pane well qui";
    };

    InsetPaneView.prototype.titleCssClass = function() {
      var ret;
      ret = "qui-inset-pane-title-container";
      if (this.collapsible) {
        ret += " qui-inset-pane-title-container-collapsible qui-collapsible-hover";
      }
      return ret;
    };

    InsetPaneView.prototype.caretHtml = function() {
      if (this.collapsible) {
        return "<span class='qui-caret k-icon k-arrow-down'></span>";
      }
      return "";
    };

    return InsetPaneView;

  })(View);

}).call(this);
}, "qui/controls/menu": function(exports, require, module) {(function() {
  var Menu, MenuItem, MenuItemView, MenuView, View, ViewModel,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ViewModel = require('qui/viewModel');

  View = require('qui/view');

  module.exports = Menu = (function(_super) {

    __extends(Menu, _super);

    Menu.prototype.defaults = {
      label: '',
      menuItems: [],
      href: '#'
    };

    function Menu(args) {
      this.createItems = __bind(this.createItems, this);

      var i, item, items, _i, _len, _ref;
      Menu.__super__.constructor.call(this, args);
      if (this.menuItems() === null) {
        this.menuItems([]);
      }
      this.setView(MenuView, this.options);
      this.ulMenu = this.$el.find('.dropdown-menu');
      items = [];
      _ref = this.menuItems();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        i = new MenuItem(item);
        items.push(i);
        this.ulMenu.append(i.render());
      }
      this.menuItems(items);
    }

    Menu.prototype.add = function(item) {
      var i, items;
      i = new MenuItem(item);
      this.ulMenu.append(i.render());
      items = this.menuItems();
      items.push(i);
      this.menuItems(items);
      return i;
    };

    Menu.prototype.getItem = function(id) {
      var _this = this;
      return _(this.menuItems()).find(function(item) {
        return item.id === id;
      });
    };

    Menu.prototype.createItems = function(ul) {
      var items,
        _this = this;
      items = $(ul).find('li');
      return _(items).each(function(item) {
        var _i;
        _i = $(item).data();
        return _this.add(_i);
      });
    };

    return Menu;

  })(ViewModel);

  MenuView = (function(_super) {

    __extends(MenuView, _super);

    function MenuView() {
      return MenuView.__super__.constructor.apply(this, arguments);
    }

    MenuView.prototype.id = 0;

    MenuView.prototype.root = '<span class=\'qui-menu qui\'>\n    <span class=\'dropdown\'>\n      <a class=\'dropdown-toggle\' data-toggle=\'dropdown\' href=\'<% tmpl.href %>\'><%= tmpl.label %> <b class=\'caret\'></b></a>\n        \n      <%= tmpl.ul() %>\n    </span>\n</span>';

    MenuView.prototype.ul = '<ul class=\'dropdown-menu\'>\n</ul>';

    return MenuView;

  })(View);

  MenuItem = (function(_super) {

    __extends(MenuItem, _super);

    MenuItem.prototype.defaults = {
      onClick: null,
      label: null,
      divider: false,
      toggle: null,
      href: ''
    };

    function MenuItem(args) {
      var _this = this;
      MenuItem.__super__.constructor.call(this, args);
      if (this.enabled() === null) {
        this.enabled(true);
      }
      this.setView(MenuItemView, this.options);
      this.$el.on('click', function(e) {
        var _base;
        if (_this.href() === '') {
          e.preventDefault();
        }
        if (_this.enabled() === false) {
          return false;
        }
        return typeof (_base = _this.onClick()) === "function" ? _base(e) : void 0;
      });
      this.enabled.onChanged(function(e) {
        if (e.newValue === true) {
          _this.$el.removeClass('qui-disabled');
          return _this.$el.addClass('qui-enabled');
        } else {
          _this.$el.removeClass('qui-enabled');
          return _this.$el.addClass('qui-disabled');
        }
      });
    }

    return MenuItem;

  })(ViewModel);

  MenuItemView = (function(_super) {

    __extends(MenuItemView, _super);

    function MenuItemView() {
      return MenuItemView.__super__.constructor.apply(this, arguments);
    }

    MenuItemView.prototype.root = function() {
      if (this.divider) {
        return "<li class='divider'></li>";
      } else {
        return "<li id=\"" + this.id + "\" class='" + (this.getEnabled()) + "'><a href='" + this.href + "'>" + this.label + "</a></li>";
      }
    };

    MenuItemView.prototype.getEnabled = function() {
      if (this.enabled === true || this.enabled === void 0) {
        "qui-enabled";

      }
      if (this.enabled === false) {
        return "qui-disabled";
      }
    };

    return MenuItemView;

  })(View);

}).call(this);
}, "qui/controls/modalDialog": function(exports, require, module) {(function() {
  var ModalDialog, ModalDialogView, ModalTitleBar, ModalTitleBarView, View, ViewModel,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ViewModel = require('qui/viewModel');

  View = require('qui/view');

  module.exports = ModalDialog = (function(_super) {

    __extends(ModalDialog, _super);

    ModalDialog.prototype.defaults = {
      slide: true,
      content: ''
    };

    function ModalDialog(args) {
      var qui, syncContent, _ref,
        _this = this;
      ModalDialog.__super__.constructor.call(this, args);
      this.setView(ModalDialogView, this.options);
      this.hide();
      this.divContent = this.$el.find('.qui-content');
      this.titleBar = new ModalTitleBar(this.options);
      this.$el.find('.title-bar-container').append(this.titleBar.render());
      qui = require('qui');
      this.actionBar = new qui.controls.ActionBar;
      this.$el.append(this.actionBar.render());
      this.tabStrip = new qui.controls.TabStrip({
        content: (_ref = this.options.tabStrip) != null ? _ref : null
      });
      this.tabStrip.visible(false);
      this.tabStrip.visible.onChanged(function(e) {
        if (e.newValue === true) {
          _this.divContent.html(_this.tabStrip.render());
          _this.titleBar.visible(false);
        }
        if (e.newValue === false) {
          return _this.divContent.show();
        }
      });
      this.titleBar.visible.onChanged(function(e) {
        if (e.newValue === true) {
          return _this.tabStrip.visible(false);
        }
      });
      syncContent = function(e) {
        return _this.divContent.html(e.newValue);
      };
      this.content.onChanged(function(e) {
        return syncContent(e);
      });
      this.syncWidth = function(width) {
        if (width === '*') {
          width = $(document).width();
          $(window).on('resize', function() {
            return _this.syncWidth($(document).width());
          });
        }
        _this.$el.css('width', width);
        width = _this.$el.width();
        return _this.$el.css('margin-left', "-" + (width / 2) + "px");
      };
      this.syncHeight = function(height) {
        if (height === '*') {
          height = $(document).height();
          $(window).on('resize', function() {
            return _this.syncHeight($(document).height());
          });
        }
        _this.$('.modal-body').css('height', height);
        height = _this.$('.modal-body').css('height');
        _this.$('.modal-body').css('height', height - 122);
        return _this.$('.modal-body').css('max-height', height - 122);
      };
      this.width.onChanged(function(e) {
        return _this.syncWidth(e.newValue);
      });
      this.height.onChanged(function(e) {
        return _this.syncHeight(e.newValue);
      });
      if (this.width()) {
        this.syncWidth(this.width());
      }
    }

    ModalDialog.prototype.modal = function(options) {
      this.$el.data('modal', null);
      return this.$el.modal(options);
    };

    ModalDialog.prototype.show = function() {
      return this.$el.modal('show');
    };

    ModalDialog.prototype.hide = function() {
      return this.$el.modal('hide');
    };

    return ModalDialog;

  })(ViewModel);

  ModalDialogView = (function(_super) {

    __extends(ModalDialogView, _super);

    function ModalDialogView() {
      return ModalDialogView.__super__.constructor.apply(this, arguments);
    }

    ModalDialogView.prototype.root = '<div class=\'modal qui <%= tmpl.shouldSlide() %> qui-modal-dialog\'>\n  <div class=\'modal-header\'>\n    <span class=\'title-bar-container\'></span>\n  </div>\n  <div class=\'modal-body qui-content\'><%= tmpl.content %></div>\n</div>';

    ModalDialogView.prototype.shouldSlide = function() {
      if (this.slide) {
        return 'fade';
      }
    };

    return ModalDialogView;

  })(View);

  ModalTitleBar = (function(_super) {

    __extends(ModalTitleBar, _super);

    ModalTitleBar.prototype.defaults = {
      title: ""
    };

    function ModalTitleBar(args) {
      var _this = this;
      ModalTitleBar.__super__.constructor.call(this, args);
      this.setView(ModalTitleBarView, this.options);
      this.title.onChanged(function(e) {
        return _this.$el.text(e.newValue);
      });
    }

    return ModalTitleBar;

  })(ViewModel);

  ModalTitleBarView = (function(_super) {

    __extends(ModalTitleBarView, _super);

    function ModalTitleBarView() {
      return ModalTitleBarView.__super__.constructor.apply(this, arguments);
    }

    ModalTitleBarView.prototype.root = '<div class=\'title-bar qui\'>\n  <%= tmpl.title %>\n</div>';

    return ModalTitleBarView;

  })(View);

}).call(this);
}, "qui/controls/navList": function(exports, require, module) {(function() {
  var NavList, NavListView, View, ViewModel,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ViewModel = require('qui/viewModel');

  View = require('qui/view');

  module.exports = NavList = (function(_super) {

    __extends(NavList, _super);

    NavList.prototype.defaults = {
      items: []
    };

    function NavList(args) {
      var item, _i, _len, _ref,
        _this = this;
      NavList.__super__.constructor.call(this, args);
      this.setView(NavListView, this.options);
      this.list = this.$el.find('.nav-list');
      _ref = this.items();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        this.add(item);
      }
      this.items.onChanged(function() {
        return _this.syncItems();
      });
    }

    NavList.prototype.syncItems = function() {
      var item, _i, _len, _ref, _results;
      this.list.html('');
      _ref = this.items();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        _results.push(this.add(item));
      }
      return _results;
    };

    NavList.prototype.init = function() {
      var $d, $p, $pp, items, _ref,
        _this = this;
      if ((_ref = this.options.parent) != null ? _ref.is('ul') : void 0) {
        $p = $(this.options.parent);
        $p.addClass('nav nav-list');
        $pp = $p.parent();
        $pp.append($("<div class='qui-nav-list well'>"));
        $d = $pp.find('div.qui-nav-list');
        $d.append($p.clone(true));
        if (_.str.include(navigator.userAgent, 'MSIE')) {
          $d.addClass('qui-mask-shadow');
        } else {
          $d.append('<span class="qui-mask"></span>');
        }
        this.$el = $d;
        this.list = this.$el.find('.nav-list');
        items = this.list.find('li');
        this.list.html('');
        return _(items).each(function(item) {
          var _i;
          _i = $(item).data();
          return _this.add(_i);
        });
      }
    };

    NavList.prototype.add = function(item) {
      this.list.append(this.view.render(item));
      return this;
    };

    NavList.prototype.select = function(href) {
      var item, _i, _items, _j, _len, _len1;
      _items = this.items();
      for (_i = 0, _len = _items.length; _i < _len; _i++) {
        item = _items[_i];
        if (item.active != null) {
          item.active = false;
        }
      }
      for (_j = 0, _len1 = _items.length; _j < _len1; _j++) {
        item = _items[_j];
        if (item.href === href) {
          item.active = true;
        }
      }
      this.$el.find('li.active').removeClass('active');
      if ($.browser.msie) {
        this.$el.find("a[href$='" + href + "']").parent().addClass('active');
      } else {
        this.$el.find("a[href='" + href + "']").parent().addClass('active');
      }
      return this.items(_items);
    };

    return NavList;

  })(ViewModel);

  NavListView = (function(_super) {

    __extends(NavListView, _super);

    function NavListView() {
      return NavListView.__super__.constructor.apply(this, arguments);
    }

    NavListView.prototype.root = '<div class=\'qui-nav-list well qui <%= tmpl.ifIE() %>\'>\n  <ul class=\'nav nav-list\'>\n  </ul>\n  <%= tmpl.getSvg() %>\n</div>';

    NavListView.prototype.render = function(item) {
      var link, str;
      str = $("<li></li>");
      if (item.header != null) {
        str.html(item.label);
        str.addClass('nav-header');
      }
      if (item.divider != null) {
        str.addClass('divider');
      }
      if (item.href != null) {
        str.html("<a href=" + item.href + ">" + item.label + "</a>");
        link = str.find('a');
        if (item.active != null) {
          str.addClass('active');
        }
      }
      return str;
    };

    NavListView.prototype.getSvg = function() {
      if (!_.str.include(navigator.userAgent, 'MSIE')) {
        return '<svg class="qui-mask"></svg>';
      }
    };

    NavListView.prototype.ifIE = function() {
      if (_.str.include(navigator.userAgent, 'MSIE')) {
        return 'qui-mask-shadow';
      }
    };

    return NavListView;

  })(View);

}).call(this);
}, "qui/controls/numericTextBox": function(exports, require, module) {(function() {
  var NumericTextBox, NumericTextBoxView, View, ViewModel,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ViewModel = require('qui/viewModel');

  View = require('qui/view');

  module.exports = NumericTextBox = (function(_super) {

    __extends(NumericTextBox, _super);

    function NumericTextBox(args) {
      NumericTextBox.__super__.constructor.call(this, args);
      this.setView(NumericTextBoxView, this.options);
    }

    NumericTextBox.prototype.init = function() {
      var inputs, _kendo;
      if (this.width()) {
        this.$el.css('width', this.width());
      }
      _kendo = this.$el.kendoNumericTextBox(this.options);
      this.kendo = _kendo.data('kendoNumericTextBox');
      this.kendo.wrapper.addClass('qui-numeric-textbox');
      this.$el.data('quiNumericTextBox', this);
      this.initKendo(['value', 'enable']);
      inputs = this.$el.parent().parent().parent().find('.k-numerictextbox');
      if (inputs.length > 1) {
        return inputs.last().remove();
      }
    };

    return NumericTextBox;

  })(ViewModel);

  NumericTextBoxView = (function(_super) {

    __extends(NumericTextBoxView, _super);

    function NumericTextBoxView() {
      return NumericTextBoxView.__super__.constructor.apply(this, arguments);
    }

    NumericTextBoxView.prototype.root = '<input class=\'qui-numeric-textbox-input\'></input>';

    return NumericTextBoxView;

  })(View);

}).call(this);
}, "qui/controls/popover": function(exports, require, module) {(function() {
  var Popover, View, ViewModel,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ViewModel = require('qui/viewModel');

  View = require('qui/view');

  /*
  Popover
    trigger:
      'hover' - Show/Hide on hover
      'click' - Show on click
      'focus' - Show/Hide on focus
      'manual' - Show/Hide via API
  
    autoHide: - Only relevant for trigger[click] & trigger[manual]
      true - Clicking outside of popover hides it
      false - Clicking outside of popover does nothing
  */


  module.exports = Popover = (function(_super) {

    __extends(Popover, _super);

    Popover.prototype.defaults = {
      trigger: 'hover',
      autoHide: true,
      content: "",
      parent: null,
      placement: 'right',
      template: '<div class="popover qui-popover"><div class="arrow arrow-border"></div><div class="arrow"></div><div class="popover-inner"><div class="popover-content"><div></div></div></div></div>',
      animation: true,
      selector: false,
      delay: 0
    };

    function Popover(args) {
      var opts, _el, _trigger,
        _this = this;
      Popover.__super__.constructor.call(this, args);
      _trigger = (function() {
        switch (this.trigger()) {
          case 'hover':
            return 'hover';
          case 'focus':
            return 'focus';
          case 'click':
          case 'manual':
            return 'manual';
        }
      }).call(this);
      if (this.parent() instanceof ViewModel) {
        _el = this.parent().el;
        this.parent(_el);
      }
      opts = this.options;
      opts.trigger = _trigger;
      $(this.parent()).popover(opts);
      if (this.trigger() === 'click') {
        $(this.parent()).bind('click', function() {
          return _this.show();
        });
      }
    }

    Popover.prototype.show = function() {
      var _this = this;
      if (this.autoHide() === true) {
        $('body').append("<div class='qui-popover-underlay'></div>");
        $('.qui-popover-underlay').click(function(el) {
          $(el.currentTarget).remove();
          return _this.hide();
        });
      }
      return $(this.parent()).popover('show');
    };

    Popover.prototype.toggle = function() {
      return $(this.parent()).popover('toggle');
    };

    Popover.prototype.hide = function() {
      return $(this.parent()).popover('hide');
    };

    return Popover;

  })(ViewModel);

}).call(this);
}, "qui/controls/processBar": function(exports, require, module) {(function() {
  var ProcessBar, ProcessBarView, Step, StepView, Steps, View, ViewModel,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ViewModel = require('qui/viewModel');

  View = require('qui/view');

  module.exports = ProcessBar = (function(_super) {

    __extends(ProcessBar, _super);

    function ProcessBar(args) {
      var step, _i, _len, _ref, _ref1,
        _this = this;
      if (args == null) {
        args = {};
      }
      if (args != null) {
        if ((_ref = args.width) == null) {
          args.width = 600;
        }
      }
      ProcessBar.__super__.constructor.call(this, args);
      this.setView(ProcessBarView, this.options);
      this._steps = new Steps;
      if (args.steps != null) {
        _ref1 = args.steps;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          step = _ref1[_i];
          this.addStep(step);
        }
      }
      this.width.onChanged(function(e) {
        _this.$el.css('width', e.newValue);
        return _this._renderSteps();
      });
      this._renderSteps();
    }

    ProcessBar.prototype.addStep = function(pStep) {
      if (pStep == null) {
        return this;
      }
      this._steps.add(new Step($.extend(pStep, {
        processBar: this
      })));
      this._renderSteps();
      return this;
    };

    ProcessBar.prototype.getStep = function(id) {
      if (_(id).isNumber()) {
        return this._steps.models[id];
      }
      if (_(id).isString()) {
        return this._steps.find(function(it) {
          return it.stepId() === id;
        });
      }
    };

    ProcessBar.prototype.clearSteps = function() {
      this._steps.reset();
      return this._renderSteps();
    };

    ProcessBar.prototype.removeStep = function(id) {
      return this._steps.remove(this.getStep(id));
    };

    ProcessBar.prototype.selectStep = function(id) {
      this._steps.each(function(it) {
        return it.selected(false);
      });
      return this.getStep(id).selected(true);
    };

    ProcessBar.prototype.getSelectedStep = function() {
      return this._steps.find(function(it) {
        return it.selected() === true;
      });
    };

    ProcessBar.prototype._renderSteps = function() {
      var tabWidth,
        _this = this;
      this.$el.find('.step-container').html('');
      tabWidth = ((this.width() - (13 * (this._steps.length - 1))) - 2) / this._steps.length;
      return this._steps.each(function(step, index) {
        step.index(index + 1);
        _this.$el.find('.step-container').append(step.render());
        step.$el.css('width', tabWidth);
        if (index + 1 !== _this._steps.length) {
          _this.$el.find('.step-container').append($("<li class='step-divider'>&nbsp;</li>"));
        }
        return step._fixDividers(step.selected() === true ? 'selected' : 'normal');
      });
    };

    return ProcessBar;

  })(ViewModel);

  ProcessBarView = (function(_super) {

    __extends(ProcessBarView, _super);

    function ProcessBarView() {
      return ProcessBarView.__super__.constructor.apply(this, arguments);
    }

    ProcessBarView.prototype.root = '<div class=\'qui qui-process-bar-container\'>\n  <ul class=\'step-container\'>\n  </ul>\n</div>';

    return ProcessBarView;

  })(View);

  Steps = Backbone.Collection.extend({
    model: Step
  });

  Step = (function(_super) {

    __extends(Step, _super);

    Step.prototype.defaults = {
      label: '',
      stepId: '',
      selected: false,
      icon: '',
      index: 0,
      href: '',
      onClick: function(e) {}
    };

    function Step(args) {
      var _this = this;
      if (args == null) {
        args = {};
      }
      Step.__super__.constructor.call(this, args);
      this.setView(StepView, this);
      this.processBar = this.options.processBar;
      this.label.onChanged(function(e) {
        return _this.$el.find('.step-label').html(e.newValue);
      });
      this.href.onChanged(function(e) {
        return _this.$el.find('.step-href').attr('href', e.newValue);
      });
      this.stepId.onChanged(function(e) {
        return _this.$el.attr('data-step-id', e.newValue);
      });
      this.selected.onChanged(function(e) {
        _this.$el.removeClass('selected-step');
        if (e.newValue === true) {
          _this.$el.addClass('selected-step');
        }
        return _this._fixDividers();
      });
      this.icon.onChanged(function(e) {
        var i;
        i = _this.$el.find('.step-icon .icon');
        i.removeClass("icon-custom icon-" + e.oldValue);
        i.css('background-image', '');
        if (/\.(jpg|png|gif|jpeg)/.test(e.newValue)) {
          return i.css('background-image', "url('" + e.newValue + "')").addClass('icon-custom');
        } else {
          return i.addClass("icon-" + e.newValue);
        }
      });
    }

    Step.prototype.render = function() {
      var _this = this;
      this.$el = $(this.view.root());
      this.iconContainer = this.$el.find('.step-icon .icon');
      this.$el.find('a').on('click', function(e) {
        var _base;
        _this.processBar.selectStep(_this.index() - 1);
        _this.processBar._steps.each(function(step) {
          return step._fixDividers('normal');
        });
        _this._fixDividers('selected');
        if ((typeof (_base = _this.onClick()) === "function" ? _base(e) : void 0) === false) {
          e.preventDefault();
          return false;
        }
      });
      this.$el.hover(function(e) {
        _this.$el.addClass('step-hover');
        return _this._fixDividers('hover');
      }, function(e) {
        _this.$el.removeClass('step-hover');
        return _this._fixDividers(_this.selected() === true ? 'selected' : 'normal');
      });
      return this.$el;
    };

    Step.prototype._fixDividers = function(currentState) {
      var classes, next, nextClass, prev, prevClass,
        _this = this;
      prev = this.processBar.getStep(this.index() - 2);
      next = this.processBar.getStep(this.index());
      if (this.selected()) {
        currentState = 'selected';
      }
      classes = ['process-bar-selected-normal', 'process-bar-selected-hover', 'process-bar-normal-selected', 'process-bar-normal-normal', 'process-bar-normal-hover', 'process-bar-hover-selected', 'process-bar-hover-normal'];
      _(classes).each(function(cl) {
        _this.$el.prev().removeClass(cl);
        return _this.$el.next().removeClass(cl);
      });
      if (prev instanceof ProcessBar.Step) {
        if (prev.selected() === true) {
          prevClass = "process-bar-selected-" + currentState;
        } else {
          prevClass = "process-bar-normal-" + currentState;
        }
        this.$el.prev().addClass(prevClass);
      }
      if (next instanceof ProcessBar.Step) {
        if (next.selected() === true) {
          nextClass = "process-bar-" + currentState + "-selected";
        } else {
          nextClass = "process-bar-" + currentState + "-normal";
        }
        return this.$el.next().addClass(nextClass);
      }
    };

    return Step;

  })(ViewModel);

  StepView = (function(_super) {

    __extends(StepView, _super);

    function StepView() {
      return StepView.__super__.constructor.apply(this, arguments);
    }

    StepView.prototype.root = '<li data-step-id=\'<%= tmpl.stepId() %>\'class=\'step <%= tmpl.selectedClass() %>\'>\n  <a class=\'step-href\' href=\'<%= tmpl.href() %>\'>\n    <span class=\'step-index\'><%= tmpl.index() %></span>\n    <span class=\'step-label\'><%= tmpl.label() %></span>\n    <span class=\'step-icon\'><%= tmpl.renderIcon() %></span>\n  </a>\n</li>';

    StepView.prototype.renderIcon = function() {
      var i;
      if (this.icon() === '') {
        return;
      }
      i = $("<i class='icon'></i>");
      if (/\.(jpg|png|gif|jpeg)/.test(this.icon())) {
        i.css('background-image', "url('" + (this.icon()) + "')").addClass('icon-custom');
      } else {
        i.addClass("icon-" + (this.icon()));
      }
      return i[0].outerHTML;
    };

    StepView.prototype.selectedClass = function() {
      if (this.selected() === true) {
        return 'selected-step';
      }
    };

    return StepView;

  })(View);

  ProcessBar.Step = Step;

}).call(this);
}, "qui/controls/progressBar": function(exports, require, module) {(function() {
  var ProgressBar, ProgressBarView, View, ViewModel,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ViewModel = require('qui/viewModel');

  View = require('qui/view');

  /*
  ProgressBar
    value: The current value to represent in the progress bar (0-100)
    browser:  Progress bars use CSS3 gradients, transitions, and animations to achieve all their effects. 
              These features are not supported in IE7-9 or older versions of Firefox.
              Opera and IE do not support animations at this time.
  */


  module.exports = ProgressBar = (function(_super) {

    __extends(ProgressBar, _super);

    ProgressBar.prototype.defaults = {
      value: 0
    };

    function ProgressBar(args) {
      var _this = this;
      ProgressBar.__super__.constructor.call(this, args);
      this.setView(ProgressBarView, this.options);
      this.value.onChanged(function(e) {
        var newValue;
        newValue = e.newValue;
        if (newValue < 0) {
          newValue = 0;
        } else if (newValue > 100) {
          newValue = 100;
        }
        _this.$el.attr('title', "" + newValue + "%");
        return _this.$el.find('.qui-progress-value').css('width', "" + newValue + "%");
      });
    }

    return ProgressBar;

  })(ViewModel);

  ProgressBarView = (function(_super) {

    __extends(ProgressBarView, _super);

    function ProgressBarView() {
      return ProgressBarView.__super__.constructor.apply(this, arguments);
    }

    ProgressBarView.prototype.root = '<div class="progress qui qui-progress-bar" title="<%=tmpl.value %>%">                \n  <div class="bar qui-progress-value" style="width: <%=tmpl.value %>%;">          \n  </div>\n</div>';

    return ProgressBarView;

  })(View);

}).call(this);
}, "qui/controls/signIn": function(exports, require, module) {(function() {
  var SignIn, SignInView, View, ViewModel,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('qui/view');

  ViewModel = require('qui/viewModel');

  module.exports = SignIn = (function(_super) {

    __extends(SignIn, _super);

    SignIn.prototype.defaults = {
      rememberMe: true,
      onSignIn: null
    };

    function SignIn(args) {
      var checkFields,
        _this = this;
      SignIn.__super__.constructor.call(this, args);
      this.setView(SignInView, this.options);
      this.username = this.$el.find('.username');
      this.password = this.$el.find('.password');
      this.submit = this.$el.find('.qui-sign-in-submit-container').quiButton({
        label: 'Sign In',
        enabled: false
      });
      this.form = this.$el.find('form.qui-sign-in');
      this.btnRememberMe = this.$el.find("#rememberMe");
      this.submit.onClick(function(e) {
        e.preventDefault();
        return _this.form.trigger('submit');
      });
      checkFields = function() {
        if (_this.username.val() && _this.password.val()) {
          return _this.submit.enabled(true);
        } else {
          return _this.submit.enabled(false);
        }
      };
      this.username.on('keyup', function() {
        return checkFields();
      });
      this.password.on('keyup', function() {
        return checkFields();
      });
      this.form.on('submit', function(e) {
        return _this.trigger('signIn', e);
      });
      this.bind('signIn', function(e) {
        if (e != null) {
          e.preventDefault();
        }
        if (_this.onSignIn() != null) {
          return _this.onSignIn()({
            username: _this.username.val(),
            password: _this.password.val(),
            rememberMe: _this.btnRememberMe.is(':checked')
          });
        }
      });
      this.$el.find('.qui-text-box').placeholder();
    }

    return SignIn;

  })(ViewModel);

  SignInView = (function(_super) {

    __extends(SignInView, _super);

    function SignInView() {
      return SignInView.__super__.constructor.apply(this, arguments);
    }

    SignInView.prototype.root = "<div class='qui qui-sign-in-container'>\n  <form class='qui-sign-in'>\n    <input name='username' type='text' class='span3 username qui-text-box' placeholder='User Name (e.g., domain\\name)'>\n    <input data-role='quiTextBox' name='password' type='password' class='span3 password qui-text-box' placeholder='Password'>\n    <%= tmpl.rememberMeBtn() %>\n    <span class='qui-sign-in-submit-container'></span>\n  </form>\n</div>";

    SignInView.prototype.rememberMeBtn = function() {
      if (this.rememberMe) {
        return "<label class='checkbox inline remember-me'>\n  <input type='checkbox' id='rememberMe' value='true'> Remember Me\n</label>";
      }
    };

    return SignInView;

  })(View);

}).call(this);
}, "qui/controls/splitButton": function(exports, require, module) {(function() {
  var Button, ButtonView, SplitButton, View, ViewModel, qui,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ViewModel = require('qui/viewModel');

  View = require('qui/view');

  Button = require('./button');

  qui = require('qui');

  module.exports = SplitButton = (function(_super) {

    __extends(SplitButton, _super);

    function SplitButton(args) {
      var eachControl, item, _i, _len, _ref,
        _this = this;
      SplitButton.__super__.constructor.call(this, args);
      this.addProps({
        menuItems: []
      });
      this.setView(ButtonView, this.options);
      this._mainBtn = this.$el.find('.main-button');
      this._caretBtn = this.$el.find('.btn-caret');
      this.btnEl = this._mainBtn;
      this.menu = new qui.controls.Menu;
      _ref = this.menuItems();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        this.menu.add(item);
      }
      eachControl = function(fn) {
        var ctrl, _j, _len1, _ref1, _results;
        _ref1 = [_this._mainBtn, _this._caretBtn];
        _results = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          ctrl = _ref1[_j];
          _results.push(fn(ctrl));
        }
        return _results;
      };
      if (!this.enabled()) {
        eachControl(function(ctrl) {
          return ctrl.addClass('disabled');
        });
      }
      this.enabled.onChanged(function(e) {
        return eachControl(function(ctrl) {
          if (e.newValue === true) {
            return ctrl.removeClass('disabled');
          } else if (e.newValue === false) {
            return ctrl.addClass('disabled');
          }
        });
      });
      this.isDefault.onChanged(function(e) {
        return eachControl(function(ctrl) {
          ctrl.removeClass('qui-btn-blue qui-btn-silver');
          if (e.newValue === true) {
            return ctrl.addClass('qui-btn-blue');
          } else {
            return ctrl.addClass('qui-btn-silver');
          }
        });
      });
      this._mainBtn.click(function(e) {
        var _base;
        if (!_this.enabled()) {
          return;
        }
        if (typeof (_base = _this.onClick()) === "function") {
          _base();
        }
        e.preventDefault();
        return false;
      });
      this.$el.append(this.menu.ulMenu);
    }

    SplitButton.prototype.render = function() {
      return this.$el;
    };

    return SplitButton;

  })(Button);

  ButtonView = (function(_super) {

    __extends(ButtonView, _super);

    function ButtonView() {
      return ButtonView.__super__.constructor.apply(this, arguments);
    }

    ButtonView.prototype.root = "<span class='btn-group qui qui-dropdown-root <%= tmpl.btnType() %>'>\n  <%= tmpl.mainBtn() %>\n  <%= tmpl.caretBtn() %>\n</span>";

    ButtonView.prototype.mainBtn = "<button class='btn <%= tmpl.btnStyle() %> main-button'>\n  <%= tmpl.btnIcon() %>\n  <%= tmpl.btnLabel() %>\n</button>";

    ButtonView.prototype.caretBtn = "<button class='btn btn-caret <%= tmpl.btnStyle() %> dropdown-toggle qui-dropdown-toggle' data-toggle='dropdown'>\n  <span class='caret'>\n</button>";

    ButtonView.prototype.btnStyle = "<%= tmpl.btnSize() %> <%= tmpl.btnDefault() %>";

    ButtonView.prototype.btnSize = function(size) {
      if (size == null) {
        size = this.size;
      }
      if (!_(['small', 'medium', 'large']).include(size)) {
        return;
      }
      return "qui-btn-" + size;
    };

    ButtonView.prototype.btnDefault = function() {
      if (this.isDefault) {
        return 'qui-btn-blue';
      } else {
        return 'qui-btn-silver';
      }
    };

    ButtonView.prototype.btnType = "qui-btn-split";

    ButtonView.prototype.btnIcon = "<i class='icon qui-icon-container'></i>";

    ButtonView.prototype.btnLabel = "<span class='qui-button-label'>\n  <%= tmpl.label %>\n</span>";

    return ButtonView;

  })(View);

}).call(this);
}, "qui/controls/splitter": function(exports, require, module) {(function() {
  var Splitter, SplitterView, View, ViewModel,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ViewModel = require('qui/viewModel');

  View = require('qui/view');

  module.exports = Splitter = (function(_super) {

    __extends(Splitter, _super);

    Splitter.prototype.defaults = {
      orientation: 'horizontal',
      panes: []
    };

    function Splitter(args) {
      Splitter.__super__.constructor.call(this, args);
      this.setView(SplitterView, this.options);
      if (this.width()) {
        this.$el.css('width', this.width());
      }
    }

    Splitter.prototype.init = function() {
      var childDivIndex, childDivs, _kendo,
        _this = this;
      this.$el.addClass('qui-splitter-container qui');
      if (this.options.panes.length === 0) {
        childDivs = this.$el.children('div');
        childDivIndex = 0;
        _(childDivs).each(function(childDiv) {
          var paneOptions;
          paneOptions = $(childDiv).data();
          _this.options.panes.push(paneOptions);
          return childDivIndex++;
        });
      }
      _kendo = this.$el.kendoSplitter(this.options);
      this.kendo = _kendo.data('kendoSplitter');
      this.$el.data('quiSplitter', this);
      return this.initKendo(['ajaxRequest', 'collapse', 'expand', 'max', 'min', 'size', 'toggle']);
    };

    return Splitter;

  })(ViewModel);

  SplitterView = (function(_super) {

    __extends(SplitterView, _super);

    function SplitterView() {
      return SplitterView.__super__.constructor.apply(this, arguments);
    }

    SplitterView.prototype.root = '<div class=\'qui-splitter\'>\n  <div data-collapsible=\'true\' data-size="470px"></div>      \n  <div data-collapsible=\'true\' data-size="470px"></div>      \n</div>';

    return SplitterView;

  })(View);

}).call(this);
}, "qui/controls/startScreen": function(exports, require, module) {(function() {
  var StartScreen, StartScreenView, View, ViewModel,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('qui/view');

  ViewModel = require('qui/viewModel');

  module.exports = StartScreen = (function(_super) {

    __extends(StartScreen, _super);

    StartScreen.prototype.defaults = {
      productLogoUrl: null,
      appVersion: "0.0.0",
      signInOptions: {
        rememberMe: true,
        onSignIn: null
      },
      appHeaderOptions: null
    };

    function StartScreen(args) {
      var opts, _ref,
        _this = this;
      StartScreen.__super__.constructor.call(this, args);
      this.setView(StartScreenView, this.options);
      this.appHeader = this.$el.quiAppHeader(this.appHeaderOptions());
      this.logoDiv = this.$el.find('.qui-product-logo');
      if (!this.options.splash) {
        this.signIn = this.$el.find('.qui-sign-in-holder').quiSignIn(this.signInOptions());
      }
      this.logoDiv.css('background-image', "url(" + (this.productLogoUrl()) + ")");
      opts = {
        lines: 12,
        length: 7,
        width: 3,
        radius: 8,
        color: '#555',
        speed: 1,
        trail: 60,
        shadow: false
      };
      this.spinnerTarget = this.$el.find('.qui-spinner');
      this.spinner = new Spinner(opts);
      this.spinnerTarget.hide();
      if ((_ref = this.signIn) != null) {
        _ref.bind('signIn', function() {
          return _this.signIn.$el.fadeOut(200, function() {
            return _this.spin();
          });
        });
      }
      if (this.options.splash) {
        this.spin();
      }
    }

    StartScreen.prototype.spin = function() {
      this.spinner.spin();
      this.spinnerTarget.append(this.spinner.el);
      return this.spinnerTarget.fadeIn(100);
    };

    StartScreen.prototype.stopSpinner = function() {
      return this.spinner.stop();
    };

    return StartScreen;

  })(ViewModel);

  StartScreenView = (function(_super) {

    __extends(StartScreenView, _super);

    function StartScreenView() {
      return StartScreenView.__super__.constructor.apply(this, arguments);
    }

    StartScreenView.prototype.root = "<div class='qui-start-screen qui'>\n  <div class='qui-start-screen-container'>\n    <div class='qui-product-logo'></div>\n    <div class='qui-sign-in-holder'></div>\n  </div>\n\n\n  <div class='fineprint'>\n    <div class='version'>Version <%= tmpl.appVersion %></div>\n    <div class='copyright'>\n      &copy; 2012 Quest Software Inc.\n      <br/>\n      All Rights Reserved.\n    </div>\n  </div>\n\n  <div class='qui-spinner'></div>\n</div>";

    return StartScreenView;

  })(View);

}).call(this);
}, "qui/controls/tab": function(exports, require, module) {(function() {
  var DropDownMixin, Tab, TabView, View, ViewModel,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('qui/view');

  ViewModel = require('qui/viewModel');

  DropDownMixin = require('qui/controls/dropDownMixin');

  module.exports = Tab = (function(_super) {

    __extends(Tab, _super);

    Tab.prototype.defaults = {
      label: '',
      content: '',
      dropDown: false,
      menuItems: [],
      href: null,
      onClick: function() {
        return true;
      }
    };

    function Tab(args) {
      var _base, _ref, _ref1,
        _this = this;
      Tab.__super__.constructor.call(this, args);
      if ((_ref = (_base = this.options).id) == null) {
        _base.id = this._cid;
      }
      this.setView(TabView, this.options);
      this.liTab = this.$el.find('li.qui-tab');
      this.divContent = this.$el.find('div.tab-pane');
      this.href.onChanged(function(e) {
        return _this.liTab.find('a').attr('href', e.newValue);
      });
      this.liTab.find('a').on('click', function(e) {
        var _base1;
        if ((typeof (_base1 = _this.onClick()) === "function" ? _base1(e) : void 0) === false) {
          return e.preventDefault();
        } else {
          if (_this.href() != null) {
            return window.location = _this.href();
          }
        }
      });
      if ((_ref1 = this.tabStrip) == null) {
        this.tabStrip = this.options.tabStrip;
      }
      if (this.dropDown()) {
        this.liTab.find('a').attr('data-target', null);
        this.initDropdown({
          ul: this.$el.find('ul'),
          on: 'tab',
          menuItems: this.menuItems()
        });
      }
    }

    return Tab;

  })(ViewModel);

  ViewModel.include(Tab, new DropDownMixin());

  TabView = (function(_super) {

    __extends(TabView, _super);

    function TabView() {
      return TabView.__super__.constructor.apply(this, arguments);
    }

    TabView.prototype.root = '<div class=\'qui-tab-container qui\'>\n  <li class=\'qui-tab\' data-tab-id=\'<%= tmpl.id %>\'>\n    <a href=\'<%= tmpl.href %>\' data-target=\'#<%= tmpl.id %>\' data-toggle=\'tab\'>\n      <span><%= tmpl.label %></span>\n    </a>\n    <div class=\'qui-tab-divider\'></div>\n  </li>\n\n  <div class=\'tab-pane\' id=\'<%= tmpl.id %>\'>\n    <%= tmpl.content %>\n  </div>\n</div>';

    return TabView;

  })(View);

}).call(this);
}, "qui/controls/tabStrip": function(exports, require, module) {(function() {
  var Tab, TabStrip, TabStripView, View, ViewModel, fixBorder, fixDivider,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ViewModel = require('qui/viewModel');

  View = require('qui/view');

  Tab = require('qui/controls/tab');

  module.exports = TabStrip = (function(_super) {

    __extends(TabStrip, _super);

    TabStrip.prototype.defaults = {
      primary: true,
      content: null
    };

    function TabStrip(args) {
      var content, _i, _len, _ref;
      if (args == null) {
        args = {};
      }
      TabStrip.__super__.constructor.call(this, args);
      if (args.parentTab != null) {
        args.primary = false;
      }
      this.setView(TabStripView, this.options);
      this.tabs = [];
      this.tabContainer = this.$el.find('.qui-tabs');
      this.contentContainer = this.$el.find('.qui-tabs-content');
      if (_(this.content()).isArray()) {
        _ref = this.content();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          content = _ref[_i];
          this.add(content);
        }
      }
      if (this.options.parentTab != null) {
        this.parentTab = this.options.parentTab;
        this.parentTab.childTabStrip = this;
        this.$el.removeClass('qui-primary').addClass('qui-secondary qui-fixed');
      }
      if (this.options.primary === false && !(this.options.parentTab != null)) {
        this.$el.addClass('qui-floating');
      }
    }

    TabStrip.prototype.add = function(tab) {
      var _tab,
        _this = this;
      if (tab == null) {
        tab = {};
      }
      tab.tabStrip = this;
      _tab = new Tab(tab);
      if (tab.tabs != null) {
        _tab.childTabStrip = $('<div></div>').quiTabStrip({
          primary: false,
          content: tab.tabs,
          parentTab: _tab
        });
        _tab.divContent.html(_tab.childTabStrip.$el);
        _tab.liTab.addClass('parent-tab-strip');
      }
      this.tabContainer.append(_tab.liTab);
      this.contentContainer.append(_tab.divContent);
      this.tabs.push(_tab);
      this.syncTabs();
      return _tab.liTab.find('a[data-toggle="tab"]').on('shown', function(e) {
        fixDivider($(e.target), _this);
        return fixBorder($(e.target), _this);
      });
    };

    TabStrip.prototype.syncTabs = function() {
      var a, tab, _i, _len, _ref, _results;
      this.tabContainer.children('li').removeClass('active');
      this.contentContainer.children('div').removeClass('active');
      $(this.tabContainer.children('li')[0]).addClass('active').find('a').trigger('shown');
      $(this.contentContainer.children('div')[0]).addClass('active');
      _ref = this.tabs;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tab = _ref[_i];
        a = tab.liTab.find('a');
        _results.push(fixBorder(a, this));
      }
      return _results;
    };

    TabStrip.prototype.select = function(id) {
      var tab, _ref;
      this.tabContainer.find('li').removeClass('active');
      this.contentContainer.find('div').removeClass('active');
      this.tabContainer.find("li[data-tab-id='" + id + "']").addClass('active');
      $(this.contentContainer.find('#' + id)).addClass('active');
      tab = _(this.tabs).select(function(t) {
        return t.id === id;
      });
      if ((_ref = tab[0]) != null) {
        _ref.liTab.find('a[data-toggle="tab"]').trigger('shown');
      }
      return tab[0];
    };

    TabStrip.prototype._clearTabs = function() {
      this.tabs = [];
      this.tabContainer.html('');
      return this.contentContainer.html('');
    };

    return TabStrip;

  })(ViewModel);

  fixDivider = function(el, tabStrip) {
    tabStrip.$el.find('.qui-tab-divider').removeClass('adjacent-to-active');
    return el.parents('.qui-tab').prev().find('.qui-tab-divider').addClass('adjacent-to-active');
  };

  fixBorder = function(el, tabStrip) {
    var tab, tabId;
    tabId = el.parent('.qui-tab').data('tab-id');
    tab = _(tabStrip.tabs).find(function(t) {
      return t.id === tabId && (t.childTabStrip != null);
    });
    if (tab instanceof Tab) {
      return tab.liTab.addClass('parent-tab-strip');
    }
  };

  TabStripView = (function(_super) {

    __extends(TabStripView, _super);

    function TabStripView() {
      return TabStripView.__super__.constructor.apply(this, arguments);
    }

    TabStripView.prototype.root = '<div class=\'qui-tab-strip qui <%= tmpl.getType() %>\'>\n  <ul class="nav nav-tabs qui-tabs">\n  </ul>\n  <div class=\'tab-content qui-tabs-content\'>\n  </div>\n</div>';

    TabStripView.prototype.getType = function() {
      if (this.primary) {
        return 'qui-primary';
      } else {
        return 'qui-secondary';
      }
    };

    return TabStripView;

  })(View);

}).call(this);
}, "qui/controls/table": function(exports, require, module) {(function() {
  var Table, TableView, View, ViewModel,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ViewModel = require('qui/viewModel');

  View = require('qui/view');

  module.exports = Table = (function(_super) {

    __extends(Table, _super);

    Table.prototype.ignoredEvents = ['detailInit'];

    function Table(args) {
      var widget, _kendo,
        _this = this;
      Table.__super__.constructor.call(this, args);
      this.setView(TableView, this.options);
      _kendo = this.$el.kendoGrid(this.options);
      this.kendo = _kendo.data('kendoGrid');
      this.$el.data('quiTable', this);
      this.initKendo(['addRow', 'cancelChanges', 'cancelRow', 'cellIndex', 'clearSelection', 'closeCell', 'collapseGroup', 'collapseRow', 'dataItem', 'editCell', 'editRow', 'expandGroup', 'expandRow', 'refresh', 'removeRow', 'saveChanges', 'saveRow', 'select']);
      this.rebind('change', function(e) {
        var _base;
        if (_this.select().length === 0) {
          return;
        }
        return typeof (_base = _this.onChange()) === "function" ? _base(_this.dataItem(_this.select())) : void 0;
      });
      this.$el.parents('.k-grid').addClass('qui-table-container qui');
      if (this.$el.hasClass('k-grid')) {
        this.$el.addClass('qui-table-container qui');
        widget = this.$el;
      } else {
        widget = this.$el.parents('.k-grid');
      }
      widget.find('.k-grid-content').css('height', '100%');
      if (this.width()) {
        widget.css('width', this.width());
      }
    }

    return Table;

  })(ViewModel);

  TableView = (function(_super) {

    __extends(TableView, _super);

    function TableView() {
      return TableView.__super__.constructor.apply(this, arguments);
    }

    TableView.prototype.root = '<div class=\'qui qui-table-container foobar\'></div>';

    return TableView;

  })(View);

}).call(this);
}, "qui/controls/textBox": function(exports, require, module) {(function() {
  var TextBox, TextBoxView, View, ViewModel,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ViewModel = require('qui/viewModel');

  View = require('qui/view');

  /*
  TextBox
    autoComplete: Show list of potential items based on this.items()
  */


  module.exports = TextBox = (function(_super) {

    __extends(TextBox, _super);

    TextBox.prototype.defaults = {
      autoComplete: false,
      placeholder: null,
      source: [],
      targetId: null,
      type: 'text',
      value: '',
      valueChanging: null,
      valueChanged: null
    };

    function TextBox(args) {
      var rebind,
        _this = this;
      TextBox.__super__.constructor.call(this, args);
      this.setView(TextBoxView, this.options);
      this.source.onChanged(function(e) {
        return _this.trigger('source:changed', e.newValue);
      });
      this.placeholder.onChanged(function(e) {
        return _this.$el.attr('placeholder', e.newValue);
      });
      this.value.onChanged(function(e, write) {
        if (write == null) {
          write = true;
        }
        if (write) {
          return _this.$el.val(e.newValue);
        }
      });
      this.type.onChanging(function(e) {
        e.cancel = true;
        throw 'TextBox: Cannot dynamically change type after instantiation.';
      });
      this.enabled.onChanged(function(e) {
        if (e.newValue === false) {
          _this.$el.addClass('disabled');
          return _this.$el.attr('disabled', 'disabled');
        } else {
          _this.$el.removeClass('disabled');
          return _this.$el.attr('disabled', null);
        }
      });
      this.bind('source:changed', function(source) {
        $(_this.$el).data('typeahead', null);
        return $(_this.$el).typeahead({
          source: source
        });
      });
      this.bind('value:changed', function(e) {
        var _base;
        return typeof (_base = this.valueChanged()) === "function" ? _base(e) : void 0;
      });
      this.bind('value:changing', function(e) {
        var _base;
        return typeof (_base = this.valueChanging()) === "function" ? _base(e) : void 0;
      });
      rebind = function() {
        var changeValue;
        changeValue = function(e, event) {
          _this.value(_this.$el.val(), (function() {
            if (event === 'changing') {
              return false;
            }
            if (event === 'changed') {
              return true;
            }
          })());
          return _this.trigger("value:" + event, _this.value());
        };
        _this.$el.on('keyup', function(e) {
          return changeValue(e, 'changing');
        });
        _this.$el.on('change', function(e) {
          return changeValue(e, 'changed');
        });
        if (_this.autoComplete()) {
          $(_this.$el).typeahead({
            source: _this.source()
          });
        }
        if (_this.placeholder() != null) {
          _this.$el.placeholder();
        }
        if (_this.$el.val() === _this.placeholder() && $.browser.msie && $.browser.version === '10.0') {
          return _this.$el.val('');
        }
      };
      this.bind('rebind', function() {
        return rebind();
      });
      if (this.options.value != null) {
        $(this.$el).val(this.options.value);
      }
    }

    TextBox.prototype.getHeight = function() {
      return this.$el.height();
    };

    TextBox.prototype.getWidth = function() {
      return this.$el.width();
    };

    TextBox.prototype.setHeight = function(height) {
      return this.$el.height(height);
    };

    TextBox.prototype.setWidth = function(width) {
      return this.$el.width(width);
    };

    TextBox.prototype.render = function() {
      if ($(this.options.parent).is('input')) {
        this.$el = $(this.options.parent);
        return null;
      } else {
        this.$el = $(this.view.root());
        return this.$el;
      }
    };

    TextBox.prototype.init = function() {
      return this.trigger('rebind');
    };

    return TextBox;

  })(ViewModel);

  TextBoxView = (function(_super) {

    __extends(TextBoxView, _super);

    function TextBoxView() {
      return TextBoxView.__super__.constructor.apply(this, arguments);
    }

    TextBoxView.prototype.root = '<%= tmpl.generateInputField() %>';

    TextBoxView.prototype.autocomplete = function() {
      if (this.autoComplete) {
        return " data-provide='typeahead' ";
      }
    };

    TextBoxView.prototype.generateInputField = function() {
      if (this.type === 'textarea') {
        return this.textArea();
      } else {
        return this.textBox();
      }
    };

    TextBoxView.prototype.getEnabledAttr = function() {
      if (this.enabled === false) {
        return 'disabled="disabled"';
      }
    };

    TextBoxView.prototype.getEnabledClass = function() {
      if (this.enabled === false) {
        return 'disabled';
      }
    };

    TextBoxView.prototype.getTargetId = function() {
      if (this.targetId != null) {
        return "id='" + this.targetId + "'";
      }
    };

    TextBoxView.prototype.getType = function() {
      if (this.type === 'textarea') {
        return;
      }
      return "type='" + this.type + "'";
    };

    TextBoxView.prototype.getValue = function() {
      return _.escapeHTML(this.value);
    };

    TextBoxView.prototype.textArea = '<textarea <%= tmpl.getTargetId() %> placeholder=\'<%= tmpl.placeholder %>\' class=\'qui qui-textarea <%= tmpl.getEnabledClass() %>\' <%= tmpl.getEnabledAttr() %>><%= tmpl.getValue() %></textarea>';

    TextBoxView.prototype.textBox = '<input <%= tmpl.getTargetId() %> placeholder=\'<%= tmpl.placeholder %>\' <%= tmpl.getType() %> class=\'qui qui-text-box <%= tmpl.getEnabledClass() %>\' value=\'<%= tmpl.getValue() %>\' <%= tmpl.getEnabledAttr() %>/>';

    return TextBoxView;

  })(View);

}).call(this);
}, "qui/controls/timePicker": function(exports, require, module) {(function() {
  var TimePicker, TimePickerView, View, ViewModel,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ViewModel = require('qui/viewModel');

  View = require('qui/view');

  module.exports = TimePicker = (function(_super) {

    __extends(TimePicker, _super);

    TimePicker.prototype.defaults = {
      international: false
    };

    function TimePicker(args) {
      TimePicker.__super__.constructor.call(this, args);
      if (this.international() === true) {
        this.options.format = 'HH:mm';
      }
      this.setView(TimePickerView, this.options);
    }

    TimePicker.prototype.init = function() {
      var inputs;
      if (this.width()) {
        this.$el.css('width', this.width());
      }
      this.$el.kendoTimePicker(this.options);
      this.kendo = this.$el.data('kendoTimePicker');
      $(this.kendo.timeView.popup.element).addClass('qui-time-picker-popup');
      this.initKendo(['close', 'enable', 'max', 'min', 'open', 'value']);
      inputs = this.$el.parent().parent().parent().find('.k-timepicker');
      if (inputs.length > 1) {
        return inputs.last().remove();
      }
    };

    return TimePicker;

  })(ViewModel);

  TimePickerView = (function(_super) {

    __extends(TimePickerView, _super);

    function TimePickerView() {
      return TimePickerView.__super__.constructor.apply(this, arguments);
    }

    TimePickerView.prototype.root = '<input class=\'qui qui-time-picker\'></input>';

    return TimePickerView;

  })(View);

}).call(this);
}, "qui/controls/titleBar": function(exports, require, module) {(function() {
  var TitleBar, TitleBarView, View, ViewModel,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ViewModel = require('qui/viewModel');

  View = require('qui/view');

  module.exports = TitleBar = (function(_super) {

    __extends(TitleBar, _super);

    TitleBar.prototype.defaults = {
      title: "Default Title",
      backUrl: null
    };

    function TitleBar(args) {
      var setCallback,
        _this = this;
      TitleBar.__super__.constructor.call(this, args);
      this.setView(TitleBarView, this.options);
      this.controls = [];
      this.divControls = this.$el.find('.qui-title-bar-content ul');
      this.divTitle = this.$el.find('.qui-title-bar-title');
      this.title.onChanged(function(e) {
        return _this.divTitle.html(e.newValue);
      });
      this.back = this.$el.find('.qui-back-button').quiButton();
      setCallback = function(location) {
        if (location === null) {
          return _this.back.onClick(null);
        } else {
          return _this.back.onClick(function() {
            return window.location = location;
          });
        }
      };
      if (this.backUrl() != null) {
        setCallback(this.backUrl());
      }
      this.backUrl.onChanged(function(e) {
        return setCallback(e.newValue);
      });
    }

    TitleBar.prototype.add = function(control, index) {
      var _length;
      _length = this.controls.length;
      if (index == null) {
        index = _length;
      }
      index = index > _length ? _length : index;
      this.controls.splice(index, 0, control);
      return this.syncControls();
    };

    TitleBar.prototype.syncControls = function() {
      var control, ctl, _i, _len, _ref, _results;
      this.divControls.html('');
      _ref = this.controls;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        control = _ref[_i];
        ctl = $('<li/>');
        if (control instanceof ViewModel) {
          ctl.append(control.$el);
        } else if ($(control).is('p')) {
          ctl.append($("<p>" + control + "</p>"));
        } else {
          ctl.append($("<p>" + control + "</p>"));
        }
        _results.push(this.divControls.append(ctl));
      }
      return _results;
    };

    return TitleBar;

  })(ViewModel);

  TitleBarView = (function(_super) {

    __extends(TitleBarView, _super);

    function TitleBarView() {
      return TitleBarView.__super__.constructor.apply(this, arguments);
    }

    TitleBarView.prototype.root = "<div class='qui qui-title-bar'>\n  <span class='btn-container qui-back-button' data-icon='chevron-left' data-size='small'></span>\n  <div class='qui-title-bar-title'><%= tmpl.title %></div>\n  <div class='qui-title-bar-content'>\n    <ul class='qui-content'></ul>\n  </div>\n</div>";

    return TitleBarView;

  })(View);

}).call(this);
}, "qui/controls/tree": function(exports, require, module) {(function() {
  var Tree, TreeView, View, ViewModel,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ViewModel = require('qui/viewModel');

  View = require('qui/view');

  module.exports = Tree = (function(_super) {

    __extends(Tree, _super);

    Tree.prototype.defaults = {
      animation: null,
      checkboxTemplate: null,
      dataSource: [],
      dragAndDrop: false,
      template: null
    };

    function Tree(args) {
      var o, _kendo;
      Tree.__super__.constructor.call(this, args);
      this.setView(TreeView, this.options);
      if (this.width()) {
        this.$el.css('width', this.width());
      }
      o = {};
      if (this.animation()) {
        o.animation = this.animation();
      }
      o.dataSource = this.dataSource();
      o.dragAndDrop = this.dragAndDrop();
      if (this.checkboxTemplate()) {
        o.checkboxTemplate = this.checkboxTemplate();
      }
      if (this.template()) {
        o.template = this.template();
      }
      _kendo = this.$el.kendoTreeView(o);
      this.kendo = _kendo.data('kendoTreeView');
      this.$el.data('quiTree', this);
      this.initKendo(['append', 'collapse', 'detatch', 'enable', 'expand', 'findByText', 'insertAfter', 'insertBefore', 'remove', 'select', 'text', 'toggle']);
      this.$el.parents('.k-treeview').addClass('qui-tree-container qui');
    }

    return Tree;

  })(ViewModel);

  TreeView = (function(_super) {

    __extends(TreeView, _super);

    function TreeView() {
      return TreeView.__super__.constructor.apply(this, arguments);
    }

    TreeView.prototype.root = '<div class=\'qui qui-tree-container\'></div>';

    return TreeView;

  })(View);

}).call(this);
}, "qui/core/base": function(exports, require, module) {(function() {
  var Base, Property;

  Property = require('./util/property');

  /*
  Common base class.
  This class can either be extended using standard CoffeeScript syntax (class Foo extends Base)
  or manually via underscore (_.extend source, new Base())
  
    OPTIONAL OVERRIDES: 
    - onPropAdded(prop)  : Invoked when a property is added.
    - onChanged(args)    : Invokd when a property value changes.
                           args:
                              - property : The property that has changed
                              - oldValue : The old value changing from.
                              - newValue : The new value changing to.
  */


  module.exports = Base = (function() {

    function Base() {}

    /*
      Adds one or more [Property] functions to the object.
      @param props :    Object literal describing the properties to add
                        The object takes the form [name: default-value].
                        {
                          name: 'default value'
                        }
    */


    Base.prototype.addProps = function(props) {
      var add, name, self, store, _results;
      if (props == null) {
        return;
      }
      self = this;
      store = this.propertyStore();
      add = function(name) {
        var defaultValue, monitorChange, prop;
        defaultValue = props[name];
        prop = new Property({
          name: name,
          "default": defaultValue,
          store: store
        });
        self[name] = prop.fn;
        if (self.attributes[name] == null) {
          self.attributes[name] = defaultValue;
        }
        if (self.onPropAdded != null) {
          self.onPropAdded(prop);
        }
        if (self.onChanged != null) {
          monitorChange = function(p) {
            return p.fn.onChanged(function(e) {
              return self.onChanged(e);
            });
          };
          return monitorChange(prop);
        }
      };
      _results = [];
      for (name in props) {
        if (this.hasOwnProperty(name)) {
          throw "Add property fail. [" + name + "] exists";
        }
        _results.push(add(name));
      }
      return _results;
    };

    /*
      Retrieves the property store.
      This should be either an object or a property-function. 
      Override this to provide a custom property store.
    */


    Base.prototype.propertyStore = function() {
      var internal, _ref, _ref1;
      internal = (_ref = this._) != null ? _ref : this._ = {};
      return (_ref1 = internal.basePropertyStore) != null ? _ref1 : internal.basePropertyStore = {};
    };

    /*
      Attaches to an event on an object and refires it from this object.
      @param eventName    : The name of the event to bubble.
      @param eventSource  : The child object that will originally fire the event.
    */


    Base.prototype.bubble = function(eventName, eventSource) {
      var _this = this;
      if (!(this.bind != null)) {
        _.extend(this, Backbone.Events);
      }
      eventSource.bind(eventName, function(args) {
        if (args == null) {
          args = {};
        }
        args.source = _this;
        return _this.trigger(eventName, args);
      });
      return this;
    };

    return Base;

  })();

}).call(this);
}, "qui/core/index": function(exports, require, module) {
/*
The core library.

Events:
   - window:resize   - Fires a single debounced event after a window resize operation.
*/


(function() {
  var core;

  module.exports = core = {
    title: 'Open.Core (Client)',
    version: '0.1.207',
    /*
      Initializes [Open.Core]
      This ensures all parts of the library that are included in the page
      are attached to this root index.
    */

    init: function() {
      return this.controls = this.tryRequire('open.client/controls');
    }
  };

  (function() {
    _.extend(core, Backbone.Events);
    core.Base = require('./base');
    core.util = require('./util');
    core.tryRequire = core.util.tryRequire;
    core.mvc = require('./mvc');
    if (typeof window !== "undefined" && window !== null) {
      return $(window).resize(_.debounce((function() {
        return core.trigger('window:resize');
      }), 100));
    }
  })();

}).call(this);
}, "qui/core/mvc/_common": function(exports, require, module) {(function() {

  module.exports = {
    util: require("../util"),
    /*
      Provides common callback functionality for executing sync (server) method.
      @param fnSync       : The Backbone function to execute (eg. Backbone.Model.fetch).
      @param source       : The source object that is syncing.
      @param methodName   : The name of the sync method (eg. 'fetch').
      @param options      : The options passed to the method (contains success/error callbacks).
    */

    sync: function(fnSync, source, methodName, options) {
      var fire, onComplete;
      if (options == null) {
        options = {};
      }
      fire = function(event, args) {
        return source[methodName].trigger(event, args);
      };
      onComplete = function(response, success, error, callback) {
        var args;
        args = {
          source: source,
          response: response,
          success: success,
          error: error
        };
        fire('complete', args);
        return typeof callback === "function" ? callback(args) : void 0;
      };
      fire('start', {
        source: source
      });
      return fnSync.call(source, {
        success: function(m, response) {
          return onComplete(response, true, false, options.success);
        },
        error: function(m, response) {
          return onComplete(response, false, true, options.error);
        }
      });
    }
  };

}).call(this);
}, "qui/core/mvc/collection": function(exports, require, module) {(function() {
  var Collection, common,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  common = require('./_common');

  /*
  Base class for Collections.
  
  Events:
   - change           : Fires when a property on a model in the collection changes.
   - add              : Fires when an item is added to the collection.
   - remove           : Fires when an item is removed.
   - count            : Fires when an item is either added or removed.
  */


  module.exports = Collection = (function(_super) {

    __extends(Collection, _super);

    function Collection() {
      Collection.prototype._construct.call(this);
    }

    /*
      Called internally by the constructor.  
      Use this if properties are added to the object after 
      construction and you need to re-run the constructor,
      (eg. within a functional inheritance pattern).
    */


    Collection.prototype._construct = function() {
      var fireCount,
        _this = this;
      Collection.__super__.constructor.call(this);
      _.extend(this.fetch, Backbone.Events);
      fireCount = function(col) {
        return _this.trigger('count', {
          count: _this.length
        });
      };
      this.bind('add', fireCount);
      return this.bind('remove', fireCount);
    };

    Collection.prototype.count = function() {
      return this.length;
    };

    /*
      Overrides the Backbone fetch method, enabling fetch events.
      @param options
              - error(args)   : (optional) Function to invoke if an error occurs.
              - success(args) : (optional) Function to invoke upon success.
                                Result args:
                                  - collection  : The collection.
                                  - response    : The response data.
                                  - success     : {bool} Flag indicating if the operation was successful
                                  - error       : {bool} Flag indicating if the operation was in error.
    */


    Collection.prototype.fetch = function(options) {
      var fetch, fn;
      fetch = 'fetch';
      fn = Backbone.Collection.prototype[fetch];
      return common.sync(fn, this, fetch, options);
    };

    Collection.prototype.onFetched = function(callback) {
      if (callback != null) {
        return this.fetch.bind('complete', callback);
      }
    };

    return Collection;

  })(Backbone.Collection);

}).call(this);
}, "qui/core/mvc/index": function(exports, require, module) {(function() {

  module.exports = {
    Model: require('./model'),
    View: require('./view'),
    Template: require('./template'),
    Collection: require('./collection'),
    Module: require('./module')
  };

}).call(this);
}, "qui/core/mvc/model": function(exports, require, module) {(function() {
  var Base, Model, basePrototype, common,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Base = require('../base');

  common = require('./_common');

  basePrototype = new Base();

  /*
  Base class for models.
  */


  module.exports = Model = (function(_super) {

    __extends(Model, _super);

    function Model(params) {
      if (params == null) {
        params = {};
      }
      Model.prototype._construct.call(this, params);
    }

    /*
      Called internally by the constructor.  
      Use this if properties are added to the object after 
      construction and you need to re-run the constructor,
      (eg. within a functional inheritance pattern).
    */


    Model.prototype._construct = function(params) {
      var self,
        _this = this;
      if (params == null) {
        params = {};
      }
      Model.__super__.constructor.call(this, params);
      self = this;
      _.extend(this, basePrototype);
      this.propertyStore = function() {
        var fn;
        return fn = function(name, value, options) {
          var param;
          if (value !== void 0) {
            param = {};
            param[name] = value;
            self.set(param, options);
          }
          return self.get(name);
        };
      };
      this.addProps(this.defaults);
      this.fetch = function(options) {
        return this._sync(this, 'fetch', options);
      };
      this.save = function(options) {
        return this._sync(this, 'save', options);
      };
      this.destroy = function(options) {
        return this._sync(this, 'destroy', options);
      };
      (function() {
        var init;
        init = function(method) {
          _.extend(method, Backbone.Events);
          method.onStart = function(handler) {
            return method.bind('start', handler);
          };
          return method.onComplete = function(handler) {
            return method.bind('complete', handler);
          };
        };
        init(_this.fetch);
        init(_this.save);
        return init(_this.destroy);
      })();
      return this.atts = this.attributes;
    };

    /*
      Retrieves the [id] if it exists, otherwise returns the [cid].
    */


    Model.prototype.identifier = function() {
      var _ref;
      return (_ref = this.id) != null ? _ref : this.id = this.cid;
    };

    /*
      Adds one or more [Property] functions to the object.
      @param props :    Object literal describing the properties to add
                        The object takes the form [name: default-value].
                        {
                          name: 'default value'
                        }
    */


    Model.prototype.addProps = function(props) {};

    /*
      Fetches the model's state from the server.
      @param options
              - error(args)   : (optional) Function to invoke if an error occurs.
              - success(args) : (optional) Function to invoke upon success.
                              result args:
                                  - model    : The model.
                                  - response : The response data.
                                  - success  : {bool} Flag indicating if the operation was successful
                                  - error    : {bool} Flag indicating if the operation was in error.
      # See backbone.js documentation for more details.
      
      Listening to events.
        This function fires 'start' and 'complete' events, eg: model.fetch.bind 'start', (e) -> 
        Alternatively you can use the [onStart] and [onComplete] event handler methods, eg:
            
            model.fetch.onComplete (e) ->
    */


    Model.prototype.fetch = void 0;

    Model.prototype.save = void 0;

    Model.prototype.destroy = void 0;

    Model.prototype._sync = function(model, methodName, options) {
      var fn;
      if (options == null) {
        options = {};
      }
      fn = Backbone.Model.prototype[methodName];
      return common.sync(fn, model, methodName, options);
    };

    return Model;

  })(Backbone.Model);

}).call(this);
}, "qui/core/mvc/module": function(exports, require, module) {(function() {
  var Base, Module, View, common, createMvcIndex, tryRequire, util,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Base = require('../base');

  View = require('./view');

  common = require('./_common');

  util = require('../util');

  module.exports = Module = Module = (function(_super) {

    __extends(Module, _super);

    Module.prototype.tryRequire = util.tryRequire;

    /*
      Constructor.
      @param module:     The CommonJS module (used to derive the path), or the path itself.
      @param properties: Optional. An object containing the property values to assign.
    */


    function Module(module, properties) {
      if (properties == null) {
        properties = {};
      }
      Module.prototype._construct.call(this, module, properties);
    }

    /*
      Called internally by the constructor.  
      Use this if properties are added to the object after 
      construction and you need to re-run the constructor,
      (eg. within a functional inheritance pattern).
    */


    Module.prototype._construct = function(module, properties) {
      var core, key, prop, req,
        _this = this;
      if (properties == null) {
        properties = {};
      }
      Module.__super__.constructor.call(this);
      _.extend(this, Backbone.Events);
      this.addProps(this.defaults);
      if (Module.prototype.core == null) {
        core = require('../../core');
        core.init();
        Module.prototype.core = core;
        Module.prototype.mvc = core.mvc;
      }
      if (properties != null) {
        for (key in properties) {
          prop = this[key];
          if (prop instanceof Function) {
            prop(properties[key]);
          }
        }
      }
      if ((module != null ? module.id : void 0) != null) {
        this.modulePath = _(module.id).strLeftBack('/');
      } else {
        this.modulePath = module;
      }
      if (!(this.modulePath != null) || _.isBlank(this.modulePath)) {
        throw 'Module path not specified. Pass either the path of the CommonJS module to [super].';
      }
      req = function(dir) {
        var requirePart;
        requirePart = function(name, options) {
          if (options == null) {
            options = {};
          }
          return tryRequire(_this, dir, name, options);
        };
        requirePart.module = _this;
        return requirePart;
      };
      this.model = req('models');
      this.view = req('views');
      this.controller = req('controllers');
      this.collection = req('collections');
      this.util = req('utils');
      return this.require = {
        model: this.model,
        view: this.view,
        controller: this.controller,
        collection: this.collection,
        util: this.util
      };
    };

    /*
      The root view of the module (convention).
      When overriding the Module, set this property convention based proeprty within Init.
    */


    Module.prototype.rootView = null;

    /*
      An index of the convention based MVC structures within the module.
      The object has the form:
        - models
        - views
        - controllers
    */


    Module.prototype.index = null;

    /*
      An index of the module-part require functions:
        - model
        - view
        - controller
      
      Each MVC function takes the parameters:
      
      @param name: The name of the module (folder).
      @param options
                - init:  Flag indicating if the [parent module-init] pattern should be invoked (default: true)
                - throw: Flag indicating if the errors should be thrown (default: false)
                - log:   Flag indicating if errors should be written to the console (default: false)
      
      For example, to retrieve a module named 'foo' within the /models folder:
          foo = module.require.model('foo')
          
            or
          
          foo = module.model('foo')
    */


    Module.prototype.require = null;

    Module.prototype.model = null;

    Module.prototype.view = null;

    Module.prototype.controller = null;

    Module.prototype.collection = null;

    /*
      Initializes the module (overridable).
      @param options
              - within: The CSS selector, DOM element, JQuery Object or [View] to initialize 
                        the module wihtin.  Passing 'options' param through the base 'init' method
                        converts whatever type of value to a jQuery element.
    */


    Module.prototype.init = function(options) {
      if (options == null) {
        options = {};
      }
      options.within = util.toJQuery(options.within);
      createMvcIndex(this);
      return this;
    };

    return Module;

  })(Base);

  createMvcIndex = function(module) {
    var get, req, setIndex, setView,
      _this = this;
    req = module.require;
    get = Module.requirePart;
    setIndex = function(propName, fnRequire) {
      var getIndex;
      if (module[propName] != null) {
        return;
      }
      getIndex = function(fnRequire) {
        var index;
        index = get(fnRequire, '');
        return index != null ? index : index = {};
      };
      return module[propName] = getIndex(fnRequire);
    };
    setIndex('models', module.model);
    setIndex('views', module.view);
    setIndex('controllers', module.controller);
    setIndex('collections', module.collection);
    setIndex('utils', module.util);
    setView = function(prop, name) {
      var view;
      if (module.views[prop] != null) {
        return;
      }
      view = get(req.view, name);
      if (view != null) {
        return module.views[prop] = view;
      }
    };
    setView('Root', 'root');
    return setView('Tmpl', 'tmpl');
  };

  tryRequire = function(module, dir, name, options) {
    var part, path, _ref, _ref1;
    if (name == null) {
      name = '';
    }
    if (options == null) {
      options = {};
    }
    if ((_ref = options["throw"]) == null) {
      options["throw"] = true;
    }
    if ((_ref1 = options.init) == null) {
      options.init = true;
    }
    path = "" + module.modulePath + "/" + dir + "/" + name;
    part = module.tryRequire(path, options);
    if ((part != null) && options.init) {
      part = Module.initPart(module, part);
    }
    return part;
  };

  /*
  Attempts to get an MVC part using the given require function - 
  invoking it as a module init if it's a function
  CONVENTION: 
      If the index returns a function, rather than a simple object-literal
      the module assumes it wants to be initialized with this, the parent module
      and invokes it passing the module as the parameter.
  
  @param fnRequire: The require-part function 
                    (see [module.require.*] method)
  @param name:      The name of the module.  Default is [index] (empty string).
  @returns the module or null if the MVC part does not exist.
  */


  Module.requirePart = function(fnRequire, name) {
    var part;
    if (name == null) {
      name = '';
    }
    part = fnRequire(name, {
      "throw": false
    });
    if (part == null) {
      return part;
    }
    part = Module.initPart(fnRequire.module, part);
    return part;
  };

  /*
  Implements the parent [module-init] pattern.
  @param parentModule: The parent module.
  @param childModule: The child module to initialize.
  */


  Module.initPart = function(parentModule, childModule) {
    if (_.isFunction(childModule)) {
      try {
        return childModule(parentModule);
      } catch (error) {

      }
    }
    return childModule;
  };

  /*
  Copy the self-propagating extend function that Backbone classes use.
  NOTE: 
      This is so the Module can be extended using the classic approach
      shown in the Backbone documentation, which become important if
      the consuming application is being written in raw JavaScript and
      does not have the 'class' sugar of of CoffeeScript.
  */


  Module.extend = View.extend;

}).call(this);
}, "qui/core/mvc/template": function(exports, require, module) {
/*
Helper for simple client-side templates using the Underscore template engine.
*/


(function() {
  var Template;

  module.exports = Template = (function() {
    /*
      Constructor.
      @param props: An object containing values to attach as properties to the template.
                    
                    As well as properties passed into the template property functions themselves
                    templates can access properties on the [Template] object which can be
                    passed into the constructor.
                    
                    For example, if the template was constructed like this:
                    
                      tmpl = new MyTemplate( foo:123 )
                    
                    The 'foo' property would be accessed within the template like this
                    
                      root:
                          """"
                          <div><%= tmpl.foo %></div>
                          """"
                    
                    Note: 'tmpl' is a reference to the template that is passed into all
                          template functions automatically.  It is just available.
                    
                    Any existing properties on the template are NOT overwritten by a 
                    property contained within the 'props' argument.
    */

    function Template(props) {
      Template.prototype._construct.call(this, props);
    }

    /*
      Called internally by the constructor.  
      Use this if properties are added to the object after
      construction and you need to re-run the constructor,
      (eg. within a functional inheritance pattern).
    */


    Template.prototype._construct = function(props) {
      var exclude, key, name, value, _results;
      if (props == null) {
        props = {};
      }
      exclude = ['constructor'];
      for (key in this) {
        if (!(_(exclude).any(function(item) {
          return item === key;
        }))) {
          value = this[key];
          if (_(value).isString()) {
            this[key] = this.toTemplate(value);
          }
        }
      }
      _results = [];
      for (name in props) {
        if (this[name] == null) {
          _results.push(this[name] = props[name]);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    /*
      Converts a template string into a compiled template function.
      Override this to use a template library other than the default underscore engine.
      @param str: The HTML template string.
    */


    Template.prototype.toTemplate = function(str) {
      var fn, self;
      self = this;
      fn = _.template(str);
      return function(args) {
        var _ref;
        if (args == null) {
          args = {};
        }
        if ((_ref = args.tmpl) == null) {
          args.tmpl = self;
        }
        return fn(args);
      };
    };

    return Template;

  })();

}).call(this);
}, "qui/core/mvc/view": function(exports, require, module) {(function() {
  var Model, View, common, syncClasses, syncVisibility, util,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  common = require('./_common');

  Model = require('./model');

  util = common.util;

  /*
  Base class for visual controls.
  */


  module.exports = View = (function(_super) {

    __extends(View, _super);

    /*
      Constructor.
      @param params
              - tagName   : (optional). The tag name for the View's root element (default: DIV)
              - className : (optional). The CSS class name for the root element.
              - el        : (optional). An explicit element to use.
    */


    function View(params) {
      if (params == null) {
        params = {};
      }
      View.prototype._construct.call(this, params);
    }

    /*
      Called internally by the constructor.  
      Use this if properties are added to the object after 
      construction and you need to re-run the constructor,
      (eg. within a functional inheritance pattern).
    */


    View.prototype._construct = function(params) {
      var view,
        _this = this;
      if (params == null) {
        params = {};
      }
      View.__super__.constructor.call(this, params);
      this.addProps({
        enabled: true,
        visible: true
      });
      view = new Backbone.View({
        tagName: params.tagName,
        className: params.className,
        el: params.el
      });
      this._ = {
        view: view,
        atts: params
      };
      this.element = view.el;
      this.$el = view.$el;
      this.el = $(this.element);
      this.visible.onChanged(function(e) {
        return syncVisibility(_this, e.newValue);
      });
      this.enabled.onChanged(function(e) {
        return syncClasses(_this);
      });
      this.$ = view.$;
      this.make = view.make;
      return syncClasses(this);
    };

    /*
      Renders the given HTML within the view.
    */


    View.prototype.html = function(html) {
      var el;
      el = this.el;
      if (html != null) {
        el.html(html);
      }
      return el.html();
    };

    /*
      Deterines whether the view element currently has focus.
      @returns true if the element is focused, otherwise false.
    */


    View.prototype.hasFocus = function() {
      return $(document.activeElement).get(0) === this.el.get(0);
    };

    /*
      Replaces the given element with the view.
      @param el: The element to replace, this can be a:
                  - CSS selector (string)
                  - DOM element
                  - jQuery object
                  - MVC View
      
      This method:
        - copies all CSS classes from the replaced element.
        - sets default property values specified in data-{propName} attributes.
    */


    View.prototype.replace = function(el) {
      var classes, name, self, _i, _len, _ref;
      self = this;
      el = util.toJQuery(el);
      if (el == null) {
        return this;
      }
      classes = (_ref = el.attr('class')) != null ? _ref.split(/\s+/) : void 0;
      if (classes != null) {
        for (_i = 0, _len = classes.length; _i < _len; _i++) {
          name = classes[_i];
          self.el.addClass(name);
        }
      }
      (function() {
        var id, viewId;
        viewId = self.el.attr('id');
        if ((viewId != null) && viewId !== '') {
          return;
        }
        id = el.attr('id');
        if (id == null) {
          return;
        }
        if (_(id).isBlank()) {
          return;
        }
        self.el.attr('id', id);
        if (self.id == null) {
          return self.id = id;
        }
      })();
      (function() {
        var atts, d, prop, _j, _len1, _results;
        atts = (function() {
          var _results;
          _results = [];
          for (d in el.data()) {
            _results.push(d);
          }
          return _results;
        })();
        if (!(atts.length > 0)) {
          return;
        }
        _results = [];
        for (_j = 0, _len1 = atts.length; _j < _len1; _j++) {
          name = atts[_j];
          prop = self[name];
          if (prop instanceof Function) {
            _results.push(prop(el.data(name)));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      })();
      el.replaceWith(this.el);
      return this;
    };

    /*
      Appends the given element with the view.
      @param el: The element to replace, this can be a:
                  - CSS selector (string)
                  - DOM element
                  - jQuery object
                  - MVC View
    */


    View.prototype.append = function(el) {
      el = util.toJQuery(el);
      if (el != null) {
        el.append(this.el);
      }
      return this;
    };

    /*
      Renders a string version of the element's HTML.
    */


    View.prototype.outerHtml = function() {
      return View.outerHtml(this.el);
    };

    View.prototype._cssPrefix = 'core';

    /*
      Produces a CSS class name by appending the given name on the controls CSS prefix.
      @param name: The CSS class name to append.
      @returns the CSS class name in the form "{prefix}_{name}".
    */


    View.prototype._className = function(name) {
      return "" + this._cssPrefix + "_" + name;
    };

    return View;

  })(Model);

  /*
  Renders a string version of the element's HTML.
  @param el: The element to render (either a jQuery or HTML DOM element).
  @returns the string.
  */


  View.outerHtml = function(el) {
    var outer;
    if (el == null) {
      return null;
    }
    if (_(el).isString()) {
      return el;
    }
    el = util.toJQuery(el);
    outer = $('<div></div>');
    outer.append(el.clone(false));
    return outer.html();
  };

  syncClasses = function(view) {
    var isEnabled, toggle;
    toggle = function(className, apply) {
      return view.el.toggleClass(view._className(className), apply);
    };
    isEnabled = view.enabled();
    toggle('enabled', isEnabled);
    return toggle('disabled', !isEnabled);
  };

  syncVisibility = function(view, visible) {
    var display;
    display = visible ? '' : 'none';
    return view.el.css('display', display);
  };

}).call(this);
}, "qui/core/util/_conversion": function(exports, require, module) {(function() {

  module.exports = {
    /*
      Converts a value to boolean.
      @param value: To convert.
      @returns True for:
                - true
                - 1
                - 'true' (any case permutation)
                - 'yes'
                - 'on'
               False for:
                - false
                - 0
                - 'false' (any case permutation)
                - 'no'
                - 'off'
               Null for:
                - object
    */

    toBool: function(value) {
      if (_.isBoolean(value)) {
        return value;
      }
      if (value == null) {
        return false;
      }
      if (_.isString(value)) {
        value = _.trim(value).toLowerCase();
        if (value === 'true' || value === 'on' || value === 'yes') {
          return true;
        }
        if (value === 'false' || value === 'off' || value === 'no') {
          return false;
        }
        return null;
      }
      if (_.isNumber(value)) {
        if (value === 1) {
          return true;
        }
        if (value === 0) {
          return false;
        }
        return null;
      }
      return null;
    },
    /*
      Converts < and > ' and " and & characters to corresponding ascii codes.
      @param html: The HTML string to convert.
      @returns the converted string.
    */

    escapeHtml: function(html) {
      if (html == null) {
        return null;
      }
      return html = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    },
    /*
      Converts an escaped string back into HTML.
      @param esacped: The escaped string to convert.
      @returns the converted string.
    */

    unescapeHtml: function(escaped) {
      if (escaped == null) {
        return null;
      }
      return escaped = escaped.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, "\"").replace(/&#39;/g, "'");
    }
  };

}).call(this);
}, "qui/core/util/_jquery": function(exports, require, module) {(function() {

  module.exports = {
    /*
      Attempts to convert the given [view/element/string] to a jQuery object.
      @param value : The value to convert.  This can be either a:
                      - jQuery object (returns same value)
                      - string (CSS selector)
                      - an MVC View (returns .el)
                      - HTMLElement (wraps in jQuery object)
      @returns a jQuery object, or null if the value was undefined/null.
    */

    toJQuery: function(value) {
      if (!(value != null)) {
        return value;
      }
      if (value instanceof jQuery) {
        return value;
      }
      if (value.el instanceof jQuery) {
        return value.el;
      }
      return $(value);
    },
    /*
      Reads the style value from the given element, and removes any non-digit
      characters, parsing it into a number.
      @param el:            The jQuery element to read.
      @param style:         The CSS style name to read.
      @param defaultResult: The value to return if there is no corresponding CSS value.
    */

    cssNum: function(el, style, defaultResult) {
      var value;
      if (defaultResult == null) {
        defaultResult = 0;
      }
      if (!((el != null) && (style != null))) {
        return defaultResult;
      }
      value = el.css(style);
      if ((value != null) === false || value === '') {
        return defaultResult;
      }
      value = value.replace(/[^-\d\.]/g, '');
      value = parseFloat(value);
      return value;
    },
    /*
      Updates the absolute position of the given element.
      @param el:      The element (or view) to update.
      @param top:     The top value (or null to not set).
      @param right:   The right value (or null to not set).
      @param bottom:  The bottom value (or null to not set).
      @param left:    The left value (or null to not set).
      @param unit:    Optional. The unit (default 'px').
    */

    absPos: function(el, top, right, bottom, left, unit) {
      var set;
      if (unit == null) {
        unit = 'px';
      }
      el = this.toJQuery(el);
      el.css('position', 'absolute');
      set = function(style, value) {
        value = value != null ? value + unit : '';
        return el.css(style, value);
      };
      set('top', top);
      set('right', right);
      set('bottom', bottom);
      return set('left', left);
    }
  };

  /*
  Source: http://stackoverflow.com/questions/2132172/disable-text-highlighting-on-double-click-in-jquery/2132230#2132230
  Example - No text selection on elements with a class of 'noSelect':
  
      $('.noSelect').disableTextSelect()
  */


  $.extend($.fn.disableTextSelect = function() {
    return this.each(function() {
      if ($.browser.mozilla) {
        return $(this).css('MozUserSelect', 'none');
      } else if ($.browser.msie) {
        return $(this).bind('selectstart', function() {
          return false;
        });
      } else {
        return $(this).mousedown(function() {
          return false;
        });
      }
    });
  });

}).call(this);
}, "qui/core/util/_string": function(exports, require, module) {(function() {
  var fnBlank;

  fnBlank = _.isBlank;

  /*
  Underscore string extensions.
  */


  _.mixin({
    isBlank: function(text) {
      if (text == null) {
        return true;
      }
      return fnBlank(text);
    },
    /*
      Converts a blank string to null.
    */

    nullIfBlank: function(text) {
      if (_.isBlank(text)) {
        return null;
      } else {
        return text;
      }
    }
  });

}).call(this);
}, "qui/core/util/cookie": function(exports, require, module) {(function() {
  var Base, Cookie, parseValue, save,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Base = require('../base');

  /*
  A wrapper for the browser cookie providing a consistent property-function API.
  */


  module.exports = Cookie = (function(_super) {

    __extends(Cookie, _super);

    /*
      Constructor.
      @param args
              - name:     The name of the cookie (default: 'root').
              - expires:  The number of days until the cookie expires (default: null - never expires).
              - path:     The cookie path (default: '/').
    */


    function Cookie(args) {
      var lazySave, store, _ref, _ref1,
        _this = this;
      if (args == null) {
        args = {};
      }
      Cookie.__super__.constructor.apply(this, arguments);
      this.name = (_ref = args.name) != null ? _ref : 'root';
      this.expires = args.expires;
      this.path = (_ref1 = args.path) != null ? _ref1 : '/';
      store = parseValue(this.name);
      lazySave = _.debounce((function() {
        return save(_this, store, _this.expires);
      }), 50);
      this.propertyStore = function() {
        var fn;
        return fn = function(name, value, options) {
          if (value !== void 0) {
            if (value != null) {
              value = _(value).trim();
              if (value === '') {
                value = null;
              }
            }
            store[name] = value;
            lazySave();
          }
          return store[name];
        };
      };
      this.addProps(this.defaults);
    }

    /*
      Deletes the cookie.
    */


    Cookie.prototype["delete"] = function() {
      return save(this, null, -1);
    };

    return Cookie;

  })(Base);

  parseValue = function(name) {
    var key, part, _i, _len, _ref;
    _ref = document.cookie.split(';');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      part = _ref[_i];
      key = _(part).chain().strLeft('=').trim().value();
      if (key === name) {
        part = _(part).strRight('=');
        if (_.isBlank(part)) {
          return {};
        }
        try {
          return JSON.parse(part);
        } catch (error) {
          return {};
        }
      }
    }
    return {};
  };

  save = function(cookie, store, expiresIn) {
    var date, expires, json, value;
    expires = '';
    if (expiresIn != null) {
      date = new Date();
      date.setTime(date.getTime() + (expiresIn * 24 * 60 * 60 * 1000));
      expires = "expires=" + (date.toGMTString()) + "; ";
    }
    json = store != null ? JSON.stringify(store) : '';
    value = "" + cookie.name + "=" + json + "; " + expires + "path=" + cookie.path;
    return document.cookie = value;
  };

}).call(this);
}, "qui/core/util/index": function(exports, require, module) {(function() {
  var jQueryUtil, util;

  require('./_string');

  jQueryUtil = require('./_jquery');

  module.exports = util = {
    jQuery: jQueryUtil,
    toJQuery: jQueryUtil.toJQuery,
    Property: require('./property'),
    Cookie: require('./cookie'),
    /*
      Executes a [require] call within a try/catch block.
      @param path : Path to the require statement.
      @param options
                - throw: Flag indicating if the errors should be thrown (default: false)
                - log:   Flag indicating if errors should be written to the console (default: false)
    */

    tryRequire: function(path, options) {
      var fnRequire, log, throwOnError, _ref, _ref1, _ref2;
      if (options == null) {
        options = {};
      }
      throwOnError = (_ref = options["throw"]) != null ? _ref : options["throw"] = false;
      log = (_ref1 = options.log) != null ? _ref1 : options.log = false;
      try {
        fnRequire = (_ref2 = typeof window !== "undefined" && window !== null ? window.require : void 0) != null ? _ref2 : require;
        return fnRequire(path);
      } catch (error) {
        if (throwOnError) {
          throw error;
        }
        if (log) {
          return typeof console !== "undefined" && console !== null ? console.log('[tryRequire] Failed to load module: ' + path) : void 0;
        }
      }
    },
    /*
      Updates the scroll CSS classes on the given element.
      @param el :  The jQuery element to update.
      @param axis: The axis to scroll on.
                    - x:    scrolls horizontally only (class: core_scroll_x).
                    - y:    scrolls vertically only (class: core_scroll_y). Default
                    - xy:   scrolls both horizontally and vertically (class: core_scroll_xy).
                    - null: no scrolling (class: core_scroll_none).
      @param options
                    - prefix: The CSS prefix to apply. Default: 'core_scroll_'
    */

    syncScroll: function(el, axis, options) {
      var prefix, toggle, _ref;
      if (options == null) {
        options = {};
      }
      if (el == null) {
        return el;
      }
      if (axis === void 0) {
        axis = 'y';
      }
      if (axis != null) {
        axis = _(axis).trim().toLowerCase();
      }
      prefix = (_ref = options.prefix) != null ? _ref : 'core_scroll_';
      toggle = function(key, value) {
        if (value === void 0) {
          value = key;
        }
        return el.toggleClass(prefix + key, value === axis);
      };
      toggle('x');
      toggle('y');
      toggle('xy');
      toggle('none', null);
      return el;
    },
    /*
      Selects all <a> tags within the given element and
      assigns the [core_external] class to ones that start
      with an 'http://' or 'https://' or 'mailto:
      @param el: The element containing the <a> element to format.
      @param options
              - className: Optional. The class to assign to external links (default: 'core_').
              - tooltip:   Optional. The tooltip text to assign (default: none).
              - target:    Optional. The target for the external link (default: '_blank').
    */

    formatLinks: function(el, options) {
      var a, className, getHref, isExternal, process, target, targetNewWindow, tooltip, _i, _len, _ref, _ref1, _ref2, _results;
      if (options == null) {
        options = {};
      }
      if (el == null) {
        return;
      }
      className = (_ref = options.className) != null ? _ref : 'core_external';
      tooltip = options.tooltip;
      target = (_ref1 = options.target) != null ? _ref1 : '_blank';
      getHref = function(a) {
        var href;
        href = a.attr('href');
        if (href != null) {
          href = _(href.toLowerCase());
        }
        return href;
      };
      isExternal = function(href, a) {
        var prefix, _i, _len, _ref2;
        if (href == null) {
          return false;
        }
        _ref2 = ['http://', 'https://', 'mailto:'];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          prefix = _ref2[_i];
          if (href.startsWith(prefix)) {
            return true;
          }
        }
        if (a.attr('target') === target) {
          return true;
        }
        return false;
      };
      targetNewWindow = function(href) {
        if (href.startsWith('mailto:')) {
          return false;
        }
        return true;
      };
      process = function(a) {
        var href;
        href = getHref(a);
        if (!isExternal(href, a)) {
          return;
        }
        a.addClass(className);
        if ((target != null) && targetNewWindow(href)) {
          a.attr('target', target);
        }
        if (tooltip != null) {
          return a.attr('title', tooltip);
        }
      };
      _ref2 = el.find('a');
      _results = [];
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        a = _ref2[_i];
        _results.push(process($(a)));
      }
      return _results;
    }
  };

  _.extend(util, require('./_conversion'));

}).call(this);
}, "qui/core/util/property": function(exports, require, module) {
/*
A function which is used as a property.
Create an instance of this class and assign the 'fn' to a property on an object. 
Usage:
  - Read:  the 'fn' function is invoked with no parameter.
  - Write: the 'fn' function is invoekd with a value parameter.

Property events:
  - changing : Fires immediately before the property changes.  Event handler can mutate written property value.
  - changed  : Fires immediately after the property has changed.
  - reading  : Fires immediately before the property is read.  Event handler can mutate the read property value.
*/


(function() {
  var Property, fireEvent,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    _this = this;

  module.exports = Property = (function() {
    /*
      Constructor.
      @param options
                - name:    (required) The name of the property.
                - store:   (required) Either the object to store values in (using the 'name' as key)
                                      of a function used to read/write values to another store.
                - default: (optional) The default value to use.
    */

    function Property(options) {
      var fn, _ref;
      if (options == null) {
        options = {};
      }
      this.fireChanged = __bind(this.fireChanged, this);

      this.fireChanging = __bind(this.fireChanging, this);

      this.fireReading = __bind(this.fireReading, this);

      this.write = __bind(this.write, this);

      this.read = __bind(this.read, this);

      this.fn = __bind(this.fn, this);

      fn = this.fn;
      fn._parent = this;
      this.name = options.name;
      this._ = {
        store: options.store,
        "default": (_ref = options["default"]) != null ? _ref : options["default"] = null
      };
      _.extend(this, Backbone.Events);
      _.extend(fn, Backbone.Events);
      fn.onChanging = function(handler) {
        return fn.bind('changing', handler);
      };
      fn.onChanged = function(handler) {
        return fn.bind('changed', handler);
      };
      fn.onReading = function(handler) {
        return fn.bind('reading', handler);
      };
      fn.toggle = function() {
        var value;
        value = fn();
        if (value === true || value === false) {
          return fn(!value);
        }
      };
    }

    /*
      The primary read/write function of the property.
      Expose this from your objects as a property-func.
      @param value (optional) the value to assign.  
                   Do not specify (undefined) for read operations.
      @param options
                - silent : (optional) Flag indicating if events should be suppressed (default false).
                - *      : Any other arguments that are to be passed through on the event
    */


    Property.prototype.fn = function(value, options) {
      if (value !== void 0) {
        this.write(value, options);
      }
      return this.read();
    };

    /*
      Reads the property value.
    */


    Property.prototype.read = function() {
      var args, store, value;
      store = this._.store;
      if (_.isFunction(store)) {
        value = store(this.name);
      } else {
        value = store[this.name];
      }
      if (value === void 0) {
        value = this._["default"];
      }
      args = this.fireReading(value);
      value = args.value;
      return value;
    };

    /*
      Writes the given value to the property.
      @param value : The value to write.
      @param options
                - silent : (optional) Flag indicating if events should be suppressed (default false).
                - *      : Any other arguments that are to be passed through on the event
    */


    Property.prototype.write = function(value, options) {
      var args, oldValue, store, _ref;
      if (options == null) {
        options = {};
      }
      if (value === void 0) {
        return;
      }
      oldValue = this.read();
      if (value === oldValue) {
        return;
      }
      if ((_ref = options.silent) == null) {
        options.silent = false;
      }
      if (options.silent === false) {
        args = this.fireChanging(oldValue, value, options);
        if (args.cancel === true) {
          return;
        }
        value = args.newValue;
      }
      store = this._.store;
      if (_.isFunction(store)) {
        store(this.name, value, options);
      } else {
        store[this.name] = value;
      }
      if (options.silent === false) {
        return this.fireChanged(oldValue, value, options);
      }
    };

    /*
      Fires the 'reading' event (from the [Property] instance, and the [fn] method)
      allowing listeners to mutate the returned value.
      @param value : The value of the property.
      @returns the event args.
    */


    Property.prototype.fireReading = function(value) {
      var args;
      args = {
        value: value
      };
      fireEvent('reading', this, args);
      return args;
    };

    /*
      Fires the 'changing' event (from the [Property] instance, and the [fn] method)
      allowing listeners to cancel the change.
      @param oldValue : The value before the property is changing from.
      @param newValue : The new value the property is changing to.
      @param options  : Any options that were passed through when writing to the property.
      @returns the event args.
    */


    Property.prototype.fireChanging = function(oldValue, newValue, options) {
      var args;
      if (options == null) {
        options = {};
      }
      args = {
        oldValue: oldValue,
        newValue: newValue,
        cancel: false,
        options: options
      };
      fireEvent('changing', this, args);
      return args;
    };

    /*
      Fires the 'changed' event (from the [Property] instance, and the [fn] method).
      @param oldValue : The value before the property is changing from.
      @param newValue : The new value the property is changing to.
      @param options  : Any options that were passed through when writing to the property.
      @returns the event args.
    */


    Property.prototype.fireChanged = function(oldValue, newValue, options) {
      if (options == null) {
        options = {};
      }
      return fireEvent('changed', this, {
        oldValue: oldValue,
        newValue: newValue,
        options: options
      });
    };

    return Property;

  })();

  fireEvent = function(eventName, prop, args) {
    var fire;
    args.property = prop;
    fire = function(obj) {
      return obj.trigger(eventName, args);
    };
    fire(prop);
    fire(prop.fn);
    return args;
  };

}).call(this);
}, "qui/index": function(exports, require, module) {(function() {

  module.exports = {
    controls: require('./controls'),
    core: require('./core'),
    view: require('./view'),
    viewModel: require('./viewModel'),
    MessageBox: require('./messageBox'),
    version: '1.2.1'
  };

}).call(this);
}, "qui/messageBox": function(exports, require, module) {(function() {
  var Buttons, Results;

  Results = {
    Yes: 0,
    No: 1,
    Cancel: 2,
    Ok: 3
  };

  Buttons = {
    OkCancel: 0,
    YesNo: 1,
    YesNoInverse: 2,
    YesNoCancel: 3,
    YesNoCancelInverse: 4
  };

  module.exports = {
    Results: Results,
    Buttons: Buttons,
    show: function(options, callback) {
      var ab, addCancel, addNo, addOk, addYes, buttons, md, opts, qui, returnVal;
      if (options == null) {
        options = {};
      }
      qui = require('qui');
      opts = $.extend({
        message: 'Are you sure?',
        buttons: Buttons.OkCancel,
        title: 'Confirm'
      }, options);
      if (!_(_(opts.message).trim()).startsWith('<p>')) {
        opts.message = "<p>" + opts.message + "</p>";
      }
      md = new qui.controls.ModalDialog($.extend(options, {
        content: opts.message,
        title: opts.title,
        width: opts.width || 500,
        backdrop: 'static'
      }));
      md.$el.addClass('qui-message-box');
      ab = md.actionBar;
      returnVal = function(val) {
        if (typeof callback === "function") {
          callback(val);
        }
        return md.hide();
      };
      addYes = function(isDefault, label) {
        if (isDefault == null) {
          isDefault = true;
        }
        if (label == null) {
          label = 'Yes';
        }
        return ab.addAction({
          label: label,
          actionId: 'yes',
          isDefault: isDefault,
          onClick: function() {
            return returnVal(Results.Yes);
          }
        });
      };
      addNo = function(isDefault, label) {
        if (isDefault == null) {
          isDefault = false;
        }
        if (label == null) {
          label = 'No';
        }
        return ab.addAction({
          label: label,
          actionId: 'no',
          onClick: function() {
            return returnVal(Results.No);
          },
          isDefault: isDefault
        });
      };
      addOk = function(label) {
        if (label == null) {
          label = 'OK';
        }
        return ab.addAction({
          label: label,
          actionId: 'ok',
          onClick: function() {
            return returnVal(Results.Ok);
          }
        });
      };
      addCancel = function(label) {
        if (label == null) {
          label = 'Cancel';
        }
        return ab.addAction({
          label: label,
          actionId: 'cancel',
          isDefault: false,
          hoverOnly: true,
          onClick: function() {
            return returnVal(Results.Cancel);
          }
        });
      };
      buttons = (function() {
        var _ref, _ref1, _ref10, _ref11, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;
        switch (opts.buttons) {
          case Buttons.OkCancel:
            addOk((_ref = opts.buttonLabels) != null ? _ref.Ok : void 0);
            return addCancel((_ref1 = opts.buttonLabels) != null ? _ref1.Cancel : void 0);
          case Buttons.YesNo:
            addYes(true, (_ref2 = opts.buttonLabels) != null ? _ref2.Yes : void 0);
            return addNo(false, (_ref3 = opts.buttonLabels) != null ? _ref3.No : void 0);
          case Buttons.YesNoInverse:
            addYes(false, (_ref4 = opts.buttonLabels) != null ? _ref4.Yes : void 0);
            return addNo(true, (_ref5 = opts.buttonLabels) != null ? _ref5.No : void 0);
          case Buttons.YesNoCancel:
            addYes(true, (_ref6 = opts.buttonLabels) != null ? _ref6.Yes : void 0);
            addNo(false, (_ref7 = opts.buttonLabels) != null ? _ref7.No : void 0);
            return addCancel((_ref8 = opts.buttonLabels) != null ? _ref8.Cancel : void 0);
          case Buttons.YesNoCancelInverse:
            addYes(false, (_ref9 = opts.buttonLabels) != null ? _ref9.Yes : void 0);
            addNo(true, (_ref10 = opts.buttonLabels) != null ? _ref10.No : void 0);
            return addCancel((_ref11 = opts.buttonLabels) != null ? _ref11.Cancel : void 0);
          default:
            return buttons = null;
        }
      })();
      if ((options.defer != null) !== true) {
        md.show();
      }
      return md;
    }
  };

}).call(this);
}, "qui/view": function(exports, require, module) {(function() {
  var View, core,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  core = require('./core');

  module.exports = View = (function(_super) {

    __extends(View, _super);

    function View() {
      return View.__super__.constructor.apply(this, arguments);
    }

    return View;

  })(core.mvc.Template);

}).call(this);
}, "qui/viewModel": function(exports, require, module) {(function() {
  var ViewModel, core,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  core = require('./core');

  module.exports = ViewModel = (function(_super) {

    __extends(ViewModel, _super);

    function ViewModel(args) {
      var _this = this;
      ViewModel.__super__.constructor.call(this, args);
      this.options = {};
      _(this.options).extend(this.defaults, args);
      this._cid = new Date().getTime();
      this.addProps({
        height: null,
        width: null
      });
      if (this.width()) {
        this.$el.css('width', this.width());
      }
      this.width.onChanged(function(e) {
        var val;
        val = e.newValue;
        if (_(val).isNumber()) {
          if (val <= 0) {
            return;
          }
          return _this.$el.css('width', "" + val + "px");
        }
      });
      this.height.onChanged(function(e) {
        var val;
        val = e.newValue;
        if (_(val).isNumber()) {
          if (val <= 0) {
            return;
          }
          return _this.$el.css('height', "" + val + "px");
        }
      });
      this.visible.onChanged(function(e) {
        if (e.newValue === true) {
          _this.$el.show();
        }
        if (e.newValue === false) {
          return _this.$el.hide();
        }
      });
    }

    ViewModel.prototype.cannot = function(property, value, it, err) {
      var _this = this;
      if (it()) {
        if (this[property]() === value) {
          err();
        }
      }
      return this[property].onChanged(function(e) {
        if (it()) {
          if (e.newValue === value) {
            err();
          }
          return e.newValue;
        }
      });
    };

    ViewModel.prototype.render = function() {
      if (this.options.parent != null) {
        return null;
      } else {
        return this.$el;
      }
    };

    ViewModel.prototype.setView = function(view, options) {
      this.view = new view(options);
      if (options.parent != null) {
        this.$el = options.parent;
      } else {
        this.$el = $(this.view.root());
      }
      if (typeof this.width === "function" ? this.width() : void 0) {
        return this.$el.css('width', this.width());
      }
    };

    ViewModel.prototype.hide = function() {
      return this.$el.addClass('hide');
    };

    ViewModel.prototype.show = function() {
      return this.$el.removeClass('hide');
    };

    ViewModel.prototype.initKendo = function(functions) {
      var bindEvent, bindEventToMethod, createEventMethod, e, em, eventMethodMap, events, fn, setupFn, _i, _j, _k, _l, _len, _len1, _len2, _len3, _results,
        _this = this;
      if (!this.kendo) {
        return;
      }
      eventMethodMap = [];
      setupFn = function(f) {
        return _this.constructor.prototype[f] = function(args) {
          return this.kendo[f](args);
        };
      };
      bindEvent = function(src, f) {
        return src.bind(f, function(e) {
          return _this.trigger(f, e);
        });
      };
      createEventMethod = function(f) {
        var cap, onCap, prop;
        prop = {};
        cap = _(f).capitalize();
        onCap = "on" + cap;
        prop[onCap] = null;
        _this.addProps(prop);
        return eventMethodMap.push({
          event: f,
          method: onCap
        });
      };
      bindEventToMethod = function(e, method) {
        return _this.bind(e, function(args) {
          var _base;
          return typeof (_base = _this[method]()) === "function" ? _base(args) : void 0;
        });
      };
      events = this.kendo.events;
      for (_i = 0, _len = functions.length; _i < _len; _i++) {
        fn = functions[_i];
        setupFn(fn);
      }
      for (_j = 0, _len1 = events.length; _j < _len1; _j++) {
        e = events[_j];
        if (!_(this.ignoredEvents).contains(e)) {
          bindEvent(this.kendo, e);
        }
      }
      for (_k = 0, _len2 = events.length; _k < _len2; _k++) {
        e = events[_k];
        createEventMethod(e);
      }
      _results = [];
      for (_l = 0, _len3 = eventMethodMap.length; _l < _len3; _l++) {
        em = eventMethodMap[_l];
        _results.push(bindEventToMethod(em.event, em.method));
      }
      return _results;
    };

    ViewModel.prototype.rebind = function(event, callback) {
      this.unbind(event);
      return this.bind(event, function(args) {
        return callback(args);
      });
    };

    ViewModel.prototype.html = function() {
      return this.$el.html();
    };

    ViewModel.include = function(klass, mixin) {
      var extend;
      extend = function(obj, mixin) {
        var method, name;
        for (name in mixin) {
          method = mixin[name];
          obj[name] = method;
        }
        return obj;
      };
      return extend(klass.prototype, mixin);
    };

    return ViewModel;

  })(core.mvc.View);

}).call(this);
}});
/* ===================================================
 * bootstrap-transition.js v2.1.1
 * http://twitter.github.com/bootstrap/javascript.html#transitions
 * ===================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  $(function () {

    "use strict"; // jshint ;_;


    /* CSS TRANSITION SUPPORT (http://www.modernizr.com/)
     * ======================================================= */

    $.support.transition = (function () {

      var transitionEnd = (function () {

        var el = document.createElement('bootstrap')
          , transEndEventNames = {
               'WebkitTransition' : 'webkitTransitionEnd'
            ,  'MozTransition'    : 'transitionend'
            ,  'OTransition'      : 'oTransitionEnd otransitionend'
            ,  'transition'       : 'transitionend'
            }
          , name

        for (name in transEndEventNames){
          if (el.style[name] !== undefined) {
            return transEndEventNames[name]
          }
        }

      }())

      return transitionEnd && {
        end: transitionEnd
      }

    })()

  })

}(window.jQuery);/* ==========================================================
 * bootstrap-alert.js v2.1.1
 * http://twitter.github.com/bootstrap/javascript.html#alerts
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* ALERT CLASS DEFINITION
  * ====================== */

  var dismiss = '[data-dismiss="alert"]'
    , Alert = function (el) {
        $(el).on('click', dismiss, this.close)
      }

  Alert.prototype.close = function (e) {
    var $this = $(this)
      , selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = $(selector)

    e && e.preventDefault()

    $parent.length || ($parent = $this.hasClass('alert') ? $this : $this.parent())

    $parent.trigger(e = $.Event('close'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent
        .trigger('closed')
        .remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent.on($.support.transition.end, removeElement) :
      removeElement()
  }


 /* ALERT PLUGIN DEFINITION
  * ======================= */

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('alert')
      if (!data) $this.data('alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


 /* ALERT DATA-API
  * ============== */

  $(function () {
    $('body').on('click.alert.data-api', dismiss, Alert.prototype.close)
  })

}(window.jQuery);/* =========================================================
 * bootstrap-modal.js v2.1.1
 * http://twitter.github.com/bootstrap/javascript.html#modals
 * =========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */


!function ($) {

  "use strict"; // jshint ;_;


 /* MODAL CLASS DEFINITION
  * ====================== */

  var Modal = function (element, options) {
    this.options = options
    this.$element = $(element)
      .delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this))
    this.options.remote && this.$element.find('.modal-body').load(this.options.remote)
  }

  Modal.prototype = {

      constructor: Modal

    , toggle: function () {
        return this[!this.isShown ? 'show' : 'hide']()
      }

    , show: function () {
        var that = this
          , e = $.Event('show')

        this.$element.trigger(e)

        if (this.isShown || e.isDefaultPrevented()) return

        $('body').addClass('modal-open')

        this.isShown = true

        this.escape()

        this.backdrop(function () {
          var transition = $.support.transition && that.$element.hasClass('fade')

          if (!that.$element.parent().length) {
            that.$element.appendTo(document.body) //don't move modals dom position
          }

          that.$element
            .show()

          if (transition) {
            that.$element[0].offsetWidth // force reflow
          }

          that.$element
            .addClass('in')
            .attr('aria-hidden', false)
            .focus()

          that.enforceFocus()

          transition ?
            that.$element.one($.support.transition.end, function () { that.$element.trigger('shown') }) :
            that.$element.trigger('shown')

        })
      }

    , hide: function (e) {
        e && e.preventDefault()

        var that = this

        e = $.Event('hide')

        this.$element.trigger(e)

        if (!this.isShown || e.isDefaultPrevented()) return

        this.isShown = false

        $('body').removeClass('modal-open')

        this.escape()

        $(document).off('focusin.modal')

        this.$element
          .removeClass('in')
          .attr('aria-hidden', true)

        $.support.transition && this.$element.hasClass('fade') ?
          this.hideWithTransition() :
          this.hideModal()
      }

    , enforceFocus: function () {
        var that = this
        $(document).on('focusin.modal', function (e) {
          if (that.$element[0] !== e.target && !that.$element.has(e.target).length) {
            that.$element.focus()
          }
        })
      }

    , escape: function () {
        var that = this
        if (this.isShown && this.options.keyboard) {
          this.$element.on('keyup.dismiss.modal', function ( e ) {
            e.which == 27 && that.hide()
          })
        } else if (!this.isShown) {
          this.$element.off('keyup.dismiss.modal')
        }
      }

    , hideWithTransition: function () {
        var that = this
          , timeout = setTimeout(function () {
              that.$element.off($.support.transition.end)
              that.hideModal()
            }, 500)

        this.$element.one($.support.transition.end, function () {
          clearTimeout(timeout)
          that.hideModal()
        })
      }

    , hideModal: function (that) {
        this.$element
          .hide()
          .trigger('hidden')

        this.backdrop()
      }

    , removeBackdrop: function () {
        this.$backdrop.remove()
        this.$backdrop = null
      }

    , backdrop: function (callback) {
        var that = this
          , animate = this.$element.hasClass('fade') ? 'fade' : ''

        if (this.isShown && this.options.backdrop) {
          var doAnimate = $.support.transition && animate

          this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
            .appendTo(document.body)

          if (this.options.backdrop != 'static') {
            this.$backdrop.click($.proxy(this.hide, this))
          }

          if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

          this.$backdrop.addClass('in')

          doAnimate ?
            this.$backdrop.one($.support.transition.end, callback) :
            callback()

        } else if (!this.isShown && this.$backdrop) {
          this.$backdrop.removeClass('in')

          $.support.transition && this.$element.hasClass('fade')?
            this.$backdrop.one($.support.transition.end, $.proxy(this.removeBackdrop, this)) :
            this.removeBackdrop()

        } else if (callback) {
          callback()
        }
      }
  }


 /* MODAL PLUGIN DEFINITION
  * ======================= */

  $.fn.modal = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('modal')
        , options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option]()
      else if (options.show) data.show()
    })
  }

  $.fn.modal.defaults = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  $.fn.modal.Constructor = Modal


 /* MODAL DATA-API
  * ============== */

  $(function () {
    $('body').on('click.modal.data-api', '[data-toggle="modal"]', function ( e ) {
      var $this = $(this)
        , href = $this.attr('href')
        , $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
        , option = $target.data('modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

      e.preventDefault()

      $target
        .modal(option)
        .one('hide', function () {
          $this.focus()
        })
    })
  })

}(window.jQuery);/* ============================================================
 * bootstrap-dropdown.js v2.1.1
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* DROPDOWN CLASS DEFINITION
  * ========================= */

  var toggle = '[data-toggle=dropdown]'
    , Dropdown = function (element) {
        var $el = $(element).on('click.dropdown.data-api', this.toggle)
        $('html').on('click.dropdown.data-api', function () {
          $el.parent().removeClass('open')
        })
      }

  Dropdown.prototype = {

    constructor: Dropdown

  , toggle: function (e) {
      var $this = $(this)
        , $parent
        , isActive

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      clearMenus()

      if (!isActive) {
        $parent.toggleClass('open')
        $this.focus()
      }

      return false
    }

  , keydown: function (e) {
      var $this
        , $items
        , $active
        , $parent
        , isActive
        , index

      if (!/(38|40|27)/.test(e.keyCode)) return

      $this = $(this)

      e.preventDefault()
      e.stopPropagation()

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      if (!isActive || (isActive && e.keyCode == 27)) return $this.click()

      $items = $('[role=menu] li:not(.divider) a', $parent)

      if (!$items.length) return

      index = $items.index($items.filter(':focus'))

      if (e.keyCode == 38 && index > 0) index--                                        // up
      if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
      if (!~index) index = 0

      $items
        .eq(index)
        .focus()
    }

  }

  function clearMenus() {
    getParent($(toggle))
      .removeClass('open')
  }

  function getParent($this) {
    var selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = $(selector)
    $parent.length || ($parent = $this.parent())

    return $parent
  }


  /* DROPDOWN PLUGIN DEFINITION
   * ========================== */

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('dropdown')
      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  /* APPLY TO STANDARD DROPDOWN ELEMENTS
   * =================================== */

  $(function () {
    $('html')
      .on('click.dropdown.data-api touchstart.dropdown.data-api', clearMenus)
    $('body')
      .on('click.dropdown touchstart.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
      .on('click.dropdown.data-api touchstart.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
      .on('keydown.dropdown.data-api touchstart.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)
  })

}(window.jQuery);/* =============================================================
 * bootstrap-scrollspy.js v2.1.1
 * http://twitter.github.com/bootstrap/javascript.html#scrollspy
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* SCROLLSPY CLASS DEFINITION
  * ========================== */

  function ScrollSpy(element, options) {
    var process = $.proxy(this.process, this)
      , $element = $(element).is('body') ? $(window) : $(element)
      , href
    this.options = $.extend({}, $.fn.scrollspy.defaults, options)
    this.$scrollElement = $element.on('scroll.scroll-spy.data-api', process)
    this.selector = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.$body = $('body')
    this.refresh()
    this.process()
  }

  ScrollSpy.prototype = {

      constructor: ScrollSpy

    , refresh: function () {
        var self = this
          , $targets

        this.offsets = $([])
        this.targets = $([])

        $targets = this.$body
          .find(this.selector)
          .map(function () {
            var $el = $(this)
              , href = $el.data('target') || $el.attr('href')
              , $href = /^#\w/.test(href) && $(href)
            return ( $href
              && $href.length
              && [[ $href.position().top, href ]] ) || null
          })
          .sort(function (a, b) { return a[0] - b[0] })
          .each(function () {
            self.offsets.push(this[0])
            self.targets.push(this[1])
          })
      }

    , process: function () {
        var scrollTop = this.$scrollElement.scrollTop() + this.options.offset
          , scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
          , maxScroll = scrollHeight - this.$scrollElement.height()
          , offsets = this.offsets
          , targets = this.targets
          , activeTarget = this.activeTarget
          , i

        if (scrollTop >= maxScroll) {
          return activeTarget != (i = targets.last()[0])
            && this.activate ( i )
        }

        for (i = offsets.length; i--;) {
          activeTarget != targets[i]
            && scrollTop >= offsets[i]
            && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
            && this.activate( targets[i] )
        }
      }

    , activate: function (target) {
        var active
          , selector

        this.activeTarget = target

        $(this.selector)
          .parent('.active')
          .removeClass('active')

        selector = this.selector
          + '[data-target="' + target + '"],'
          + this.selector + '[href="' + target + '"]'

        active = $(selector)
          .parent('li')
          .addClass('active')

        if (active.parent('.dropdown-menu').length)  {
          active = active.closest('li.dropdown').addClass('active')
        }

        active.trigger('activate')
      }

  }


 /* SCROLLSPY PLUGIN DEFINITION
  * =========================== */

  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('scrollspy')
        , options = typeof option == 'object' && option
      if (!data) $this.data('scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy

  $.fn.scrollspy.defaults = {
    offset: 10
  }


 /* SCROLLSPY DATA-API
  * ================== */

  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(window.jQuery);/* ========================================================
 * bootstrap-tab.js v2.1.1
 * http://twitter.github.com/bootstrap/javascript.html#tabs
 * ========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* TAB CLASS DEFINITION
  * ==================== */

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype = {

    constructor: Tab

  , show: function () {
      var $this = this.element
        , $ul = $this.closest('ul:not(.dropdown-menu)')
        , selector = $this.attr('data-target')
        , previous
        , $target
        , e

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      if ( $this.parent('li').hasClass('active') ) return

      previous = $ul.find('.active a').last()[0]

      e = $.Event('show', {
        relatedTarget: previous
      })

      $this.trigger(e)

      if (e.isDefaultPrevented()) return

      $target = $(selector)

      this.activate($this.parent('li'), $ul)
      this.activate($target, $target.parent(), function () {
        $this.trigger({
          type: 'shown'
        , relatedTarget: previous
        })
      })
    }

  , activate: function ( element, container, callback) {
      var $active = container.find('> .active')
        , transition = callback
            && $.support.transition
            && $active.hasClass('fade')

      function next() {
        $active
          .removeClass('active')
          .find('> .dropdown-menu > .active')
          .removeClass('active')

        element.addClass('active')

        if (transition) {
          element[0].offsetWidth // reflow for transition
          element.addClass('in')
        } else {
          element.removeClass('fade')
        }

        if ( element.parent('.dropdown-menu') ) {
          element.closest('li.dropdown').addClass('active')
        }

        callback && callback()
      }

      transition ?
        $active.one($.support.transition.end, next) :
        next()

      $active.removeClass('in')
    }
  }


 /* TAB PLUGIN DEFINITION
  * ===================== */

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tab')
      if (!data) $this.data('tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


 /* TAB DATA-API
  * ============ */

  $(function () {
    $('body').on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
      e.preventDefault()
      $(this).tab('show')
    })
  })

}(window.jQuery);/* ===========================================================
 * bootstrap-tooltip.js v2.1.1
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* TOOLTIP PUBLIC CLASS DEFINITION
  * =============================== */

  var Tooltip = function (element, options) {
    this.init('tooltip', element, options)
  }

  Tooltip.prototype = {

    constructor: Tooltip

  , init: function (type, element, options) {
      var eventIn
        , eventOut

      this.type = type
      this.$element = $(element)
      this.options = this.getOptions(options)
      this.enabled = true

      if (this.options.trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (this.options.trigger != 'manual') {
        eventIn = this.options.trigger == 'hover' ? 'mouseenter' : 'focus'
        eventOut = this.options.trigger == 'hover' ? 'mouseleave' : 'blur'
        this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }

      this.options.selector ?
        (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
        this.fixTitle()
    }

  , getOptions: function (options) {
      options = $.extend({}, $.fn[this.type].defaults, options, this.$element.data())

      if (options.delay && typeof options.delay == 'number') {
        options.delay = {
          show: options.delay
        , hide: options.delay
        }
      }

      return options
    }

  , enter: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (!self.options.delay || !self.options.delay.show) return self.show()

      clearTimeout(this.timeout)
      self.hoverState = 'in'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'in') self.show()
      }, self.options.delay.show)
    }

  , leave: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (this.timeout) clearTimeout(this.timeout)
      if (!self.options.delay || !self.options.delay.hide) return self.hide()

      self.hoverState = 'out'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'out') self.hide()
      }, self.options.delay.hide)
    }

  , show: function () {
      var $tip
        , inside
        , pos
        , actualWidth
        , actualHeight
        , placement
        , tp

      if (this.hasContent() && this.enabled) {
        $tip = this.tip()
        this.setContent()

        if (this.options.animation) {
          $tip.addClass('fade')
        }

        placement = typeof this.options.placement == 'function' ?
          this.options.placement.call(this, $tip[0], this.$element[0]) :
          this.options.placement

        inside = /in/.test(placement)

        $tip
          .remove()
          .css({ top: 0, left: 0, display: 'block' })
          .appendTo(inside ? this.$element : document.body)

        pos = this.getPosition(inside)

        actualWidth = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight

        switch (inside ? placement.split(' ')[1] : placement) {
          case 'bottom':
            tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'top':
            tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'left':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}
            break
          case 'right':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}
            break
        }

        $tip
          .css(tp)
          .addClass(placement)
          .addClass('in')
      }
    }

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()

      $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
      $tip.removeClass('fade in top bottom left right')
    }

  , hide: function () {
      var that = this
        , $tip = this.tip()

      $tip.removeClass('in')

      function removeWithAnimation() {
        var timeout = setTimeout(function () {
          $tip.off($.support.transition.end).remove()
        }, 500)

        $tip.one($.support.transition.end, function () {
          clearTimeout(timeout)
          $tip.remove()
        })
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        removeWithAnimation() :
        $tip.remove()

      return this
    }

  , fixTitle: function () {
      var $e = this.$element
      if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
        $e.attr('data-original-title', $e.attr('title') || '').removeAttr('title')
      }
    }

  , hasContent: function () {
      return this.getTitle()
    }

  , getPosition: function (inside) {
      return $.extend({}, (inside ? {top: 0, left: 0} : this.$element.offset()), {
        width: this.$element[0].offsetWidth
      , height: this.$element[0].offsetHeight
      })
    }

  , getTitle: function () {
      var title
        , $e = this.$element
        , o = this.options

      title = $e.attr('data-original-title')
        || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

      return title
    }

  , tip: function () {
      return this.$tip = this.$tip || $(this.options.template)
    }

  , validate: function () {
      if (!this.$element[0].parentNode) {
        this.hide()
        this.$element = null
        this.options = null
      }
    }

  , enable: function () {
      this.enabled = true
    }

  , disable: function () {
      this.enabled = false
    }

  , toggleEnabled: function () {
      this.enabled = !this.enabled
    }

  , toggle: function () {
      this[this.tip().hasClass('in') ? 'hide' : 'show']()
    }

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }

  }


 /* TOOLTIP PLUGIN DEFINITION
  * ========================= */

  $.fn.tooltip = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tooltip')
        , options = typeof option == 'object' && option
      if (!data) $this.data('tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip

  $.fn.tooltip.defaults = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover'
  , title: ''
  , delay: 0
  , html: true
  }

}(window.jQuery);
/* ===========================================================
 * bootstrap-popover.js v2.1.1
 * http://twitter.github.com/bootstrap/javascript.html#popovers
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* POPOVER PUBLIC CLASS DEFINITION
  * =============================== */

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }


  /* NOTE: POPOVER EXTENDS BOOTSTRAP-TOOLTIP.js
     ========================================== */

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {

    constructor: Popover

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()
        , content = this.getContent()

      $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
      $tip.find('.popover-content > *')[this.options.html ? 'html' : 'text'](content)

      $tip.removeClass('fade top bottom left right in')
    }

  , hasContent: function () {
      return this.getTitle() || this.getContent()
    }

  , getContent: function () {
      var content
        , $e = this.$element
        , o = this.options

      content = $e.attr('data-content')
        || (typeof o.content == 'function' ? o.content.call($e[0]) :  o.content)

      return content
    }

  , tip: function () {
      if (!this.$tip) {
        this.$tip = $(this.options.template)
      }
      return this.$tip
    }

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }

  })


 /* POPOVER PLUGIN DEFINITION
  * ======================= */

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('popover')
        , options = typeof option == 'object' && option
      if (!data) $this.data('popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover

  $.fn.popover.defaults = $.extend({} , $.fn.tooltip.defaults, {
    placement: 'right'
  , trigger: 'click'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
  })

}(window.jQuery);/* ============================================================
 * bootstrap-button.js v2.1.1
 * http://twitter.github.com/bootstrap/javascript.html#buttons
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* BUTTON PUBLIC CLASS DEFINITION
  * ============================== */

  var Button = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.button.defaults, options)
  }

  Button.prototype.setState = function (state) {
    var d = 'disabled'
      , $el = this.$element
      , data = $el.data()
      , val = $el.is('input') ? 'val' : 'html'

    state = state + 'Text'
    data.resetText || $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout(function () {
      state == 'loadingText' ?
        $el.addClass(d).attr(d, d) :
        $el.removeClass(d).removeAttr(d)
    }, 0)
  }

  Button.prototype.toggle = function () {
    var $parent = this.$element.closest('[data-toggle="buttons-radio"]')

    $parent && $parent
      .find('.active')
      .removeClass('active')

    this.$element.toggleClass('active')
  }


 /* BUTTON PLUGIN DEFINITION
  * ======================== */

  $.fn.button = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('button')
        , options = typeof option == 'object' && option
      if (!data) $this.data('button', (data = new Button(this, options)))
      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.defaults = {
    loadingText: 'loading...'
  }

  $.fn.button.Constructor = Button


 /* BUTTON DATA-API
  * =============== */

  $(function () {
    $('body').on('click.button.data-api', '[data-toggle^=button]', function ( e ) {
      var $btn = $(e.target)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      $btn.button('toggle')
    })
  })

}(window.jQuery);/* =============================================================
 * bootstrap-collapse.js v2.1.1
 * http://twitter.github.com/bootstrap/javascript.html#collapse
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* COLLAPSE PUBLIC CLASS DEFINITION
  * ================================ */

  var Collapse = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.collapse.defaults, options)

    if (this.options.parent) {
      this.$parent = $(this.options.parent)
    }

    this.options.toggle && this.toggle()
  }

  Collapse.prototype = {

    constructor: Collapse

  , dimension: function () {
      var hasWidth = this.$element.hasClass('width')
      return hasWidth ? 'width' : 'height'
    }

  , show: function () {
      var dimension
        , scroll
        , actives
        , hasData

      if (this.transitioning) return

      dimension = this.dimension()
      scroll = $.camelCase(['scroll', dimension].join('-'))
      actives = this.$parent && this.$parent.find('> .accordion-group > .in')

      if (actives && actives.length) {
        hasData = actives.data('collapse')
        if (hasData && hasData.transitioning) return
        actives.collapse('hide')
        hasData || actives.data('collapse', null)
      }

      this.$element[dimension](0)
      this.transition('addClass', $.Event('show'), 'shown')
      $.support.transition && this.$element[dimension](this.$element[0][scroll])
    }

  , hide: function () {
      var dimension
      if (this.transitioning) return
      dimension = this.dimension()
      this.reset(this.$element[dimension]())
      this.transition('removeClass', $.Event('hide'), 'hidden')
      this.$element[dimension](0)
    }

  , reset: function (size) {
      var dimension = this.dimension()

      this.$element
        .removeClass('collapse')
        [dimension](size || 'auto')
        [0].offsetWidth

      this.$element[size !== null ? 'addClass' : 'removeClass']('collapse')

      return this
    }

  , transition: function (method, startEvent, completeEvent) {
      var that = this
        , complete = function () {
            if (startEvent.type == 'show') that.reset()
            that.transitioning = 0
            that.$element.trigger(completeEvent)
          }

      this.$element.trigger(startEvent)

      if (startEvent.isDefaultPrevented()) return

      this.transitioning = 1

      this.$element[method]('in')

      $.support.transition && this.$element.hasClass('collapse') ?
        this.$element.one($.support.transition.end, complete) :
        complete()
    }

  , toggle: function () {
      this[this.$element.hasClass('in') ? 'hide' : 'show']()
    }

  }


 /* COLLAPSIBLE PLUGIN DEFINITION
  * ============================== */

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('collapse')
        , options = typeof option == 'object' && option
      if (!data) $this.data('collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.defaults = {
    toggle: true
  }

  $.fn.collapse.Constructor = Collapse


 /* COLLAPSIBLE DATA-API
  * ==================== */

  $(function () {
    $('body').on('click.collapse.data-api', '[data-toggle=collapse]', function (e) {
      var $this = $(this), href
        , target = $this.attr('data-target')
          || e.preventDefault()
          || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
        , option = $(target).data('collapse') ? 'toggle' : $this.data()
      $this[$(target).hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
      $(target).collapse(option)
    })
  })

}(window.jQuery);/* ==========================================================
 * bootstrap-carousel.js v2.1.1
 * http://twitter.github.com/bootstrap/javascript.html#carousel
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* CAROUSEL CLASS DEFINITION
  * ========================= */

  var Carousel = function (element, options) {
    this.$element = $(element)
    this.options = options
    this.options.slide && this.slide(this.options.slide)
    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.prototype = {

    cycle: function (e) {
      if (!e) this.paused = false
      this.options.interval
        && !this.paused
        && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))
      return this
    }

  , to: function (pos) {
      var $active = this.$element.find('.item.active')
        , children = $active.parent().children()
        , activePos = children.index($active)
        , that = this

      if (pos > (children.length - 1) || pos < 0) return

      if (this.sliding) {
        return this.$element.one('slid', function () {
          that.to(pos)
        })
      }

      if (activePos == pos) {
        return this.pause().cycle()
      }

      return this.slide(pos > activePos ? 'next' : 'prev', $(children[pos]))
    }

  , pause: function (e) {
      if (!e) this.paused = true
      if (this.$element.find('.next, .prev').length && $.support.transition.end) {
        this.$element.trigger($.support.transition.end)
        this.cycle()
      }
      clearInterval(this.interval)
      this.interval = null
      return this
    }

  , next: function () {
      if (this.sliding) return
      return this.slide('next')
    }

  , prev: function () {
      if (this.sliding) return
      return this.slide('prev')
    }

  , slide: function (type, next) {
      var $active = this.$element.find('.item.active')
        , $next = next || $active[type]()
        , isCycling = this.interval
        , direction = type == 'next' ? 'left' : 'right'
        , fallback  = type == 'next' ? 'first' : 'last'
        , that = this
        , e = $.Event('slide', {
            relatedTarget: $next[0]
          })

      this.sliding = true

      isCycling && this.pause()

      $next = $next.length ? $next : this.$element.find('.item')[fallback]()

      if ($next.hasClass('active')) return

      if ($.support.transition && this.$element.hasClass('slide')) {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $next.addClass(type)
        $next[0].offsetWidth // force reflow
        $active.addClass(direction)
        $next.addClass(direction)
        this.$element.one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid') }, 0)
        })
      } else {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $active.removeClass('active')
        $next.addClass('active')
        this.sliding = false
        this.$element.trigger('slid')
      }

      isCycling && this.cycle()

      return this
    }

  }


 /* CAROUSEL PLUGIN DEFINITION
  * ========================== */

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('carousel')
        , options = $.extend({}, $.fn.carousel.defaults, typeof option == 'object' && option)
        , action = typeof option == 'string' ? option : options.slide
      if (!data) $this.data('carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.cycle()
    })
  }

  $.fn.carousel.defaults = {
    interval: 5000
  , pause: 'hover'
  }

  $.fn.carousel.Constructor = Carousel


 /* CAROUSEL DATA-API
  * ================= */

  $(function () {
    $('body').on('click.carousel.data-api', '[data-slide]', function ( e ) {
      var $this = $(this), href
        , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
        , options = !$target.data('modal') && $.extend({}, $target.data(), $this.data())
      $target.carousel(options)
      e.preventDefault()
    })
  })

}(window.jQuery);/* =============================================================
 * bootstrap-typeahead.js v2.1.1
 * http://twitter.github.com/bootstrap/javascript.html#typeahead
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function($){

  "use strict"; // jshint ;_;


 /* TYPEAHEAD PUBLIC CLASS DEFINITION
  * ================================= */

  var Typeahead = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.typeahead.defaults, options)
    this.matcher = this.options.matcher || this.matcher
    this.sorter = this.options.sorter || this.sorter
    this.highlighter = this.options.highlighter || this.highlighter
    this.updater = this.options.updater || this.updater
    this.$menu = $(this.options.menu).appendTo('body')
    this.source = this.options.source
    this.shown = false
    this.listen()
  }

  Typeahead.prototype = {

    constructor: Typeahead

  , select: function () {
      var val = this.$menu.find('.active').attr('data-value')
      this.$element
        .val(this.updater(val))
        .change()
      return this.hide()
    }

  , updater: function (item) {
      return item
    }

  , show: function () {
      var pos = $.extend({}, this.$element.offset(), {
        height: this.$element[0].offsetHeight
      })

      this.$menu.css({
        top: pos.top + pos.height
      , left: pos.left
      })

      this.$menu.show()
      this.shown = true
      return this
    }

  , hide: function () {
      this.$menu.hide()
      this.shown = false
      return this
    }

  , lookup: function (event) {
      var items

      this.query = this.$element.val()

      if (!this.query || this.query.length < this.options.minLength) {
        return this.shown ? this.hide() : this
      }

      items = $.isFunction(this.source) ? this.source(this.query, $.proxy(this.process, this)) : this.source

      return items ? this.process(items) : this
    }

  , process: function (items) {
      var that = this

      items = $.grep(items, function (item) {
        return that.matcher(item)
      })

      items = this.sorter(items)

      if (!items.length) {
        return this.shown ? this.hide() : this
      }

      return this.render(items.slice(0, this.options.items)).show()
    }

  , matcher: function (item) {
      return ~item.toLowerCase().indexOf(this.query.toLowerCase())
    }

  , sorter: function (items) {
      var beginswith = []
        , caseSensitive = []
        , caseInsensitive = []
        , item

      while (item = items.shift()) {
        if (!item.toLowerCase().indexOf(this.query.toLowerCase())) beginswith.push(item)
        else if (~item.indexOf(this.query)) caseSensitive.push(item)
        else caseInsensitive.push(item)
      }

      return beginswith.concat(caseSensitive, caseInsensitive)
    }

  , highlighter: function (item) {
      var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
      return item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
        return '<strong>' + match + '</strong>'
      })
    }

  , render: function (items) {
      var that = this

      items = $(items).map(function (i, item) {
        i = $(that.options.item).attr('data-value', item)
        i.find('a').html(that.highlighter(item))
        return i[0]
      })

      items.first().addClass('active')
      this.$menu.html(items)
      return this
    }

  , next: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , next = active.next()

      if (!next.length) {
        next = $(this.$menu.find('li')[0])
      }

      next.addClass('active')
    }

  , prev: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , prev = active.prev()

      if (!prev.length) {
        prev = this.$menu.find('li').last()
      }

      prev.addClass('active')
    }

  , listen: function () {
      this.$element
        .on('blur',     $.proxy(this.blur, this))
        .on('keypress', $.proxy(this.keypress, this))
        .on('keyup',    $.proxy(this.keyup, this))

      if ($.browser.chrome || $.browser.webkit || $.browser.msie) {
        this.$element.on('keydown', $.proxy(this.keydown, this))
      }

      this.$menu
        .on('click', $.proxy(this.click, this))
        .on('mouseenter', 'li', $.proxy(this.mouseenter, this))
    }

  , move: function (e) {
      if (!this.shown) return

      switch(e.keyCode) {
        case 9: // tab
        case 13: // enter
        case 27: // escape
          e.preventDefault()
          break

        case 38: // up arrow
          e.preventDefault()
          this.prev()
          break

        case 40: // down arrow
          e.preventDefault()
          this.next()
          break
      }

      e.stopPropagation()
    }

  , keydown: function (e) {
      this.suppressKeyPressRepeat = !~$.inArray(e.keyCode, [40,38,9,13,27])
      this.move(e)
    }

  , keypress: function (e) {
      if (this.suppressKeyPressRepeat) return
      this.move(e)
    }

  , keyup: function (e) {
      switch(e.keyCode) {
        case 40: // down arrow
        case 38: // up arrow
          break

        case 9: // tab
        case 13: // enter
          if (!this.shown) return
          this.select()
          break

        case 27: // escape
          if (!this.shown) return
          this.hide()
          break

        default:
          this.lookup()
      }

      e.stopPropagation()
      e.preventDefault()
  }

  , blur: function (e) {
      var that = this
      setTimeout(function () { that.hide() }, 150)
    }

  , click: function (e) {
      e.stopPropagation()
      e.preventDefault()
      this.select()
    }

  , mouseenter: function (e) {
      this.$menu.find('.active').removeClass('active')
      $(e.currentTarget).addClass('active')
    }

  }


  /* TYPEAHEAD PLUGIN DEFINITION
   * =========================== */

  $.fn.typeahead = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('typeahead')
        , options = typeof option == 'object' && option
      if (!data) $this.data('typeahead', (data = new Typeahead(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.typeahead.defaults = {
    source: []
  , items: 8
  , menu: '<ul class="typeahead dropdown-menu"></ul>'
  , item: '<li><a href="#"></a></li>'
  , minLength: 1
  }

  $.fn.typeahead.Constructor = Typeahead


 /*   TYPEAHEAD DATA-API
  * ================== */

  $(function () {
    $('body').on('focus.typeahead.data-api', '[data-provide="typeahead"]', function (e) {
      var $this = $(this)
      if ($this.data('typeahead')) return
      e.preventDefault()
      $this.typeahead($this.data())
    })
  })

}(window.jQuery);
//     Underscore.js 1.3.1
//     (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore is freely distributable under the MIT license.
//     Portions of Underscore are inspired or borrowed from Prototype,
//     Oliver Steele's Functional, and John Resig's Micro-Templating.
//     For all details and documentation:
//     http://documentcloud.github.com/underscore

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var slice            = ArrayProto.slice,
      unshift          = ArrayProto.unshift,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) { return new wrapper(obj); };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root['_'] = _;
  }

  // Current version.
  _.VERSION = '1.3.1';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (_.has(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    if (obj.length === +obj.length) results.length = obj.length;
    return results;
  };

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError('Reduce of empty array with no initial value');
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var reversed = _.toArray(obj).reverse();
    if (context && !initial) iterator = _.bind(iterator, context);
    return initial ? _.reduce(reversed, iterator, memo, context) : _.reduce(reversed, iterator);
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    each(obj, function(value, index, list) {
      if (!iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if a given value is included in the array or object using `===`.
  // Aliased as `contains`.
  _.include = _.contains = function(obj, target) {
    var found = false;
    if (obj == null) return found;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    found = any(obj, function(value) {
      return value === target;
    });
    return found;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    return _.map(obj, function(value) {
      return (_.isFunction(method) ? method || value : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Return the maximum element or (element-based computation).
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj)) return Math.max.apply(Math, obj);
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj)) return Math.min.apply(Math, obj);
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array.
  _.shuffle = function(obj) {
    var shuffled = [], rand;
    each(obj, function(value, index, list) {
      if (index == 0) {
        shuffled[0] = value;
      } else {
        rand = Math.floor(Math.random() * (index + 1));
        shuffled[index] = shuffled[rand];
        shuffled[rand] = value;
      }
    });
    return shuffled;
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, iterator, context) {
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria, b = right.criteria;
      return a < b ? -1 : a > b ? 1 : 0;
    }), 'value');
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = function(obj, val) {
    var result = {};
    var iterator = _.isFunction(val) ? val : function(obj) { return obj[val]; };
    each(obj, function(value, index) {
      var key = iterator(value, index);
      (result[key] || (result[key] = [])).push(value);
    });
    return result;
  };

  // Use a comparator function to figure out at what index an object should
  // be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator) {
    iterator || (iterator = _.identity);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >> 1;
      iterator(array[mid]) < iterator(obj) ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely convert anything iterable into a real, live array.
  _.toArray = function(iterable) {
    if (!iterable)                return [];
    if (iterable.toArray)         return iterable.toArray();
    if (_.isArray(iterable))      return slice.call(iterable);
    if (_.isArguments(iterable))  return slice.call(iterable);
    return _.values(iterable);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    return _.toArray(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head`. The **guard** check allows it to work
  // with `_.map`.
  _.first = _.head = function(array, n, guard) {
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the last entry of the array. Especcialy useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if ((n != null) && !guard) {
      return slice.call(array, Math.max(array.length - n, 0));
    } else {
      return array[array.length - 1];
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail`.
  // Especially useful on the arguments object. Passing an **index** will return
  // the rest of the values in the array from that index onward. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = function(array, index, guard) {
    return slice.call(array, (index == null) || guard ? 1 : index);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, function(value){ return !!value; });
  };

  // Return a completely flattened version of an array.
  _.flatten = function(array, shallow) {
    return _.reduce(array, function(memo, value) {
      if (_.isArray(value)) return memo.concat(shallow ? value : _.flatten(value));
      memo[memo.length] = value;
      return memo;
    }, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator) {
    var initial = iterator ? _.map(array, iterator) : array;
    var result = [];
    _.reduce(initial, function(memo, el, i) {
      if (0 == i || (isSorted === true ? _.last(memo) != el : !_.include(memo, el))) {
        memo[memo.length] = el;
        result[result.length] = array[i];
      }
      return memo;
    }, []);
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays. (Aliased as "intersect" for back-compat.)
  _.intersection = _.intersect = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = _.flatten(slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.include(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i < length; i++) results[i] = _.pluck(args, "" + i);
    return results;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i, l;
    if (isSorted) {
      i = _.sortedIndex(array, item);
      return array[i] === item ? i : -1;
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item);
    for (i = 0, l = array.length; i < l; i++) if (i in array && array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item) {
    if (array == null) return -1;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) return array.lastIndexOf(item);
    var i = array.length;
    while (i--) if (i in array && array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Binding with arguments is also known as `curry`.
  // Delegates to **ECMAScript 5**'s native `Function.bind` if available.
  // We check for `func.bind` first, to fail fast when `func` is undefined.
  _.bind = function bind(func, context) {
    var bound, args;
    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length == 0) funcs = _.functions(obj);
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(func, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  _.throttle = function(func, wait) {
    var context, args, timeout, throttling, more;
    var whenDone = _.debounce(function(){ more = throttling = false; }, wait);
    return function() {
      context = this; args = arguments;
      var later = function() {
        timeout = null;
        if (more) func.apply(context, args);
        whenDone();
      };
      if (!timeout) timeout = setTimeout(later, wait);
      if (throttling) {
        more = true;
      } else {
        func.apply(context, args);
      }
      whenDone();
      throttling = true;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds.
  _.debounce = function(func, wait) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      return memo = func.apply(this, arguments);
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func].concat(slice.call(arguments, 0));
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    if (times <= 0) return func();
    return function() {
      if (--times < 1) { return func.apply(this, arguments); }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys[keys.length] = key;
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    return _.map(obj, _.identity);
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (obj[prop] == null) obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function.
  function eq(a, b, stack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the Harmony `egal` proposal: http://wiki.ecmascript.org/doku.php?id=harmony:egal.
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a._chain) a = a._wrapped;
    if (b._chain) b = b._wrapped;
    // Invoke a custom `isEqual` method if one is provided.
    if (a.isEqual && _.isFunction(a.isEqual)) return a.isEqual(b);
    if (b.isEqual && _.isFunction(b.isEqual)) return b.isEqual(a);
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = stack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (stack[length] == a) return true;
    }
    // Add the first object to the stack of traversed objects.
    stack.push(a);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          // Ensure commutative equality for sparse arrays.
          if (!(result = size in a == size in b && eq(a[size], b[size], stack))) break;
        }
      }
    } else {
      // Objects with different constructors are not equivalent.
      if ('constructor' in a != 'constructor' in b || a.constructor != b.constructor) return false;
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], stack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    stack.pop();
    return result;
  }

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType == 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Is a given variable an arguments object?
  _.isArguments = function(obj) {
    return toString.call(obj) == '[object Arguments]';
  };
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Is a given value a function?
  _.isFunction = function(obj) {
    return toString.call(obj) == '[object Function]';
  };

  // Is a given value a string?
  _.isString = function(obj) {
    return toString.call(obj) == '[object String]';
  };

  // Is a given value a number?
  _.isNumber = function(obj) {
    return toString.call(obj) == '[object Number]';
  };

  // Is the given value `NaN`?
  _.isNaN = function(obj) {
    // `NaN` is the only value for which `===` is not reflexive.
    return obj !== obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value a date?
  _.isDate = function(obj) {
    return toString.call(obj) == '[object Date]';
  };

  // Is the given value a regular expression?
  _.isRegExp = function(obj) {
    return toString.call(obj) == '[object RegExp]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Has own property?
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function (n, iterator, context) {
    for (var i = 0; i < n; i++) iterator.call(context, i);
  };

  // Escape a string for HTML interpolation.
  _.escape = function(string) {
    return (''+string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g,'&#x2F;');
  };

  // Add your own custom functions to the Underscore object, ensuring that
  // they're correctly added to the OOP wrapper as well.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      addToWrapper(name, _[name] = obj[name]);
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = idCounter++;
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /.^/;

  // Within an interpolation, evaluation, or escaping, remove HTML escaping
  // that had been previously added.
  var unescape = function(code) {
    return code.replace(/\\\\/g, '\\').replace(/\\'/g, "'");
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(str, data) {
    var c  = _.templateSettings;
    var tmpl = 'var __p=[],print=function(){__p.push.apply(__p,arguments);};' +
      'with(obj||{}){__p.push(\'' +
      str.replace(/\\/g, '\\\\')
         .replace(/'/g, "\\'")
         .replace(c.escape || noMatch, function(match, code) {
           return "',_.escape(" + unescape(code) + "),'";
         })
         .replace(c.interpolate || noMatch, function(match, code) {
           return "'," + unescape(code) + ",'";
         })
         .replace(c.evaluate || noMatch, function(match, code) {
           return "');" + unescape(code).replace(/[\r\n\t]/g, ' ') + ";__p.push('";
         })
         .replace(/\r/g, '\\r')
         .replace(/\n/g, '\\n')
         .replace(/\t/g, '\\t')
         + "');}return __p.join('');";
    var func = new Function('obj', '_', tmpl);
    if (data) return func(data, _);
    return function(data) {
      return func.call(this, data, _);
    };
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // The OOP Wrapper
  // ---------------

  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.
  var wrapper = function(obj) { this._wrapped = obj; };

  // Expose `wrapper.prototype` as `_.prototype`
  _.prototype = wrapper.prototype;

  // Helper function to continue chaining intermediate results.
  var result = function(obj, chain) {
    return chain ? _(obj).chain() : obj;
  };

  // A method to easily add functions to the OOP wrapper.
  var addToWrapper = function(name, func) {
    wrapper.prototype[name] = function() {
      var args = slice.call(arguments);
      unshift.call(args, this._wrapped);
      return result(func.apply(_, args), this._chain);
    };
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      var wrapped = this._wrapped;
      method.apply(wrapped, arguments);
      var length = wrapped.length;
      if ((name == 'shift' || name == 'splice') && length === 0) delete wrapped[0];
      return result(wrapped, this._chain);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      return result(method.apply(this._wrapped, arguments), this._chain);
    };
  });

  // Start chaining a wrapped Underscore object.
  wrapper.prototype.chain = function() {
    this._chain = true;
    return this;
  };

  // Extracts the result from a wrapped and chained object.
  wrapper.prototype.value = function() {
    return this._wrapped;
  };

}).call(this);//  Underscore.string
//  (c) 2010 Esa-Matti Suuronen <esa-matti aet suuronen dot org>
//  Underscore.string is freely distributable under the terms of the MIT license.
//  Documentation: https://github.com/epeli/underscore.string
//  Some code is borrowed from MooTools and Alexandru Marasteanu.
//  Version '2.3.0'

!function(root, String){
  'use strict';

  // Defining helper functions.

  var nativeTrim = String.prototype.trim;
  var nativeTrimRight = String.prototype.trimRight;
  var nativeTrimLeft = String.prototype.trimLeft;

  var parseNumber = function(source) { return source * 1 || 0; };

  var strRepeat = function(str, qty){
    if (qty < 1) return '';
    var result = '';
    while (qty > 0) {
      if (qty & 1) result += str;
      qty >>= 1, str += str;
    }
    return result;
  };

  var slice = [].slice;

  var defaultToWhiteSpace = function(characters) {
    if (characters == null)
      return '\\s';
    else if (characters.source)
      return characters.source;
    else
      return '[' + _s.escapeRegExp(characters) + ']';
  };

  var escapeChars = {
    lt: '<',
    gt: '>',
    quot: '"',
    amp: '&',
    apos: "'"
  };

  var reversedEscapeChars = {};
  for(var key in escapeChars) reversedEscapeChars[escapeChars[key]] = key;
  reversedEscapeChars["'"] = '#39';

  // sprintf() for JavaScript 0.7-beta1
  // http://www.diveintojavascript.com/projects/javascript-sprintf
  //
  // Copyright (c) Alexandru Marasteanu <alexaholic [at) gmail (dot] com>
  // All rights reserved.

  var sprintf = (function() {
    function get_type(variable) {
      return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
    }

    var str_repeat = strRepeat;

    var str_format = function() {
      if (!str_format.cache.hasOwnProperty(arguments[0])) {
        str_format.cache[arguments[0]] = str_format.parse(arguments[0]);
      }
      return str_format.format.call(null, str_format.cache[arguments[0]], arguments);
    };

    str_format.format = function(parse_tree, argv) {
      var cursor = 1, tree_length = parse_tree.length, node_type = '', arg, output = [], i, k, match, pad, pad_character, pad_length;
      for (i = 0; i < tree_length; i++) {
        node_type = get_type(parse_tree[i]);
        if (node_type === 'string') {
          output.push(parse_tree[i]);
        }
        else if (node_type === 'array') {
          match = parse_tree[i]; // convenience purposes only
          if (match[2]) { // keyword argument
            arg = argv[cursor];
            for (k = 0; k < match[2].length; k++) {
              if (!arg.hasOwnProperty(match[2][k])) {
                throw new Error(sprintf('[_.sprintf] property "%s" does not exist', match[2][k]));
              }
              arg = arg[match[2][k]];
            }
          } else if (match[1]) { // positional argument (explicit)
            arg = argv[match[1]];
          }
          else { // positional argument (implicit)
            arg = argv[cursor++];
          }

          if (/[^s]/.test(match[8]) && (get_type(arg) != 'number')) {
            throw new Error(sprintf('[_.sprintf] expecting number but found %s', get_type(arg)));
          }
          switch (match[8]) {
            case 'b': arg = arg.toString(2); break;
            case 'c': arg = String.fromCharCode(arg); break;
            case 'd': arg = parseInt(arg, 10); break;
            case 'e': arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential(); break;
            case 'f': arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg); break;
            case 'o': arg = arg.toString(8); break;
            case 's': arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg); break;
            case 'u': arg = Math.abs(arg); break;
            case 'x': arg = arg.toString(16); break;
            case 'X': arg = arg.toString(16).toUpperCase(); break;
          }
          arg = (/[def]/.test(match[8]) && match[3] && arg >= 0 ? '+'+ arg : arg);
          pad_character = match[4] ? match[4] == '0' ? '0' : match[4].charAt(1) : ' ';
          pad_length = match[6] - String(arg).length;
          pad = match[6] ? str_repeat(pad_character, pad_length) : '';
          output.push(match[5] ? arg + pad : pad + arg);
        }
      }
      return output.join('');
    };

    str_format.cache = {};

    str_format.parse = function(fmt) {
      var _fmt = fmt, match = [], parse_tree = [], arg_names = 0;
      while (_fmt) {
        if ((match = /^[^\x25]+/.exec(_fmt)) !== null) {
          parse_tree.push(match[0]);
        }
        else if ((match = /^\x25{2}/.exec(_fmt)) !== null) {
          parse_tree.push('%');
        }
        else if ((match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(_fmt)) !== null) {
          if (match[2]) {
            arg_names |= 1;
            var field_list = [], replacement_field = match[2], field_match = [];
            if ((field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
              field_list.push(field_match[1]);
              while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
                if ((field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
                  field_list.push(field_match[1]);
                }
                else if ((field_match = /^\[(\d+)\]/.exec(replacement_field)) !== null) {
                  field_list.push(field_match[1]);
                }
                else {
                  throw new Error('[_.sprintf] huh?');
                }
              }
            }
            else {
              throw new Error('[_.sprintf] huh?');
            }
            match[2] = field_list;
          }
          else {
            arg_names |= 2;
          }
          if (arg_names === 3) {
            throw new Error('[_.sprintf] mixing positional and named placeholders is not (yet) supported');
          }
          parse_tree.push(match);
        }
        else {
          throw new Error('[_.sprintf] huh?');
        }
        _fmt = _fmt.substring(match[0].length);
      }
      return parse_tree;
    };

    return str_format;
  })();



  // Defining underscore.string

  var _s = {

    VERSION: '2.3.0',

    isBlank: function(str){
      if (str == null) str = '';
      return (/^\s*$/).test(str);
    },

    stripTags: function(str){
      if (str == null) return '';
      return String(str).replace(/<\/?[^>]+>/g, '');
    },

    capitalize : function(str){
      str = str == null ? '' : String(str);
      return str.charAt(0).toUpperCase() + str.slice(1);
    },

    chop: function(str, step){
      if (str == null) return [];
      str = String(str);
      step = ~~step;
      return step > 0 ? str.match(new RegExp('.{1,' + step + '}', 'g')) : [str];
    },

    clean: function(str){
      return _s.strip(str).replace(/\s+/g, ' ');
    },

    count: function(str, substr){
      if (str == null || substr == null) return 0;

      str = String(str);
      substr = String(substr);

      var count = 0,
        pos = 0,
        length = substr.length;

      while (true) {
        pos = str.indexOf(substr, pos);
        if (pos === -1) break;
        count++;
        pos += length;
      }

      return count;
    },

    chars: function(str) {
      if (str == null) return [];
      return String(str).split('');
    },

    swapCase: function(str) {
      if (str == null) return '';
      return String(str).replace(/\S/g, function(c){
        return c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase();
      });
    },

    escapeHTML: function(str) {
      if (str == null) return '';
      return String(str).replace(/[&<>"']/g, function(m){ return '&' + reversedEscapeChars[m] + ';'; });
    },

    unescapeHTML: function(str) {
      if (str == null) return '';
      return String(str).replace(/\&([^;]+);/g, function(entity, entityCode){
        var match;

        if (entityCode in escapeChars) {
          return escapeChars[entityCode];
        } else if (match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
          return String.fromCharCode(parseInt(match[1], 16));
        } else if (match = entityCode.match(/^#(\d+)$/)) {
          return String.fromCharCode(~~match[1]);
        } else {
          return entity;
        }
      });
    },

    escapeRegExp: function(str){
      if (str == null) return '';
      return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
    },

    splice: function(str, i, howmany, substr){
      var arr = _s.chars(str);
      arr.splice(~~i, ~~howmany, substr);
      return arr.join('');
    },

    insert: function(str, i, substr){
      return _s.splice(str, i, 0, substr);
    },

    include: function(str, needle){
      if (needle === '') return true;
      if (str == null) return false;
      return String(str).indexOf(needle) !== -1;
    },

    join: function() {
      var args = slice.call(arguments),
        separator = args.shift();

      if (separator == null) separator = '';

      return args.join(separator);
    },

    lines: function(str) {
      if (str == null) return [];
      return String(str).split("\n");
    },

    reverse: function(str){
      return _s.chars(str).reverse().join('');
    },

    startsWith: function(str, starts){
      if (starts === '') return true;
      if (str == null || starts == null) return false;
      str = String(str); starts = String(starts);
      return str.length >= starts.length && str.slice(0, starts.length) === starts;
    },

    endsWith: function(str, ends){
      if (ends === '') return true;
      if (str == null || ends == null) return false;
      str = String(str); ends = String(ends);
      return str.length >= ends.length && str.slice(str.length - ends.length) === ends;
    },

    succ: function(str){
      if (str == null) return '';
      str = String(str);
      return str.slice(0, -1) + String.fromCharCode(str.charCodeAt(str.length-1) + 1);
    },

    titleize: function(str){
      if (str == null) return '';
      return String(str).replace(/(?:^|\s)\S/g, function(c){ return c.toUpperCase(); });
    },

    camelize: function(str){
      return _s.trim(str).replace(/[-_\s]+(.)?/g, function(match, c){ return c.toUpperCase(); });
    },

    underscored: function(str){
      return _s.trim(str).replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
    },

    dasherize: function(str){
      return _s.trim(str).replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
    },

    classify: function(str){
      return _s.titleize(String(str).replace(/_/g, ' ')).replace(/\s/g, '');
    },

    humanize: function(str){
      return _s.capitalize(_s.underscored(str).replace(/_id$/,'').replace(/_/g, ' '));
    },

    trim: function(str, characters){
      if (str == null) return '';
      if (!characters && nativeTrim) return nativeTrim.call(str);
      characters = defaultToWhiteSpace(characters);
      return String(str).replace(new RegExp('\^' + characters + '+|' + characters + '+$', 'g'), '');
    },

    ltrim: function(str, characters){
      if (str == null) return '';
      if (!characters && nativeTrimLeft) return nativeTrimLeft.call(str);
      characters = defaultToWhiteSpace(characters);
      return String(str).replace(new RegExp('^' + characters + '+'), '');
    },

    rtrim: function(str, characters){
      if (str == null) return '';
      if (!characters && nativeTrimRight) return nativeTrimRight.call(str);
      characters = defaultToWhiteSpace(characters);
      return String(str).replace(new RegExp(characters + '+$'), '');
    },

    truncate: function(str, length, truncateStr){
      if (str == null) return '';
      str = String(str); truncateStr = truncateStr || '...';
      length = ~~length;
      return str.length > length ? str.slice(0, length) + truncateStr : str;
    },

    /**
     * _s.prune: a more elegant version of truncate
     * prune extra chars, never leaving a half-chopped word.
     * @author github.com/rwz
     */
    prune: function(str, length, pruneStr){
      if (str == null) return '';

      str = String(str); length = ~~length;
      pruneStr = pruneStr != null ? String(pruneStr) : '...';

      if (str.length <= length) return str;

      var tmpl = function(c){ return c.toUpperCase() !== c.toLowerCase() ? 'A' : ' '; },
        template = str.slice(0, length+1).replace(/.(?=\W*\w*$)/g, tmpl); // 'Hello, world' -> 'HellAA AAAAA'

      if (template.slice(template.length-2).match(/\w\w/))
        template = template.replace(/\s*\S+$/, '');
      else
        template = _s.rtrim(template.slice(0, template.length-1));

      return (template+pruneStr).length > str.length ? str : str.slice(0, template.length)+pruneStr;
    },

    words: function(str, delimiter) {
      if (_s.isBlank(str)) return [];
      return _s.trim(str, delimiter).split(delimiter || /\s+/);
    },

    pad: function(str, length, padStr, type) {
      str = str == null ? '' : String(str);
      length = ~~length;

      var padlen  = 0;

      if (!padStr)
        padStr = ' ';
      else if (padStr.length > 1)
        padStr = padStr.charAt(0);

      switch(type) {
        case 'right':
          padlen = length - str.length;
          return str + strRepeat(padStr, padlen);
        case 'both':
          padlen = length - str.length;
          return strRepeat(padStr, Math.ceil(padlen/2)) + str
                  + strRepeat(padStr, Math.floor(padlen/2));
        default: // 'left'
          padlen = length - str.length;
          return strRepeat(padStr, padlen) + str;
        }
    },

    lpad: function(str, length, padStr) {
      return _s.pad(str, length, padStr);
    },

    rpad: function(str, length, padStr) {
      return _s.pad(str, length, padStr, 'right');
    },

    lrpad: function(str, length, padStr) {
      return _s.pad(str, length, padStr, 'both');
    },

    sprintf: sprintf,

    vsprintf: function(fmt, argv){
      argv.unshift(fmt);
      return sprintf.apply(null, argv);
    },

    toNumber: function(str, decimals) {
      if (str == null || str == '') return 0;
      str = String(str);
      var num = parseNumber(parseNumber(str).toFixed(~~decimals));
      return num === 0 && !str.match(/^0+$/) ? Number.NaN : num;
    },

    numberFormat : function(number, dec, dsep, tsep) {
      if (isNaN(number) || number == null) return '';

      number = number.toFixed(~~dec);
      tsep = tsep || ',';

      var parts = number.split('.'), fnums = parts[0],
        decimals = parts[1] ? (dsep || '.') + parts[1] : '';

      return fnums.replace(/(\d)(?=(?:\d{3})+$)/g, '$1' + tsep) + decimals;
    },

    strRight: function(str, sep){
      if (str == null) return '';
      str = String(str); sep = sep != null ? String(sep) : sep;
      var pos = !sep ? -1 : str.indexOf(sep);
      return ~pos ? str.slice(pos+sep.length, str.length) : str;
    },

    strRightBack: function(str, sep){
      if (str == null) return '';
      str = String(str); sep = sep != null ? String(sep) : sep;
      var pos = !sep ? -1 : str.lastIndexOf(sep);
      return ~pos ? str.slice(pos+sep.length, str.length) : str;
    },

    strLeft: function(str, sep){
      if (str == null) return '';
      str = String(str); sep = sep != null ? String(sep) : sep;
      var pos = !sep ? -1 : str.indexOf(sep);
      return ~pos ? str.slice(0, pos) : str;
    },

    strLeftBack: function(str, sep){
      if (str == null) return '';
      str += ''; sep = sep != null ? ''+sep : sep;
      var pos = str.lastIndexOf(sep);
      return ~pos ? str.slice(0, pos) : str;
    },

    toSentence: function(array, separator, lastSeparator, serial) {
      separator = separator || ', '
      lastSeparator = lastSeparator || ' and '
      var a = array.slice(), lastMember = a.pop();

      if (array.length > 2 && serial) lastSeparator = _s.rtrim(separator) + lastSeparator;

      return a.length ? a.join(separator) + lastSeparator + lastMember : lastMember;
    },

    toSentenceSerial: function() {
      var args = slice.call(arguments);
      args[3] = true;
      return _s.toSentence.apply(_s, args);
    },

    slugify: function(str) {
      if (str == null) return '';

      var from  = "ąàáäâãåæćęèéëêìíïîłńòóöôõøùúüûñçżź",
          to    = "aaaaaaaaceeeeeiiiilnoooooouuuunczz",
          regex = new RegExp(defaultToWhiteSpace(from), 'g');

      str = String(str).toLowerCase().replace(regex, function(c){
        var index = from.indexOf(c);
        return to.charAt(index) || '-';
      });

      return _s.dasherize(str.replace(/[^\w\s-]/g, ''));
    },

    surround: function(str, wrapper) {
      return [wrapper, str, wrapper].join('');
    },

    quote: function(str) {
      return _s.surround(str, '"');
    },

    exports: function() {
      var result = {};

      for (var prop in this) {
        if (!this.hasOwnProperty(prop) || prop.match(/^(?:include|contains|reverse)$/)) continue;
        result[prop] = this[prop];
      }

      return result;
    },

    repeat: function(str, qty, separator){
      if (str == null) return '';

      qty = ~~qty;

      // using faster implementation if separator is not needed;
      if (separator == null) return strRepeat(String(str), qty);

      // this one is about 300x slower in Google Chrome
      for (var repeat = []; qty > 0; repeat[--qty] = str) {}
      return repeat.join(separator);
    },

    levenshtein: function(str1, str2) {
      if (str1 == null && str2 == null) return 0;
      if (str1 == null) return String(str2).length;
      if (str2 == null) return String(str1).length;

      str1 = String(str1); str2 = String(str2);

      var current = [], prev, value;

      for (var i = 0; i <= str2.length; i++)
        for (var j = 0; j <= str1.length; j++) {
          if (i && j)
            if (str1.charAt(j - 1) === str2.charAt(i - 1))
              value = prev;
            else
              value = Math.min(current[j], current[j - 1], prev) + 1;
          else
            value = i + j;

          prev = current[j];
          current[j] = value;
        }

      return current.pop();
    }
  };

  // Aliases

  _s.strip    = _s.trim;
  _s.lstrip   = _s.ltrim;
  _s.rstrip   = _s.rtrim;
  _s.center   = _s.lrpad;
  _s.rjust    = _s.lpad;
  _s.ljust    = _s.rpad;
  _s.contains = _s.include;
  _s.q        = _s.quote;

  // Exporting

  // CommonJS module is defined
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports)
      module.exports = _s;

    exports._s = _s;
  }

  // Register as a named module with AMD.
  if (typeof define === 'function' && define.amd)
    define('underscore.string', [], function(){ return _s; });


  // Integrate with Underscore.js if defined
  // or create our own underscore object.
  root._ = root._ || {};
  root._.string = root._.str = _s;
}(this, String);//     Backbone.js 0.9.1

//     (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(){

  // Initial Setup
  // -------------

  // Save a reference to the global object (`window` in the browser, `global`
  // on the server).
  var root = this;

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;

  // Create a local reference to slice/splice.
  var slice = Array.prototype.slice;
  var splice = Array.prototype.splice;

  // The top-level namespace. All public Backbone classes and modules will
  // be attached to this. Exported for both CommonJS and the browser.
  var Backbone;
  if (typeof exports !== 'undefined') {
    Backbone = exports;
  } else {
    Backbone = root.Backbone = {};
  }

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '0.9.1';

  // Require Underscore, if we're on the server, and it's not already present.
  var _ = root._;
  if (!_ && (typeof require !== 'undefined')) _ = require('underscore');

  // For Backbone's purposes, jQuery, Zepto, or Ender owns the `$` variable.
  var $ = root.jQuery || root.Zepto || root.ender;

  // Set the JavaScript library that will be used for DOM manipulation and
  // Ajax calls (a.k.a. the `$` variable). By default Backbone will use: jQuery,
  // Zepto, or Ender; but the `setDomLibrary()` method lets you inject an
  // alternate JavaScript library (or a mock library for testing your views
  // outside of a browser).
  Backbone.setDomLibrary = function(lib) {
    $ = lib;
  };

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Backbone.Events
  // -----------------

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback functions
  // to an event; trigger`-ing an event fires all callbacks in succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  Backbone.Events = {

    // Bind an event, specified by a string name, `ev`, to a `callback`
    // function. Passing `"all"` will bind the callback to all events fired.
    on: function(events, callback, context) {
      var ev;
      events = events.split(/\s+/);
      var calls = this._callbacks || (this._callbacks = {});
      while (ev = events.shift()) {
        // Create an immutable callback list, allowing traversal during
        // modification.  The tail is an empty object that will always be used
        // as the next node.
        var list  = calls[ev] || (calls[ev] = {});
        var tail = list.tail || (list.tail = list.next = {});
        tail.callback = callback;
        tail.context = context;
        list.tail = tail.next = {};
      }
      return this;
    },

    // Remove one or many callbacks. If `context` is null, removes all callbacks
    // with that function. If `callback` is null, removes all callbacks for the
    // event. If `ev` is null, removes all bound callbacks for all events.
    off: function(events, callback, context) {
      var ev, calls, node;
      if (!events) {
        delete this._callbacks;
      } else if (calls = this._callbacks) {
        events = events.split(/\s+/);
        while (ev = events.shift()) {
          node = calls[ev];
          delete calls[ev];
          if (!callback || !node) continue;
          // Create a new list, omitting the indicated event/context pairs.
          while ((node = node.next) && node.next) {
            if (node.callback === callback &&
              (!context || node.context === context)) continue;
            this.on(ev, node.callback, node.context);
          }
        }
      }
      return this;
    },

    // Trigger an event, firing all bound callbacks. Callbacks are passed the
    // same arguments as `trigger` is, apart from the event name.
    // Listening for `"all"` passes the true event name as the first argument.
    trigger: function(events) {
      var event, node, calls, tail, args, all, rest;
      if (!(calls = this._callbacks)) return this;
      all = calls['all'];
      (events = events.split(/\s+/)).push(null);
      // Save references to the current heads & tails.
      while (event = events.shift()) {
        if (all) events.push({next: all.next, tail: all.tail, event: event});
        if (!(node = calls[event])) continue;
        events.push({next: node.next, tail: node.tail});
      }
      // Traverse each list, stopping when the saved tail is reached.
      rest = slice.call(arguments, 1);
      while (node = events.pop()) {
        tail = node.tail;
        args = node.event ? [node.event].concat(rest) : rest;
        while ((node = node.next) !== tail) {
          node.callback.apply(node.context || this, args);
        }
      }
      return this;
    }

  };

  // Aliases for backwards compatibility.
  Backbone.Events.bind   = Backbone.Events.on;
  Backbone.Events.unbind = Backbone.Events.off;

  // Backbone.Model
  // --------------

  // Create a new model, with defined attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  Backbone.Model = function(attributes, options) {
    var defaults;
    attributes || (attributes = {});
    if (options && options.parse) attributes = this.parse(attributes);
    if (defaults = getValue(this, 'defaults')) {
      attributes = _.extend({}, defaults, attributes);
    }
    if (options && options.collection) this.collection = options.collection;
    this.attributes = {};
    this._escapedAttributes = {};
    this.cid = _.uniqueId('c');
    if (!this.set(attributes, {silent: true})) {
      throw new Error("Can't create an invalid model");
    }
    delete this._changed;
    this._previousAttributes = _.clone(this.attributes);
    this.initialize.apply(this, arguments);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Backbone.Model.prototype, Backbone.Events, {

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Return a copy of the model's `attributes` object.
    toJSON: function() {
      return _.clone(this.attributes);
    },

    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      var html;
      if (html = this._escapedAttributes[attr]) return html;
      var val = this.attributes[attr];
      return this._escapedAttributes[attr] = _.escape(val == null ? '' : '' + val);
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.attributes[attr] != null;
    },

    // Set a hash of model attributes on the object, firing `"change"` unless
    // you choose to silence it.
    set: function(key, value, options) {
      var attrs, attr, val;
      if (_.isObject(key) || key == null) {
        attrs = key;
        options = value;
      } else {
        attrs = {};
        attrs[key] = value;
      }

      // Extract attributes and options.
      options || (options = {});
      if (!attrs) return this;
      if (attrs instanceof Backbone.Model) attrs = attrs.attributes;
      if (options.unset) for (attr in attrs) attrs[attr] = void 0;

      // Run validation.
      if (!this._validate(attrs, options)) return false;

      // Check for changes of `id`.
      if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

      var now = this.attributes;
      var escaped = this._escapedAttributes;
      var prev = this._previousAttributes || {};
      var alreadySetting = this._setting;
      this._changed || (this._changed = {});
      this._setting = true;

      // Update attributes.
      for (attr in attrs) {
        val = attrs[attr];
        if (!_.isEqual(now[attr], val)) delete escaped[attr];
        options.unset ? delete now[attr] : now[attr] = val;
        if (this._changing && !_.isEqual(this._changed[attr], val)) {
          this.trigger('change:' + attr, this, val, options);
          this._moreChanges = true;
        }
        delete this._changed[attr];
        if (!_.isEqual(prev[attr], val) || (_.has(now, attr) != _.has(prev, attr))) {
          this._changed[attr] = val;
        }
      }

      // Fire the `"change"` events, if the model has been changed.
      if (!alreadySetting) {
        if (!options.silent && this.hasChanged()) this.change(options);
        this._setting = false;
      }
      return this;
    },

    // Remove an attribute from the model, firing `"change"` unless you choose
    // to silence it. `unset` is a noop if the attribute doesn't exist.
    unset: function(attr, options) {
      (options || (options = {})).unset = true;
      return this.set(attr, null, options);
    },

    // Clear all attributes on the model, firing `"change"` unless you choose
    // to silence it.
    clear: function(options) {
      (options || (options = {})).unset = true;
      return this.set(_.clone(this.attributes), options);
    },

    // Fetch the model from the server. If the server's representation of the
    // model differs from its current attributes, they will be overriden,
    // triggering a `"change"` event.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;
      options.success = function(resp, status, xhr) {
        if (!model.set(model.parse(resp, xhr), options)) return false;
        if (success) success(model, resp);
      };
      options.error = Backbone.wrapError(options.error, model, options);
      return (this.sync || Backbone.sync).call(this, 'read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, value, options) {
      var attrs, current;
      if (_.isObject(key) || key == null) {
        attrs = key;
        options = value;
      } else {
        attrs = {};
        attrs[key] = value;
      }

      options = options ? _.clone(options) : {};
      if (options.wait) current = _.clone(this.attributes);
      var silentOptions = _.extend({}, options, {silent: true});
      if (attrs && !this.set(attrs, options.wait ? silentOptions : options)) {
        return false;
      }
      var model = this;
      var success = options.success;
      options.success = function(resp, status, xhr) {
        var serverAttrs = model.parse(resp, xhr);
        if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
        if (!model.set(serverAttrs, options)) return false;
        if (success) {
          success(model, resp);
        } else {
          model.trigger('sync', model, resp, options);
        }
      };
      options.error = Backbone.wrapError(options.error, model, options);
      var method = this.isNew() ? 'create' : 'update';
      var xhr = (this.sync || Backbone.sync).call(this, method, this, options);
      if (options.wait) this.set(current, silentOptions);
      return xhr;
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;

      var triggerDestroy = function() {
        model.trigger('destroy', model, model.collection, options);
      };

      if (this.isNew()) return triggerDestroy();
      options.success = function(resp) {
        if (options.wait) triggerDestroy();
        if (success) {
          success(model, resp);
        } else {
          model.trigger('sync', model, resp, options);
        }
      };
      options.error = Backbone.wrapError(options.error, model, options);
      var xhr = (this.sync || Backbone.sync).call(this, 'delete', this, options);
      if (!options.wait) triggerDestroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base = getValue(this.collection, 'url') || getValue(this, 'urlRoot') || urlError();
      if (this.isNew()) return base;
      return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + encodeURIComponent(this.id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse: function(resp, xhr) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return this.id == null;
    },

    // Call this method to manually fire a `"change"` event for this model and
    // a `"change:attribute"` event for each changed attribute.
    // Calling this will cause all objects observing the model to update.
    change: function(options) {
      if (this._changing || !this.hasChanged()) return this;
      this._changing = true;
      this._moreChanges = true;
      for (var attr in this._changed) {
        this.trigger('change:' + attr, this, this._changed[attr], options);
      }
      while (this._moreChanges) {
        this._moreChanges = false;
        this.trigger('change', this, options);
      }
      this._previousAttributes = _.clone(this.attributes);
      delete this._changed;
      this._changing = false;
      return this;
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (!arguments.length) return !_.isEmpty(this._changed);
      return this._changed && _.has(this._changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this._changed) : false;
      var val, changed = false, old = this._previousAttributes;
      for (var attr in diff) {
        if (_.isEqual(old[attr], (val = diff[attr]))) continue;
        (changed || (changed = {}))[attr] = val;
      }
      return changed;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (!arguments.length || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // Check if the model is currently in a valid state. It's only possible to
    // get into an *invalid* state if you're using silent changes.
    isValid: function() {
      return !this.validate(this.attributes);
    },

    // Run validation against a set of incoming attributes, returning `true`
    // if all is well. If a specific `error` callback has been passed,
    // call that instead of firing the general `"error"` event.
    _validate: function(attrs, options) {
      if (options.silent || !this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validate(attrs, options);
      if (!error) return true;
      if (options && options.error) {
        options.error(this, error, options);
      } else {
        this.trigger('error', this, error, options);
      }
      return false;
    }

  });

  // Backbone.Collection
  // -------------------

  // Provides a standard collection class for our sets of models, ordered
  // or unordered. If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.comparator) this.comparator = options.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, {silent: true, parse: options.parse});
  };

  // Define the Collection's inheritable methods.
  _.extend(Backbone.Collection.prototype, Backbone.Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model: Backbone.Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON: function() {
      return this.map(function(model){ return model.toJSON(); });
    },

    // Add a model, or list of models to the set. Pass **silent** to avoid
    // firing the `add` event for every new model.
    add: function(models, options) {
      var i, index, length, model, cid, id, cids = {}, ids = {};
      options || (options = {});
      models = _.isArray(models) ? models.slice() : [models];

      // Begin by turning bare objects into model references, and preventing
      // invalid models or duplicate models from being added.
      for (i = 0, length = models.length; i < length; i++) {
        if (!(model = models[i] = this._prepareModel(models[i], options))) {
          throw new Error("Can't add an invalid model to a collection");
        }
        if (cids[cid = model.cid] || this._byCid[cid] ||
          (((id = model.id) != null) && (ids[id] || this._byId[id]))) {
          throw new Error("Can't add the same model to a collection twice");
        }
        cids[cid] = ids[id] = model;
      }

      // Listen to added models' events, and index models for lookup by
      // `id` and by `cid`.
      for (i = 0; i < length; i++) {
        (model = models[i]).on('all', this._onModelEvent, this);
        this._byCid[model.cid] = model;
        if (model.id != null) this._byId[model.id] = model;
      }

      // Insert models into the collection, re-sorting if needed, and triggering
      // `add` events unless silenced.
      this.length += length;
      index = options.at != null ? options.at : this.models.length;
      splice.apply(this.models, [index, 0].concat(models));
      if (this.comparator) this.sort({silent: true});
      if (options.silent) return this;
      for (i = 0, length = this.models.length; i < length; i++) {
        if (!cids[(model = this.models[i]).cid]) continue;
        options.index = i;
        model.trigger('add', model, this, options);
      }
      return this;
    },

    // Remove a model, or a list of models from the set. Pass silent to avoid
    // firing the `remove` event for every model removed.
    remove: function(models, options) {
      var i, l, index, model;
      options || (options = {});
      models = _.isArray(models) ? models.slice() : [models];
      for (i = 0, l = models.length; i < l; i++) {
        model = this.getByCid(models[i]) || this.get(models[i]);
        if (!model) continue;
        delete this._byId[model.id];
        delete this._byCid[model.cid];
        index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;
        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }
        this._removeReference(model);
      }
      return this;
    },

    // Get a model from the set by id.
    get: function(id) {
      if (id == null) return null;
      return this._byId[id.id != null ? id.id : id];
    },

    // Get a model from the set by client id.
    getByCid: function(cid) {
      return cid && this._byCid[cid.cid || cid];
    },

    // Get the model at the given index.
    at: function(index) {
      return this.models[index];
    },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    sort: function(options) {
      options || (options = {});
      if (!this.comparator) throw new Error('Cannot sort a set without a comparator');
      var boundComparator = _.bind(this.comparator, this);
      if (this.comparator.length == 1) {
        this.models = this.sortBy(boundComparator);
      } else {
        this.models.sort(boundComparator);
      }
      if (!options.silent) this.trigger('reset', this, options);
      return this;
    },

    // Pluck an attribute from each model in the collection.
    pluck: function(attr) {
      return _.map(this.models, function(model){ return model.get(attr); });
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any `add` or `remove` events. Fires `reset` when finished.
    reset: function(models, options) {
      models  || (models = []);
      options || (options = {});
      for (var i = 0, l = this.models.length; i < l; i++) {
        this._removeReference(this.models[i]);
      }
      this._reset();
      this.add(models, {silent: true, parse: options.parse});
      if (!options.silent) this.trigger('reset', this, options);
      return this;
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `add: true` is passed, appends the
    // models to the collection instead of resetting.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === undefined) options.parse = true;
      var collection = this;
      var success = options.success;
      options.success = function(resp, status, xhr) {
        collection[options.add ? 'add' : 'reset'](collection.parse(resp, xhr), options);
        if (success) success(collection, resp);
      };
      options.error = Backbone.wrapError(options.error, collection, options);
      return (this.sync || Backbone.sync).call(this, 'read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
      var coll = this;
      options = options ? _.clone(options) : {};
      model = this._prepareModel(model, options);
      if (!model) return false;
      if (!options.wait) coll.add(model, options);
      var success = options.success;
      options.success = function(nextModel, resp, xhr) {
        if (options.wait) coll.add(nextModel, options);
        if (success) {
          success(nextModel, resp);
        } else {
          nextModel.trigger('sync', model, resp, options);
        }
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp, xhr) {
      return resp;
    },

    // Proxy to _'s chain. Can't be proxied the same way the rest of the
    // underscore methods are proxied because it relies on the underscore
    // constructor.
    chain: function () {
      return _(this.models).chain();
    },

    // Reset all internal state. Called when the collection is reset.
    _reset: function(options) {
      this.length = 0;
      this.models = [];
      this._byId  = {};
      this._byCid = {};
    },

    // Prepare a model or hash of attributes to be added to this collection.
    _prepareModel: function(model, options) {
      if (!(model instanceof Backbone.Model)) {
        var attrs = model;
        options.collection = this;
        model = new this.model(attrs, options);
        if (!model._validate(model.attributes, options)) model = false;
      } else if (!model.collection) {
        model.collection = this;
      }
      return model;
    },

    // Internal method to remove a model's ties to a collection.
    _removeReference: function(model) {
      if (this == model.collection) {
        delete model.collection;
      }
      model.off('all', this._onModelEvent, this);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent: function(ev, model, collection, options) {
      if ((ev == 'add' || ev == 'remove') && collection != this) return;
      if (ev == 'destroy') {
        this.remove(model, options);
      }
      if (model && ev === 'change:' + model.idAttribute) {
        delete this._byId[model.previous(model.idAttribute)];
        this._byId[model.id] = model;
      }
      this.trigger.apply(this, arguments);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  var methods = ['forEach', 'each', 'map', 'reduce', 'reduceRight', 'find',
    'detect', 'filter', 'select', 'reject', 'every', 'all', 'some', 'any',
    'include', 'contains', 'invoke', 'max', 'min', 'sortBy', 'sortedIndex',
    'toArray', 'size', 'first', 'initial', 'rest', 'last', 'without', 'indexOf',
    'shuffle', 'lastIndexOf', 'isEmpty', 'groupBy'];

  // Mix in each Underscore method as a proxy to `Collection#models`.
  _.each(methods, function(method) {
    Backbone.Collection.prototype[method] = function() {
      return _[method].apply(_, [this.models].concat(_.toArray(arguments)));
    };
  });

  // Backbone.Router
  // -------------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var namedParam    = /:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[-[\]{}()+?.,\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Backbone.Router.prototype, Backbone.Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      Backbone.history || (Backbone.history = new Backbone.History);
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (!callback) callback = this[name];
      Backbone.history.route(route, _.bind(function(fragment) {
        var args = this._extractParameters(route, fragment);
        callback && callback.apply(this, args);
        this.trigger.apply(this, ['route:' + name].concat(args));
        Backbone.history.trigger('route', this, name, args);
      }, this));
      return this;
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function() {
      if (!this.routes) return;
      var routes = [];
      for (var route in this.routes) {
        routes.unshift([route, this.routes[route]]);
      }
      for (var i = 0, l = routes.length; i < l; i++) {
        this.route(routes[i][0], routes[i][1], this[routes[i][1]]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(namedParam, '([^\/]+)')
                   .replace(splatParam, '(.*?)');
      return new RegExp('^' + route + '$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted parameters.
    _extractParameters: function(route, fragment) {
      return route.exec(fragment).slice(1);
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on URL fragments. If the
  // browser does not support `onhashchange`, falls back to polling.
  Backbone.History = function() {
    this.handlers = [];
    _.bindAll(this, 'checkUrl');
  };

  // Cached regex for cleaning leading hashes and slashes .
  var routeStripper = /^[#\/]/;

  // Cached regex for detecting MSIE.
  var isExplorer = /msie [\w.]+/;

  // Has the history handling already been started?
  var historyStarted = false;

  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(Backbone.History.prototype, Backbone.Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Get the cross-browser normalized URL fragment, either from the URL,
    // the hash, or the override.
    getFragment: function(fragment, forcePushState) {
      if (fragment == null) {
        if (this._hasPushState || forcePushState) {
          fragment = window.location.pathname;
          var search = window.location.search;
          if (search) fragment += search;
        } else {
          fragment = window.location.hash;
        }
      }
      fragment = decodeURIComponent(fragment);
      if (!fragment.indexOf(this.options.root)) fragment = fragment.substr(this.options.root.length);
      return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function(options) {

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      if (historyStarted) throw new Error("Backbone.history has already been started");
      this.options          = _.extend({}, {root: '/'}, this.options, options);
      this._wantsHashChange = this.options.hashChange !== false;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.options.pushState && window.history && window.history.pushState);
      var fragment          = this.getFragment();
      var docMode           = document.documentMode;
      var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));
      if (oldIE) {
        this.iframe = $('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo('body')[0].contentWindow;
        this.navigate(fragment);
      }

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._hasPushState) {
        $(window).bind('popstate', this.checkUrl);
      } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
        $(window).bind('hashchange', this.checkUrl);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      // Determine if we need to change the base url, for a pushState link
      // opened by a non-pushState browser.
      this.fragment = fragment;
      historyStarted = true;
      var loc = window.location;
      var atRoot  = loc.pathname == this.options.root;

      // If we've started off with a route from a `pushState`-enabled browser,
      // but we're currently in a browser that doesn't support it...
      if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !atRoot) {
        this.fragment = this.getFragment(null, true);
        window.location.replace(this.options.root + '#' + this.fragment);
        // Return immediately as browser will do redirect to new url
        return true;

      // Or if we've started out with a hash-based route, but we're currently
      // in a browser where it could be `pushState`-based instead...
      } else if (this._wantsPushState && this._hasPushState && atRoot && loc.hash) {
        this.fragment = loc.hash.replace(routeStripper, '');
        window.history.replaceState({}, document.title, loc.protocol + '//' + loc.host + this.options.root + this.fragment);
      }

      if (!this.options.silent) {
        return this.loadUrl();
      }
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function() {
      $(window).unbind('popstate', this.checkUrl).unbind('hashchange', this.checkUrl);
      clearInterval(this._checkUrlInterval);
      historyStarted = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl: function(e) {
      var current = this.getFragment();
      if (current == this.fragment && this.iframe) current = this.getFragment(this.iframe.location.hash);
      if (current == this.fragment || current == decodeURIComponent(this.fragment)) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl() || this.loadUrl(window.location.hash);
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function(fragmentOverride) {
      var fragment = this.fragment = this.getFragment(fragmentOverride);
      var matched = _.any(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
      return matched;
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you which to modify the current URL without adding an entry to the history.
    navigate: function(fragment, options) {
      if (!historyStarted) return false;
      if (!options || options === true) options = {trigger: options};
      var frag = (fragment || '').replace(routeStripper, '');
      if (this.fragment == frag || this.fragment == decodeURIComponent(frag)) return;

      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._hasPushState) {
        if (frag.indexOf(this.options.root) != 0) frag = this.options.root + frag;
        this.fragment = frag;
        window.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, frag);

      // If hash changes haven't been explicitly disabled, update the hash
      // fragment to store history.
      } else if (this._wantsHashChange) {
        this.fragment = frag;
        this._updateHash(window.location, frag, options.replace);
        if (this.iframe && (frag != this.getFragment(this.iframe.location.hash))) {
          // Opening and closing the iframe tricks IE7 and earlier to push a history entry on hash-tag change.
          // When replace is true, we don't want this.
          if(!options.replace) this.iframe.document.open().close();
          this._updateHash(this.iframe.location, frag, options.replace);
        }

      // If you've told us that you explicitly don't want fallback hashchange-
      // based history, then `navigate` becomes a page refresh.
      } else {
        window.location.assign(this.options.root + fragment);
      }
      if (options.trigger) this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        location.replace(location.toString().replace(/(javascript:|#).*$/, '') + '#' + fragment);
      } else {
        location.hash = fragment;
      }
    }
  });

  // Backbone.View
  // -------------

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    this._configure(options || {});
    this._ensureElement();
    this.initialize.apply(this, arguments);
    this.delegateEvents();
  };

  // Cached regex to split keys for `delegate`.
  var eventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be merged as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName'];

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(Backbone.View.prototype, Backbone.Events, {

    // The default `tagName` of a View's element is `"div"`.
    tagName: 'div',

    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be prefered to global lookups where possible.
    $: function(selector) {
      return this.$el.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render: function() {
      return this;
    },

    // Remove this view from the DOM. Note that the view isn't present in the
    // DOM by default, so calling this method may be a no-op.
    remove: function() {
      this.$el.remove();
      return this;
    },

    // For small amounts of DOM Elements, where a full-blown template isn't
    // needed, use **make** to manufacture elements, one at a time.
    //
    //     var el = this.make('li', {'class': 'row'}, this.model.escape('title'));
    //
    make: function(tagName, attributes, content) {
      var el = document.createElement(tagName);
      if (attributes) $(el).attr(attributes);
      if (content) $(el).html(content);
      return el;
    },

    // Change the view's element (`this.el` property), including event
    // re-delegation.
    setElement: function(element, delegate) {
      this.$el = $(element);
      this.el = this.$el[0];
      if (delegate !== false) this.delegateEvents();
      return this;
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save'
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.
    delegateEvents: function(events) {
      if (!(events || (events = getValue(this, 'events')))) return;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) throw new Error('Event "' + events[key] + '" does not exist');
        var match = key.match(eventSplitter);
        var eventName = match[1], selector = match[2];
        method = _.bind(method, this);
        eventName += '.delegateEvents' + this.cid;
        if (selector === '') {
          this.$el.bind(eventName, method);
        } else {
          this.$el.delegate(selector, eventName, method);
        }
      }
    },

    // Clears all callbacks previously bound to the view with `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function() {
      this.$el.unbind('.delegateEvents' + this.cid);
    },

    // Performs the initial configuration of a View with a set of options.
    // Keys with special meaning *(model, collection, id, className)*, are
    // attached directly to the view.
    _configure: function(options) {
      if (this.options) options = _.extend({}, this.options, options);
      for (var i = 0, l = viewOptions.length; i < l; i++) {
        var attr = viewOptions[i];
        if (options[attr]) this[attr] = options[attr];
      }
      this.options = options;
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = getValue(this, 'attributes') || {};
        if (this.id) attrs.id = this.id;
        if (this.className) attrs['class'] = this.className;
        this.setElement(this.make(this.tagName, attrs), false);
      } else {
        this.setElement(this.el, false);
      }
    }

  });

  // The self-propagating extend function that Backbone classes use.
  var extend = function (protoProps, classProps) {
    var child = inherits(this, protoProps, classProps);
    child.extend = this.extend;
    return child;
  };

  // Set up inheritance for the model, collection, and view.
  Backbone.Model.extend = Backbone.Collection.extend =
    Backbone.Router.extend = Backbone.View.extend = extend;

  // Backbone.sync
  // -------------

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'delete': 'DELETE',
    'read':   'GET'
  };

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded`
  // instead of `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = getValue(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (!options.data && model && (method == 'create' || method == 'update')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(model.toJSON());
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (Backbone.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (Backbone.emulateHTTP) {
      if (type === 'PUT' || type === 'DELETE') {
        if (Backbone.emulateJSON) params.data._method = type;
        params.type = 'POST';
        params.beforeSend = function(xhr) {
          xhr.setRequestHeader('X-HTTP-Method-Override', type);
        };
      }
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !Backbone.emulateJSON) {
      params.processData = false;
    }

    // Make the request, allowing the user to override any Ajax options.
    return $.ajax(_.extend(params, options));
  };

  // Wrap an optional error callback with a fallback error event.
  Backbone.wrapError = function(onError, originalModel, options) {
    return function(model, resp) {
      resp = model === originalModel ? resp : model;
      if (onError) {
        onError(originalModel, resp, options);
      } else {
        originalModel.trigger('error', originalModel, resp, options);
      }
    };
  };

  // Helpers
  // -------

  // Shared empty constructor function to aid in prototype-chain creation.
  var ctor = function(){};

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var inherits = function(parent, protoProps, staticProps) {
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && protoProps.hasOwnProperty('constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ parent.apply(this, arguments); };
    }

    // Inherit class (static) properties from parent.
    _.extend(child, parent);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Add static properties to the constructor function, if supplied.
    if (staticProps) _.extend(child, staticProps);

    // Correctly set child's `prototype.constructor`.
    child.prototype.constructor = child;

    // Set a convenience property in case the parent's prototype is needed later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Helper function to get a value from a Backbone object as a property
  // or as a function.
  var getValue = function(object, prop) {
    if (!(object && object[prop])) return null;
    return _.isFunction(object[prop]) ? object[prop]() : object[prop];
  };

  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

}).call(this);
//fgnass.github.com/spin.js#v1.2.4
(function(window, document, undefined) {

/**
 * Copyright (c) 2011 Felix Gnass [fgnass at neteye dot de]
 * Licensed under the MIT license
 */

  var prefixes = ['webkit', 'Moz', 'ms', 'O']; /* Vendor prefixes */
  var animations = {}; /* Animation rules keyed by their name */
  var useCssAnimations;

  /**
   * Utility function to create elements. If no tag name is given,
   * a DIV is created. Optionally properties can be passed.
   */
  function createEl(tag, prop) {
    var el = document.createElement(tag || 'div');
    var n;

    for(n in prop) {
      el[n] = prop[n];
    }
    return el;
  }

  /**
   * Appends children and returns the parent.
   */
  function ins(parent /* child1, child2, ...*/) {
    for (var i=1, n=arguments.length; i<n; i++) {
      parent.appendChild(arguments[i]);
    }
    return parent;
  }

  /**
   * Insert a new stylesheet to hold the @keyframe or VML rules.
   */
  var sheet = function() {
    var el = createEl('style');
    ins(document.getElementsByTagName('head')[0], el);
    return el.sheet || el.styleSheet;
  }();

  /**
   * Creates an opacity keyframe animation rule and returns its name.
   * Since most mobile Webkits have timing issues with animation-delay,
   * we create separate rules for each line/segment.
   */
  function addAnimation(alpha, trail, i, lines) {
    var name = ['opacity', trail, ~~(alpha*100), i, lines].join('-');
    var start = 0.01 + i/lines*100;
    var z = Math.max(1-(1-alpha)/trail*(100-start) , alpha);
    var prefix = useCssAnimations.substring(0, useCssAnimations.indexOf('Animation')).toLowerCase();
    var pre = prefix && '-'+prefix+'-' || '';

    if (!animations[name]) {
      sheet.insertRule(
        '@' + pre + 'keyframes ' + name + '{' +
        '0%{opacity:'+z+'}' +
        start + '%{opacity:'+ alpha + '}' +
        (start+0.01) + '%{opacity:1}' +
        (start+trail)%100 + '%{opacity:'+ alpha + '}' +
        '100%{opacity:'+ z + '}' +
        '}', 0);
      animations[name] = 1;
    }
    return name;
  }

  /**
   * Tries various vendor prefixes and returns the first supported property.
   **/
  function vendor(el, prop) {
    var s = el.style;
    var pp;
    var i;

    if(s[prop] !== undefined) return prop;
    prop = prop.charAt(0).toUpperCase() + prop.slice(1);
    for(i=0; i<prefixes.length; i++) {
      pp = prefixes[i]+prop;
      if(s[pp] !== undefined) return pp;
    }
  }

  /**
   * Sets multiple style properties at once.
   */
  function css(el, prop) {
    for (var n in prop) {
      el.style[vendor(el, n)||n] = prop[n];
    }
    return el;
  }

  /**
   * Fills in default values.
   */
  function merge(obj) {
    for (var i=1; i < arguments.length; i++) {
      var def = arguments[i];
      for (var n in def) {
        if (obj[n] === undefined) obj[n] = def[n];
      }
    }
    return obj;
  }

  /**
   * Returns the absolute page-offset of the given element.
   */
  function pos(el) {
    var o = {x:el.offsetLeft, y:el.offsetTop};
    while((el = el.offsetParent)) {
      o.x+=el.offsetLeft;
      o.y+=el.offsetTop;
    }
    return o;
  }

  var defaults = {
    lines: 12,            // The number of lines to draw
    length: 7,            // The length of each line
    width: 5,             // The line thickness
    radius: 10,           // The radius of the inner circle
    color: '#000',        // #rgb or #rrggbb
    speed: 1,             // Rounds per second
    trail: 100,           // Afterglow percentage
    opacity: 1/4,         // Opacity of the lines
    fps: 20,              // Frames per second when using setTimeout()
    zIndex: 2e9,          // Use a high z-index by default
    className: 'spinner', // CSS class to assign to the element
    top: 'auto',          // center vertically
    left: 'auto'          // center horizontally
  };

  /** The constructor */
  var Spinner = function Spinner(o) {
    if (!this.spin) return new Spinner(o);
    this.opts = merge(o || {}, Spinner.defaults, defaults);
  };

  Spinner.defaults = {};
  Spinner.prototype = {
    spin: function(target) {
      this.stop();
      var self = this;
      var o = self.opts;
      var el = self.el = css(createEl(0, {className: o.className}), {position: 'relative', zIndex: o.zIndex});
      var mid = o.radius+o.length+o.width;
      var ep; // element position
      var tp; // target position

      if (target) {
        target.insertBefore(el, target.firstChild||null);
        tp = pos(target);
        ep = pos(el);
        css(el, {
          left: (o.left == 'auto' ? tp.x-ep.x + (target.offsetWidth >> 1) : o.left+mid) + 'px',
          top: (o.top == 'auto' ? tp.y-ep.y + (target.offsetHeight >> 1) : o.top+mid)  + 'px'
        });
      }

      el.setAttribute('aria-role', 'progressbar');
      self.lines(el, self.opts);

      if (!useCssAnimations) {
        // No CSS animation support, use setTimeout() instead
        var i = 0;
        var fps = o.fps;
        var f = fps/o.speed;
        var ostep = (1-o.opacity)/(f*o.trail / 100);
        var astep = f/o.lines;

        !function anim() {
          i++;
          for (var s=o.lines; s; s--) {
            var alpha = Math.max(1-(i+s*astep)%f * ostep, o.opacity);
            self.opacity(el, o.lines-s, alpha, o);
          }
          self.timeout = self.el && setTimeout(anim, ~~(1000/fps));
        }();
      }
      return self;
    },
    stop: function() {
      var el = this.el;
      if (el) {
        clearTimeout(this.timeout);
        if (el.parentNode) el.parentNode.removeChild(el);
        this.el = undefined;
      }
      return this;
    },
    lines: function(el, o) {
      var i = 0;
      var seg;

      function fill(color, shadow) {
        return css(createEl(), {
          position: 'absolute',
          width: (o.length+o.width) + 'px',
          height: o.width + 'px',
          background: color,
          boxShadow: shadow,
          transformOrigin: 'left',
          transform: 'rotate(' + ~~(360/o.lines*i) + 'deg) translate(' + o.radius+'px' +',0)',
          borderRadius: (o.width>>1) + 'px'
        });
      }
      for (; i < o.lines; i++) {
        seg = css(createEl(), {
          position: 'absolute',
          top: 1+~(o.width/2) + 'px',
          transform: o.hwaccel ? 'translate3d(0,0,0)' : '',
          opacity: o.opacity,
          animation: useCssAnimations && addAnimation(o.opacity, o.trail, i, o.lines) + ' ' + 1/o.speed + 's linear infinite'
        });
        if (o.shadow) ins(seg, css(fill('#000', '0 0 4px ' + '#000'), {top: 2+'px'}));
        ins(el, ins(seg, fill(o.color, '0 0 1px rgba(0,0,0,.1)')));
      }
      return el;
    },
    opacity: function(el, i, val) {
      if (i < el.childNodes.length) el.childNodes[i].style.opacity = val;
    }
  };

  /////////////////////////////////////////////////////////////////////////
  // VML rendering for IE
  /////////////////////////////////////////////////////////////////////////

  /**
   * Check and init VML support
   */
  !function() {
    var s = css(createEl('group'), {behavior: 'url(#default#VML)'});
    var i;

    if (!vendor(s, 'transform') && s.adj) {

      // VML support detected. Insert CSS rules ...
      for (i=4; i--;) sheet.addRule(['group', 'roundrect', 'fill', 'stroke'][i], 'behavior:url(#default#VML)');

      Spinner.prototype.lines = function(el, o) {
        var r = o.length+o.width;
        var s = 2*r;

        function grp() {
          return css(createEl('group', {coordsize: s +' '+s, coordorigin: -r +' '+-r}), {width: s, height: s});
        }

        var margin = -(o.width+o.length)*2+'px';
        var g = css(grp(), {position: 'absolute', top: margin, left: margin});

        var i;

        function seg(i, dx, filter) {
          ins(g,
            ins(css(grp(), {rotation: 360 / o.lines * i + 'deg', left: ~~dx}),
              ins(css(createEl('roundrect', {arcsize: 1}), {
                  width: r,
                  height: o.width,
                  left: o.radius,
                  top: -o.width>>1,
                  filter: filter
                }),
                createEl('fill', {color: o.color, opacity: o.opacity}),
                createEl('stroke', {opacity: 0}) // transparent stroke to fix color bleeding upon opacity change
              )
            )
          );
        }

        if (o.shadow) {
          for (i = 1; i <= o.lines; i++) {
            seg(i, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)');
          }
        }
        for (i = 1; i <= o.lines; i++) seg(i);
        return ins(el, g);
      };
      Spinner.prototype.opacity = function(el, i, val, o) {
        var c = el.firstChild;
        o = o.shadow && o.lines || 0;
        if (c && i+o < c.childNodes.length) {
          c = c.childNodes[i+o]; c = c && c.firstChild; c = c && c.firstChild;
          if (c) c.opacity = val;
        }
      };
    }
    else {
      useCssAnimations = vendor(s, 'animation');
    }
  }();

  window.Spinner = Spinner;

})(window, document);(function() {
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
