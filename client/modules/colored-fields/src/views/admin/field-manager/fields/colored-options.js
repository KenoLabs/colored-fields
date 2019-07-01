/*
 * ColoredFields
 * Free Extension
 * Copyright (c) TreoLabs GmbH
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

Espo.define('colored-fields:views/admin/field-manager/fields/colored-options', ['views/admin/field-manager/fields/options', 'lib!jscolor'], function (Dep) {
    return Dep.extend({

        optionColors: null,

        defaultColor: '333333',

        setup() {
            Dep.prototype.setup.call(this);

            this.optionColors = Espo.Utils.cloneDeep(this.model.get('optionColors') || {});
        },

        afterRender() {
            Dep.prototype.afterRender.call(this);

            if (this.mode == 'edit') {
                this.$list.find('[name="coloredValue"]').get().forEach(item => {
                    new jscolor(item)
                });
            }
        },

        fetch() {
            var data = Dep.prototype.fetch.call(this);

            if (data) {
                data.optionColors = {};
                (data[this.name] || []).forEach(function (value) {
                    let valueSanitized = this.getHelper().stripTags(value);
                    let valueInternal = valueSanitized.replace(/"/g, '-quote-').replace(/\\/g, '-backslash-');

                    let coloredValue = this.$el.find('input[name="coloredValue"][data-value="' + valueInternal + '"]').val() || this.defaultColor;
                    data.optionColors[value] = coloredValue.toString();
                }, this);
            }

            return data;
        },

        addValue(value) {
            if (this.selected.indexOf(value) == -1) {
                var html = this.getItemHtml(value);
                this.$list.append(html);
                this.selected.push(value);
                this.trigger('change');

                let valueInternal = this.getHelper().stripTags(value).replace(/"/g, '-quote-').replace(/\\/g, '-backslash-');
                this.$list.find('[data-value="' + valueInternal + '"] [name="coloredValue"]').get().forEach(item => {
                    new jscolor(item)
                });
            }
        },

        getItemHtml: function (value) {
            let valueSanitized = this.getHelper().stripTags(value);
            let translatedValue = this.translatedOptions[value] || valueSanitized;

            translatedValue = translatedValue.replace(/"/g, '&quot;').replace(/\\/g, '&bsol;');

            let valueInternal = valueSanitized.replace(/"/g, '-quote-').replace(/\\/g, '-backslash-');
            let coloredValue = this.optionColors[value] || this.defaultColor;

            return `
                <div class="list-group-item link-with-role form-inline" data-value="${valueInternal}">
                    <div class="pull-left" style="width: 92%; display: inline-block; margin-bottom: 2px;">
                        <input name="coloredValue" data-value="${valueInternal}" class="role form-control input-sm pull-right" value="${coloredValue}">
                        <input name="translatedValue" data-value="${valueInternal}" class="role form-control input-sm pull-right" value="${translatedValue}">
                        <div>${translatedValue}</div>
                    </div>
                    <div style="width: 8%; display: inline-block;">
                        <a href="javascript:" class="pull-right" data-value="${valueInternal}" data-action="removeValue"><span class="fas fa-times"></a>
                    </div>
                    <br style="clear: both;" />
                </div>`;
        },

    });

});
