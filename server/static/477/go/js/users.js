(function(b){var a=function(){};a.create=function(f){var d=b("<div/>").attr({id:f,"class":"modal hide"});return d};a.ensure=function(f){var d=b("#"+f);if(d.length==0){d=a.create(f).appendTo("body")}return d};a.prototype={loading:function(){this.$el.modal("loading")},load:function(d){var f=this;this.$el.modal();this.loading();b.get(d,function(g){f.$el.html(g).modal("layout");f.loading();f.remoteUrl=d})},refresh:function(){if(!this.remoteUrl){return}this.load(this.remoteUrl)},alert:function(f,d){d=d||"success";this.$el.find(".alert").remove();if(f.length>0){var g=b('<div class="alert"><button type="button" class="close" data-dismiss="alert">&times;</button></div>');g.addClass("alert-"+d).append(f).prependTo(this.$el.find(".modal-body"))}}};var c=function(d){var f=this;this.$el=d;this.$el.on("submit.users.goanimate",".user-message-form",function(h){var g=b(this);h.preventDefault();f.post(g)})};c.prototype=b.extend({},a.prototype,{post:function(g){var i=this,h=g.find('[name="subject"]'),f=g.find('[name="comment_content"]');if(h.length>0&&h.val()==""){this.alert(GT.gettext("Please enter the subject"),"error");return}if(f.val()==""){this.alert(GT.gettext("Your message is too short"),"error");return}this.alert("");var d=g.serialize();g.form("disable").find('[type="submit"]').button("loading");if(typeof Recaptcha=="object"){Recaptcha.destroy()}b.post(g.attr("action"),d,function(j){parseResponse(j);switch(responseArray.code){case"0":i.$el.modal("hide");showNotice(GT.gettext("Message sent successfully"));b(document).trigger(e=b.Event("messagePosted"));g.form("reset").find('[type="submit"]').button("done");setTimeout(function(){g.find('[type="submit"]').prop("disabled",true)},1);break;case"1":g.find(".recaptcha-container").show();g.form("enable").find('[type="submit"]').button("reset");if(typeof Recaptcha=="object"){Recaptcha.create(recaptcha_public_key,"recaptcha",b.extend({},recaptcha_options,{callback:Recaptcha.focus_response_field}))}break;default:i.alert(responseArray.json.error,"error");g.form("enable").find('[type="submit"]').button("reset");break}resetResponse()})}});b(document).on("click",'[data-action="users-message"]',function(h){var g=b(this),d=a.ensure("users-message"),f=d.data("sendMessage");if(!f){d.data("sendMessage",f=new c(d))}h.preventDefault();f.load(g.data("remote"))})})(jQuery);
