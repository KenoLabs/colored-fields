{{#unless isEmpty}}
{{#each selectedValues}}
<span class="label" style="color: #{{color}}; background: #{{backgroundColor}};">{{translateOption value scope=../scope field=../name translatedOptions=../translatedOptions}}</span>
{{/each}}
{{else}}{{translate 'None'}}{{/unless}}