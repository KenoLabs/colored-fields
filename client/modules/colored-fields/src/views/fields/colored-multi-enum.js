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

Espo.define('colored-fields:views/fields/colored-multi-enum', 'views/fields/multi-enum', function (Dep) {

    return Dep.extend({

        listTemplate: 'colored-fields:fields/colored-multi-enum/detail',

        detailTemplate: 'colored-fields:fields/colored-multi-enum/detail',

        afterRender() {
            Dep.prototype.afterRender.call(this);

            if (this.mode == 'edit') {
                this.setColors();
                this.$element.on('change', this.setColors.bind(this));
            }
        },

        setColors() {
            let value = this.$element.val();
            let values = value.split(':,:');
            if (values.length) {
                let optionColors = this.model.getFieldParam(this.name, 'optionColors') || {};
                values.forEach(item => this.$el.find(`[data-value='${item}']`).css({ 'background': `#${optionColors[item]}`, 'color': '#fff'}));
            }
        },

        data() {
            let data = Dep.prototype.data.call(this);
            let optionColors = this.model.getFieldParam(this.name, 'optionColors') || {};
            data.selectedValues = (data.selected || []).map(item => {
                return {
                    color: optionColors[item],
                    value: item
                };
            });
            data.color = (this.model.getFieldParam(this.name, 'optionColors') || {})[data.value];
            return data;
        }

    });
});
