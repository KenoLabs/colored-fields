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

        afterRender() {
            Dep.prototype.afterRender.call(this);

            if (this.mode === 'edit') {
                let that = this;
                this.$el.find(`select[name="${this.name}"]`).on('change', function () {
                    let color = (that.model.getFieldParam(that.name, 'optionColors') || {})[$(this).val()];
                    $(this).css({background: `#${color}`});
                });
            }
        },

        data() {
            let data = Dep.prototype.data.call(this);
            let optionColors = this.model.getFieldParam(this.name, 'optionColors') || {};
            data.options = (data.params.options || []).map(item => {
                return {
                    selected: item === data.value,
                    color: optionColors[item],
                    value: item
                };
            });
            data.color = (this.model.getFieldParam(this.name, 'optionColors') || {})[data.value];
            return data;
        }
    });

});
