<select name="{{name}}" class="form-control main-element" style="color: {{color}}; background-color: {{backgroundColor}}; font-size: {{fontSize}}; font-weight: {{fontWeight}};">
    {{#each options}}
    <option style="color: {{color}}; background-color: {{backgroundColor}}; font-size: {{fontSize}}; font-weight: {{fontWeight}};" {{#if selected}}selected{{/if}}>
        {{translateOption value scope=../scope field=../name translatedOptions=../translatedOptions}}
    </option>
    {{/each}}
</select>
