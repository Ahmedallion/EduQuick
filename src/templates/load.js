export default function loadTemplate(template, vars = {}) {
    let rendered = template;

    for (const key in vars) {
        const value = vars[key];
        rendered = rendered.replaceAll(`{{${key}}}`, value);
    }

    return rendered;
}
