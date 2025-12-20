export default function loadTemplate(template, vars = {}) {
    let out = template;
    for (const key in vars) {
        out = out.replaceAll(`{{${key}}}`, vars[key]);
    }
    return out;
}
