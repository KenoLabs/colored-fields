{{#unless isEmpty}}
{{#each selectedValues}}
<span class="label" style="color: {{color}}; background-color: {{backgroundColor}}; font-size: {{fontSize}}; font-weight: {{fontWeight}}; padding: {{padding}};">
    {{translateOption value scope=../scope field=../name translatedOptions=../translatedOptions}}</span>{{#unless isEnd}},{{/unless}}
{{/each}}
{{else}}{{translate 'None'}}{{/unless}}