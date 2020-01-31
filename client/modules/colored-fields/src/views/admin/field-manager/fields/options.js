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

Espo.define('colored-fields:views/admin/field-manager/fields/options', ['class-replace!colored-fields:views/admin/field-manager/fields/options', 'lib!jscolor'],
    Dep => Dep.extend({

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

        getTranslationContainer(value, valueInternal, translatedValue, valueSanitized) {
            const coloredValue = this.optionColors[value] || this.defaultColor;
            return `
                <div class="pull-left" style="width: 92%; display: inline-block;">
                    <input name="coloredValue" data-value="${valueInternal}" class="role form-control input-sm pull-right" value="${coloredValue}">
                    <input name="translatedValue" data-value="${valueInternal}" class="role form-control input-sm pull-right" value="${translatedValue}">
                    <div class="main-option">${valueSanitized}</div>
                </div>`;
        }

    })
);
