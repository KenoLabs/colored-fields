/*
 * ColoredFields
 * Free Extension
 * Copyright (c) Zinit Solutions GmbH
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
 * along with this program.  If not, see https://www.gnu.org/licenses/.
 */

Espo.define('colored-fields:views/fields/colored-enum', 'views/fields/enum', function (Dep) {

    return Dep.extend({

        listTemplate: 'colored-fields:fields/colored-enum/list',

        detailTemplate: 'colored-fields:fields/colored-enum/list',

        editTemplate: 'colored-fields:fields/colored-enum/edit',

        defaultBackgroundColor: 'ccc',

        afterRender() {
            Dep.prototype.afterRender.call(this);

            if (this.mode === 'edit') {
                this.$el.find(`select[name="${this.name}"]`).on('change', function () {
                    let backgroundColor = this.getBackgroundColor(this.$element.val());
                    let color = this.getFontColor(backgroundColor);
                    $(this).css({background: `#${backgroundColor}`});
                    $(this).css({color: `#${color}`});
                }.bind(this));
            }
        },

        data() {
            let data = Dep.prototype.data.call(this);
            let optionColors = this.model.getFieldParam(this.name, 'optionColors') || {};
            data.options = (data.params.options || []).map(item => {
                let backgroundColor = optionColors[item] || this.defaultBackgroundColor;
                return {
                    selected: item === data.value,
                    backgroundColor: backgroundColor,
                    color: this.getFontColor(backgroundColor),
                    value: item
                };
            });
            data.backgroundColor = this.getBackgroundColor(data.value);
            data.color = this.getFontColor(data.backgroundColor);
            return data;
        },

        getBackgroundColor(fieldValue) {
            return (this.model.getFieldParam(this.name, 'optionColors') || {})[fieldValue] || this.defaultBackgroundColor;
        },

        getFontColor(backgroundColor) {
            let color;
            let r = parseInt(backgroundColor.substr(0, 2), 16);
            let g = parseInt(backgroundColor.substr(2, 2), 16);
            let b = parseInt(backgroundColor.substr(4, 2), 16);
            let l = 1 - ( 0.299 * r + 0.587 * g + 0.114 * b) / 255;
            l < 0.5 ? color = '000' : color = 'fff';
            return color;
        }
    });

});
