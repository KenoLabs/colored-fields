{{#if isNotEmpty}}
<span class="label" style="color: #{{color}}; background:#{{backgroundColor}};">{{translateOption value scope=scope field=name translatedOptions=translatedOptions}}</span>
{{else}}
{{translate 'None'}}
{{/if}}
