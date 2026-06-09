// ../core/dist/index.js
var VARIABLE_PATTERN = /\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g;
function interpolateVariables(template, variables) {
  return template.replace(VARIABLE_PATTERN, (_match, key) => {
    const value = variables[key];
    if (value === void 0 || value === null) {
      return "";
    }
    return String(value);
  });
}
function normalizeLookupKey(value) {
  return value.trim().replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function getFieldValue(fields, key) {
  return fields.find((field) => normalizeLookupKey(field.key) === normalizeLookupKey(key))?.value;
}
function resolveFieldText(fields, key, context, toVariables) {
  const value = getFieldValue(fields, key);
  if (typeof value !== "string") {
    return void 0;
  }
  return interpolateVariables(value, toVariables(context.data));
}
export {
  getFieldValue,
  interpolateVariables,
  resolveFieldText
};
