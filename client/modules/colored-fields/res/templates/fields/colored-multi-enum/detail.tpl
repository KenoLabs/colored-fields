{{#unless isEmpty}}
{{#each selectedValues}}
<span class="label" style="color: {{color}}; background-color: {{backgroundColor}}; font-size: {{fontSize}}; font-weight: {{fontWeight}};">{{translateOption value scope=../scope field=../name translatedOptions=../translatedOptions}}</span>
{{/each}}
{{else}}{{translate 'None'}}{{/unless}}